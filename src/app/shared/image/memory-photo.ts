import { encodePhoto, PhotoFileError, readPhoto } from './square-photo';

/**
 * A photo of the album of a plan (HU-052) is prepared in the browser before it is uploaded: whole (not cropped), its
 * longest side at most 1600 px, as WebP or JPEG and never above the 2 MiB the service takes. The original never
 * leaves the device.
 */
export const MAX_MEMORY_BYTES = 2 * 1024 * 1024;
/** Longest side, from the best to the smallest worth keeping: the first one that fits in the limit is used */
export const MEMORY_SIDES = [1600, 1280, 960, 720] as const;

/** The size of an image made to fit in a square of that side, never enlarged. */
export const fitWithin = (width: number, height: number, side: number) => {
  const scale = Math.min(1, side / Math.max(width, height));
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
};

const draw = (image: ImageBitmap, side: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const { width, height } = fitWithin(image.width, image.height, side);
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d')!.drawImage(image, 0, 0, width, height);
  return canvas;
};

/**
 * The photo ready to upload to the album.
 *
 * @throws PhotoFileError if the file is not a photo that can be read, or it cannot be made small enough
 */
export const memoryPhoto = async (file: File): Promise<Blob> => {
  const image = await readPhoto(file);
  try {
    for (const side of MEMORY_SIDES) {
      const photo = await encodePhoto(draw(image, side));
      if (photo.size <= MAX_MEMORY_BYTES) {
        return photo;
      }
    }
  } finally {
    image.close();
  }
  throw new PhotoFileError('tooBig');
};
