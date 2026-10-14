/** Profile photos (HU-020): they go from the device to the storage with signed links. */

/** A link signed for one upload: a PUT of exactly this photo, with these headers, until it expires. */
export interface PhotoUpload {
  key: string;
  url: string;
  method: 'PUT';
  headers: Record<string, string>;
  expiresAt: string;
}

/** The photo of someone, seen through a link that expires in an hour. */
export interface PersonPhoto {
  userId: string;
  url: string;
}

/** Photos of the people of a list, by their id. */
export const photoMap = (photos: PersonPhoto[] | undefined): Map<string, string> =>
  new Map((photos ?? []).map(({ userId, url }) => [userId, url] as const));
