import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FakeSession } from '../../../testing/fake-session';
import { Session } from '../../core/auth/session';
import { Home } from './home';
import { SAMPLE_PLANS } from './sample-plans';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let element: HTMLElement;
  let session: FakeSession;

  beforeEach(async () => {
    session = new FakeSession();
    await TestBed.configureTestingModule({
      imports: [Home],
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

  it('should list every nearby plan', () => {
    expect(element.querySelectorAll('.plan-card').length).toBe(SAMPLE_PLANS.length);
  });

  it('should show the plans ordered by start time', () => {
    const titles = Array.from(element.querySelectorAll('.plan-card h3')).map((h) =>
      h.textContent?.trim(),
    );
    const expected = [...SAMPLE_PLANS]
      .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())
      .map((p) => p.title);
    expect(titles).toEqual(expected);
  });

  it('should label free spots in singular and plural', () => {
    const labels = Array.from(element.querySelectorAll('p-tag')).map((t) => t.textContent?.trim());
    expect(labels).toContain('Falta 1');
    expect(labels).toContain('Faltan 2');
  });

  it('should offer login and registration without a session', () => {
    const buttons = element.querySelectorAll('header p-button button');
    (buttons[0] as HTMLButtonElement).click();
    (buttons[1] as HTMLButtonElement).click();
    expect(session.register).toHaveBeenCalled();
    expect(session.login).toHaveBeenCalled();
    expect(element.querySelector('.user-menu')).toBeNull();
  });

  it('should show the user and a link to the profile with a session', async () => {
    session.signIn('Ana Pruebas');
    fixture.detectChanges();
    TestBed.inject(HttpTestingController).expectOne((r) => r.url.endsWith('/api/v1/plans/mine')).flush([]);
    await fixture.whenStable();
    const menu = element.querySelector('.user-menu');
    expect(menu?.textContent).toContain('Ana Pruebas');
    expect(menu?.getAttribute('href')).toBe('/perfil');
  });

  it('should list my upcoming plans with a session', async () => {
    session.signIn('Ana Pruebas');
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
    expect(myPlan?.getAttribute('href')).toBe('/planes/plan-1');
  });

  it('should not ask for my plans without a session', () => {
    TestBed.inject(HttpTestingController).expectNone((r) => r.url.endsWith('/api/v1/plans/mine'));
    expect(element.querySelector('.my-plans')).toBeNull();
  });
});
