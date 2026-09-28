import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';
import { environment } from '../../../environments/environment';

/**
 * OpenID Connect con Keycloak: Authorization Code + PKCE (cliente público, sin secreto),
 * renovación silenciosa con refresh token y token añadido solo en las peticiones a la API de OneLeft.
 */
export const authConfig: PassedInitialConfig = {
  config: {
    authority: environment.auth.authority,
    clientId: environment.auth.clientId,
    redirectUrl: globalThis.location?.origin,
    postLogoutRedirectUri: globalThis.location?.origin,
    scope: 'openid profile email',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    secureRoutes: [environment.apiUrl],
    logLevel: LogLevel.Warn,
  },
};
