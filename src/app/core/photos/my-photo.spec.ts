import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FakeSession } from '@testing/fake-session';
import { PhotosApi } from '@core/api/photos-api';
import { Session } from '@core/auth/session';
import { MyPhoto } from './my-photo';

describe('MyPhoto', () => {
  const upload = {
    key: 'photos/me/2.webp',
    url: 'http://storage.test/photos/me/2.webp?upload',
    method: 'PUT' as const,
    headers: { 'Content-Type': 'image/webp' },
    expiresAt: '2026-10-14T10:05:00Z',
  };
  let api: {
    photosOf: ReturnType<typeof vi.fn>;
    startUpload: ReturnType<typeof vi.fn>;
    upload: ReturnType<typeof vi.fn>;
    confirm: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };
  let session: FakeSession;

  const create = () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PhotosApi, useValue: api },
        { provide: Session, useValue: session },
      ],
    });
    const photo = TestBed.inject(MyPhoto);
    TestBed.tick();
    return photo;
  };

  beforeEach(() => {
    api = {
      photosOf: vi.fn(() =>
        of([{ userId: 'me', url: 'http://storage.test/photos/me/1.webp?view' }]),
      ),
      startUpload: vi.fn(() => of(upload)),
      upload: vi.fn(() => of(undefined)),
      confirm: vi.fn(() => of({ userId: 'me', url: 'http://storage.test/photos/me/2.webp?view' })),
      remove: vi.fn(() => of(undefined)),
    };
    session = new FakeSession();
    vi.stubGlobal(
      'createImageBitmap',
      vi.fn(async () => ({ width: 800, height: 600, close: vi.fn() })),
    );
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback, type) =>
      callback(new Blob(['small photo'], { type })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should have no photo without a session', () => {
    const photo = create();

    expect(photo.url()).toBeNull();
    expect(api.photosOf).not.toHaveBeenCalled();
  });

  it('should read my photo when I sign in, and forget it when I sign out', () => {
    session.signIn('Lucía', 'me');
    const photo = create();

    expect(api.photosOf).toHaveBeenCalledWith(['me']);
    expect(photo.url()).toContain('/photos/me/1.webp');

    session.authenticated.set(false);
    TestBed.tick();
    expect(photo.url()).toBeNull();
  });

  it('should keep the initials if my photo cannot be read', () => {
    api.photosOf.mockReturnValue(throwError(() => new Error('down')));
    session.signIn('Lucía', 'me');

    expect(create().url()).toBeNull();
  });

  it('should upload the cropped photo straight to the storage and then make it mine', async () => {
    session.signIn('Lucía', 'me');
    const photo = create();

    await photo.change(new File(['original'], 'IMG_1.jpg', { type: 'image/jpeg' }));

    const blob = api.upload.mock.calls[0][1] as Blob;
    expect(api.startUpload).toHaveBeenCalledWith('image/webp', blob.size);
    expect(api.upload).toHaveBeenCalledWith(upload, blob);
    expect(api.confirm).toHaveBeenCalledWith('photos/me/2.webp');
    expect(photo.url()).toContain('/photos/me/2.webp');
  });

  it('should not ask for a link when the file is not a photo', async () => {
    const photo = create();

    await expect(
      photo.change(new File(['%PDF'], 'notes.pdf', { type: 'application/pdf' })),
    ).rejects.toHaveProperty('problem', 'notImage');
    expect(api.startUpload).not.toHaveBeenCalled();
  });

  it('should remove my photo', async () => {
    session.signIn('Lucía', 'me');
    const photo = create();

    await photo.remove();

    expect(api.remove).toHaveBeenCalled();
    expect(photo.url()).toBeNull();
  });
});
