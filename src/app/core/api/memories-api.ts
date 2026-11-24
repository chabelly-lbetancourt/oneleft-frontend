import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Memory, MemoryPage } from '@shared/model/memory';
import { PhotoUpload } from '@shared/model/photo';

/** Photos of a page of the album; the service takes up to 50 */
export const MEMORIES_PAGE_SIZE = 20;

/**
 * The album of a plan through the plans service (HU-052). As with the profile photos, the photo itself goes straight
 * to the storage with the signed link: that request carries no token, because the storage is not the OneLeft API.
 */
@Injectable({ providedIn: 'root' })
export class MemoriesApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/v1/plans`;

  /** A page of the album, newest first; pages start at 0. */
  page(planId: string, page: number): Observable<MemoryPage> {
    return this.http.get<MemoryPage>(this.url(planId), {
      params: { page, size: MEMORIES_PAGE_SIZE },
    });
  }

  startUpload(planId: string, contentType: string, size: number): Observable<PhotoUpload> {
    return this.http.post<PhotoUpload>(`${this.url(planId)}/uploads`, { contentType, size });
  }

  /** Uploads the photo with exactly the headers of the link; the events tell how much has gone. */
  upload(upload: PhotoUpload, photo: Blob): Observable<HttpEvent<void>> {
    return this.http.put<void>(upload.url, photo, {
      headers: upload.headers,
      observe: 'events',
      reportProgress: true,
    });
  }

  /** Adds the uploaded photo to the album. */
  confirm(planId: string, key: string): Observable<Memory> {
    return this.http.post<Memory>(this.url(planId), { key });
  }

  remove(planId: string, memoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.url(planId)}/${memoryId}`);
  }

  private url(planId: string): string {
    return `${this.base}/${planId}/memories`;
  }
}
