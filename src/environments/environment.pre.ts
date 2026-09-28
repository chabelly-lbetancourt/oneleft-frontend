/**
 * pre (staging) environment. On AWS the web app, the API Gateway (/api) and Keycloak (/auth) are served from the
 * same origin behind the load balancer, so no host name is compiled into the bundle.
 *
 * The Android app is not served from that origin: its build passes the host explicitly
 *   ng build --configuration pre --define "ONELEFT_ORIGIN='https://<pre host>'"
 */
declare const ONELEFT_ORIGIN: string | undefined;

const origin =
  typeof ONELEFT_ORIGIN === 'string' && ONELEFT_ORIGIN.length > 0 ? ONELEFT_ORIGIN : (globalThis.location?.origin ?? '');

export const environment = {
  name: 'pre',
  apiUrl: origin,
  auth: {
    authority: `${origin}/auth/realms/oneleft`,
    clientId: 'oneleft-web',
  },
};
