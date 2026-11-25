import { HttpEventType, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { MemoriesApi } from './memories-api';

describe('MemoriesApi', () => {
  const album = `${environment.apiUrl}/api/v1/plans/p1/memories`;
  const link = 'http://localhost:7070/oneleft-photos/memories/me/p1/1.webp?X-Amz-Signature=s';
  let api: MemoriesApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(MemoriesApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should ask the plans service for a page of the album', () => {
    api.page('p1', 2).subscribe();

    const request = http.expectOne(`${album}?page=2&size=20`);
    expect(request.request.method).toBe('GET');
    request.flush({ items: [], page: 2, size: 20, total: 0 });
  });

  it('should upload the photo straight to the signed link, with its headers, and tell its progress', () => {
    api.startUpload('p1', 'image/webp', 248_213).subscribe();
    const start = http.expectOne({ method: 'POST', url: `${album}/uploads` });
    expect(start.request.body).toEqual({ contentType: 'image/webp', size: 248_213 });
    start.flush({});

    const photo = new Blob(['x'], { type: 'image/webp' });
    const events: HttpEventType[] = [];
    api
      .upload(
        {
          key: 'memories/me/p1/1.webp',
          url: link,
          method: 'PUT',
          headers: { 'Content-Type': 'image/webp' },
          expiresAt: '2026-11-24T10:05:00Z',
        },
        photo,
      )
      .subscribe((event) => events.push(event.type));
    const upload = http.expectOne({ method: 'PUT', url: link });
    expect(upload.request.body).toBe(photo);
    expect(upload.request.headers.get('Content-Type')).toBe('image/webp');
    expect(upload.request.reportProgress).toBe(true);
    upload.event({ type: HttpEventType.UploadProgress, loaded: 1, total: 2 });
    upload.flush(null);
    expect(events).toEqual([
      HttpEventType.Sent,
      HttpEventType.UploadProgress,
      HttpEventType.Response,
    ]);
  });

  it('should add the uploaded photo to the album and remove one', () => {
    api.confirm('p1', 'memories/me/p1/1.webp').subscribe();
    const confirm = http.expectOne({ method: 'POST', url: album });
    expect(confirm.request.body).toEqual({ key: 'memories/me/p1/1.webp' });
    confirm.flush({});

    api.remove('p1', 'm1').subscribe();
    http.expectOne({ method: 'DELETE', url: `${album}/m1` }).flush(null);
  });
});
