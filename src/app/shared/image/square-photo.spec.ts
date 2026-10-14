import { centeredSquare, MAX_ORIGINAL_BYTES, PhotoFileError, squarePhoto } from './square-photo';

describe('squarePhoto', () => {
  let drawn: unknown[];
  let encoded: string[];
  let webp: boolean;

  beforeEach(() => {
    drawn = [];
    encoded = [];
    webp = true;
    vi.stubGlobal(
      'createImageBitmap',
      vi.fn(async (file: File) => {
        if (file.name === 'broken.jpg') {
          throw new Error('cannot decode');
        }
        return { width: 4032, height: 3024, close: vi.fn() };
      }),
    );
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: (...args: unknown[]) => drawn.push(...args),
    } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (
      this: HTMLCanvasElement,
      callback: BlobCallback,
      type?: string,
    ) {
      encoded.push(`${type} ${this.width}x${this.height}`);
      // A browser that cannot encode WebP gives a PNG instead
      callback(new Blob(['photo'], { type: type === 'image/webp' && !webp ? 'image/png' : type }));
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  const file = (name: string, type: string, size = 2_000_000) => {
    const photo = new File(['x'], name, { type });
    Object.defineProperty(photo, 'size', { value: size });
    return photo;
  };

  it('should take the biggest square in the centre', () => {
    expect(centeredSquare(4032, 3024)).toEqual({ x: 504, y: 0, side: 3024 });
    expect(centeredSquare(300, 500)).toEqual({ x: 0, y: 100, side: 300 });
  });

  it('should crop the centre of a phone photo to 512 px and encode it as WebP', async () => {
    const photo = await squarePhoto(file('IMG_1234.jpg', 'image/jpeg'));

    expect(photo.type).toBe('image/webp');
    expect(drawn.slice(1)).toEqual([504, 0, 3024, 3024, 0, 0, 512, 512]);
    expect(encoded).toEqual(['image/webp 512x512']);
    expect(createImageBitmap).toHaveBeenCalledWith(expect.any(File), {
      imageOrientation: 'from-image',
    });
  });

  it('should use JPEG where the browser cannot encode WebP', async () => {
    webp = false;

    const photo = await squarePhoto(file('IMG_1234.png', 'image/png'));

    expect(photo.type).toBe('image/jpeg');
    expect(encoded).toEqual(['image/webp 512x512', 'image/jpeg 512x512']);
  });

  it('should refuse what is not a photo that can be read, or too big', async () => {
    await expect(squarePhoto(file('notes.pdf', 'application/pdf'))).rejects.toEqual(
      new PhotoFileError('notImage'),
    );
    await expect(squarePhoto(file('broken.jpg', 'image/jpeg'))).rejects.toEqual(
      new PhotoFileError('notImage'),
    );
    await expect(
      squarePhoto(file('huge.jpg', 'image/jpeg', MAX_ORIGINAL_BYTES + 1)),
    ).rejects.toHaveProperty('problem', 'tooBig');
  });
});
