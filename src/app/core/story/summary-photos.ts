import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { MemoriesApi } from '@core/api/memories-api';

/** How many photos of the album the summary shows: the newest ones */
export const SUMMARY_PHOTOS = 3;
/** The summary does not wait longer than this for the album, nor for each photo */
export const SUMMARY_PHOTOS_TIMEOUT_MS = 8000;

/**
 * The photos of the album of a plan (HU-052) for its summary (HU-057): the newest ones, as the person asking sees
 * them (the same album, with their session), decoded and ready to draw.
 *
 * Each photo is downloaded as data (a request with CORS to the storage) and decoded from there, never drawn from an
 * `<img>` of another origin: that would taint the canvas and the card could not be exported. If the storage does not
 * let this origin read a photo, the request fails and the photo is left out.
 */
@Injectable({ providedIn: 'root' })
export class SummaryPhotos {
  private readonly api = inject(MemoriesApi);
  private readonly http = inject(HttpClient);

  /**
   * Never fails: the summary does not depend on the album. With no album (the service does not have it yet, the
   * person is not of the plan, an error, no answer in time) there are no photos; a photo that cannot be read is
   * left out.
   */
  async ofPlan(planId: string): Promise<ImageBitmap[]> {
    const photos = await Promise.all((await this.newest(planId)).map((url) => this.photo(url)));
    return photos.filter((photo): photo is ImageBitmap => photo !== null);
  }

  /** The links of the newest photos; the album comes newest first. */
  private async newest(planId: string): Promise<string[]> {
    try {
      const page = await firstValueFrom(
        this.api.page(planId, 0).pipe(timeout(SUMMARY_PHOTOS_TIMEOUT_MS)),
      );
      const items = Array.isArray(page?.items) ? page.items : [];
      return items.slice(0, SUMMARY_PHOTOS).map(({ url }) => url);
    } catch {
      return [];
    }
  }

  private async photo(url: string): Promise<ImageBitmap | null> {
    try {
      // No token goes with it: the storage is not the OneLeft API, and the link is already signed
      const file = await firstValueFrom(
        this.http.get(url, { responseType: 'blob' }).pipe(timeout(SUMMARY_PHOTOS_TIMEOUT_MS)),
      );
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      return null;
    }
  }
}
