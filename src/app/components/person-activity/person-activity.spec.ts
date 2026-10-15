import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { PhotosApi } from '../../core/api/photos-api';
import { PlansApi } from '../../core/api/plans-api';
import { SocialApi } from '../../core/api/social-api';
import { PersonPhoto } from '../../shared/model/photo';
import { RecentPlan } from '../../shared/model/published-plan';
import { ConnectionPage } from '../../shared/model/social';
import { PersonActivity } from './person-activity';

const PLANS: RecentPlan[] = [
  {
    planId: 'p1',
    title: 'Rodaje suave por el parque',
    activity: 'RUNNING',
    startsAt: '2026-10-14T10:00:00Z',
    role: 'ORGANIZER',
  },
  {
    planId: 'p2',
    title: 'Pádel 2 contra 2',
    activity: 'PADEL',
    startsAt: '2026-10-12T18:00:00Z',
    role: 'ATTENDEE',
  },
];

const page = (names: string[], total = names.length, pageNumber = 0): ConnectionPage => ({
  items: names.map((name) => ({
    userId: name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''),
    name,
    status: 'ACCEPTED',
    since: '2026-10-10T10:00:00Z',
  })),
  page: pageNumber,
  size: 20,
  total,
});

describe('PersonActivity', () => {
  // The tabs of PrimeNG measure their list, and jsdom has no ResizeObserver
  beforeAll(() => {
    globalThis.ResizeObserver ??= class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as unknown as typeof ResizeObserver;
  });

  let fixture: ComponentFixture<PersonActivity>;
  const plansApi = { recentOf: vi.fn((): Observable<RecentPlan[]> => of(PLANS)) };
  const socialApi = {
    listOf: vi.fn((): Observable<ConnectionPage> => of(page(['Lucía', 'Diego']))),
  };
  const photosApi = {
    photosOf: vi.fn((): Observable<PersonPhoto[]> =>
      of([{ userId: 'lucia', url: 'http://storage.test/l.webp' }]),
    ),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async (visible: boolean) => {
    fixture = TestBed.createComponent(PersonActivity);
    fixture.componentRef.setInput('userId', 'ana');
    fixture.componentRef.setInput('name', 'Ana');
    fixture.componentRef.setInput('visible', visible);
    fixture.componentRef.setInput('followers', 2);
    fixture.componentRef.setInput('following', 0);
    await render();
  };
  const openTab = async (tab: string) => {
    element().querySelector<HTMLElement>(`.${tab}`)!.click();
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [PersonActivity, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: PlansApi, useValue: plansApi },
        { provide: SocialApi, useValue: socialApi },
        { provide: PhotosApi, useValue: photosApi },
      ],
    });
  });

  it('should say that a private profile I do not follow keeps its plans and network', async () => {
    await create(false);

    expect(element().querySelector('.private-activity')?.textContent).toContain(
      'El perfil de Ana es privado',
    );
    expect(element().querySelector('.activity-tabs')).toBeNull();
    expect(plansApi.recentOf).not.toHaveBeenCalled();
  });

  it('should show their last plans held: what, when and how they took part, never where', async () => {
    await create(true);

    expect(plansApi.recentOf).toHaveBeenCalledWith('ana');
    const plans = element().querySelectorAll('.recent-plan');
    expect(plans).toHaveLength(2);
    expect(plans[0].textContent).toContain('Rodaje suave por el parque');
    expect(plans[0].querySelector('.recent-plan__meta')?.textContent).toContain('Running');
    expect(plans[0].querySelector('.recent-plan__meta')?.textContent).toContain('14 oct');
    expect(plans[0].querySelector('.recent-plan__role')?.textContent).toContain('Organizó');
    expect(plans[1].querySelector('.recent-plan__role')?.textContent).toContain('Fue');
    expect(element().querySelector('.recent-plan a')).toBeNull();
  });

  it('should say when there are no plans yet, or they could not be loaded', async () => {
    plansApi.recentOf.mockReturnValueOnce(of([]));
    await create(true);
    expect(element().querySelector('.empty-plans')?.textContent).toContain('Aún no ha ido');

    plansApi.recentOf.mockReturnValueOnce(throwError(() => new Error('down')));
    await create(true);
    expect(element().querySelector('.activity-error')).not.toBeNull();
  });

  it('should load their followers when asked, with their photos in one request, and more', async () => {
    socialApi.listOf.mockReturnValueOnce(of(page(['Lucía', 'Diego'], 3)));
    await create(true);
    expect(socialApi.listOf).not.toHaveBeenCalled();

    await openTab('person-followers-tab');

    expect(socialApi.listOf).toHaveBeenCalledWith('ana', 'followers', 0);
    expect(photosApi.photosOf).toHaveBeenCalledExactlyOnceWith(['lucia', 'diego']);
    const people = element().querySelectorAll('.person-connection');
    expect(people).toHaveLength(2);
    expect(people[0].getAttribute('href')).toBe('/people/lucia');
    expect(people[0].querySelector('img')?.getAttribute('src')).toBe('http://storage.test/l.webp');
    expect(people[1].querySelector('img')).toBeNull();

    socialApi.listOf.mockReturnValueOnce(of(page(['Marta'], 3, 1)));
    element().querySelector<HTMLButtonElement>('.more-people button')!.click();
    await render();

    expect(socialApi.listOf).toHaveBeenLastCalledWith('ana', 'followers', 1);
    expect(element().querySelectorAll('.person-connection')).toHaveLength(3);
    expect(element().querySelector('.more-people')).toBeNull();
  });

  it('should say when nobody is followed, or the list could not be loaded', async () => {
    socialApi.listOf.mockReturnValueOnce(of(page([])));
    await create(true);
    await openTab('person-following-tab');
    expect(element().querySelector('.empty-following')?.textContent).toContain('no sigue a nadie');

    socialApi.listOf.mockReturnValueOnce(throwError(() => new Error('down')));
    await create(true);
    await openTab('person-followers-tab');
    expect(element().querySelector('.activity-error')).not.toBeNull();
  });
});
