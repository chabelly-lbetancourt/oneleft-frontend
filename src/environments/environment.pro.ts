/**
 * pro (production) environment. As in pre, the web app, the API Gateway (/api) and Keycloak (/auth) are served from
 * the same origin behind Caddy, so no host name is compiled into the bundle and the same image works on any domain.
 *
 * The Android app is not served from that origin: its build passes the host explicitly
 *   ng build --configuration production --define "ONELEFT_ORIGIN='https://<host>'"
 */
declare const ONELEFT_ORIGIN: string | undefined;

const origin =
  typeof ONELEFT_ORIGIN === 'string' && ONELEFT_ORIGIN.length > 0
    ? ONELEFT_ORIGIN
    : (globalThis.location?.origin ?? '');

export const environment = {
  name: 'pro',
  apiUrl: origin,
  auth: {
    authority: `${origin}/auth/realms/oneleft`,
    clientId: 'oneleft-web',
  },
};
