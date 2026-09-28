import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FakeSession } from '../../../testing/fake-session';
import { Session } from '../../core/auth/session';
import { Home } from './home';
import { translocoTesting } from '../../../testing/transloco-testing';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let element: HTMLElement;
  let session: FakeSession;

  beforeEach(async () => {
    session = new FakeSession();
    await TestBed.configureTestingModule({
      imports: [Home, translocoTesting()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Session, useValue: session },
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

  it('should lead to the nearby plans', () => {
    const entry = element.querySelector('.nearby-entry');
    expect(entry?.getAttribute('href')).toBe('/plans/nearby');
    expect(entry?.textContent).toContain('Planes cerca de ti ahora');
  });

  it('should offer login and registration without a session', () => {
    const buttons = element.querySelectorAll('header p-button:not(.language-switcher) button');
    (buttons[0] as HTMLButtonElement).click();
    (buttons[1] as HTMLButtonElement).click();
    expect(session.register).toHaveBeenCalled();
    expect(session.login).toHaveBeenCalled();
    expect(element.querySelector('.user-menu')).toBeNull();
  });

  it('should show the user and a link to the profile with a session', async () => {
    session.signIn('Ana Test');
    fixture.detectChanges();
    TestBed.inject(HttpTestingController).expectOne((r) => r.url.endsWith('/api/v1/plans/mine')).flush([]);
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
          freeSpots: 1,
        },
      ]);
    await fixture.whenStable();
    fixture.detectChanges();
    const myPlan = element.querySelector('.my-plan');
    expect(myPlan?.textContent).toContain('Mi partido de pádel');
    expect(myPlan?.textContent).toContain('Falta 1');
    expect(myPlan?.getAttribute('href')).toBe('/plans/plan-1');
  });

  it('should switch to English and back from the header', async () => {
    (element.querySelector('.language-switcher button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(element.querySelector('h1')?.textContent).toContain('One short?');
    expect(element.querySelector('.nearby-entry')?.textContent).toContain('Plans near you right now');
    expect(document.documentElement.lang).toBe('en');
    (element.querySelector('.language-switcher button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(element.querySelector('h1')?.textContent).toContain('¿Te falta uno?');
  });

  it('should not ask for my plans without a session', () => {
    TestBed.inject(HttpTestingController).expectNone((r) => r.url.endsWith('/api/v1/plans/mine'));
    expect(element.querySelector('.my-plans')).toBeNull();
  });
});
