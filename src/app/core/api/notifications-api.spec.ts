import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationPreferences } from '../../shared/model/notifications';
import { NotificationsApi } from './notifications-api';

describe('NotificationsApi', () => {
  const base = `${environment.apiUrl}/api/v1/notifications`;
  let api: NotificationsApi;
  let http: HttpTestingController;
  const preferences: NotificationPreferences = {
    enabled: true,
    latitude: 40.39,
    longitude: -3.63,
    radiusMeters: 3000,
    activities: ['PADEL'],
    quietHours: null,
    maxPerDay: 5,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(NotificationsApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should read and save the preferences through the gateway', () => {
    api.preferences().subscribe();
    http.expectOne({ method: 'GET', url: `${base}/preferences` }).flush(preferences);

    api.savePreferences(preferences).subscribe();
    const save = http.expectOne({ method: 'PUT', url: `${base}/preferences` });
    expect(save.request.body).toEqual(preferences);
    save.flush(preferences);
  });

  it('should give the Web Push key, or null when the server has it off', async () => {
    const key = firstValueFrom(api.pushPublicKey());
    http.expectOne(`${base}/push/public-key`).flush({ publicKey: 'BKey' });
    expect(await key).toBe('BKey');

    const off = firstValueFrom(api.pushPublicKey());
    http.expectOne(`${base}/push/public-key`).flush(null, { status: 404, statusText: 'Not Found' });
    expect(await off).toBeNull();
  });

  it('should register and remove the subscription of this browser', () => {
    const subscription = {
      endpoint: 'https://push.example.org/1',
      keys: { p256dh: 'k', auth: 'a' },
      language: 'es',
    };
    api.subscribe(subscription).subscribe();
    const put = http.expectOne({ method: 'PUT', url: `${base}/push/subscriptions` });
    expect(put.request.body).toEqual(subscription);
    put.flush(null);

    api.unsubscribe('https://push.example.org/1').subscribe();
    const remove = http.expectOne(
      (request) => request.method === 'DELETE' && request.url === `${base}/push/subscriptions`,
    );
    expect(remove.request.params.get('endpoint')).toBe('https://push.example.org/1');
    remove.flush(null);
  });
});
