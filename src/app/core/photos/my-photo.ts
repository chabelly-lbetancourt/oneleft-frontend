import { effect, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PhotosApi } from '../api/photos-api';
import { Session } from '../auth/session';
import { squarePhoto } from '../../shared/image/square-photo';

/**
 * My profile photo (HU-020), the same one in the header and in my profile. Changing it crops and resizes the photo
 * in the browser, uploads it straight to the storage with a signed link and then makes it mine.
 */
@Injectable({ providedIn: 'root' })
export class MyPhoto {
  private readonly api = inject(PhotosApi);
  private readonly session = inject(Session);

  /** Signed link to my photo, or null if I have none (or it could not be read) */
  readonly url = signal<string | null>(null);

  constructor() {
    effect(() => {
      const userId = this.session.isAuthenticated() ? this.session.userId() : null;
      if (!userId) {
        this.url.set(null);
        return;
      }
      this.api.photosOf([userId]).subscribe({
        next: (photos) => this.url.set(photos[0]?.url ?? null),
        error: () => this.url.set(null),
      });
    });
  }

  /** @throws PhotoFileError if the file is not a photo that can be read, or an HTTP error */
  async change(file: File): Promise<void> {
    const photo = await squarePhoto(file);
    const upload = await firstValueFrom(this.api.startUpload(photo.type, photo.size));
    await firstValueFrom(this.api.upload(upload, photo));
    const mine = await firstValueFrom(this.api.confirm(upload.key));
    this.url.set(mine.url);
  }

  async remove(): Promise<void> {
    await firstValueFrom(this.api.remove());
    this.url.set(null);
  }
}
