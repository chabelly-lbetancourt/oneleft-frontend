import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { SocialApi } from '@core/api/social-api';
import {
  Connection,
  ConnectionPage,
  FeedAudience,
  NetworkList,
  SocialAccount,
  Visibility,
} from '@shared/model/social';
import { Network } from './network';

const ACCOUNT: SocialAccount = {
  userId: 'ana',
  name: 'Ana',
  visibility: 'PRIVATE',
  feedAudience: 'FOLLOWERS',
  followers: 1,
  following: 1,
  requests: 1,
  sentRequests: 0,
};

const person = (userId: string, name: string, status: Connection['status'] = 'ACCEPTED') => ({
  userId,
  name,
  status,
  since: new Date().toISOString(),
});

const page = (items: Connection[], total = items.length): ConnectionPage => ({
  items,
  page: 0,
  size: 20,
  total,
});

describe('Network', () => {
  // The tabs of PrimeNG measure their list, and jsdom has no ResizeObserver
  beforeAll(() => {
    globalThis.ResizeObserver ??= class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as unknown as typeof ResizeObserver;
  });

  let fixture: ComponentFixture<Network>;
  let lists: Record<NetworkList, ConnectionPage>;
  const api = {
    myAccount: vi.fn((): Observable<SocialAccount> => of(ACCOUNT)),
    changeVisibility: vi.fn((visibility: Visibility): Observable<SocialAccount> =>
      of({ ...ACCOUNT, visibility }),
    ),
    changeFeedAudience: vi.fn((feedAudience: FeedAudience): Observable<SocialAccount> =>
      of({ ...ACCOUNT, feedAudience }),
    ),
    list: vi.fn((list: NetworkList, pageNumber = 0): Observable<ConnectionPage> =>
      of({ ...lists[list], page: pageNumber }),
    ),
    accept: vi.fn((): Observable<Connection> => of(person('marta', 'Marta'))),
    decline: vi.fn((): Observable<void> => of(undefined)),
    removeFollower: vi.fn((): Observable<void> => of(undefined)),
    unfollow: vi.fn((): Observable<void> => of(undefined)),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async () => {
    fixture = TestBed.createComponent(Network);
    await render();
  };
  const openTab = async (name: string) => {
    element().querySelector<HTMLElement>(`.${name}-tab`)!.click();
    await render();
  };
  const names = (list: string) =>
    [...element().querySelectorAll(`.connections--${list} .connection__name`)].map((name) =>
      name.textContent?.trim(),
    );

  beforeEach(() => {
    vi.clearAllMocks();
    lists = {
      followers: page([person('diego', 'Diego')]),
      following: page([person('javier', 'Javier')]),
      requests: page([person('marta', 'Marta', 'PENDING')]),
      sent: page([]),
    };
    TestBed.configureTestingModule({
      imports: [Network, translocoTesting()],
      providers: [provideRouter([]), { provide: SocialApi, useValue: api }],
    });
  });

  it('should show the private profile switch and my followers with their counts', async () => {
    await create();

    expect(element().querySelector<HTMLInputElement>('#private')?.checked).toBe(true);
    expect(element().textContent).toContain('tendrá que esperar a que aceptes su solicitud');
    expect(element().querySelector('.open-note')).not.toBeNull();
    expect(element().querySelector('.requests-tab')?.textContent).toContain('1');
    expect(names('followers')).toEqual(['Diego']);
    expect(element().querySelector('.connection__person')?.getAttribute('href')).toBe(
      '/people/diego',
    );
    expect(api.list).toHaveBeenCalledTimes(1);
  });

  it('should open the profile, which accepts the requests that were waiting', async () => {
    await create();
    api.myAccount.mockReturnValue(
      of({ ...ACCOUNT, visibility: 'PUBLIC', followers: 2, requests: 0 }),
    );
    lists.followers = page([person('marta', 'Marta'), person('diego', 'Diego')]);

    element().querySelector<HTMLElement>('#private')!.click();
    await render();

    expect(api.changeVisibility).toHaveBeenCalledWith('PUBLIC');
    expect(element().textContent).toContain('Cualquiera puede seguirte al momento');
    expect(names('followers')).toEqual(['Marta', 'Diego']);
  });

  it('should share my activity with my followers by default, and with nobody if I want (HU-059)', async () => {
    await create();
    const share = () => element().querySelector<HTMLInputElement>('#share-activity');
    expect(share()?.checked).toBe(true);
    expect(element().querySelector('.audience-card')?.textContent).toContain(
      'Tus seguidores ven en su feed',
    );

    share()!.click();
    await render();

    expect(api.changeFeedAudience).toHaveBeenCalledWith('NOBODY');
    expect(share()?.checked).toBe(false);
    expect(element().querySelector('.audience-card')?.textContent).toContain(
      'Nadie ve tu actividad en su feed',
    );

    share()!.click();
    await render();
    expect(api.changeFeedAudience).toHaveBeenLastCalledWith('FOLLOWERS');
  });

  it('should say when who sees my activity cannot be changed', async () => {
    await create();
    api.changeFeedAudience.mockReturnValueOnce(throwError(() => new Error('down')));

    element().querySelector<HTMLElement>('#share-activity')!.click();
    await render();

    expect(element().querySelector('.social-error')?.textContent).toContain(
      'No se ha podido completar',
    );
  });

  it('should accept and decline requests and cancel the ones I sent', async () => {
    lists.sent = page([person('lucia', 'Lucía', 'PENDING')]);
    lists.requests = page([
      person('marta', 'Marta', 'PENDING'),
      person('javier', 'Javier', 'PENDING'),
    ]);
    await create();
    await openTab('requests');
    expect(names('requests')).toEqual(['Marta', 'Javier']);
    expect(names('sent')).toEqual(['Lucía']);

    const accept = element().querySelector('.accept-request button')!;
    expect(accept.getAttribute('aria-label')).toBe('Aceptar a Marta');
    (accept as HTMLButtonElement).click();
    await render();
    expect(api.accept).toHaveBeenCalledWith('marta');
    expect(names('requests')).toEqual(['Javier']);

    element().querySelector<HTMLButtonElement>('.decline-request button')!.click();
    await render();
    expect(api.decline).toHaveBeenCalledWith('javier');
    expect(element().querySelector('.empty-requests')?.textContent).toContain(
      'No tienes solicitudes pendientes',
    );

    element().querySelector<HTMLButtonElement>('.cancel-sent button')!.click();
    await render();
    expect(api.unfollow).toHaveBeenCalledWith('lucia');
    expect(element().querySelector('.empty-sent')).not.toBeNull();
    // The counts come from the service again after each change
    expect(api.myAccount).toHaveBeenCalledTimes(4);
  });

  it('should remove a follower and stop following someone', async () => {
    await create();
    element().querySelector<HTMLButtonElement>('.remove-follower button')!.click();
    await render();
    expect(api.removeFollower).toHaveBeenCalledWith('diego');
    expect(element().querySelector('.empty-followers')?.textContent).toContain(
      'Todavía no te sigue nadie',
    );

    await openTab('following');
    element().querySelector<HTMLButtonElement>('.unfollow-person button')!.click();
    await render();
    expect(api.unfollow).toHaveBeenCalledWith('javier');
    expect(element().querySelector('.empty-following')).not.toBeNull();
  });

  it('should read the next page of a long list', async () => {
    lists.followers = page([person('diego', 'Diego')], 2);
    await create();
    lists.followers = page([person('marta', 'Marta')], 2);

    element().querySelector<HTMLButtonElement>('.more-followers button')!.click();
    await render();

    expect(api.list).toHaveBeenLastCalledWith('followers', 1, 20);
    expect(names('followers')).toEqual(['Diego', 'Marta']);
    expect(element().querySelector('.more-followers')).toBeNull();
  });

  it('should say when the network cannot be loaded', async () => {
    api.myAccount.mockReturnValueOnce(throwError(() => new Error('down')));
    await create();

    expect(element().querySelector('.network-error')?.textContent).toContain(
      'No se ha podido cargar tu red',
    );
  });
});
