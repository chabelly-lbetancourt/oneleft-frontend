import { Injectable } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
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
   * Shares an image with the Android share sheet (HU-056): the sheet takes files, so the image goes first to the
   * cache of the app, which Android empties when it needs room.
   */
  async shareImage(image: Blob, fileName: string, title: string): Promise<void> {
    const { uri } = await Filesystem.writeFile({
      path: fileName,
      data: await toBase64(image),
      directory: Directory.Cache,
    });
    await Share.share({ title, files: [uri], dialogTitle: title });
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

/** The data of an image as base64, without the «data:…;base64,» prefix (what Filesystem.writeFile takes). */
export const toBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
