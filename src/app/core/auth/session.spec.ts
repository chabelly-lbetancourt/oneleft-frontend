import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { Language } from '../i18n/language';
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
  let session: Session;

  beforeEach(() => {
    vi.clearAllMocks();
    authenticated.set({ isAuthenticated: false, allConfigsAuthenticated: [] });
    userData.set({ userData: null, allUserData: [] });
    TestBed.configureTestingModule({ providers: [
        { provide: OidcSecurityService, useValue: oidc },
        { provide: Language, useValue: { current: signal('en') } },
      ], });
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
    expect(oidc.authorize).toHaveBeenCalledWith(undefined, { customParams: { prompt: 'create', ui_locales: 'en' } });
  });

  it('should give the access token for streams opened with fetch', async () => {
    await expect(session.accessToken()).resolves.toBe('token-1');
  });

  it('should log out revoking the tokens', () => {
    session.logout();
    expect(oidc.logoffAndRevokeTokens).toHaveBeenCalled();
  });
});
