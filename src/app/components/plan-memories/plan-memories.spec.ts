import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, of, Subject, throwError } from 'rxjs';
import { MemoriesApi } from '@core/api/memories-api';
import { Session } from '@core/auth/session';
import { Memory, MemoryPage } from '@shared/model/memory';
import { PhotoUpload } from '@shared/model/photo';
import { FakeSession } from '@testing/fake-session';
import { translocoTesting } from '@testing/transloco-testing';
import { PlanMemories } from './plan-memories';

const memory = (id: string, userId: string): Memory => ({
  id,
  planId: 'p1',
  userId,
  url: `http://storage.test/memories/${id}.webp`,
  size: 248_213,
  uploadedAt: '2026-11-21T18:05:00Z',
});
const pageOf = (items: Memory[], total = items.length, page = 0): MemoryPage => ({
  items,
  page,
  size: 20,
  total,
});
const LINK: PhotoUpload = {
  key: 'memories/me/p1/9.webp',
  url: 'http://storage.test/memories/me/p1/9.webp?X-Amz-Signature=s',
  method: 'PUT',
  headers: { 'Content-Type': 'image/webp' },
  expiresAt: '2026-11-24T10:05:00Z',
};
const problem = (status: number, code?: string) =>
  throwError(() => new HttpErrorResponse({ status, error: code ? { code } : null }));

