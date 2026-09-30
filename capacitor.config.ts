import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Android app: the same Angular build as the web, served from https://localhost inside the WebView.
 * ONELEFT_ANDROID_TARGET=local (npm run android:local) lets the app reach the development backend on http://localhost
 * through `adb reverse`; pre and pro builds only use https.
 */
const local = process.env['ONELEFT_ANDROID_TARGET'] === 'local';

const config: CapacitorConfig = {
  appId: 'es.upm.miw.oneleft',
  appName: 'OneLeft',
  webDir: 'dist/oneleft/browser',
  android: {
    allowMixedContent: local,
  },
};

export default config;
