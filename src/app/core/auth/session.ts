import { computed, inject, Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

/**
 * The user's session exposed as signals. It hides the OIDC library from the rest of the application.
 */
@Injectable({ providedIn: 'root' })
export class Session {
  private readonly oidc = inject(OidcSecurityService);

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

  login(): void {
    this.oidc.authorize();
  }

  /** Opens the Keycloak registration form directly. */
  register(): void {
    this.oidc.authorize(undefined, { customParams: { prompt: 'create' } });
  }

  logout(): void {
    this.oidc.logoffAndRevokeTokens().subscribe();
  }
}
