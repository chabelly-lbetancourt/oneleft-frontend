import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Session } from '@core/auth/session';
import { NativePlatform } from '@core/platform';
import { translocoTesting } from '@testing/transloco-testing';
import { TAB_BAR_CLASS, TabBar } from './tab-bar';

@Component({ template: '' })
class Page {}

describe('TabBar', () => {
  const native = signal(true);
  const signedIn = signal(true);
  let router: Router;
  let fixture: ComponentFixture<TabBar>;

  const element = () => fixture.nativeElement as HTMLElement;
  const render = async (url: string) => {
    await router.navigateByUrl(url);
    fixture = TestBed.createComponent(TabBar);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  };
  const labels = () =>
    [...element().querySelectorAll('.tab__label')].map((label) => label.textContent?.trim());

  beforeEach(() => {
    native.set(true);
    signedIn.set(true);
    document.documentElement.classList.remove(TAB_BAR_CLASS);
    TestBed.configureTestingModule({
      imports: [TabBar, translocoTesting()],
      providers: [
        provideRouter([{ path: '**', component: Page }]),
        { provide: NativePlatform, useValue: { isNative: () => native() } },
        { provide: Session, useValue: { isAuthenticated: signedIn } },
      ],
    });
    router = TestBed.inject(Router);
  });

  it('should show the main sections of the app, with publishing in the centre', async () => {
    await render('/');

    expect(element().querySelector('nav')?.getAttribute('aria-label')).toBe('Navegación principal');
    expect(labels()).toEqual(['Inicio', 'Cerca', 'Publicar', 'Actividad', 'Perfil']);
    const links = [...element().querySelectorAll('a.tab')].map((link) => link.getAttribute('href'));
    expect(links).toEqual(['/', '/plans/nearby', '/plans/new', '/feed', '/profile']);
    expect(element().querySelectorAll('.tab--primary')).toHaveLength(1);
    expect(element().querySelector('.tab--primary')?.textContent).toContain('Publicar');
    expect(document.documentElement.classList).toContain(TAB_BAR_CLASS);
  });

  it('should highlight and announce the current section only', async () => {
    await render('/feed');

    const current = element().querySelectorAll('[aria-current="page"]');
    expect(current).toHaveLength(1);
    expect(current[0].textContent).toContain('Actividad');
    expect(current[0].classList).toContain('tab--active');
  });

  it('should take the home page as current only on the home page itself', async () => {
    await render('/plans/nearby');

    const current = element().querySelector('[aria-current="page"]');
    expect(current?.textContent).toContain('Cerca');
    expect(element().querySelector('a[href="/"]')?.getAttribute('aria-current')).toBeNull();
  });

  it('should not be in the web, nor without a session', async () => {
    native.set(false);
    await render('/');
    expect(element().querySelector('nav')).toBeNull();
    expect(document.documentElement.classList).not.toContain(TAB_BAR_CLASS);

    native.set(true);
    signedIn.set(false);
    await render('/');
    expect(element().querySelector('nav')).toBeNull();
  });

  it('should hide where it gets in the way and come back after', async () => {
    await render('/plans/p1/chat');
    expect(element().querySelector('nav')).toBeNull();

    for (const url of ['/plans/new', '/login', '/register?returnUrl=%2F']) {
      await router.navigateByUrl(url);
      fixture.detectChanges();
      expect(element().querySelector('nav')).toBeNull();
    }

    await router.navigateByUrl('/plans/p1');
    fixture.detectChanges();
    expect(element().querySelector('nav')).not.toBeNull();
    expect(document.documentElement.classList).toContain(TAB_BAR_CLASS);
  });
});
