import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { PhotosApi } from '../../core/api/photos-api';
import { PlansApi } from '../../core/api/plans-api';
import { ReputationApi } from '../../core/api/reputation-api';
import { SocialApi } from '../../core/api/social-api';
import { UsersApi } from '../../core/api/users-api';
import { PersonPhoto } from '../../shared/model/photo';
import { PublicProfile } from '../../shared/model/profile';
import { Connection, ConnectionPage, SocialPerson } from '../../shared/model/social';
import { PersonPage } from './person-page';

const ANA: SocialPerson = {
  userId: 'ana',
  name: 'Ana Pruebas',
  visibility: 'PRIVATE',
  followers: 3,
  following: 1,
  relation: 'NONE',
  followsMe: false,
  activityVisible: false,
};

describe('PersonPage', () => {
  // The tabs of PrimeNG measure their list, and jsdom has no ResizeObserver
  beforeAll(() => {
    globalThis.ResizeObserver ??= class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as unknown as typeof ResizeObserver;
  });

  let fixture: ComponentFixture<PersonPage>;
  const api = {
    person: vi.fn((): Observable<SocialPerson> => of(ANA)),
    follow: vi.fn((): Observable<Connection> => of({} as Connection)),
    unfollow: vi.fn((): Observable<void> => of(undefined)),
    listOf: vi.fn((): Observable<ConnectionPage> => of({ items: [], page: 0, size: 20, total: 0 })),
  };
  const photosApi = { photosOf: vi.fn((): Observable<PersonPhoto[]> => of([])) };
  const usersApi = {
    profileOf: vi.fn((): Observable<PublicProfile> =>
      of({
        userId: 'ana',
        displayName: 'Ana',
        bio: 'Corro los domingos',
        zoneName: 'Vallecas',
        hobbies: [{ activity: 'PADEL', level: 'INTERMEDIATE' }],
      }),
    ),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async (person: SocialPerson | Error = ANA) => {
    api.person.mockReturnValue(person instanceof Error ? throwError(() => person) : of(person));
    fixture = TestBed.createComponent(PersonPage);
    fixture.componentRef.setInput('id', 'ana');
    await render();
  };
  const click = async (selector: string) => {
    element().querySelector<HTMLButtonElement>(`${selector} button`)!.click();
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [PersonPage, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: SocialApi, useValue: api },
        { provide: PhotosApi, useValue: photosApi },
        { provide: UsersApi, useValue: usersApi },
        { provide: PlansApi, useValue: { recentOf: () => of([]) } },
        {
          provide: ReputationApi,
          useValue: {
            of: () => of({ userId: 'ana', score: -15 }),
            statsOf: () =>
              of({ userId: 'ana', plansCompleted: 12, plansOrganized: 3, activities: 4 }),
            badgesOf: () =>
              of([
                {
                  badge: 'TEN_ACTIVITIES',
                  progress: 10,
                  goal: 10,
                  earned: true,
                  earnedAt: '2026-10-13T16:30:00Z',
                },
              ]),
          },
        },
      ],
    });
  });

  it('should show the person, their counts and that their profile is private', async () => {
    await create({ ...ANA, followsMe: true });

    expect(api.person).toHaveBeenCalledWith('ana');
    expect(element().querySelector('.person-card__name')?.textContent).toContain('Ana Pruebas');
    expect(element().querySelector('.person-card__avatar')?.textContent).toContain('AP');
    expect(element().querySelector('.private-tag')?.textContent).toContain('Perfil privado');
    expect(element().querySelector('.follows-you')?.textContent).toContain('Te sigue');
    expect(element().querySelector('.followers-count')?.textContent).toBe('3');
    expect(element().querySelector('.following-count')?.textContent).toBe('1');
    expect(element().querySelector('.person-reputation')?.textContent).toContain('-15');
    expect(element().querySelector('.person-badges .badge__name')?.textContent).toContain(
      '10 actividades distintas',
    );
  });

  it('should show their photo (HU-020), or their initials without one', async () => {
    await create();
    expect(photosApi.photosOf).toHaveBeenCalledWith(['ana']);
    expect(element().querySelector('.person-card__avatar')?.textContent?.trim()).toBe('AP');

    photosApi.photosOf.mockReturnValueOnce(
      of([{ userId: 'ana', url: 'http://storage.test/photos/ana/1.webp?view' }]),
    );
    await create();
    expect(element().querySelector('.person-card__avatar img')?.getAttribute('src')).toContain(
      '/photos/ana/1.webp',
    );
  });

  it('should show their social profile: bio, hobbies with level and statistics (HU-048)', async () => {
    await create();

    expect(usersApi.profileOf).toHaveBeenCalledWith('ana');
    expect(element().querySelector('.person-bio')?.textContent).toBe('Corro los domingos');
    expect(element().querySelector('.hobby-chip')?.textContent).toContain('Pádel');
    expect(element().querySelector('.hobby-chip')?.textContent).toContain('Intermedio');
    expect(element().querySelector('.stats-completed')?.textContent).toBe('12');
    expect(element().querySelector('.stats-organized')?.textContent).toBe('3');
    expect(element().querySelector('.stats-activities')?.textContent).toBe('4');
    // Ana's profile is private and I do not follow her: her plans and her network are not shown
    expect(element().querySelector('.private-activity')?.textContent).toContain(
      'El perfil de Ana Pruebas es privado',
    );
  });

  it('should show what can be known when their profile or statistics cannot be read', async () => {
    usersApi.profileOf.mockReturnValueOnce(throwError(() => new Error('down')));
    await create({ ...ANA, activityVisible: true });

    expect(element().querySelector('.person-bio')).toBeNull();
    expect(element().querySelector('.person-hobbies')).toBeNull();
    expect(element().querySelector('.person-card__name')?.textContent).toBe('Ana Pruebas');
    expect(element().querySelector('.activity-tabs')).not.toBeNull();
  });

  it('should ask to follow a private profile and then say the request is waiting', async () => {
    await create();
    expect(element().querySelector('.follow-button')?.textContent).toContain('Pedir seguir');
    expect(element().textContent).toContain('Ana Pruebas tendrá que aceptar tu solicitud');

    api.person.mockReturnValue(of({ ...ANA, relation: 'REQUESTED' }));
    await click('.follow-button');

    expect(api.follow).toHaveBeenCalledWith('ana');
    expect(element().querySelector('.requested-message')?.textContent).toContain(
      'Solicitud enviada',
    );

    api.person.mockReturnValue(of(ANA));
    await click('.cancel-request');
    expect(api.unfollow).toHaveBeenCalledWith('ana');
    expect(element().querySelector('.follow-button')).not.toBeNull();
  });

  it('should follow a public profile at once and stop following it', async () => {
    await create({ ...ANA, visibility: 'PUBLIC' });
    expect(element().querySelector('.follow-button')?.textContent).toContain('Seguir');
    expect(element().querySelector('.private-tag')).toBeNull();

    api.person.mockReturnValue(
      of({ ...ANA, visibility: 'PUBLIC', relation: 'FOLLOWING', followers: 4 }),
    );
    await click('.follow-button');
    expect(element().querySelector('.following-message')?.textContent).toContain(
      'Sigues a Ana Pruebas',
    );
    expect(element().querySelector('.followers-count')?.textContent).toBe('4');

    await click('.unfollow-button');
    expect(api.unfollow).toHaveBeenCalledWith('ana');
  });

  it('should lead to my network on my own page', async () => {
    await create({ ...ANA, relation: 'SELF' });

    expect(element().querySelector('.see-network')?.getAttribute('href')).toBe('/network');
    expect(element().querySelector('.follow-button')).toBeNull();
  });

  it('should explain why following failed', async () => {
    await create();
    api.follow.mockReturnValueOnce(
      throwError(
        () => new HttpErrorResponse({ status: 503, error: { code: 'social.unavailable' } }),
      ),
    );

    await click('.follow-button');

    expect(element().querySelector('.social-error')?.textContent).toContain(
      'Ahora mismo no se puede seguir a nadie',
    );
    expect(element().querySelector('.follow-button button')?.hasAttribute('disabled')).toBe(false);
  });

  it('should say when the person does not exist', async () => {
    await create(new Error('404'));

    expect(element().querySelector('.person-not-found')?.textContent).toContain(
      'Esta persona no existe',
    );
  });
});
