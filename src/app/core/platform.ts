import { Injectable } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core';
import { Share } from '@capacitor/share';

/** True inside the Android app (Capacitor), false in the browser. */
export const isNativeApp = (): boolean => Capacitor.isNativePlatform();

/**
 * Where Keycloak sends the user back after signing in or out inside the Android app: a deep link that opens the
 * app (intent filter in AndroidManifest.xml; the realm allows oneleft://*).
 */
export const NATIVE_AUTH_CALLBACK = 'oneleft://callback';

/** Native capabilities used by the app, behind a service so that the rest of the code can be tested in a browser. */
@Injectable({ providedIn: 'root' })
export class NativePlatform {
  isNative(): boolean {
    return isNativeApp();
  }

  /** Opens a page in the system browser (Custom Tabs on Android). */
  openBrowser(url: string): Promise<void> {
    return Browser.open({ url });
  }

  closeBrowser(): Promise<void> {
    return Browser.close();
  }

  /** Android share sheet: the WebView has no Web Share API. */
  async share(content: { title: string; text: string; url: string }): Promise<void> {
    await Share.share({ ...content, dialogTitle: content.title });
  }

  /**
   * Clock and icons of the system bars of the Android app (it draws edge to edge, under them): light over the dark
   * theme and dark over the light one. Nothing in the browser.
   */
  async setSystemBarsDark(dark: boolean): Promise<void> {
    if (!this.isNative()) {
      return;
    }
    try {
      await SystemBars.setStyle({ style: dark ? SystemBarsStyle.Dark : SystemBarsStyle.Light });
    } catch {
      // An Android without the plugin: the system decides
    }
  }

  onAppUrlOpen(listener: (event: URLOpenListenerEvent) => void): Promise<unknown> {
    return App.addListener('appUrlOpen', listener);
  }
}
