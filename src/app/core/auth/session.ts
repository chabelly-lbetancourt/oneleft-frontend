import { computed, inject, Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

/**
 * Sesión del usuario expuesta como signals. Oculta la librería OIDC al resto de la aplicación.
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

  /** Abre directamente el formulario de registro de Keycloak. */
  register(): void {
    this.oidc.authorize(undefined, { customParams: { prompt: 'create' } });
  }

  logout(): void {
    this.oidc.logoffAndRevokeTokens().subscribe();
  }
}
