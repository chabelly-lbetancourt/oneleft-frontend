import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ChatEvent } from '../../shared/model/chat';
import { Session } from '../auth/session';
import { CHAT_PROTOCOL, ChatSocket, chatSocketUrl, RECONNECT_BASE_MS } from './chat-socket';

/** A WebSocket that the test opens, fills and closes. */
class FakeWebSocket {
  static readonly OPEN = 1;
  static created: FakeWebSocket[] = [];
  readyState = 0;
  readonly sent: string[] = [];
  closedWith: number | null = null;
  onopen: (() => void) | null = null;
  onmessage: ((message: { data: string }) => void) | null = null;
  onclose: ((closed: { code: number }) => void) | null = null;

  constructor(
    readonly url: string,
    readonly protocols: string[],
  ) {
    FakeWebSocket.created.push(this);
  }

  send(data: string): void {
    this.sent.push(data);
  }

  close(code: number): void {
    this.closedWith = code;
  }

  opened(): void {
    this.readyState = FakeWebSocket.OPEN;
    this.onopen?.();
  }

  receive(payload: unknown): void {
    this.onmessage?.({ data: typeof payload === 'string' ? payload : JSON.stringify(payload) });
  }

  serverCloses(code: number): void {
    this.readyState = 3;
    this.onclose?.({ code });
  }
}

describe('ChatSocket', () => {
  let socket: ChatSocket;
  const flush = () => new Promise((resolve) => setTimeout(resolve));

  beforeEach(() => {
    FakeWebSocket.created = [];
    vi.stubGlobal('WebSocket', FakeWebSocket);
    TestBed.configureTestingModule({
      providers: [
        { provide: Session, useValue: { accessToken: () => Promise.resolve('the.token') } },
      ],
    });
    socket = TestBed.inject(ChatSocket);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('should connect through the gateway with the token as a subprotocol and pass on what arrives', async () => {
    const events: ChatEvent[] = [];
    const connection = socket.open('plan 1');
    const subscription = connection.events.subscribe((event) => events.push(event));
    await flush();

    const ws = FakeWebSocket.created[0];
    expect(ws.url).toBe(`${environment.apiUrl.replace(/^http/, 'ws')}/ws/chat?planId=plan%201`);
    expect(chatSocketUrl('p')).toMatch(/^wss?:\/\/.+\/ws\/chat\?planId=p$/);
    expect(ws.protocols).toEqual([CHAT_PROTOCOL, 'the.token']);
    expect(connection.send('Hi')).toBe(false);

    ws.opened();
    ws.receive({ type: 'ready', open: true, endsAt: '2026-10-12T21:00:00Z' });
    ws.receive('not json');
    expect(connection.send('Hi')).toBe(true);
    expect(ws.sent).toEqual(['{"text":"Hi"}']);
    expect(events.map(({ type }) => type)).toEqual(['connecting', 'ready']);

    subscription.unsubscribe();
    expect(ws.closedWith).toBe(1000);
  });

  it('should reconnect with growing waits and stop when the chat closes it for good', async () => {
    vi.useFakeTimers();
    const events: ChatEvent[] = [];
    socket.open('plan-1').events.subscribe((event) => events.push(event));
    await vi.advanceTimersByTimeAsync(0);

    FakeWebSocket.created[0].serverCloses(1006);
    await vi.advanceTimersByTimeAsync(RECONNECT_BASE_MS - 1);
    expect(FakeWebSocket.created).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(FakeWebSocket.created).toHaveLength(2);

    FakeWebSocket.created[1].serverCloses(1011);
    await vi.advanceTimersByTimeAsync(2 * RECONNECT_BASE_MS);
    expect(FakeWebSocket.created).toHaveLength(3);

    FakeWebSocket.created[2].serverCloses(4403);
    await vi.advanceTimersByTimeAsync(60_000);
    expect(FakeWebSocket.created).toHaveLength(3);
    expect(events.at(-1)).toEqual({ type: 'closed', code: 'chat.notMember' });
  });
});
