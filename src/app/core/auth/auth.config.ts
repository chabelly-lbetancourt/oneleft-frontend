import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';
import { environment } from '../../../environments/environment';

/**
 * OpenID Connect with Keycloak: Authorization Code + PKCE (public client, no secret),
 * silent renewal with a refresh token, and the token added only to requests to the OneLeft API.
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
