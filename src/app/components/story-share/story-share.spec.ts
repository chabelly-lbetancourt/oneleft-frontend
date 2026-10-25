import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { translocoTesting } from '@testing/transloco-testing';
import { PlansApi } from '@core/api/plans-api';
import { Language } from '@core/i18n/language';
import { NativePlatform } from '@core/platform';
import { StoryCard } from '@core/story/story-card';
import { Plan } from '@shared/model/published-plan';
import { clockTime } from '@shared/time/plan-time';
import { StoryShare } from './story-share';

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
  const stories = { create: vi.fn(() => Promise.resolve(image)) };
  const platform = { isNative: vi.fn(() => false), shareImage: vi.fn(() => Promise.resolve()) };
  const share = vi.fn(() => Promise.resolve());
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async (plan: Plan = PLAN) => {
    fixture = TestBed.createComponent(StoryShare);
    fixture.componentRef.setInput('plan', plan);
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
    Object.assign(navigator, { share, canShare: vi.fn(() => true) });
    TestBed.configureTestingModule({
      imports: [StoryShare, translocoTesting()],
      providers: [
        { provide: StoryCard, useValue: stories },
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
