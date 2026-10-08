import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { NotificationsApi } from '../../core/api/notifications-api';
import { UsersApi } from '../../core/api/users-api';
import { ApproximateLocation, LocationError } from '../../core/geo/approximate-location';
import { SavedAlert } from '../../shared/model/notifications';
import { SavedAlerts } from './saved-alerts';

const AFTER_WORK: SavedAlert = {
  id: 'a1',
  name: 'Pádel al salir',
  activities: ['PADEL'],
  level: 'INTERMEDIATE',
  latitude: 40.39,
  longitude: -3.63,
  radiusMeters: 3000,
  days: ['TUESDAY', 'MONDAY'],
  from: '17:00:00',
  to: '21:00:00',
};

describe('SavedAlerts', () => {
  let fixture: ComponentFixture<SavedAlerts>;
  let component: SavedAlerts & Record<string, unknown>;
  const api = {
    alerts: vi.fn(),
    createAlert: vi.fn(),
    updateAlert: vi.fn(),
    deleteAlert: vi.fn(),
  };
  const users = { myProfile: vi.fn() };
  const location = { current: vi.fn() };

  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const call = <T>(name: string, ...args: unknown[]) =>
    (component[name] as (...a: unknown[]) => T)(...args);
  const form = () =>
    component['form'] as unknown as {
      patchValue: (value: object) => void;
      getRawValue: () => Record<string, unknown>;
    };
  const click = async (selector: string) => {
    element().querySelector<HTMLButtonElement>(`${selector} button`)!.click();
    await render();
  };

  const create = async (alerts: SavedAlert[] = [AFTER_WORK]) => {
    api.alerts.mockReturnValue(of(alerts));
    fixture = TestBed.createComponent(SavedAlerts);
    component = fixture.componentInstance as SavedAlerts & Record<string, unknown>;
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    users.myProfile.mockReturnValue(
      of({
        userId: 'lucia',
        displayName: 'Lucía',
        zone: { name: 'Vallecas', latitude: 40.39, longitude: -3.63 },
        hobbies: [],
      }),
    );
    api.createAlert.mockImplementation((alert: SavedAlert) => of({ ...alert, id: 'new' }));
    api.updateAlert.mockImplementation((id: string, alert: SavedAlert) => of({ ...alert, id }));
    api.deleteAlert.mockReturnValue(of(undefined));
    TestBed.configureTestingModule({
      imports: [SavedAlerts, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: NotificationsApi, useValue: api },
        { provide: UsersApi, useValue: users },
        { provide: ApproximateLocation, useValue: location },
      ],
    });
  });

  it('should list my alerts with a readable summary', async () => {
    await create();
    expect(element().querySelector('.saved-alert__name')?.textContent).toContain('Pádel al salir');
    expect(element().querySelector('.saved-alert__summary')?.textContent).toContain(
      'Pádel · Intermedio · a 3 km · Lunes, Martes · de 17:00 a 21:00',
    );
  });

  it('should explain how alerts work when there are none, and handle a load error', async () => {
    await create([]);
    expect(element().querySelector('.alerts-empty')?.textContent).toContain(
      'Aún no tienes alertas',
    );

    api.alerts.mockReturnValue(throwError(() => new Error('down')));
    fixture = TestBed.createComponent(SavedAlerts);
    await render();
    expect(element().querySelector('.alerts-error')).not.toBeNull();
  });

  it('should create an alert in the zone of the profile', async () => {
    await create([]);
    await click('.new-alert');
    expect(form().getRawValue()['latitude']).toBe(40.39);

    form().patchValue({
      name: '  Tenis el finde  ',
      radiusMeters: 5000,
      anyTime: false,
      from: '09:00',
    });
    call('toggle', 'activities', 'TENNIS');
    call('toggle', 'days', 'SATURDAY');
    call('toggle', 'days', 'SUNDAY');
    call('toggle', 'days', 'SUNDAY');
    call('save');
    await render();

    expect(api.createAlert).toHaveBeenCalledWith({
      name: 'Tenis el finde',
      activities: ['TENNIS'],
      level: null,
      latitude: 40.39,
      longitude: -3.63,
      radiusMeters: 5000,
      days: ['SATURDAY'],
      from: '09:00',
      to: '21:00',
    });
    expect(element().querySelectorAll('.saved-alert')).toHaveLength(1);
    expect(element().querySelector('.status-message')?.textContent).toContain('Alerta guardada');
  });

  it('should edit and delete an alert', async () => {
    await create();
    await click('.edit-alert');
    expect(form().getRawValue()).toMatchObject({
      name: 'Pádel al salir',
      from: '17:00',
      anyTime: false,
    });

    form().patchValue({ name: 'Pádel por la tarde', anyTime: true });
    call('save');
    await render();
    expect(api.updateAlert).toHaveBeenCalledWith(
      'a1',
      expect.objectContaining({ name: 'Pádel por la tarde', from: null, to: null }),
    );
    expect(element().querySelector('.saved-alert__name')?.textContent).toContain(
      'Pádel por la tarde',
    );

    await click('.delete-alert');
    expect(api.deleteAlert).toHaveBeenCalledWith('a1');
    expect(element().querySelector('.saved-alert')).toBeNull();
    expect(element().querySelector('.status-message')?.textContent).toContain('Alerta borrada');
  });

  it('should explain the limit and the errors of the service', async () => {
    await create(Array.from({ length: 5 }, (_, index) => ({ ...AFTER_WORK, id: `a${index}` })));
    expect(element().querySelector('.new-alert')).toBeNull();
    expect(element().querySelector('.alerts-limit')?.textContent).toContain('hasta 5 alertas');

    await create([]);
    await click('.new-alert');
    form().patchValue({ name: 'Pádel' });
    api.createAlert.mockReturnValue(throwError(() => ({ error: { code: 'alerts.limit' } })));
    call('save');
    await render();
    expect(element().querySelector('.status-message')?.textContent).toContain(
      'Ya tienes el máximo de alertas',
    );
  });

  it('should ask for a zone and take the location of the device', async () => {
    users.myProfile.mockReturnValue(
      of({ userId: 'lucia', displayName: 'Lucía', zone: null, hobbies: [] }),
    );
    await create([]);
    await click('.new-alert');
    form().patchValue({ name: 'Pádel' });
    call('save');
    await render();
    expect(api.createAlert).not.toHaveBeenCalled();
    expect(element().querySelector('.status-message')?.textContent).toContain('Elige una zona');

    location.current.mockRejectedValueOnce(new LocationError('denied'));
    await call<Promise<void>>('useMyLocation');
    await render();
    expect(element().querySelector('.status-message')).not.toBeNull();

    location.current.mockResolvedValue({ latitude: 40.42, longitude: -3.7 });
    await call<Promise<void>>('useMyLocation');
    expect(form().getRawValue()).toMatchObject({ latitude: 40.42, longitude: -3.7 });

    await click('.cancel-alert');
    expect(element().querySelector('.alert-form')).toBeNull();
  });

  it('should show the summary in English', async () => {
    await create();
    TestBed.inject(TranslocoService).setActiveLang('en');
    await render();
    expect(element().querySelector('.saved-alert__summary')?.textContent).toContain(
      'Padel · Intermediate · 3 km away · Monday, Tuesday · from 17:00 to 21:00',
    );
  });
});
