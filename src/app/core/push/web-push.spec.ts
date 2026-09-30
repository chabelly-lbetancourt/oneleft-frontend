import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { NotificationsApi } from '../api/notifications-api';
import { Language } from '../i18n/language';
import { NativePlatform } from '../platform';
import { applicationServerKey, PUSH_WORKER, WebPush } from './web-push';

/** The Push API of a browser, enough for the tests. */
class FakeBrowser {
  current: { endpoint: string; toJSON: () => unknown; unsubscribe: () => Promise<boolean> } | null =
    null;
  readonly subscription = {
    endpoint: 'https://push.example.org/send/1',
    toJSON: () => ({
      endpoint: this.subscription.endpoint,
      keys: { p256dh: 'BKeys', auth: 'secret' },
    }),
    unsubscribe: vi.fn(async () => {
      this.current = null;
      return true;
    }),
  };
  readonly pushManager = {
    getSubscription: vi.fn(async () => this.current),
    subscribe: vi.fn(async () => {
      this.current = this.subscription;
      return this.subscription;
    }),
  };
  readonly registration = { pushManager: this.pushManager };
  readonly serviceWorker = {
    register: vi.fn(async () => this.registration),
    ready: Promise.resolve(this.registration),
    getRegistration: vi.fn(async () => this.registration),
  };
  readonly notification = {
    permission: 'default' as NotificationPermission,
    requestPermission: vi.fn(async (): Promise<NotificationPermission> => 'granted'),
  };

  install(): void {
    Object.defineProperty(navigator, 'serviceWorker', {
      value: this.serviceWorker,
      configurable: true,
    });
    vi.stubGlobal('PushManager', class {});
    vi.stubGlobal('Notification', this.notification);
  }
}

describe('WebPush', () => {
  const api = {
    pushPublicKey: vi.fn(() => of<string | null>('BPublicKey_-')),
    subscribe: vi.fn(() => of(undefined)),
    unsubscribe: vi.fn(() => of(undefined)),
  };
  const platform = { isNative: vi.fn(() => false) };
  let browser: FakeBrowser;
  let push: WebPush;

  beforeEach(() => {
    vi.clearAllMocks();
    browser = new FakeBrowser();
    browser.install();
    TestBed.configureTestingModule({
      providers: [
        { provide: NotificationsApi, useValue: api },
        { provide: NativePlatform, useValue: platform },
        { provide: Language, useValue: { current: signal('es') } },
      ],
    });
    push = TestBed.inject(WebPush);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(navigator, 'serviceWorker');
  });

  it('should subscribe this browser with the server key and in the language of the app', async () => {
    expect(await push.refresh()).toBe('off');

    expect(await push.enable()).toBe('on');

    expect(browser.notification.requestPermission).toHaveBeenCalled();
    expect(browser.serviceWorker.register).toHaveBeenCalledWith(PUSH_WORKER);
    expect(browser.pushManager.subscribe).toHaveBeenCalledWith({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey('BPublicKey_-'),
    });
    expect(api.subscribe).toHaveBeenCalledWith({
      endpoint: 'https://push.example.org/send/1',
      keys: { p256dh: 'BKeys', auth: 'secret' },
      language: 'es',
    });
    expect(push.state()).toBe('on');
    expect(await push.refresh()).toBe('on');
  });

  it('should stop the notices in this browser', async () => {
    browser.current = browser.subscription;
    await push.refresh();

    expect(await push.disable()).toBe('off');

    expect(api.unsubscribe).toHaveBeenCalledWith('https://push.example.org/send/1');
    expect(browser.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should respect the permission of the browser', async () => {
    browser.notification.requestPermission.mockResolvedValueOnce('denied');
    expect(await push.enable()).toBe('denied');
    browser.notification.requestPermission.mockResolvedValueOnce('default');
    expect(await push.enable()).toBe('off');
    expect(api.subscribe).not.toHaveBeenCalled();

    browser.notification.permission = 'denied';
    expect(await push.refresh()).toBe('denied');
  });

  it('should know when this browser or the server cannot send notices', async () => {
    api.pushPublicKey.mockReturnValue(of(null));
    expect(await push.refresh()).toBe('unavailable');
    expect(await push.enable()).toBe('unavailable');
    expect(browser.notification.requestPermission).not.toHaveBeenCalled();
    api.pushPublicKey.mockReturnValue(of('BPublicKey_-'));

    platform.isNative.mockReturnValueOnce(true);
    expect(await push.refresh()).toBe('unsupported');

    vi.stubGlobal('PushManager', undefined);
    expect(push.supported()).toBe(false);
  });

  it('should turn the base64url key into the bytes the Push API wants', () => {
    expect(Array.from(applicationServerKey('BAEC_-8'))).toEqual([4, 1, 2, 255, 239]);
  });
});
