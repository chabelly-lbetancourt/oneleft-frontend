import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Session } from '@core/auth/session';
import { Language } from '@core/i18n/language';
import { MyPhoto } from '@core/photos/my-photo';
import { Theme } from '@core/theme/theme';
import { FakeSession } from '@testing/fake-session';
import { translocoTesting } from '@testing/transloco-testing';
import { AppHeader } from './app-header';

@Component({ template: '' })
class Page {}

describe('AppHeader', () => {
  let fixture: ComponentFixture<AppHeader>;
  let session: FakeSession;
  const dark = signal(false);
  const theme = { dark, toggle: vi.fn(() => dark.update((value) => !value)) };
  const language = { other: signal('en'), use: vi.fn() };

  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const menuItem = (name: string) =>
    document.querySelector<HTMLElement>(
      `.user-menu-panel .user-menu__${name} a, .user-menu-panel .user-menu__${name} .p-menu-item-link`,
    );
  const openMenu = async () => {
    element().querySelector<HTMLButtonElement>('button.user-menu')!.click();
    await render();
  };

  beforeEach(async () => {
    session = new FakeSession();
    dark.set(false);
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [AppHeader, translocoTesting()],
      providers: [
        provideRouter([{ path: '**', component: Page }]),
        { provide: Session, useValue: session },
        { provide: Theme, useValue: theme },
        { provide: Language, useValue: language },
        { provide: MyPhoto, useValue: { url: signal(null) } },
      ],
    });
    fixture = TestBed.createComponent(AppHeader);
  });

  afterEach(() => document.querySelectorAll('.user-menu-panel').forEach((panel) => panel.remove()));

  it('should keep the theme, the language and the way in without a session', async () => {
    await render();

    expect(element().querySelector('app-theme-switcher')).not.toBeNull();
    expect(element().querySelector('app-language-switcher')).not.toBeNull();
    expect(element().querySelector('.app-header__access')?.textContent).toContain('Entrar');
    expect(element().querySelector('.user-menu')).toBeNull();
  });

  it('should leave only my avatar with a session, as a button that opens a menu', async () => {
    session.signIn('Ana Test');
    await render();

    expect(element().querySelector('app-theme-switcher')).toBeNull();
    expect(element().querySelector('app-language-switcher')).toBeNull();
    const button = element().querySelector('button.user-menu')!;
    expect(button.getAttribute('aria-label')).toBe('Tu cuenta y ajustes');
    expect(button.getAttribute('aria-haspopup')).toBe('menu');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.textContent).toContain('Ana Test');
  });

  it('should show my account and the settings in the menu', async () => {
    session.signIn('Ana Test');
    await render();
    await openMenu();

    const panel = document.querySelector('.user-menu-panel')!;
    expect(panel.textContent).toContain('Ana Test');
    expect(panel.textContent).toContain('Mi perfil');
    expect(panel.textContent).toContain('Mi red');
    expect(panel.textContent).toContain('Tema oscuro');
    expect(panel.textContent).toContain('English');
    expect(panel.textContent).toContain('Cerrar sesión');
    expect(element().querySelector('button.user-menu')?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should switch the theme and the language and sign out from the menu', async () => {
    session.signIn('Ana Test');
    await render();
    await openMenu();

    menuItem('theme')!.click();
    await render();
    expect(theme.toggle).toHaveBeenCalledOnce();

    await openMenu();
    expect(document.querySelector('.user-menu-panel')?.textContent).toContain('Tema claro');
    menuItem('language')!.click();
    expect(language.use).toHaveBeenCalledWith('en');

    await openMenu();
    menuItem('logout')!.click();
    expect(session.logout).toHaveBeenCalledOnce();
  });

  it('should open my profile and my network from the menu', async () => {
    session.signIn('Ana Test');
    await render();
    await openMenu();

    expect(menuItem('profile')?.getAttribute('href')).toBe('/profile');
    expect(menuItem('network')?.getAttribute('href')).toBe('/network');
    // My data and my account (HU-045)
    expect(menuItem('account')?.getAttribute('href')).toBe('/account');
    // The people I blocked (HU-033)
    expect(menuItem('blocked')?.getAttribute('href')).toBe('/blocked');
    menuItem('profile')!.click();
    await render();
    expect(TestBed.inject(Router).url).toBe('/profile');
  });
});
