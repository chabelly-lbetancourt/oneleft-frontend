import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Android app: the same Angular build as the web, served from https://localhost inside the WebView.
 * ONELEFT_ANDROID_TARGET=local (npm run android:local) lets the app reach the development backend on http://localhost
 * through `adb reverse`; pre and pro builds only use https.
 */
const local = process.env['ONELEFT_ANDROID_TARGET'] === 'local';

/**
 * Oldest Android System WebView the app supports (#183): Chrome 119, the oldest Chrome of the browsers Angular 22
 * builds for («baseline widely available» on 2026-05-07), and enough for the CSS of the app (oklch and color-mix, and
 * Tailwind CSS 4, need 111). Below it Capacitor shows `server.errorPath` instead of an app with no styles.
 */
const MIN_WEBVIEW_VERSION = 119;

const config: CapacitorConfig = {
  appId: 'es.upm.miw.oneleft',
  appName: 'OneLeft',
  webDir: 'dist/oneleft/browser',
  android: {
    allowMixedContent: local,
    minWebViewVersion: MIN_WEBVIEW_VERSION,
  },
  server: {
    // A static page of public/ that asks to update the WebView: it needs neither the bundle nor modern CSS
    errorPath: 'webview-update.html',
  },
};

export default config;
