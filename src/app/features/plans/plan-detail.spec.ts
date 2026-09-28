import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { of, Subject, throwError } from 'rxjs';
import { FakeSession } from '../../../testing/fake-session';
import { translocoTesting } from '../../../testing/transloco-testing';
import { PlansApi } from '../../core/api/plans-api';
import { Session } from '../../core/auth/session';
import { UserEvents } from '../../core/realtime/user-events';
import { Plan, PlanJoinedNotice } from '../../shared/model/published-plan';
import { PlanDetail } from './plan-detail';

const PLAN: Plan = {
  id: 'plan-1',
  organizerId: 'org',
  organizerName: 'Ana Test',
  activity: 'PADEL',
  title: 'Partido de pádel, falta uno',
  description: 'Pista cubierta',
  meetingPoint: { name: 'Pistas del polideportivo', latitude: 40.391, longitude: -3.629 },
  startsAt: new Date(Date.now() + 90 * 60_000).toISOString(),
  spots: 2,
  occupied: 0,
  freeSpots: 2,
  level: 'INTERMEDIATE',
  status: 'OPEN',
  publishedAt: new Date().toISOString(),
  participants: [],
};

const LUCIA = { userId: 'lucia', name: 'Lucía Martín', joinedAt: new Date().toISOString() };

describe('PlanDetail', () => {
  let fixture: ComponentFixture<PlanDetail>;
  let session: FakeSession;
  let notices: Subject<PlanJoinedNotice>;
  const api = { plan: vi.fn(), join: vi.fn() };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  const create = async (plan: unknown, published?: string, me = 'me') => {
    api.plan.mockReturnValue(plan instanceof Error ? throwError(() => plan) : of(plan));
    session.signIn('Me', me);
    fixture = TestBed.createComponent(PlanDetail);
    fixture.componentRef.setInput('id', 'plan-1');
    if (published) {
      fixture.componentRef.setInput('published', published);
    }
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    session = new FakeSession();
    notices = new Subject();
    TestBed.configureTestingModule({
      imports: [PlanDetail, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: PlansApi, useValue: api },
        { provide: Session, useValue: session },
        { provide: UserEvents, useValue: { joined$: notices.asObservable() } },
      ],
    });
  });

  it('should show the plan with its time, place and spots', async () => {
    await create(PLAN, '1');
    const card = element().querySelector('.plan-card')!;
    expect(api.plan).toHaveBeenCalledWith('plan-1');
    expect(card.textContent).toContain('Partido de pádel, falta uno');
    expect(card.textContent).toContain('Pádel');
    expect(card.textContent).toContain('Faltan 2');
    expect(card.textContent).toContain('Intermedio');
    expect(card.textContent).toContain('Organiza Ana Test');
    expect(element().querySelector('.plan-time')?.textContent).toMatch(/en 1 h (29|30) min/);
    expect(card.querySelector('a')?.getAttribute('href')).toContain('mlat=40.391');
    expect(element().querySelector('.published-message')).not.toBeNull();
    expect(element().querySelector('.participants')?.textContent).toContain('Aún no se ha apuntado nadie');
  });

  it('should accept any level and a single free spot', async () => {
    await create({ ...PLAN, level: null, freeSpots: 1, description: null });
    expect(element().textContent).toContain('Cualquier nivel');
    expect(element().textContent).toContain('Falta 1');
    expect(element().querySelector('.published-message')).toBeNull();
  });

  it('should join the plan and show that I am in', async () => {
    await create(PLAN);
    api.join.mockReturnValue(of({ ...PLAN, occupied: 1, freeSpots: 1, participants: [{ ...LUCIA, userId: 'me', name: 'Me' }] }));

    (element().querySelector('.join-button button') as HTMLButtonElement).click();
    await render();

    expect(api.join).toHaveBeenCalledWith('plan-1');
    expect(element().querySelector('.join-button')).toBeNull();
    expect(element().querySelector('.joined-message')?.textContent).toContain('¡Estás dentro!');
    expect(element().querySelector('.participant')?.textContent).toContain('(tú)');
  });

  it('should explain why joining failed and show the current state', async () => {
    await create(PLAN);
    api.join.mockReturnValue(throwError(() => ({ error: { code: 'plan.full' } })));
    api.plan.mockReturnValue(of({ ...PLAN, status: 'FULL', occupied: 2, freeSpots: 0, participants: [LUCIA, { ...LUCIA, userId: 'diego', name: 'Diego' }] }));

    (element().querySelector('.join-button button') as HTMLButtonElement).click();
    await render();

    expect(element().querySelector('.join-error')?.textContent).toContain('alguien ha ocupado la última plaza');
    expect(element().querySelector('.full-tag')?.textContent).toContain('Completo');
    expect(element().querySelectorAll('.participant').length).toBe(2);
    expect(element().querySelector('.participant')?.textContent).toContain('Lucía Martín');
  });

  it('should tell apart my plans, plans I joined and closed plans', async () => {
    await create(PLAN, undefined, 'org');
    expect(element().querySelector('.organizer-hint')).not.toBeNull();
    expect(element().querySelector('.join-button')).toBeNull();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [PlanDetail, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: PlansApi, useValue: api },
        { provide: Session, useValue: session },
        { provide: UserEvents, useValue: { joined$: notices.asObservable() } },
      ],
    });
    await create({ ...PLAN, participants: [{ ...LUCIA, userId: 'me' }] });
    expect(element().querySelector('.joined-message')?.textContent).toContain('Estás apuntado');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [PlanDetail, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: PlansApi, useValue: api },
        { provide: Session, useValue: session },
        { provide: UserEvents, useValue: { joined$: notices.asObservable() } },
      ],
    });
    await create({ ...PLAN, startsAt: new Date(Date.now() - 60_000).toISOString() });
    expect(element().textContent).toContain('ya no admite gente');
  });

  it('should reload the plan when someone joins it', async () => {
    await create(PLAN, undefined, 'org');
    api.plan.mockReturnValue(of({ ...PLAN, occupied: 1, freeSpots: 1, participants: [LUCIA] }));

    notices.next({ planId: 'other', title: 'Otro', participantName: 'Diego', freeSpots: 1, full: false });
    notices.next({ planId: 'plan-1', title: PLAN.title, participantName: 'Lucía', freeSpots: 1, full: false });
    await render();

    expect(api.plan).toHaveBeenCalledTimes(2);
    expect(element().querySelector('.participant')?.textContent).toContain('Lucía Martín');
  });

  it('should show the plan in English', async () => {
    await create(PLAN);
    TestBed.inject(TranslocoService).setActiveLang('en');
    await render();
    const card = element().querySelector('.plan-card')!;
    expect(card.textContent).toContain('2 spots left');
    expect(card.textContent).toContain('Intermediate');
    expect(card.textContent).toContain('Organized by Ana Test');
    expect(element().querySelector('.plan-time')?.textContent).toMatch(/At \d\d:\d\d · in 1 h (29|30) min/);
    expect(element().querySelector('.join-button')?.textContent).toContain("I'm in");
  });

  it('should explain when the plan does not exist', async () => {
    await create(new Error('404'));
    expect(element().querySelector('.plan-error')).not.toBeNull();
  });

  it('should build initials from the participant name', async () => {
    await create(PLAN);
    const initials = (fixture.componentInstance as unknown as { initials: (n: string) => string }).initials;
    expect(initials('lucía  martín gómez')).toBe('LM');
  });
});
