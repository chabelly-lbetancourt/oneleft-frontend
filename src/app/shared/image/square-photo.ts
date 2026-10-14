/**
 * The profile photo is prepared in the browser before it is uploaded (HU-020): a square cut from the centre, at most
 * 512 px, as WebP (about 50 KB) or, where the browser cannot encode WebP, as JPEG. The original never leaves the
 * device.
 */
export const PHOTO_SIDE = 512;
/** Bigger than any phone photo: beyond that it is not a photo to read here */
export const MAX_ORIGINAL_BYTES = 20 * 1024 * 1024;
const QUALITY = 0.85;

export type PhotoProblem = 'notImage' | 'tooBig';

/** Why a file cannot become a profile photo. */
export class PhotoFileError extends Error {
  constructor(readonly problem: PhotoProblem) {
    super(`The file cannot be a profile photo: ${problem}`);
  }
}

/** The biggest square in the centre of an image. */
export const centeredSquare = (width: number, height: number) => {
  const side = Math.min(width, height);
  return { x: Math.floor((width - side) / 2), y: Math.floor((height - side) / 2), side };
};

const encode = (canvas: HTMLCanvasElement, type: string): Promise<Blob | null> =>
  new Promise((resolve) => canvas.toBlob(resolve, type, QUALITY));

/** The square photo ready to upload; it keeps the orientation the camera wrote in the file. */
export const squarePhoto = async (file: File): Promise<Blob> => {
  // Some pickers give no type: then decoding the file decides
  if (file.type && !file.type.startsWith('image/')) {
    throw new PhotoFileError('notImage');
  }
  if (file.size > MAX_ORIGINAL_BYTES) {
    throw new PhotoFileError('tooBig');
  }
  const image = await createImageBitmap(file, { imageOrientation: 'from-image' }).catch(() => {
    throw new PhotoFileError('notImage');
  });
  const { x, y, side } = centeredSquare(image.width, image.height);
  const target = Math.min(side, PHOTO_SIDE);
  const canvas = document.createElement('canvas');
  canvas.width = target;
  canvas.height = target;
  canvas.getContext('2d')!.drawImage(image, x, y, side, side, 0, 0, target, target);
  image.close();
  const webp = await encode(canvas, 'image/webp');
  const photo = webp?.type === 'image/webp' ? webp : await encode(canvas, 'image/jpeg');
  if (!photo) {
    throw new PhotoFileError('notImage');
  }
  return photo;
};
