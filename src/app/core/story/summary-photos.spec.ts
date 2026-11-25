import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { Memory } from '@shared/model/memory';
import { SUMMARY_PHOTOS, SUMMARY_PHOTOS_TIMEOUT_MS, SummaryPhotos } from './summary-photos';

describe('SummaryPhotos', () => {
  const album = `${environment.apiUrl}/api/v1/plans/p1/memories?page=0&size=20`;
  const link = (id: string) =>
    `http://localhost:7070/oneleft-photos/memories/${id}.webp?X-Amz-Signature=view`;
  const memory = (id: string): Memory => ({
    id,
    planId: 'p1',
    userId: 'ana',
    url: link(id),
    size: 1024,
    uploadedAt: new Date().toISOString(),
  });
  const page = (...ids: string[]) => ({
    items: ids.map(memory),
    page: 0,
    size: 20,
    total: ids.length,
  });
  const file = (name: string) => new Blob([name], { type: 'image/webp' });
  /** Decodes a file into a «bitmap» that remembers which file it came from */
  const decode = vi.fn((source: Blob) => Promise.resolve({ source } as unknown as ImageBitmap));
  let photos: SummaryPhotos;
  let http: HttpTestingController;
  /** Lets the promises between one request and the next run */
  const settle = () => new Promise((resolve) => setTimeout(resolve));

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('createImageBitmap', decode);
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    photos = TestBed.inject(SummaryPhotos);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('should give the newest photos of the album, downloaded as data and decoded', async () => {
    const result = photos.ofPlan('p1');
    http.expectOne({ method: 'GET', url: album }).flush(page('m5', 'm4', 'm3', 'm2', 'm1'));
    await settle();

    // Only the newest ones, and each one as a blob: an <img> of another origin would taint the canvas
    const files = ['m5', 'm4', 'm3'].map((id) => {
      const request = http.expectOne({ method: 'GET', url: link(id) });
      expect(request.request.responseType).toBe('blob');
      expect(request.request.headers.has('Authorization')).toBe(false);
      const body = file(id);
      request.flush(body);
      return body;
    });

    expect(files).toHaveLength(SUMMARY_PHOTOS);
    expect(await result).toEqual(files.map((source) => ({ source })));
    expect(decode).toHaveBeenCalledWith(files[0], { imageOrientation: 'from-image' });
  });

  it('should leave out a photo the storage does not let read (no CORS) or that is not an image', async () => {
    decode.mockImplementationOnce(() => Promise.reject(new Error('not an image')));
    const result = photos.ofPlan('p1');
    http.expectOne(album).flush(page('m3', 'm2', 'm1'));
    await settle();

    http.expectOne(link('m3')).flush(file('m3'));
    // What a browser gives when the answer has no CORS headers: a network error, status 0
    http.expectOne(link('m2')).error(new ProgressEvent('error'));
    const last = file('m1');
    http.expectOne(link('m1')).flush(last);

    expect(await result).toEqual([{ source: last }]);
  });

  it('should give no photos when the album is empty', async () => {
    const result = photos.ofPlan('p1');
    http.expectOne(album).flush(page());

    expect(await result).toEqual([]);
    expect(decode).not.toHaveBeenCalled();
  });

  it.each([
    ['the service does not have the album yet', 404],
    ['the person is not of the plan', 403],
    ['the service fails', 500],
  ])('should give no photos when %s', async (_case, status) => {
    const result = photos.ofPlan('p1');
    http.expectOne(album).flush(null, { status, statusText: 'Error' });

    expect(await result).toEqual([]);
  });

  it('should give no photos when the answer is not an album', async () => {
    const result = photos.ofPlan('p1');
    http.expectOne(album).flush(null, { status: 204, statusText: 'No Content' });

    expect(await result).toEqual([]);
  });

  it('should not wait for ever for the album', async () => {
    vi.useFakeTimers();
    const result = photos.ofPlan('p1');
    const request = http.expectOne(album);

    await vi.advanceTimersByTimeAsync(SUMMARY_PHOTOS_TIMEOUT_MS);

    expect(await result).toEqual([]);
    expect(request.cancelled).toBe(true);
  });
});
