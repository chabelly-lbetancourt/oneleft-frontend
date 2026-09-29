import { computed, inject, Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';
import { Language } from '../i18n/language';

/**
 * The user's session exposed as signals. It hides the OIDC library from the rest of the application.
 */
@Injectable({ providedIn: 'root' })
export class Session {
  private readonly oidc = inject(OidcSecurityService);
  private readonly language = inject(Language);

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
  login(): void {
    this.oidc.authorize(undefined, { customParams: { ui_locales: this.language.current() } });
  }

  /** Skips the Keycloak form and goes straight to Google (identity provider brokered by Keycloak). */
  loginWithGoogle(): void {
    this.oidc.authorize(undefined, { customParams: { kc_idp_hint: 'google', ui_locales: this.language.current() } });
  }

  /** Opens the Keycloak registration form directly. */
  register(): void {
    this.oidc.authorize(undefined, { customParams: { prompt: 'create', ui_locales: this.language.current() } });
  }

  /** Current access token, for requests the HTTP interceptor does not see (for example, streams opened with fetch). */
  accessToken(): Promise<string> {
    return firstValueFrom(this.oidc.getAccessToken());
  }

  logout(): void {
    this.oidc.logoffAndRevokeTokens().subscribe();
  }
}
