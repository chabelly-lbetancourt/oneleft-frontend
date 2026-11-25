/** Memories of a plan (HU-052): the album its organizer and its participants share once it is over. */

/** A photo of the album, seen through a link that expires in an hour. */
export interface Memory {
  id: string;
  planId: string;
  /** Who uploaded it: only they can remove it */
  userId: string;
  url: string;
  /** Bytes */
  size: number;
  uploadedAt: string;
}

/** A page of the album, newest first. */
export interface MemoryPage {
  items: Memory[];
  page: number;
  size: number;
  total: number;
}
