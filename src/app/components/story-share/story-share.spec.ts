import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { translocoTesting } from '@testing/transloco-testing';
import { PlansApi } from '@core/api/plans-api';
import { Language } from '@core/i18n/language';
import { NativePlatform } from '@core/platform';
import { StoryCard } from '@core/story/story-card';
import { SummaryPhotos } from '@core/story/summary-photos';
import { Plan } from '@shared/model/published-plan';
import { clockTime } from '@shared/time/plan-time';
import { StoryKind, StoryShare } from './story-share';

const startsAt = new Date(Date.now() + 90 * 60_000);
const PLAN = {
  id: 'plan-1',
  organizerId: 'ana',
  organizerName: 'Ana',
  activity: 'PADEL',
  title: 'Pádel 2 contra 2',
  meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.39, longitude: -3.63 },
  startsAt: startsAt.toISOString(),
  spots: 3,
  occupied: 2,
  freeSpots: 1,
  status: 'OPEN',
  participants: [],
  waitlist: [],
} as unknown as Plan;

describe('StoryShare', () => {
  let fixture: ComponentFixture<StoryShare>;
  const image = new Blob(['png'], { type: 'image/png' });
  const stories = {
    create: vi.fn(() => Promise.resolve(image)),
    createSummary: vi.fn(() => Promise.resolve(image)),
  };
  /** The photos of the album, already decoded: none unless a test says otherwise */
  const photos = {
    ofPlan: vi.fn<(planId: string) => Promise<ImageBitmap[]>>(() => Promise.resolve([])),
  };
  const platform = { isNative: vi.fn(() => false), shareImage: vi.fn(() => Promise.resolve()) };
  const share = vi.fn(() => Promise.resolve());
  const writeText = vi.fn<(text: string) => Promise<void>>(() => Promise.resolve());
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async (plan: Plan = PLAN, kind?: StoryKind) => {
    fixture = TestBed.createComponent(StoryShare);
    fixture.componentRef.setInput('plan', plan);
    if (kind) {
      fixture.componentRef.setInput('kind', kind);
    }
    await render();
  };
  const click = async (selector: string) => {
    element().querySelector<HTMLButtonElement>(`${selector} button`)!.click();
    await render();
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    URL.createObjectURL = vi.fn(() => 'blob:card');
    URL.revokeObjectURL = vi.fn();
    // Defined, not assigned: another spec may have left them as read-only properties of the navigator
    for (const [name, value] of Object.entries({
      share,
      canShare: vi.fn(() => true),
      clipboard: { writeText },
    })) {
      Object.defineProperty(navigator, name, { value, configurable: true, writable: true });
    }
    TestBed.configureTestingModule({
      imports: [StoryShare, translocoTesting()],
      providers: [
        { provide: StoryCard, useValue: stories },
        { provide: SummaryPhotos, useValue: photos },
        { provide: NativePlatform, useValue: platform },
        {
          provide: PlansApi,
          useValue: { shareUrl: (id: string) => `https://oneleft.example.com/share/plans/${id}` },
        },
        { provide: Language, useValue: { locale: signal('es-ES') } },
      ],
    });
  });

  it('should make the card of the plan in the device and show it before sharing (HU-056)', async () => {
    await create();
    expect(element().querySelector('.story-preview')).toBeNull();

    await click('.story-create');

    const today = startsAt.toDateString() === new Date().toDateString();
    expect(stories.create).toHaveBeenCalledWith(
      {
        brand: 'OneLeft',
        missing: '¡Falta 1!',
        activity: 'Pádel',
        title: 'Pádel 2 contra 2',
        when: `${today ? 'Hoy' : 'Mañana'} · ${clockTime(startsAt, 'es-ES')}`,
        place: 'Pistas de la Albufera',
        scan: 'Escanea y apúntate',
        link: 'oneleft.example.com',
      },
      'https://oneleft.example.com/share/plans/plan-1',
    );
    const preview = element().querySelector<HTMLImageElement>('.story-preview')!;
    expect(preview.getAttribute('src')).toBe('blob:card');
    expect(preview.alt).toBe('Tarjeta de «Pádel 2 contra 2» para Stories');
  });

  it('should say how many are missing', async () => {
    await create({ ...PLAN, freeSpots: 3 });
    await click('.story-create');

    expect(stories.create).toHaveBeenCalledWith(
      expect.objectContaining({ missing: '¡Faltan 3!' }),
      expect.any(String),
    );
  });

  it('should share the card with the Web Share API, or offer to download it', async () => {
    await create();
    await click('.story-create');
    await click('.story-send');

    expect(share).toHaveBeenCalledWith({ files: [expect.any(File)], title: 'Pádel 2 contra 2' });
    const [{ files }] = share.mock.calls[0] as unknown as [{ files: File[] }];
    expect(files[0].name).toBe('oneleft-plan-1.png');
    expect(files[0].type).toBe('image/png');

    // A browser that cannot share files: only the download
    (navigator.canShare as ReturnType<typeof vi.fn>).mockReturnValue(false);
    await create();
    await click('.story-create');
    expect(element().querySelector('.story-send')).toBeNull();
    const download = element().querySelector<HTMLAnchorElement>('.story-download')!;
    expect(download.getAttribute('download')).toBe('oneleft-plan-1.png');
    expect(download.getAttribute('href')).toBe('blob:card');
  });

  it('should share the card with the share sheet of the Android app', async () => {
    platform.isNative.mockReturnValue(true);
    await create();
    await click('.story-create');
    await click('.story-send');

    expect(platform.shareImage).toHaveBeenCalledWith(
      image,
      'oneleft-plan-1.png',
      'Pádel 2 contra 2',
    );
    expect(share).not.toHaveBeenCalled();
    platform.isNative.mockReturnValue(false);
  });

  describe('summary of a finished plan (HU-057)', () => {
    const FINISHED = {
      ...PLAN,
      status: 'FINISHED',
      occupied: 3,
      freeSpots: 0,
      participants: [
        { userId: 'lucia', name: 'Lucía', joinedAt: startsAt.toISOString() },
        { userId: 'diego', name: 'Diego', joinedAt: startsAt.toISOString() },
        { userId: 'marta', name: 'Marta', joinedAt: startsAt.toISOString() },
      ],
    } as Plan;

    it('should make the summary in the device with the people, the activity and the place', async () => {
      await create(FINISHED, 'summary');
      expect(element().querySelector('.story-share__title')?.textContent).toContain(
        'Resumen del plan',
      );

      await click('.story-create');

      expect(stories.create).not.toHaveBeenCalled();
      expect(stories.createSummary).toHaveBeenCalledWith(
        {
          brand: 'OneLeft',
          headline: '¡Plan hecho!',
          activity: 'Pádel',
          title: 'Pádel 2 contra 2',
          people: '4',
          peopleLabel: 'personas',
          when: startsAt.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }),
          place: 'Pistas de la Albufera',
          link: 'oneleft.example.com',
        },
        [],
      );
      const preview = element().querySelector<HTMLImageElement>('.story-preview')!;
      expect(preview.getAttribute('src')).toBe('blob:card');
      expect(preview.alt).toBe('Resumen de «Pádel 2 contra 2» para Stories');
    });

    it('should say «persona» when the organizer was alone, and the name of an activity of their own', async () => {
      await create(
        { ...FINISHED, participants: [], activity: 'OTHER', activityOther: 'Petanca' },
        'summary',
      );
      await click('.story-create');

      expect(stories.createSummary).toHaveBeenCalledWith(
        expect.objectContaining({ people: '1', peopleLabel: 'persona', activity: 'Petanca' }),
        [],
      );
    });

    it('should put the newest photos of the album of the plan in the summary (HU-052)', async () => {
      const album = [{ width: 800, height: 600 }] as ImageBitmap[];
      photos.ofPlan.mockReturnValueOnce(Promise.resolve(album));
      await create(FINISHED, 'summary');
      expect(element().querySelector('.story-share .hint')?.textContent).toContain(
        'las últimas fotos de su álbum',
      );

      await click('.story-create');

      expect(photos.ofPlan).toHaveBeenCalledExactlyOnceWith('plan-1');
      expect(stories.createSummary).toHaveBeenCalledWith(expect.any(Object), album);
      expect(element().querySelector('.story-preview')).not.toBeNull();
    });

    it('should not ask for the album for the invitation to a plan', async () => {
      await create();
      await click('.story-create');

      expect(photos.ofPlan).not.toHaveBeenCalled();
    });

    it('should share the summary with the share sheet, under its own file name', async () => {
      await create(FINISHED, 'summary');
      await click('.story-create');
      await click('.story-send');

      const [{ files }] = share.mock.calls[0] as unknown as [{ files: File[] }];
      expect(files[0].name).toBe('oneleft-summary-plan-1.png');
      expect(files[0].type).toBe('image/png');

      platform.isNative.mockReturnValue(true);
      await create(FINISHED, 'summary');
      await click('.story-create');
      await click('.story-send');
      expect(platform.shareImage).toHaveBeenCalledWith(
        image,
        'oneleft-summary-plan-1.png',
        'Pádel 2 contra 2',
      );
      platform.isNative.mockReturnValue(false);
    });
  });

  describe('link sticker of Instagram (HU-058)', () => {
    const LINK = 'https://oneleft.example.com/share/plans/plan-1';
    const status = () => element().querySelector<HTMLElement>('.story-link__status')!;

    it('should show the link to the public page of the plan and how to add the sticker', async () => {
      await create();
      expect(element().querySelector('.story-link')).toBeNull();

      await click('.story-create');

      expect(element().querySelector('.story-link__url')?.textContent?.trim()).toBe(LINK);
      const steps = [...element().querySelectorAll('.story-link__steps li')].map((step) =>
        step.textContent?.trim(),
      );
      expect(steps).toEqual([
        'Copia el enlace del plan.',
        'Comparte o descarga la tarjeta y úsala en una Story de Instagram.',
        'En la Story, toca el icono de stickers y elige «Enlace».',
        'Pega el enlace, toca «Listo» y coloca el sticker donde quieras.',
      ]);
      const group = element().querySelector<HTMLElement>('.story-link')!;
      expect(group.getAttribute('role')).toBe('group');
      expect(
        document.getElementById(group.getAttribute('aria-labelledby')!)?.textContent,
      ).toContain('Enlace para el sticker de Instagram');
    });

    it('should copy the link of the plan and announce it', async () => {
      await create();
      await click('.story-create');
      expect(status().getAttribute('aria-live')).toBe('polite');
      expect(status().textContent?.trim()).toBe('');
      const copy = element().querySelector<HTMLButtonElement>('.story-copy button')!;
      expect(copy.textContent).toContain('Copiar el enlace');

      await click('.story-copy');

      expect(writeText).toHaveBeenCalledExactlyOnceWith(LINK);
      expect(status().textContent).toContain('Enlace copiado: pégalo en el sticker «Enlace».');
    });

    it('should say so when the link cannot be copied, and forget it when the card is closed', async () => {
      writeText.mockReturnValueOnce(Promise.reject(new Error('no permission')));
      await create();
      await click('.story-create');
      await click('.story-copy');
      expect(status().textContent).toContain('No se ha podido copiar el enlace');

      await click('.story-copy');
      expect(status().textContent).toContain('Enlace copiado');
      await click('.story-close');
      await click('.story-create');
      expect(status().textContent?.trim()).toBe('');
    });

    it('should not offer the link in the summary of a finished plan', async () => {
      await create({ ...PLAN, status: 'FINISHED', freeSpots: 0 } as Plan, 'summary');
      await click('.story-create');

      expect(element().querySelector('.story-preview')).not.toBeNull();
      expect(element().querySelector('.story-link')).toBeNull();
    });
  });

  it('should explain when the card cannot be made, and close it', async () => {
    stories.create.mockReturnValueOnce(Promise.reject(new Error('no canvas')));
    await create();
    await click('.story-create');
    expect(element().querySelector('.story-error')?.textContent).toContain(
      'No se ha podido crear la tarjeta',
    );

    await click('.story-create');
    await click('.story-close');
    expect(element().querySelector('.story-preview')).toBeNull();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:card');
  });
});
