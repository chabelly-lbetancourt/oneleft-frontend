import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { FakeSession } from '../../../testing/fake-session';
import { translocoTesting } from '../../../testing/transloco-testing';
import { PlansApi } from '../../core/api/plans-api';
import { Session } from '../../core/auth/session';
import { ApproximateLocation, LocationError } from '../../core/geo/approximate-location';
import { UserEvents } from '../../core/realtime/user-events';
import { CheckIn, Plan, PlanCheckInNotice } from '../../shared/model/published-plan';
import { PlanCheckIn } from './plan-check-in';

const minutesFromNow = (minutes: number) => new Date(Date.now() + minutes * 60_000).toISOString();

const PLAN: Plan = {
  id: 'plan-1',
  organizerId: 'org',
  organizerName: 'Ana',
  activity: 'PADEL',
  title: 'Pádel 2 contra 2',
  description: null,
  meetingPoint: { name: 'Pistas', latitude: 40.391, longitude: -3.629 },
  startsAt: minutesFromNow(10),
  spots: 3,
  occupied: 1,
  freeSpots: 2,
  level: null,
  status: 'OPEN',
  publishedAt: new Date().toISOString(),
  participants: [{ userId: 'me', name: 'Lucía', joinedAt: new Date().toISOString() }],
  waitlist: [],
};

const ANA: CheckIn = { userId: 'org', name: 'Ana', at: minutesFromNow(-2) };

describe('PlanCheckIn', () => {
  let fixture: ComponentFixture<PlanCheckIn>;
  let checkIns: Subject<PlanCheckInNotice>;
  const api = {
    checkIn: vi.fn(),
    checkIns: vi.fn((): Observable<CheckIn[]> => of([])),
  };
  const location = { precise: vi.fn() };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async (plan: Plan = PLAN) => {
    fixture = TestBed.createComponent(PlanCheckIn);
    fixture.componentRef.setInput('plan', plan);
    await render();
  };
  const press = async () => {
    element().querySelector<HTMLButtonElement>('.check-in__button button')!.click();
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    api.checkIns.mockReturnValue(of([]));
    location.precise.mockResolvedValue({ latitude: 40.3911, longitude: -3.6291 });
    checkIns = new Subject();
    const session = new FakeSession();
    session.signIn('Lucía', 'me');
    TestBed.configureTestingModule({
      imports: [PlanCheckIn, translocoTesting()],
      providers: [
        { provide: PlansApi, useValue: api },
        { provide: Session, useValue: session },
        { provide: ApproximateLocation, useValue: location },
        { provide: UserEvents, useValue: { checkIn$: checkIns.asObservable() } },
      ],
    });
  });

  afterEach(() => vi.useRealTimers());

  it('should open from 15 minutes before the start to 30 minutes after it, unless cancelled', async () => {
    await create({ ...PLAN, startsAt: minutesFromNow(16) });
    expect(element().querySelector('.check-in')).toBeNull();
    expect(api.checkIns).not.toHaveBeenCalled();

    await create({ ...PLAN, startsAt: minutesFromNow(-29), status: 'IN_PROGRESS' });
    expect(element().querySelector('.check-in__button')?.textContent).toContain('He llegado');

    await create({ ...PLAN, startsAt: minutesFromNow(-31), status: 'IN_PROGRESS' });
    expect(element().querySelector('.check-in')).toBeNull();

    await create({ ...PLAN, status: 'CANCELLED' });
    expect(element().querySelector('.check-in')).toBeNull();
  });

  it('should open on its own when the time comes', async () => {
    vi.useFakeTimers();
    await create({ ...PLAN, startsAt: minutesFromNow(15.5) });
    expect(element().querySelector('.check-in')).toBeNull();

    vi.advanceTimersByTime(60_000);
    fixture.detectChanges();

    expect(element().querySelector('.check-in__button')).not.toBeNull();
    expect(api.checkIns).toHaveBeenCalledOnce();
  });

  it('should list who has already arrived, and say when nobody has', async () => {
    await create();
    expect(element().querySelector('.check-in__nobody')?.textContent).toContain(
      'Todavía no ha llegado nadie',
    );

    api.checkIns.mockReturnValue(of([ANA]));
    await create();
    expect(api.checkIns).toHaveBeenCalledWith('plan-1');
    expect(element().querySelector('.check-in__list')?.textContent).toMatch(/Ana\s*· \d{2}:\d{2}/);
  });

  it('should check in with a fresh location and show the time I arrived', async () => {
    api.checkIns.mockReturnValue(of([ANA]));
    const mine: CheckIn = { userId: 'me', name: 'Lucía', at: new Date().toISOString() };
    api.checkIn.mockReturnValue(of(mine));
    await create();

    await press();

    expect(location.precise).toHaveBeenCalledOnce();
    expect(api.checkIn).toHaveBeenCalledWith('plan-1', { latitude: 40.3911, longitude: -3.6291 });
    expect(element().querySelector('.check-in__done')?.textContent).toMatch(
      /Has llegado a las \d{2}:\d{2}/,
    );
    expect(element().querySelector('.check-in__button')).toBeNull();
    // Like the other confirmations of the plan, not in the color of the warnings
    expect(element().querySelector('p-message.check-in__done')?.getAttribute('severity')).toBe(
      'success',
    );
    const people = [...element().querySelectorAll('.check-in__name')].map(
      (name) => name.textContent,
    );
    expect(people).toEqual(['Ana', 'Tú']);
  });

  it('should say why the check-in was rejected and let me try again', async () => {
    api.checkIn.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 409, error: { code: 'checkIn.tooFar' } })),
    );
    await create();

    await press();

    expect(element().querySelector('.check-in__error')?.textContent).toContain(
      'Tienes que estar a menos de 150 m del punto de encuentro.',
    );
    expect(element().querySelector('.check-in__button button')?.hasAttribute('disabled')).toBe(
      false,
    );
  });

  it('should not send anything without the location of the device', async () => {
    location.precise.mockRejectedValue(new LocationError('denied'));
    await create();

    await press();

    expect(api.checkIn).not.toHaveBeenCalled();
    expect(element().querySelector('.check-in__error')?.textContent).toContain(
      'No se ha podido obtener tu ubicación',
    );
  });

  it('should refresh who has arrived when someone of this plan checks in', async () => {
    await create();
    api.checkIns.mockReturnValue(of([ANA]));

    checkIns.next({ planId: 'other', title: 'Otro', name: 'Diego' });
    expect(api.checkIns).toHaveBeenCalledOnce();

    checkIns.next({ planId: 'plan-1', title: 'Pádel 2 contra 2', name: 'Ana' });
    await render();
    expect(api.checkIns).toHaveBeenCalledTimes(2);
    expect(element().querySelector('.check-in__list')?.textContent).toContain('Ana');
  });
});
