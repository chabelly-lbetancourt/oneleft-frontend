import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of, Subject } from 'rxjs';
import { Language } from '../i18n/language';
import { NativePlatform } from '../platform';
import { Session } from './session';

describe('Session', () => {
  const authenticated = signal({ isAuthenticated: false, allConfigsAuthenticated: [] });
  const userData = signal<{ userData: Record<string, string> | null; allUserData: [] }>({
    userData: null,
    allUserData: [],
  });
  const oidc = {
    authenticated,
    userData,
    authorize: vi.fn(),
    logoffAndRevokeTokens: vi.fn(() => of(null)),
    getAccessToken: vi.fn(() => of('token-1')),
  };
  const platform = { isNative: vi.fn(() => false), openBrowser: vi.fn() };
  const routerEvents = new Subject<unknown>();
  const router = { events: routerEvents, navigateByUrl: vi.fn(() => Promise.resolve(true)) };
  const navigationEnd = () => routerEvents.next(new NavigationEnd(1, '/', '/'));
  let session: Session;

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    authenticated.set({ isAuthenticated: false, allConfigsAuthenticated: [] });
    userData.set({ userData: null, allUserData: [] });
    TestBed.configureTestingModule({
      providers: [
        { provide: OidcSecurityService, useValue: oidc },
        { provide: Language, useValue: { current: signal('en') } },
        { provide: NativePlatform, useValue: platform },
        { provide: Router, useValue: router },
      ],
    });
    session = TestBed.inject(Session);
  });

  it('should reflect the authentication state', () => {
    expect(session.isAuthenticated()).toBe(false);
    authenticated.set({ isAuthenticated: true, allConfigsAuthenticated: [] });
    expect(session.isAuthenticated()).toBe(true);
  });

  it('should use the full name and its initials', () => {
    userData.set({ userData: { name: 'Ana Test', email: 'ana@oneleft.dev' }, allUserData: [] });
    expect(session.userName()).toBe('Ana Test');
    expect(session.initials()).toBe('AT');
  });

  it('should fall back to the username or the email', () => {
    userData.set({ userData: { preferred_username: 'ana' }, allUserData: [] });
    expect(session.userName()).toBe('ana');
    userData.set({ userData: { email: 'ana@oneleft.dev' }, allUserData: [] });
    expect(session.userName()).toBe('ana@oneleft.dev');
    userData.set({ userData: null, allUserData: [] });
    expect(session.userName()).toBe('');
    expect(session.initials()).toBe('');
  });

  it('should start the login and the registration in Keycloak in the language of the app', () => {
    session.login();
    expect(oidc.authorize).toHaveBeenCalledWith(undefined, { customParams: { ui_locales: 'en' } });
    session.register();
    expect(oidc.authorize).toHaveBeenCalledWith(undefined, {
      customParams: { prompt: 'create', ui_locales: 'en' },
    });
  });

  it('should go straight to Google through Keycloak', () => {
    session.loginWithGoogle();
    expect(oidc.authorize).toHaveBeenCalledWith(undefined, {
      customParams: { kc_idp_hint: 'google', ui_locales: 'en' },
    });
  });

  it('should open the page that asked for the login when coming back from Keycloak', () => {
    session.login('/plans/new?x=1');
    expect(router.navigateByUrl).not.toHaveBeenCalled();

    authenticated.set({ isAuthenticated: true, allConfigsAuthenticated: [] });
    navigationEnd();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/plans/new?x=1');
    // Only once
    authenticated.set({ isAuthenticated: false, allConfigsAuthenticated: [] });
    authenticated.set({ isAuthenticated: true, allConfigsAuthenticated: [] });
    navigationEnd();
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
  });

  it('should never send the user to another site after the login', () => {
    for (const url of ['https://evil.example', '//evil.example', '/\\evil.example', '']) {
      session.register(url);
      authenticated.set({ isAuthenticated: true, allConfigsAuthenticated: [] });
      navigationEnd();
      authenticated.set({ isAuthenticated: false, allConfigsAuthenticated: [] });
      navigationEnd();
    }
    session.loginWithGoogle('/profile');
    authenticated.set({ isAuthenticated: true, allConfigsAuthenticated: [] });
    navigationEnd();
    expect(router.navigateByUrl.mock.calls).toEqual([['/profile']]);
  });

  it('should work without session storage', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('private mode');
    });
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('private mode');
    });
    expect(() => session.login('/profile')).not.toThrow();
    authenticated.set({ isAuthenticated: true, allConfigsAuthenticated: [] });
    navigationEnd();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
    setItem.mockRestore();
    getItem.mockRestore();
  });

  it('should open the Keycloak pages in the system browser inside the Android app', () => {
    platform.isNative.mockReturnValue(true);
    session.login();
    const options = oidc.authorize.mock.calls.at(-1)![1] as { urlHandler: (url: string) => void };
    options.urlHandler('http://localhost:8180/realms/oneleft/protocol/openid-connect/auth?x=1');
    expect(platform.openBrowser).toHaveBeenCalledWith(
      'http://localhost:8180/realms/oneleft/protocol/openid-connect/auth?x=1',
    );
    // Google does not allow signing in inside a WebView: it also goes through the system browser
    session.loginWithGoogle();
    expect(oidc.authorize).toHaveBeenLastCalledWith(undefined, {
      customParams: { kc_idp_hint: 'google', ui_locales: 'en' },
      urlHandler: expect.any(Function),
    });
    session.logout();
    expect(oidc.logoffAndRevokeTokens).toHaveBeenLastCalledWith(undefined, {
      urlHandler: expect.any(Function),
    });
    platform.isNative.mockReturnValue(false);
  });

  it('should give the access token for streams opened with fetch', async () => {
    await expect(session.accessToken()).resolves.toBe('token-1');
  });

  it('should log out revoking the tokens', () => {
    session.logout();
    expect(oidc.logoffAndRevokeTokens).toHaveBeenCalledWith(undefined, {});
  });
});
