import { fitWithin, MAX_MEMORY_BYTES, memoryPhoto } from './memory-photo';
import { MAX_ORIGINAL_BYTES, PhotoFileError } from './square-photo';

describe('memoryPhoto', () => {
  let drawn: unknown[];
  let encoded: string[];
  let webp: boolean;
  /** Bytes of the photo encoded at each width */
  let sizeAt: (width: number) => number;
  const close = vi.fn();

  beforeEach(() => {
    drawn = [];
    encoded = [];
    webp = true;
    sizeAt = () => 300_000;
    close.mockClear();
    vi.stubGlobal(
      'createImageBitmap',
      vi.fn(async (file: File) => {
        if (file.name === 'broken.jpg') {
          throw new Error('cannot decode');
        }
        return { width: 4000, height: 3000, close };
      }),
    );
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: (...args: unknown[]) => drawn.push(args.slice(1)),
    } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (
      this: HTMLCanvasElement,
      callback: BlobCallback,
      type?: string,
    ) {
      encoded.push(`${type} ${this.width}x${this.height}`);
      // A browser that cannot encode WebP gives a PNG instead
      const photo = new Blob(['x'], { type: type === 'image/webp' && !webp ? 'image/png' : type });
      Object.defineProperty(photo, 'size', { value: sizeAt(this.width) });
      callback(photo);
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  const file = (name: string, type: string, size = 5_000_000) => {
    const photo = new File(['x'], name, { type });
    Object.defineProperty(photo, 'size', { value: size });
    return photo;
  };

  it('should fit an image within a side without cropping nor enlarging it', () => {
    expect(fitWithin(4000, 3000, 1600)).toEqual({ width: 1600, height: 1200 });
    expect(fitWithin(3000, 4000, 1600)).toEqual({ width: 1200, height: 1600 });
    expect(fitWithin(800, 600, 1600)).toEqual({ width: 800, height: 600 });
  });

  it('should keep the whole photo, at most 1600 px, as WebP', async () => {
    const photo = await memoryPhoto(file('IMG_1234.jpg', 'image/jpeg'));

    expect(photo.type).toBe('image/webp');
    expect(drawn).toEqual([[0, 0, 1600, 1200]]);
    expect(encoded).toEqual(['image/webp 1600x1200']);
    expect(close).toHaveBeenCalled();
  });

  it('should use JPEG where the browser cannot encode WebP', async () => {
    webp = false;

    const photo = await memoryPhoto(file('IMG_1234.png', 'image/png'));

    expect(photo.type).toBe('image/jpeg');
    expect(encoded).toEqual(['image/webp 1600x1200', 'image/jpeg 1600x1200']);
  });

  it('should make the photo smaller until it fits in 2 MiB', async () => {
    sizeAt = (width) => (width > 960 ? MAX_MEMORY_BYTES + 1 : MAX_MEMORY_BYTES);

    const photo = await memoryPhoto(file('IMG_1234.jpg', 'image/jpeg'));

    expect(photo.size).toBe(MAX_MEMORY_BYTES);
    expect(encoded).toEqual(['image/webp 1600x1200', 'image/webp 1280x960', 'image/webp 960x720']);
  });

  it('should refuse what is not a photo that can be read, or cannot be made small enough', async () => {
    await expect(memoryPhoto(file('notes.pdf', 'application/pdf'))).rejects.toEqual(
      new PhotoFileError('notImage'),
    );
    await expect(memoryPhoto(file('broken.jpg', 'image/jpeg'))).rejects.toEqual(
      new PhotoFileError('notImage'),
    );
    await expect(
      memoryPhoto(file('huge.jpg', 'image/jpeg', MAX_ORIGINAL_BYTES + 1)),
    ).rejects.toHaveProperty('problem', 'tooBig');
    sizeAt = () => MAX_MEMORY_BYTES + 1;
    await expect(memoryPhoto(file('noise.png', 'image/png'))).rejects.toHaveProperty(
      'problem',
      'tooBig',
    );
    expect(close).toHaveBeenCalledTimes(1);
  });
});
