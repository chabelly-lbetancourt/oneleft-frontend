import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { FakeSession } from '../../../testing/fake-session';
import { Session } from '../../core/auth/session';
import { UserEvents } from '../../core/realtime/user-events';
import { PlanJoinedNotice, PlanLeftNotice } from '../../shared/model/published-plan';
import { EMPTY, Subject } from 'rxjs';
import { Home } from './home';
import { translocoTesting } from '../../../testing/transloco-testing';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let element: HTMLElement;
  let session: FakeSession;
  const notices = new Subject<PlanJoinedNotice>();
  const left = new Subject<PlanLeftNotice>();

  beforeEach(async () => {
    session = new FakeSession();
    await TestBed.configureTestingModule({
      imports: [Home, translocoTesting()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Session, useValue: session },
        {
          provide: UserEvents,
          useValue: {
            joined$: notices.asObservable(),
            left$: left.asObservable(),
            spotFreed$: EMPTY,
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should show the main question', () => {
    expect(element.querySelector('h1')?.textContent).toContain('¿Te falta uno?');
  });

  it('should lead to the nearby plans with a session', async () => {
    session.signIn('Ana Test');
    fixture.detectChanges();
    TestBed.inject(HttpTestingController)
      .expectOne((r) => r.url.endsWith('/api/v1/plans/mine'))
      .flush([]);
    await fixture.whenStable();
    const entry = element.querySelector('.nearby-entry');
    expect(entry?.getAttribute('href')).toBe('/plans/nearby');
    expect(entry?.textContent).toContain('Planes cerca de ti ahora');
  });

  it('should lead to the login and registration pages without a session', () => {
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const buttons = element.querySelectorAll<HTMLButtonElement>(
      'header p-button:not(.language-switcher):not(.theme-switcher) button',
    );
    buttons[0].click();
    buttons[1].click();
    expect(navigate.mock.calls.map(([url]) => router.serializeUrl(url as UrlTree))).toEqual([
      '/register',
      '/login',
    ]);
    expect(element.querySelector('.user-menu')).toBeNull();
  });

  it('should leave signing up and signing in to the header', () => {
    // The landing only tells what OneLeft is: no second set of sign-up buttons
    expect(element.querySelector('.hero p-button')).toBeNull();
    expect(element.querySelector('.google-login')).toBeNull();
    expect(
      element.querySelectorAll('header p-button:not(.language-switcher):not(.theme-switcher)'),
    ).toHaveLength(2);
  });

  it('should show the user and a link to the profile with a session', async () => {
    session.signIn('Ana Test');
    fixture.detectChanges();
    TestBed.inject(HttpTestingController)
      .expectOne((r) => r.url.endsWith('/api/v1/plans/mine'))
      .flush([]);
    await fixture.whenStable();
    const menu = element.querySelector('.user-menu');
    expect(menu?.textContent).toContain('Ana Test');
    expect(menu?.getAttribute('href')).toBe('/profile');
  });

  it('should list my upcoming plans with a session', async () => {
    session.signIn('Ana Test');
    fixture.detectChanges();
    TestBed.inject(HttpTestingController)
      .expectOne((r) => r.url.endsWith('/api/v1/plans/mine'))
      .flush([
        {
          id: 'plan-1',
          activity: 'PADEL',
          title: 'Mi partido de pádel',
          startsAt: new Date(Date.now() + 60 * 60_000).toISOString(),
          meetingPoint: { name: 'Pistas de Vallecas', latitude: 40.39, longitude: -3.63 },
          organizerName: 'Ana Test',
          participants: [],
          waitlist: [],
          freeSpots: 1,
        },
      ]);
    await fixture.whenStable();
    fixture.detectChanges();
    const myPlan = element.querySelector('.my-plan');
    expect(myPlan?.textContent).toContain('Mi partido de pádel');
    expect(myPlan?.textContent).toContain('Falta 1');
    expect(myPlan?.textContent).toContain('Pistas de Vallecas');
    // The organizer and the free spot of the plan
    expect(myPlan?.querySelectorAll('.person-slot')).toHaveLength(1);
    expect(myPlan?.querySelectorAll('.free-slot')).toHaveLength(1);
    expect(myPlan?.getAttribute('href')).toBe('/plans/plan-1');
  });

  it('should switch to English and back from the header', async () => {
    (element.querySelector('.language-switcher button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(element.querySelector('h1')?.textContent).toContain('One short?');
    expect(element.querySelector('header')?.textContent).toContain('Sign up');
    expect(document.documentElement.lang).toBe('en');
    (element.querySelector('.language-switcher button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(element.querySelector('h1')?.textContent).toContain('¿Te falta uno?');
  });

  it('should refresh my plans when someone joins or leaves one of them', async () => {
    session.signIn('Ana Test');
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    http.expectOne((r) => r.url.endsWith('/api/v1/plans/mine')).flush([]);
    await fixture.whenStable();

    notices.next({
      planId: 'p1',
      title: 'Pádel',
      participantName: 'Lucía',
      freeSpots: 1,
      full: false,
    });
    fixture.detectChanges();
    http.expectOne((r) => r.url.endsWith('/api/v1/plans/mine')).flush([]);
    await fixture.whenStable();

    left.next({
      planId: 'p1',
      title: 'Pádel',
      participantName: 'Lucía',
      promotedName: null,
      freeSpots: 1,
      full: false,
    });
    fixture.detectChanges();
    http.expectOne((r) => r.url.endsWith('/api/v1/plans/mine')).flush([]);
  });

  it('should not ask for my plans without a session', () => {
    TestBed.inject(HttpTestingController).expectNone((r) => r.url.endsWith('/api/v1/plans/mine'));
    expect(element.querySelector('.my-plans')).toBeNull();
  });
});