describe('PlanMemories', () => {
  let fixture: ComponentFixture<PlanMemories>;
  let session: FakeSession;
  /** What the browser encodes from the chosen file */
  const photo = new Blob(['photo'], { type: 'image/webp' });
  const decode = vi.fn(async (file: File) => {
    if (file.name === 'broken.jpg') {
      throw new Error('cannot decode');
    }
    return { width: 4000, height: 3000, close: vi.fn() };
  });
  const api = {
    page: vi.fn((): Observable<MemoryPage | null> =>
      of(pageOf([memory('m1', 'me'), memory('m2', 'ana')])),
    ),
    startUpload: vi.fn((): Observable<PhotoUpload> => of(LINK)),
    upload: vi.fn((): Observable<HttpEvent<void>> => of(new HttpResponse<void>({ status: 200 }))),
    confirm: vi.fn((): Observable<Memory> => of(memory('m9', 'me'))),
    remove: vi.fn((): Observable<void> => of(undefined)),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  /** Lets the steps of an upload (decode, encode, the three requests) run, and shows what they left */
  const settle = async () => {
    await new Promise((resolve) => setTimeout(resolve));
    await render();
  };
  const create = async () => {
    fixture = TestBed.createComponent(PlanMemories);
    fixture.componentRef.setInput('planId', 'p1');
    fixture.componentRef.setInput('names', new Map([['ana', 'Ana']]));
    await render();
  };
  const tiles = () => [...element().querySelectorAll<HTMLElement>('.memory')];
  const outcome = () => element().querySelector<HTMLElement>('.plan-memories__outcome')!;
  const button = (selector: string) =>
    element().querySelector<HTMLButtonElement>(`${selector} button`)!;
  /** Chooses files as the picker does and waits for everything they set off */
  const choose = async (...names: string[]) => {
    const input = element().querySelector<HTMLInputElement>('.memories-file')!;
    Object.defineProperty(input, 'files', {
      configurable: true,
      value: names.map((name) => new File(['x'], name, { type: 'image/jpeg' })),
    });
    input.dispatchEvent(new Event('change'));
    await settle();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('createImageBitmap', decode);
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback) =>
      callback(photo),
    );
    session = new FakeSession();
    session.signIn('Me', 'me');
    TestBed.configureTestingModule({
      imports: [PlanMemories, translocoTesting()],
      providers: [
        { provide: MemoriesApi, useValue: api },
        { provide: Session, useValue: session },
      ],
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should show the album as a list of photos that say whose they are', async () => {
    await create();

    expect(api.page).toHaveBeenCalledWith('p1', 0);
    expect(element().querySelector('h2')?.textContent).toContain('Recuerdos');
    expect(element().querySelector('section')?.getAttribute('aria-labelledby')).toBe(
      element().querySelector('h2')?.id,
    );
    expect(element().querySelector('ul.plan-memories__grid')).not.toBeNull();
    const images = [...element().querySelectorAll<HTMLImageElement>('img.memory__photo')];
    expect(images.map((image) => image.getAttribute('src'))).toEqual([
      'http://storage.test/memories/m1.webp',
      'http://storage.test/memories/m2.webp',
    ]);
    expect(images.map((image) => image.getAttribute('loading'))).toEqual(['lazy', 'lazy']);
    expect(images[0].alt).toMatch(/^Foto que subiste el 21 de noviembre de 2026/);
    expect(images[1].alt).toMatch(/^Foto de Ana, subida el 21 de noviembre de 2026/);
    expect(tiles().map((tile) => tile.querySelector('.memory__who')?.textContent?.trim())).toEqual([
      'Tú',
      'Ana',
    ]);
    // Only my own photos can be removed
    expect(tiles()[0].querySelector('.memory__remove')).not.toBeNull();
    expect(tiles()[1].querySelector('.memory__remove')).toBeNull();
    expect(button('.memory__remove').getAttribute('aria-label')).toMatch(
      /^Quitar la foto que subiste el 21 de noviembre/,
    );
    expect(element().querySelector('.plan-memories__more')).toBeNull();
  });

  it('should say it is loading and then that the album is empty', async () => {
    const pages = new Subject<MemoryPage>();
    api.page.mockReturnValueOnce(pages);
    await create();

    expect(element().querySelector('[role="status"] .sr-only')?.textContent).toContain(
      'Cargando los recuerdos',
    );
    expect(element().querySelector('.plan-memories__add')).toBeNull();

    pages.next(pageOf([]));
    await render();

    expect(element().querySelector('app-empty-state')?.textContent).toContain(
      'Aún no hay fotos de este plan',
    );
    expect(element().querySelector('.plan-memories__add')?.textContent).toContain('Subir fotos');
  });

  it('should name a photo of someone who is no longer known and one whose link expired', async () => {
    api.page.mockReturnValueOnce(of(pageOf([memory('m3', 'gone')])));
    await create();

    const image = element().querySelector<HTMLImageElement>('img.memory__photo')!;
    expect(image.alt).toMatch(/^Foto de Alguien del plan, subida el/);

    image.dispatchEvent(new Event('error'));
    await render();

    expect(element().querySelector('img.memory__photo')).toBeNull();
    expect(element().querySelector('.memory__broken')?.textContent).toContain(
      'No se ha podido mostrar esta foto',
    );
  });

  it('should show no section when the service has no album or I am not of the plan', async () => {
    for (const answer of [problem(404), problem(403, 'plan.notParticipant'), of(null)]) {
      api.page.mockReturnValueOnce(answer);
      await create();

      expect(element().querySelector('.plan-memories')).toBeNull();
      expect(element().textContent?.trim()).toBe('');
    }
  });

  it('should say the album is not available when the storage does not answer, and try again', async () => {
    api.page.mockReturnValueOnce(problem(503, 'memory.unavailable'));
    await create();

    expect(element().querySelector('.plan-memories__unavailable')?.textContent).toContain(
      'Ahora mismo no se pueden ver los recuerdos de este plan',
    );
    expect(element().querySelector('.plan-memories__add')).toBeNull();

    button('.plan-memories__retry').click();
    await render();

    expect(api.page).toHaveBeenCalledTimes(2);
    expect(tiles()).toHaveLength(2);
  });

  it('should load more photos, skipping the ones already shown', async () => {
    api.page.mockReturnValueOnce(of(pageOf([memory('m1', 'me'), memory('m2', 'ana')], 3)));
    await create();

    expect(element().querySelector('.plan-memories__count')?.textContent).toContain('2 de 3 fotos');
    api.page.mockReturnValueOnce(of(pageOf([memory('m2', 'ana'), memory('m3', 'ana')], 3)));
    button('.plan-memories__more').click();
    await render();

    // Two shown: the page they would fill is asked again
    expect(api.page).toHaveBeenLastCalledWith('p1', 0);
    expect(tiles().map((tile) => tile.dataset['memory'])).toEqual(['m1', 'm2', 'm3']);
    expect(document.activeElement).toBe(tiles()[2]);
    expect(element().querySelector('.plan-memories__more')).toBeNull();
  });

  it('should stop offering more when a page brings nothing new, and say when it fails', async () => {
    api.page.mockReturnValueOnce(of(pageOf([memory('m1', 'me')], 5)));
    await create();
    api.page.mockReturnValueOnce(problem(500));
    button('.plan-memories__more').click();
    await render();

    expect(outcome().textContent).toContain('No se han podido cargar más fotos');
    expect(outcome().classList).toContain('alert--error');
    expect(tiles()).toHaveLength(1);

    api.page.mockReturnValueOnce(of(pageOf([memory('m1', 'me')], 5)));
    button('.plan-memories__more').click();
    await render();

    expect(outcome().textContent?.trim()).toBe('');
    expect(element().querySelector('.plan-memories__more')).toBeNull();
  });

  it('should make the photo smaller, upload it to the signed link and add it to the album', async () => {
    const events = new Subject<HttpEvent<void>>();
    api.upload.mockReturnValueOnce(events);
    await create();

    await choose('IMG_1.jpg');

    expect(decode).toHaveBeenCalledWith(expect.objectContaining({ name: 'IMG_1.jpg' }), {
      imageOrientation: 'from-image',
    });
    expect(api.startUpload).toHaveBeenCalledWith('p1', 'image/webp', photo.size);
    expect(api.upload).toHaveBeenCalledWith(LINK, photo);
    expect(api.confirm).not.toHaveBeenCalled();
    const progress = element().querySelector<HTMLProgressElement>('progress')!;
    expect(progress.closest('label')?.textContent).toContain('Subiendo la foto 1 de 1');
    expect(progress.value).toBe(0);

    events.next({ type: HttpEventType.UploadProgress, loaded: 1, total: 4 });
    await render();
    expect(element().querySelector<HTMLProgressElement>('progress')!.value).toBe(25);

    events.next(new HttpResponse<void>({ status: 200 }));
    events.complete();
    await settle();

    expect(api.confirm).toHaveBeenCalledWith('p1', LINK.key);
    expect(tiles().map((tile) => tile.dataset['memory'])).toEqual(['m9', 'm1', 'm2']);
    expect(element().querySelector('progress')).toBeNull();
    expect(outcome().getAttribute('role')).toBe('status');
    expect(outcome().textContent).toContain('Foto añadida al álbum.');
  });

  it('should upload several photos one after another', async () => {
    api.confirm
      .mockReturnValueOnce(of(memory('m8', 'me')))
      .mockReturnValueOnce(of(memory('m9', 'me')));
    await create();

    await choose('IMG_1.jpg', 'IMG_2.jpg');

    expect(api.confirm).toHaveBeenCalledTimes(2);
    expect(tiles().map((tile) => tile.dataset['memory'])).toEqual(['m9', 'm8', 'm1', 'm2']);
    expect(outcome().textContent).toContain('2 fotos añadidas al álbum.');
  });

  it('should say why a photo could not be uploaded, with the reason the service gives', async () => {
    await create();

    await choose('broken.jpg');
    expect(outcome().textContent).toContain('Ese archivo no es una imagen que se pueda leer');
    expect(api.startUpload).not.toHaveBeenCalled();

    api.startUpload.mockReturnValueOnce(problem(409, 'memory.personLimit'));
    await choose('IMG_1.jpg', 'IMG_2.jpg');
    expect(outcome().textContent).toContain('Ya has subido 10 fotos a este plan');
    // The first failure stops the rest
    expect(api.startUpload).toHaveBeenCalledTimes(1);

    // The storage itself refuses the photo: it has no code
    api.upload.mockReturnValueOnce(problem(403));
    await choose('IMG_1.jpg');
    expect(outcome().textContent).toContain('No se ha podido subir la foto');
    expect(api.confirm).not.toHaveBeenCalled();

    api.confirm.mockReturnValueOnce(problem(503, 'memory.unavailable'));
    await choose('IMG_1.jpg');
    expect(outcome().textContent).toContain('Ahora mismo no se pueden guardar ni quitar fotos');
    expect(tiles()).toHaveLength(2);
    expect(element().querySelector('progress')).toBeNull();
  });

  it('should do nothing when the picker is closed without a file', async () => {
    await create();

    await choose();

    expect(decode).not.toHaveBeenCalled();
    expect(outcome().textContent?.trim()).toBe('');
  });

  it('should remove a photo of mine only after confirming, and say so', async () => {
    await create();

    button('.memory__remove').click();
    await render();

    expect(api.remove).not.toHaveBeenCalled();
    const confirm = tiles()[0].querySelector<HTMLElement>('.memory__confirm')!;
    expect(confirm.getAttribute('role')).toBe('group');
    expect(confirm.getAttribute('aria-label')).toBe('¿Quitar esta foto del álbum?');
    expect(document.activeElement).toBe(button('.memory__remove-yes'));

    button('.memory__remove-cancel').click();
    await render();

    expect(element().querySelector('.memory__confirm')).toBeNull();
    expect(document.activeElement).toBe(button('.memory__remove'));

    button('.memory__remove').click();
    await render();
    button('.memory__remove-yes').click();
    await render();

    expect(api.remove).toHaveBeenCalledWith('p1', 'm1');
    expect(tiles().map((tile) => tile.dataset['memory'])).toEqual(['m2']);
    expect(outcome().textContent).toContain('Has quitado la foto del álbum.');
    expect(document.activeElement).toBe(outcome());
  });

  it('should say why a photo could not be removed and keep it', async () => {
    await create();
    api.remove.mockReturnValueOnce(problem(403, 'memory.notYours'));

    button('.memory__remove').click();
    await render();
    button('.memory__remove-yes').click();
    await render();

    expect(outcome().textContent).toContain('Solo puedes quitar las fotos que subiste tú');
    expect(tiles()).toHaveLength(2);
    expect(element().querySelector('.memory__confirm')).toBeNull();
  });

  it('should translate every problem of the album in both languages', () => {
    const codes = [
      'planNotFinished',
      'personLimit',
      'planLimit',
      'format',
      'empty',
      'tooBig',
      'key',
      'notUploaded',
      'notAPhoto',
      'notFound',
      'notYours',
      'unavailable',
    ];
    const transloco = TestBed.inject(TranslocoService);
    for (const lang of ['es', 'en']) {
      const translated = Object.keys(transloco.getTranslation(lang))
        .filter((key) => key.startsWith('errors.memory.'))
        .map((key) => key.replace('errors.memory.', ''));
      expect(translated.sort()).toEqual([...codes].sort());
    }
  });

  it('should show the album of another plan when the plan changes', async () => {
    await create();
    api.page.mockReturnValueOnce(of(pageOf([memory('m7', 'ana')])));

    fixture.componentRef.setInput('planId', 'p2');
    await render();

    expect(api.page).toHaveBeenLastCalledWith('p2', 0);
    expect(tiles().map((tile) => tile.dataset['memory'])).toEqual(['m7']);
  });
});
