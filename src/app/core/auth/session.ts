import { computed, inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter, firstValueFrom } from 'rxjs';
import { Language } from '../i18n/language';
import { NativePlatform } from '../platform';

const RETURN_URL_KEY = 'oneleft.returnUrl';

/** Only paths inside the app: never another site (open redirect) */
const safeReturnUrl = (url: string | null | undefined): string | null =>
  url && url.startsWith('/') && !url.startsWith('//') && !url.startsWith('/\\') ? url : null;

/**
 * The user's session exposed as signals. It hides the OIDC library from the rest of the application.
 * The login always happens in Keycloak (Authorization Code + PKCE): the app never sees the password.
 */
@Injectable({ providedIn: 'root' })
export class Session {
  private readonly oidc = inject(OidcSecurityService);
  private readonly language = inject(Language);
  private readonly router = inject(Router);
  private readonly platform = inject(NativePlatform);

  constructor() {
    // Back from Keycloak: once the router has handled the callback, open the page that asked for the login
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const url = this.isAuthenticated() ? this.takeReturnUrl() : null;
      if (url) {
        void this.router.navigateByUrl(url);
      }
    });
  }

  readonly isAuthenticated = computed(() => this.oidc.authenticated().isAuthenticated);

  /** Keycloak subject: the same id the services use for the user. */
  readonly userId = computed<string | null>(() => this.oidc.userData().userData?.sub ?? null);

  readonly userName = computed<string>(() => {
    const data = this.oidc.userData().userData;
    return data?.name ?? data?.preferred_username ?? data?.email ?? '';
  });

  readonly initials = computed(() =>
    this.userName()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]!.toUpperCase())
      .join(''),
  );

  /** The Keycloak pages use the language of the app (ui_locales). */
  login(returnUrl?: string): void {
    this.keepReturnUrl(returnUrl);
    this.oidc.authorize(undefined, {
      customParams: { ui_locales: this.language.current() },
      ...this.urlHandler(),
    });
  }

  /** Skips the Keycloak form and goes straight to Google (identity provider brokered by Keycloak). */
  loginWithGoogle(returnUrl?: string): void {
    this.keepReturnUrl(returnUrl);
    this.oidc.authorize(undefined, {
      customParams: { kc_idp_hint: 'google', ui_locales: this.language.current() },
      ...this.urlHandler(),
    });
  }

  /** Opens the Keycloak registration form directly. */
  register(returnUrl?: string): void {
    this.keepReturnUrl(returnUrl);
    this.oidc.authorize(undefined, {
      customParams: { prompt: 'create', ui_locales: this.language.current() },
      ...this.urlHandler(),
    });
  }

  /** Current access token, for requests the HTTP interceptor does not see (for example, streams opened with fetch). */
  accessToken(): Promise<string> {
    return firstValueFrom(this.oidc.getAccessToken());
  }

  private keepReturnUrl(returnUrl?: string): void {
    const url = safeReturnUrl(returnUrl);
    try {
      if (url) {
        sessionStorage.setItem(RETURN_URL_KEY, url);
      } else {
        sessionStorage.removeItem(RETURN_URL_KEY);
      }
    } catch {
      // Without storage (private mode) the user simply lands on the home screen
    }
  }

  private takeReturnUrl(): string | null {
    try {
      const url = sessionStorage.getItem(RETURN_URL_KEY);
      sessionStorage.removeItem(RETURN_URL_KEY);
      return safeReturnUrl(url);
    } catch {
      return null;
    }
  }

  logout(): void {
    this.oidc.logoffAndRevokeTokens(undefined, this.urlHandler()).subscribe();
  }

  /**
   * In the Android app the Keycloak pages open in the system browser (Custom Tabs), not in the WebView: Google does
   * not allow signing in inside an embedded WebView, and the user sees the real address of the login page.
   */
  private urlHandler(): { urlHandler?: (url: string) => void } {
    return this.platform.isNative()
      ? { urlHandler: (url: string) => void this.platform.openBrowser(url) }
      : {};
  }
}
