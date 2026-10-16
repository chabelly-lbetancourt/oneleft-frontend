import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { PhotosApi } from './photos-api';

describe('PhotosApi', () => {
  const base = `${environment.apiUrl}/api/v1/users`;

  it('should call the users service and upload the photo straight to the signed link', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const api = TestBed.inject(PhotosApi);
    const http = TestBed.inject(HttpTestingController);

    api.startUpload('image/webp', 48_000).subscribe();
    const start = http.expectOne({ method: 'POST', url: `${base}/me/photo/uploads` });
    expect(start.request.body).toEqual({ contentType: 'image/webp', size: 48_000 });
    start.flush({});

    const photo = new Blob(['x'], { type: 'image/webp' });
    api
      .upload(
        {
          key: 'photos/me/1.webp',
          url: 'http://localhost:7070/oneleft-photos/photos/me/1.webp?X-Amz-Signature=s',
          method: 'PUT',
          headers: { 'Content-Type': 'image/webp' },
          expiresAt: '2026-10-14T10:05:00Z',
        },
        photo,
      )
      .subscribe();
    const upload = http.expectOne({
      method: 'PUT',
      url: 'http://localhost:7070/oneleft-photos/photos/me/1.webp?X-Amz-Signature=s',
    });
    expect(upload.request.body).toBe(photo);
    expect(upload.request.headers.get('Content-Type')).toBe('image/webp');
    upload.flush(null);

    api.confirm('photos/me/1.webp').subscribe();
    const confirm = http.expectOne({ method: 'PUT', url: `${base}/me/photo` });
    expect(confirm.request.body).toEqual({ key: 'photos/me/1.webp' });
    confirm.flush({});
    api.remove().subscribe();
    http.expectOne({ method: 'DELETE', url: `${base}/me/photo` }).flush(null);
    api.photosOf(['ana', 'lucia']).subscribe();
    http.expectOne(`${base}/photos?ids=ana,lucia`).flush([]);
    expect(api.photosUrl()).toBe(`${base}/photos`);
    http.verify();
  });
});
