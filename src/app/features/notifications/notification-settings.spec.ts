import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { NotificationsApi } from '../../core/api/notifications-api';
import { UsersApi } from '../../core/api/users-api';
import { ApproximateLocation, LocationError } from '../../core/geo/approximate-location';
import { PushState, WebPush } from '../../core/push/web-push';
import { NotificationPreferences } from '../../shared/model/notifications';
import { NotificationSettings } from './notification-settings';

const DEFAULTS: NotificationPreferences = {
  enabled: false,
  latitude: null,
  longitude: null,
  radiusMeters: 3000,
  activities: [],
  quietHours: { start: '23:00:00', end: '08:00:00' },
  maxPerDay: 5,
};

describe('NotificationSettings', () => {
  let fixture: ComponentFixture<NotificationSettings>;
  let component: NotificationSettings & Record<string, unknown>;
  const api = { preferences: vi.fn(), savePreferences: vi.fn() };
  const users = { myProfile: vi.fn() };
  const location = { current: vi.fn() };
  const pushState = signal<PushState>('off');
  const push = {
    state: pushState,
    refresh: vi.fn(async () => pushState()),
    enable: vi.fn(async () => {
      pushState.set('on');
      return pushState();
    }),
    disable: vi.fn(async () => {
      pushState.set('off');
      return pushState();
    }),
  };

  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const call = <T>(name: string, ...args: unknown[]) =>
    (component[name] as (...a: unknown[]) => T)(...args);

  const create = async (preferences = DEFAULTS) => {
    api.preferences.mockReturnValue(of(preferences));
    fixture = TestBed.createComponent(NotificationSettings);
    component = fixture.componentInstance as NotificationSettings & Record<string, unknown>;
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    pushState.set('off');
    users.myProfile.mockReturnValue(
      of({
        userId: 'lucia',
        displayName: 'Lucía',
        zone: { name: 'Vallecas', latitude: 40.39, longitude: -3.63 },
        hobbies: [],
      }),
    );
    api.savePreferences.mockImplementation((saved: NotificationPreferences) => of(saved));
    TestBed.configureTestingModule({
      imports: [NotificationSettings, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: NotificationsApi, useValue: api },
        { provide: UsersApi, useValue: users },
        { provide: ApproximateLocation, useValue: location },
        { provide: WebPush, useValue: push },
      ],
    });
  });

  it('should turn the notices on around the zone of the profile, for chosen activities', async () => {
    await create();
    expect(element().textContent).toContain('Elige una zona para recibir avisos.');
    expect(push.refresh).toHaveBeenCalled();

    call('useProfileZone');
    call('toggleActivity', 'PADEL');
    call('toggleActivity', 'TENNIS');
    call('toggleActivity', 'TENNIS');
    (component['form'] as { patchValue: (v: object) => void }).patchValue({
      enabled: true,
      radiusMeters: 5000,
      quiet: false,
      maxPerDay: 10,
    });
    await render();
    expect(element().querySelector('.zone-coordinates')?.textContent).toContain('40.39, -3.63');
    expect(
      element().querySelector('.activity-chip[aria-pressed="true"]')?.textContent?.trim(),
    ).toBe('Pádel');

    call('save');
    await render();

    expect(api.savePreferences).toHaveBeenCalledWith({
      enabled: true,
      latitude: 40.39,
      longitude: -3.63,
      radiusMeters: 5000,
      activities: ['PADEL'],
      quietHours: null,
      maxPerDay: 10,
    });
    expect(element().querySelector('.status-message')?.textContent).toContain(
      'te avisaremos de los planes que te encajen',
    );
  });

  it('should keep the quiet hours and say when the notices are off', async () => {
    await create();

    call('save');
    await render();

    expect(api.savePreferences.mock.calls[0][0]).toMatchObject({
      enabled: false,
      quietHours: { start: '23:00', end: '08:00' },
    });
    expect(element().querySelector('.status-message')?.textContent).toContain(
      'Los avisos están desactivados',
    );
  });

  it('should ask for a zone before turning the notices on', async () => {
    await create();
    (component['form'] as { patchValue: (v: object) => void }).patchValue({ enabled: true });

    call('save');
    await render();

    expect(api.savePreferences).not.toHaveBeenCalled();
    expect(element().querySelector('.status-message')?.textContent).toContain(
      'Elige una zona para recibir avisos',
    );
  });

  it('should show the error of the service in the language of the app', async () => {
    await create({ ...DEFAULTS, enabled: true, latitude: 40.39, longitude: -3.63 });
    api.savePreferences.mockReturnValue(
      throwError(() => ({ error: { code: 'notifications.radius' } })),
    );

    call('save');
    await render();

    expect(element().querySelector('.status-message')?.textContent).toContain(
      'La distancia debe estar entre 0,5 y 20 km',
    );
  });

  it('should take the zone from the location of the device', async () => {
    await create();
    location.current.mockResolvedValueOnce({ latitude: 40.41, longitude: -3.7 });
    await call<Promise<void>>('useMyLocation');
    expect((component['form'] as { value: { latitude: number } }).value.latitude).toBe(40.41);

    location.current.mockRejectedValueOnce(new LocationError('denied'));
    await call<Promise<void>>('useMyLocation');
    await render();
    expect(element().querySelector('.status-message')).not.toBeNull();
  });

  it('should turn Web Push on and off in this browser', async () => {
    await create();
    expect(element().querySelector('.push-state')?.textContent).toContain(
      'solo te llegan con OneLeft abierto',
    );

    await call<Promise<void>>('togglePush');
    await render();
    expect(push.enable).toHaveBeenCalled();
    expect(element().querySelector('.push-state')?.textContent).toContain(
      'aunque OneLeft esté cerrado',
    );

    await call<Promise<void>>('togglePush');
    expect(push.disable).toHaveBeenCalled();

    push.enable.mockRejectedValueOnce(new Error('push service down'));
    await call<Promise<void>>('togglePush');
    await render();
    expect(element().querySelector('.status-message')?.textContent).toContain(
      'No se han podido activar los avisos en este navegador',
    );
  });

  it('should say when the notices cannot be loaded', async () => {
    api.preferences.mockReturnValue(throwError(() => new Error('down')));
    fixture = TestBed.createComponent(NotificationSettings);
    await render();
    expect(element().querySelector('.notifications-error')).not.toBeNull();
  });
});
