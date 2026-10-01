import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';
import { environment } from '../../../environments/environment';
import { isNativeApp, NATIVE_AUTH_CALLBACK } from '../platform';

/**
 * OpenID Connect with Keycloak: Authorization Code + PKCE (public client, no secret),
 * silent renewal with a refresh token, and the token added only to requests to the OneLeft API.
 * In the Android app Keycloak returns through the oneleft://callback deep link instead of the page origin.
 */
const returnUrl = isNativeApp() ? NATIVE_AUTH_CALLBACK : globalThis.location?.origin;

export const authConfig: PassedInitialConfig = {
  config: {
    authority: environment.auth.authority,
    clientId: environment.auth.clientId,
    redirectUrl: returnUrl,
    postLogoutRedirectUri: returnUrl,
    scope: 'openid profile email',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    secureRoutes: [environment.apiUrl],
    logLevel: LogLevel.Warn,
  },
};
