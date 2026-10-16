import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PersonPhoto, PhotoUpload } from '@shared/model/photo';

/**
 * Profile photos through the users service (HU-020). The photo itself goes straight to the storage with the signed
 * link: that request carries no token, because the storage is not the OneLeft API.
 */
@Injectable({ providedIn: 'root' })
export class PhotosApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/v1/users`;

  startUpload(contentType: string, size: number): Observable<PhotoUpload> {
    return this.http.post<PhotoUpload>(`${this.base}/me/photo/uploads`, { contentType, size });
  }

  upload(upload: PhotoUpload, photo: Blob): Observable<void> {
    return this.http.put<void>(upload.url, photo, { headers: upload.headers });
  }

  /** Makes the uploaded photo mine, replacing the previous one. */
  confirm(key: string): Observable<PersonPhoto> {
    return this.http.put<PersonPhoto>(`${this.base}/me/photo`, { key });
  }

  remove(): Observable<void> {
    return this.http.delete<void>(`${this.base}/me/photo`);
  }

  photosOf(userIds: string[]): Observable<PersonPhoto[]> {
    return this.http.get<PersonPhoto[]>(this.photosUrl(), { params: { ids: userIds.join(',') } });
  }

  /** URL of the photos of several people (1 to 50), for the lists. */
  photosUrl(): string {
    return `${this.base}/photos`;
  }
}
