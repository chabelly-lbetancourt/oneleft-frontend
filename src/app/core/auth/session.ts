import { computed, inject, Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';
import { Language } from '../i18n/language';
import { NativePlatform } from '../platform';

/**
 * The user's session exposed as signals. It hides the OIDC library from the rest of the application.
 */
@Injectable({ providedIn: 'root' })
export class Session {
  private readonly oidc = inject(OidcSecurityService);
  private readonly language = inject(Language);
  private readonly platform = inject(NativePlatform);

  readonly isAuthenticated = computed(() => this.oidc.authenticated().isAuthenticated);

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
  login(): void {
    this.oidc.authorize(undefined, { customParams: { ui_locales: this.language.current() }, ...this.urlHandler() });
  }

  /** Opens the Keycloak registration form directly. */
  register(): void {
    this.oidc.authorize(undefined, {
      customParams: { prompt: 'create', ui_locales: this.language.current() },
      ...this.urlHandler(),
    });
  }

  /** Current access token, for requests the HTTP interceptor does not see (for example, streams opened with fetch). */
  accessToken(): Promise<string> {
    return firstValueFrom(this.oidc.getAccessToken());
  }

  logout(): void {
    this.oidc.logoffAndRevokeTokens(undefined, this.urlHandler()).subscribe();
  }

  /**
   * In the Android app the Keycloak pages open in the system browser (Custom Tabs), not in the WebView: Google does
   * not allow signing in inside an embedded WebView, and the user sees the real address of the login page.
   */
  private urlHandler(): { urlHandler?: (url: string) => void } {
    return this.platform.isNative() ? { urlHandler: (url: string) => void this.platform.openBrowser(url) } : {};
  }
}
