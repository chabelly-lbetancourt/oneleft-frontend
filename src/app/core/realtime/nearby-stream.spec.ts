import { TestBed } from '@angular/core/testing';
import { firstValueFrom, take, toArray } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Session } from '../auth/session';
import { NearbyStream, RECONNECT_DELAY_MS } from './nearby-stream';

const QUERY = { latitude: 40.391, longitude: -3.629, radius: 3000, activities: ['PADEL', 'TENNIS'], withinHours: 3 };

/** fetch response whose body delivers the given chunks and then ends. */
const streamResponse = (chunks: string[], ok = true) => {
  const encoder = new TextEncoder();
  const queue = [...chunks];
  return {
    ok,
    status: ok ? 200 : 401,
    body: {
      getReader: () => ({
        read: async () =>
          queue.length ? { value: encoder.encode(queue.shift()), done: false } : { value: undefined, done: true },
      }),
    },
  };
};

describe('NearbyStream', () => {
  let stream: NearbyStream;
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockReset();
    TestBed.configureTestingModule({ providers: [{ provide: Session, useValue: { accessToken: async () => 'token-1' } }] });
    stream = TestBed.inject(NearbyStream);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('should open the stream with the token and emit only the published plans', async () => {
    const event = { planId: 'p1', activity: 'PADEL', startsAt: '2026-09-28T18:00:00Z', freeSpots: 2, distanceMeters: 603 };
    fetchMock.mockResolvedValue(
      streamResponse(['event:ready\ndata:ok\n\n:ping\n\n', `event:plan-published\ndata:${JSON.stringify(event)}\n\n`]),
    );

    const received = await firstValueFrom(stream.watch(QUERY).pipe(take(1)));

    expect(received).toEqual(event);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      `${environment.apiUrl}/api/v1/plans/nearby/stream?latitude=40.391&longitude=-3.629&radius=3000&withinHours=3&activity=PADEL&activity=TENNIS`,
    );
    expect(init.headers).toEqual({ Authorization: 'Bearer token-1', Accept: 'text/event-stream' });
  });

  it('should reconnect after the server closes the stream or fails', async () => {
    vi.useFakeTimers();
    fetchMock
      .mockResolvedValueOnce(streamResponse([], false))
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValue(streamResponse(['event:plan-published\ndata:{"planId":"p2"}\n\n']));

    const events = firstValueFrom(stream.watch(QUERY).pipe(take(1), toArray()));
    await vi.advanceTimersByTimeAsync(RECONNECT_DELAY_MS * 2 + 10);

    expect(await events).toEqual([{ planId: 'p2' }]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('should close the connection when unsubscribing', async () => {
    vi.useFakeTimers();
    fetchMock.mockResolvedValue(streamResponse([]));
    const subscription = stream.watch(QUERY).subscribe();
    await vi.advanceTimersByTimeAsync(0);
    subscription.unsubscribe();

    expect((fetchMock.mock.calls[0][1].signal as AbortSignal).aborted).toBe(true);
    await vi.advanceTimersByTimeAsync(RECONNECT_DELAY_MS * 3);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
