import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { PlansApi } from '../../core/api/plans-api';
import { UsersApi } from '../../core/api/users-api';
import { ApproximateLocation } from '../../core/geo/approximate-location';
import { Availability } from '../../shared/model/published-plan';
import { FreeNow } from './free-now';

const FREE: Availability = {
  until: '2026-11-16T19:30:00Z',
  latitude: 40.39,
  longitude: -3.63,
  interests: [{ activity: 'PADEL', level: 'INTERMEDIATE' }],
};

describe('FreeNow', () => {
  let fixture: ComponentFixture<FreeNow>;
  const plans = {
    myAvailability: vi.fn(),
    startAvailability: vi.fn(),
    stopAvailability: vi.fn(),
  };
  const users = { myProfile: vi.fn() };
  const location = { current: vi.fn() };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const click = async (selector: string) => {
    element().querySelector<HTMLButtonElement>(`${selector} button`)!.click();
    await render();
    // Turning free mode on waits for the location first
    await new Promise((resolve) => setTimeout(resolve));
    await render();
  };

  const create = async (availability: Availability | null = null) => {
    plans.myAvailability.mockReturnValue(of(availability));
    fixture = TestBed.createComponent(FreeNow);
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    users.myProfile.mockReturnValue(
      of({
        userId: 'lucia',
        displayName: 'Lucía',
        zone: { name: 'Vallecas', latitude: 40.39, longitude: -3.63 },
        hobbies: [
          { activity: 'PADEL', level: 'INTERMEDIATE' },
          { activity: 'TENNIS', level: 'BEGINNER' },
        ],
      }),
    );
    plans.startAvailability.mockReturnValue(of(FREE));
    plans.stopAvailability.mockReturnValue(of(undefined));
    TestBed.configureTestingModule({
      imports: [FreeNow, translocoTesting()],
      providers: [
        { provide: PlansApi, useValue: plans },
        { provide: UsersApi, useValue: users },
        { provide: ApproximateLocation, useValue: location },
      ],
    });
  });

  it('should turn free mode on for the chosen hobbies around the device', async () => {
    location.current.mockResolvedValue({ latitude: 40.391, longitude: -3.628 });
    await create();
    expect(element().textContent).toContain('¿Estás libre ahora?');

    await click('.start-free');
    expect(element().querySelectorAll('.choice--on')).toHaveLength(2);
    element().querySelectorAll<HTMLButtonElement>('.activity-chip')[1].click();
    await render();
    await click('.confirm-free');

    expect(plans.startAvailability).toHaveBeenCalledWith({
      hours: 2,
      latitude: 40.391,
      longitude: -3.628,
      interests: [{ activity: 'PADEL', level: 'INTERMEDIATE' }],
    });
    expect(element().querySelector('.free-now--on')?.textContent).toMatch(
      /Estás libre hasta las \d{2}:\d{2}/,
    );
    expect(element().querySelector('.free-now__interests')?.textContent).toContain(
      'Pádel · Intermedio',
    );
  });

  it('should use the zone of the profile without location, and explain when there is neither', async () => {
    location.current.mockRejectedValue(new Error('denied'));
    await create();
    await click('.start-free');
    await click('.confirm-free');
    expect(plans.startAvailability).toHaveBeenCalledWith(
      expect.objectContaining({ latitude: 40.39, longitude: -3.63 }),
    );

    users.myProfile.mockReturnValue(of({ userId: 'l', displayName: 'L', zone: null, hobbies: [] }));
    plans.startAvailability.mockClear();
    await create();
    await click('.start-free');
    await click('.confirm-free');
    expect(plans.startAvailability).not.toHaveBeenCalled();
    expect(element().querySelector('.free-now__error')?.textContent).toContain(
      'Activa la ubicación',
    );
  });

  it('should explain a failure and let the person cancel', async () => {
    location.current.mockResolvedValue({ latitude: 40.39, longitude: -3.63 });
    plans.startAvailability.mockReturnValue(throwError(() => new Error('down')));
    await create();
    await click('.start-free');
    await click('.confirm-free');
    expect(element().querySelector('.free-now__error')?.textContent).toContain(
      'No se ha podido activar',
    );

    await click('.cancel-free');
    expect(element().querySelector('.start-free')).not.toBeNull();
  });

  it('should show nothing until it knows whether I am free', async () => {
    plans.myAvailability.mockReturnValue(new Subject<Availability | null>());
    fixture = TestBed.createComponent(FreeNow);
    await render();
    expect(element().querySelector('.free-now')).toBeNull();
  });

  it('should show until when and turn free mode off', async () => {
    await create(FREE);
    expect(element().querySelector('.free-now--on')).not.toBeNull();

    await click('.stop-free');

    expect(plans.stopAvailability).toHaveBeenCalled();
    expect(element().querySelector('.free-now--on')).toBeNull();
    expect(element().querySelector('.start-free')).not.toBeNull();
  });
});
