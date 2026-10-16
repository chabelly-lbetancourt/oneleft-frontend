import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, Subject, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { PhotosApi } from '@core/api/photos-api';
import { SocialApi } from '@core/api/social-api';
import { UserEvents } from '@core/realtime/user-events';
import { FeedActivityNotice, FeedItem, FeedPage } from '@shared/model/feed';
import { PersonPhoto } from '@shared/model/photo';
import { Feed } from './feed';

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

const item = (actor: string, type: FeedItem['type'], plan: string, minutes: number): FeedItem => ({
  actorId: actor.toLowerCase(),
  actorName: actor,
  type,
  planId: plan,
  planTitle: `Plan ${plan}`,
  planActivity: 'TENNIS',
  startsAt: '2026-10-16T18:00:00Z',
  occurredAt: minutesAgo(minutes),
});

const page = (items: FeedItem[], total = items.length, number = 0): FeedPage => ({
  items,
  page: number,
  size: 20,
  total,
});

describe('Feed', () => {
  let fixture: ComponentFixture<Feed>;
  const activity = new Subject<FeedActivityNotice>();
  const socialApi = {
    feed: vi.fn((): Observable<FeedPage> =>
      of(page([item('Ana', 'JOINED', 'p1', 5), item('Diego', 'PUBLISHED', 'p2', 150)])),
    ),
  };
  const photosApi = {
    photosOf: vi.fn((): Observable<PersonPhoto[]> =>
      of([{ userId: 'ana', url: 'http://storage.test/a.webp' }]),
    ),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async () => {
    fixture = TestBed.createComponent(Feed);
    await render();
  };
  const items = () => [...element().querySelectorAll('.feed-item')];

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [Feed, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: SocialApi, useValue: socialApi },
        { provide: PhotosApi, useValue: photosApi },
        { provide: UserEvents, useValue: { feedActivity$: activity.asObservable() } },
      ],
    });
  });

  it('should show who did what, when, and the plan to open it', async () => {
    await create();

    expect(socialApi.feed).toHaveBeenCalledWith(0, 20);
    expect(items()).toHaveLength(2);
    const [first, second] = items();
    expect(first.querySelector('.feed-item__what')?.textContent).toContain('Ana');
    expect(first.querySelector('.feed-item__what')?.textContent).toContain(
      'se ha apuntado a un plan',
    );
    expect(first.querySelector('.feed-item__when')?.textContent).toContain('hace 5 min');
    expect(first.querySelector('.feed-item__actor')?.getAttribute('href')).toBe('/people/ana');
    const plan = first.querySelector('.feed-plan');
    expect(plan?.getAttribute('href')).toBe('/plans/p1');
    expect(plan?.textContent).toContain('Plan p1');
    expect(plan?.querySelector('.feed-plan__meta')?.textContent).toContain('Tenis');
    expect(second.querySelector('.feed-item__what')?.textContent).toContain('ha publicado un plan');
    expect(second.querySelector('.feed-item__when')?.textContent).toContain('hace 2 h');
  });

  it('should show the photos of the people, asked once per page, and the initials without them', async () => {
    await create();

    expect(photosApi.photosOf).toHaveBeenCalledExactlyOnceWith(['ana', 'diego']);
    const [ana, diego] = items();
    expect(ana.querySelector('img')?.getAttribute('src')).toBe('http://storage.test/a.webp');
    expect(diego.querySelector('img')).toBeNull();
    expect(diego.querySelector('.feed-item__avatar')?.textContent).toContain('D');
  });

  it('should keep the feed when the photos cannot be loaded', async () => {
    photosApi.photosOf.mockReturnValueOnce(throwError(() => new Error('down')));
    await create();

    expect(items()).toHaveLength(2);
    expect(element().querySelector('img')).toBeNull();
  });

  it('should read more pages without repeating what is already shown', async () => {
    socialApi.feed.mockReturnValueOnce(of(page([item('Ana', 'JOINED', 'p1', 5)], 2)));
    await create();
    // Ana comes again in the next page, as if something had been added on top in between
    socialApi.feed.mockReturnValueOnce(
      of(page([item('Ana', 'JOINED', 'p1', 5), item('Marta', 'COMPLETED', 'p3', 60 * 30)], 2, 1)),
    );

    element().querySelector<HTMLButtonElement>('.feed-more button')!.click();
    await render();

    expect(socialApi.feed).toHaveBeenLastCalledWith(1, 20);
    expect(items()).toHaveLength(2);
    expect(items()[1].textContent).toContain('ha completado un plan');
    expect(items()[1].textContent).toContain('hace 1 d');
    expect(element().querySelector('.feed-more')).toBeNull();
  });

  it('should say when more activity cannot be loaded and keep what is shown', async () => {
    socialApi.feed.mockReturnValueOnce(of(page([item('Ana', 'JOINED', 'p1', 5)], 3)));
    await create();
    socialApi.feed.mockReturnValueOnce(throwError(() => new Error('down')));

    element().querySelector<HTMLButtonElement>('.feed-more button')!.click();
    await render();

    expect(element().querySelector('.feed-more-error')?.textContent).toContain(
      'No se ha podido cargar más actividad',
    );
    expect(items()).toHaveLength(1);
  });

  it('should put new activity on top as it arrives, highlighted and announced', async () => {
    await create();
    socialApi.feed.mockReturnValueOnce(
      of(
        page(
          [
            item('Lucía', 'PUBLISHED', 'p9', 0),
            item('Ana', 'JOINED', 'p1', 5),
            item('Diego', 'PUBLISHED', 'p2', 150),
          ],
          3,
        ),
      ),
    );

    activity.next({
      actorId: 'lucía',
      actorName: 'Lucía',
      type: 'PUBLISHED',
      planId: 'p9',
      planTitle: 'Plan p9',
      occurredAt: minutesAgo(0),
    });
    await render();

    expect(items()).toHaveLength(3);
    expect(items()[0].textContent).toContain('Lucía');
    expect(items()[0].textContent).toContain('ahora mismo');
    expect(items()[0].classList).toContain('feed-item--fresh');
    expect(items()[1].classList).not.toContain('feed-item--fresh');
    expect(element().querySelector('[aria-live="polite"]')?.textContent).toContain(
      'Novedad: Lucía ha publicado un plan',
    );
  });

  it('should not read the feed again for activity that is already shown', async () => {
    await create();

    activity.next({
      actorId: 'ana',
      actorName: 'Ana',
      type: 'JOINED',
      planId: 'p1',
      planTitle: 'Plan p1',
      occurredAt: minutesAgo(5),
    });
    await render();

    expect(socialApi.feed).toHaveBeenCalledOnce();
  });

  it('should explain how to fill an empty feed', async () => {
    socialApi.feed.mockReturnValueOnce(of(page([])));
    await create();

    expect(element().querySelector('.feed-empty')?.textContent).toContain(
      'Sigue a la gente con la que coincides en los planes',
    );
    const links = [...element().querySelectorAll('.feed-empty a')].map((link) =>
      link.getAttribute('href'),
    );
    expect(links).toEqual(['/plans/nearby', '/network']);
    expect(photosApi.photosOf).not.toHaveBeenCalled();
  });

  it('should say when the feed cannot be loaded', async () => {
    socialApi.feed.mockReturnValueOnce(throwError(() => new Error('down')));
    await create();

    expect(element().querySelector('.feed-error')?.textContent).toContain(
      'No se ha podido cargar la actividad de tu red',
    );
  });

  it('should show skeletons while the feed loads', async () => {
    socialApi.feed.mockReturnValueOnce(new Subject<FeedPage>());
    await create();

    expect(element().querySelector('.feed-loading')?.getAttribute('role')).toBe('status');
    expect(element().querySelectorAll('app-card-skeleton')).toHaveLength(3);
  });
});
