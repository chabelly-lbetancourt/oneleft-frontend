import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { NotificationsApi } from '../api/notifications-api';
import { Language } from '../i18n/language';
import { NativePlatform } from '../platform';

/**
 * Web Push in this browser (HU-006):
 * - unsupported: no Push API (or the Android app, whose notifications arrive with Firebase, frontend#55)
 * - unavailable: the server has no VAPID keys
 * - denied: the person blocked notifications for OneLeft in the browser
 * - off / on: this browser is (not) subscribed
 */
export type PushState = 'unsupported' | 'unavailable' | 'denied' | 'off' | 'on';

/** Service worker that shows the notices (public/push-sw.js). */
export const PUSH_WORKER = '/push-sw.js';

/** The VAPID key (base64url) as the Push API wants it. */
export const applicationServerKey = (base64Url: string): Uint8Array<ArrayBuffer> => {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

@Injectable({ providedIn: 'root' })
export class WebPush {
  private readonly api = inject(NotificationsApi);
  private readonly language = inject(Language);
  private readonly platform = inject(NativePlatform);

  readonly state = signal<PushState>('off');
  private publicKey: string | null = null;

  supported(): boolean {
    return (
      !this.platform.isNative() &&
      'serviceWorker' in navigator &&
      typeof PushManager !== 'undefined' &&
      typeof Notification !== 'undefined'
    );
  }

  /** Works out the state of this browser; call it before showing the option. */
  async refresh(): Promise<PushState> {
    if (!this.supported()) {
      return this.set('unsupported');
    }
    this.publicKey = await firstValueFrom(this.api.pushPublicKey());
    if (!this.publicKey) {
      return this.set('unavailable');
    }
    if (Notification.permission === 'denied') {
      return this.set('denied');
    }
    return this.set((await this.subscription()) ? 'on' : 'off');
  }

  /** Asks for permission (only after the person taps the button) and subscribes this browser. */
  async enable(): Promise<PushState> {
    if (!this.publicKey && (await this.refresh()) !== 'off') {
      return this.state();
    }
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return this.set(permission === 'denied' ? 'denied' : 'off');
    }
    await navigator.serviceWorker.register(PUSH_WORKER);
    const registration = await navigator.serviceWorker.ready;
    const subscription =
      (await registration.pushManager.getSubscription()) ??
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey(this.publicKey!),
      }));
    const json = subscription.toJSON();
    await firstValueFrom(
      this.api.subscribe({
        endpoint: subscription.endpoint,
        keys: { p256dh: json.keys?.['p256dh'] ?? '', auth: json.keys?.['auth'] ?? '' },
        language: this.language.current(),
      }),
    );
    return this.set('on');
  }

  async disable(): Promise<PushState> {
    const subscription = await this.subscription();
    if (subscription) {
      await firstValueFrom(this.api.unsubscribe(subscription.endpoint));
      await subscription.unsubscribe();
    }
    return this.set('off');
  }

  private async subscription(): Promise<PushSubscription | null> {
    const registration = await navigator.serviceWorker.getRegistration('/');
    return (await registration?.pushManager.getSubscription()) ?? null;
  }

  private set(state: PushState): PushState {
    this.state.set(state);
    return state;
  }
}
