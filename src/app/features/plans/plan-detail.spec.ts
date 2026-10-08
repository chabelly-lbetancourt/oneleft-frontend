import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { FakeSession } from '../../../testing/fake-session';
import { translocoTesting } from '../../../testing/transloco-testing';
import { PlansApi } from '../../core/api/plans-api';
import { Session } from '../../core/auth/session';
import { UserEvents } from '../../core/realtime/user-events';
import {
  Plan,
  PlanCancelledNotice,
  PlanJoinedNotice,
  PlanLeftNotice,
} from '../../shared/model/published-plan';
import { PlanDetail } from './plan-detail';
import { NativePlatform } from '../../core/platform';

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
  waitlist: [],
};

const LUCIA = { userId: 'lucia', name: 'Lucía Martín', joinedAt: new Date().toISOString() };

describe('PlanDetail', () => {
  let fixture: ComponentFixture<PlanDetail>;
  let session: FakeSession;
  let notices: Subject<PlanJoinedNotice>;
  let left: Subject<PlanLeftNotice>;
  let cancelled: Subject<PlanCancelledNotice>;
  const api = {
    plan: vi.fn(),
    publicPlan: vi.fn(),
    shareUrl: vi.fn((id: string) => `http://localhost:8080/share/plans/${id}`),
    join: vi.fn(),
    leave: vi.fn(),
    joinWaitlist: vi.fn(),
    leaveWaitlist: vi.fn(),
  };
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
    left = new Subject();
    cancelled = new Subject();
    TestBed.configureTestingModule({
      imports: [PlanDetail, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: PlansApi, useValue: api },
        { provide: Session, useValue: session },
        {
          provide: UserEvents,
          useValue: {
            joined$: notices.asObservable(),
            left$: left.asObservable(),
            spotFreed$: EMPTY,
            cancelled$: cancelled.asObservable(),
          },
        },
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
    expect(element().querySelector('.participants')?.textContent).toContain(
      'Aún no se ha apuntado nadie',
    );
  });

  it('should accept any level and a single free spot', async () => {
    await create({ ...PLAN, level: null, freeSpots: 1, description: null });
    expect(element().textContent).toContain('Cualquier nivel');
    expect(element().textContent).toContain('Falta 1');
    expect(element().querySelector('.published-message')).toBeNull();
  });

  it('should join the plan and show that I am in', async () => {
    await create(PLAN);
    api.join.mockReturnValue(
      of({
        ...PLAN,
        occupied: 1,
        freeSpots: 1,
        participants: [{ ...LUCIA, userId: 'me', name: 'Me' }],
      }),
    );

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
    api.plan.mockReturnValue(
      of({
        ...PLAN,
        status: 'FULL',
        occupied: 2,
        freeSpots: 0,
        participants: [LUCIA, { ...LUCIA, userId: 'diego', name: 'Diego' }],
      }),
    );

    (element().querySelector('.join-button button') as HTMLButtonElement).click();
    await render();

    expect(element().querySelector('.join-error')?.textContent).toContain(
      'alguien ha ocupado la última plaza',
    );
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
        {
          provide: UserEvents,
          useValue: {
            joined$: notices.asObservable(),
            left$: left.asObservable(),
            spotFreed$: EMPTY,
            cancelled$: EMPTY,
          },
        },
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
        {
          provide: UserEvents,
          useValue: {
            joined$: notices.asObservable(),
            left$: left.asObservable(),
            spotFreed$: EMPTY,
            cancelled$: EMPTY,
          },
        },
      ],
    });
    await create({ ...PLAN, startsAt: new Date(Date.now() - 60_000).toISOString() });
    expect(element().textContent).toContain('ya no admite gente');
  });

  it('should show that a plan has started or finished and offer nothing (HU-007)', async () => {
    const past = new Date(Date.now() - 60_000).toISOString();
    await create({
      ...PLAN,
      startsAt: past,
      status: 'IN_PROGRESS',
      participants: [{ ...LUCIA, userId: 'me' }],
    });
    expect(element().querySelector('.plan-state')?.textContent).toContain('En curso');
    expect(element().querySelector('.ended-hint')?.textContent).toContain('Ya ha empezado');
    expect(element().querySelector('.leave-button')).toBeNull();
    expect(element().querySelector('.join-button')).toBeNull();

    const component = fixture.componentInstance as unknown as {
      plan: { set: (plan: unknown) => void };
    };
    component.plan.set({ ...PLAN, startsAt: past, status: 'FINISHED' });
    fixture.detectChanges();
    expect(element().querySelector('.plan-state')?.textContent).toContain('Terminado');
    expect(element().querySelector('.ended-hint')?.textContent).toContain('ya terminó');

    component.plan.set({ ...PLAN, status: 'CANCELLED' });
    fixture.detectChanges();
    expect(element().querySelector('.ended-hint')?.textContent).toContain('se canceló');
  });

  it('should reload the plan when someone joins it', async () => {
    await create(PLAN, undefined, 'org');
    api.plan.mockReturnValue(of({ ...PLAN, occupied: 1, freeSpots: 1, participants: [LUCIA] }));

    notices.next({
      planId: 'other',
      title: 'Otro',
      participantName: 'Diego',
      freeSpots: 1,
      full: false,
    });
    notices.next({
      planId: 'plan-1',
      title: PLAN.title,
      participantName: 'Lucía',
      freeSpots: 1,
      full: false,
    });
    await render();

    expect(api.plan).toHaveBeenCalledTimes(2);
    expect(element().querySelector('.participant')?.textContent).toContain('Lucía Martín');
  });

  it('should leave the plan after confirming and hand the spot over', async () => {
    await create({
      ...PLAN,
      occupied: 1,
      freeSpots: 1,
      participants: [{ ...LUCIA, userId: 'me' }],
    });
    api.leave.mockReturnValue(of({ ...PLAN }));

    element().querySelector<HTMLButtonElement>('.leave-button button')!.click();
    await render();
    expect(element().querySelector('.leave-confirm')?.textContent).toContain('Tu plaza pasará');
    element().querySelector<HTMLButtonElement>('.leave-cancel button')!.click();
    await render();
    expect(element().querySelector('.leave-confirm')).toBeNull();

    element().querySelector<HTMLButtonElement>('.leave-button button')!.click();
    await render();
    element().querySelector<HTMLButtonElement>('.leave-yes button')!.click();
    await render();

    expect(api.leave).toHaveBeenCalledWith('plan-1');
    expect(element().querySelector('.left-message')?.textContent).toContain('Has salido del plan');
    expect(element().querySelector('.join-button')).not.toBeNull();
  });

  it('should wait for a spot of a full plan, show the position and leave the list', async () => {
    const full = {
      ...PLAN,
      spots: 1,
      occupied: 1,
      freeSpots: 0,
      status: 'FULL',
      participants: [LUCIA],
    };
    await create(full);
    expect(element().querySelector('.full-tag')).not.toBeNull();
    const diego = { userId: 'diego', name: 'Diego', joinedAt: '' };
    api.joinWaitlist.mockReturnValue(
      of({ ...full, waitlist: [diego, { userId: 'me', name: 'Me', joinedAt: '' }] }),
    );

    element().querySelector<HTMLButtonElement>('.waitlist-join button')!.click();
    await render();

    expect(api.joinWaitlist).toHaveBeenCalledWith('plan-1');
    expect(element().querySelector('.waiting-message')?.textContent).toContain('posición 2');
    expect(element().querySelector('.waitlist-count')?.textContent).toContain(
      '2 en lista de espera',
    );

    api.leaveWaitlist.mockReturnValue(of({ ...full, waitlist: [diego] }));
    element().querySelector<HTMLButtonElement>('.waitlist-leave button')!.click();
    await render();
    expect(api.leaveWaitlist).toHaveBeenCalledWith('plan-1');
    expect(element().querySelector('.waitlist-join')).not.toBeNull();
  });

  it('should explain why the waiting list failed and reload the plan', async () => {
    const full = {
      ...PLAN,
      spots: 1,
      occupied: 1,
      freeSpots: 0,
      status: 'FULL',
      participants: [LUCIA],
    };
    await create(full);
    api.joinWaitlist.mockReturnValue(throwError(() => ({ error: { code: 'plan.waitlistFull' } })));

    element().querySelector<HTMLButtonElement>('.waitlist-join button')!.click();
    await render();

    expect(element().querySelector('.join-error')?.textContent).toContain(
      'La lista de espera está completa',
    );
    expect(api.plan).toHaveBeenCalledTimes(2);
  });

  it('should close full plans that have already started and reload when someone leaves', async () => {
    const started = {
      ...PLAN,
      spots: 1,
      occupied: 1,
      freeSpots: 0,
      status: 'FULL',
      startsAt: new Date(Date.now() - 60_000).toISOString(),
    };
    await create(started);
    expect(element().querySelector('.waitlist-join')).toBeNull();

    left.next({
      planId: 'plan-1',
      title: 'Pádel',
      participantName: 'Lucía',
      promotedName: null,
      freeSpots: 1,
      full: false,
    });
    left.next({
      planId: 'other',
      title: 'Cine',
      participantName: 'Diego',
      promotedName: null,
      freeSpots: 1,
      full: false,
    });
    expect(api.plan).toHaveBeenCalledTimes(2);
  });

  it('should show a shared plan without a session and send the guest to sign in', async () => {
    api.publicPlan.mockReturnValue(
      of({
        ...PLAN,
        organizerId: '',
        organizerName: '',
        occupied: 1,
        freeSpots: 1,
        participants: [],
      }),
    );
    fixture = TestBed.createComponent(PlanDetail);
    fixture.componentRef.setInput('id', 'plan-1');
    await render();
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    expect(api.publicPlan).toHaveBeenCalledWith('plan-1');
    expect(api.plan).not.toHaveBeenCalled();
    const card = element().querySelector('.plan-card')!;
    expect(card.textContent).not.toContain('Organiza');
    expect(card.textContent).toContain('1 de 2 plazas ocupadas');
    expect(element().querySelector('.participants')?.textContent).not.toContain(
      'Aún no se ha apuntado nadie',
    );

    element().querySelector<HTMLButtonElement>('.guest-join button')!.click();
    expect(navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/plans/plan-1' },
    });
  });

  it('should send guests to sign in from the waiting list of a full plan', async () => {
    api.publicPlan.mockReturnValue(
      of({ ...PLAN, occupied: 2, freeSpots: 0, status: 'FULL', participants: [] }),
    );
    fixture = TestBed.createComponent(PlanDetail);
    fixture.componentRef.setInput('id', 'plan-1');
    await render();
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    expect(element().querySelector('.full-tag')).not.toBeNull();

    element().querySelector<HTMLButtonElement>('.waitlist-join button')!.click();
    expect(api.joinWaitlist).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/plans/plan-1' },
    });
  });

  it('should share the plan with the Android share sheet inside the app', async () => {
    await create(PLAN);
    const platform = TestBed.inject(NativePlatform);
    vi.spyOn(platform, 'isNative').mockReturnValue(true);
    const share = vi.spyOn(platform, 'share').mockResolvedValue();

    element().querySelector<HTMLButtonElement>('.share-button button')!.click();
    await render();
    expect(share).toHaveBeenCalledWith({
      title: 'Partido de pádel, falta uno',
      text: expect.stringMatching(/^Pádel a las \d{2}:\d{2} · Faltan 2\. ¿Te apuntas\?$/),
      url: 'http://localhost:8080/share/plans/plan-1',
    });
    expect(element().querySelector('.copied-message')).toBeNull();
  });

  it('should share the plan with the native sheet or copy the link', async () => {
    await create(PLAN);
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', { value: share, configurable: true });

    element().querySelector<HTMLButtonElement>('.share-button button')!.click();
    await render();
    expect(share).toHaveBeenCalledWith({
      title: 'Partido de pádel, falta uno',
      text: expect.stringMatching(/^Pádel a las \d{2}:\d{2} · Faltan 2\. ¿Te apuntas\?$/),
      url: 'http://localhost:8080/share/plans/plan-1',
    });

    share.mockRejectedValue(new DOMException('cancelled', 'AbortError'));
    element().querySelector<HTMLButtonElement>('.share-button button')!.click();
    await render();
    expect(element().querySelector('.copied-message')).toBeNull();

    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    element().querySelector<HTMLButtonElement>('.share-button button')!.click();
    await render();
    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('http://localhost:8080/share/plans/plan-1'),
    );
    expect(element().querySelector('.copied-message')?.textContent).toContain('Enlace copiado');
  });

  it('should offer the calendar to the organizer and the participants of an upcoming plan', async () => {
    await create(PLAN, undefined, 'org');
    expect(element().querySelector('.calendar-button')?.textContent).toContain(
      'Añadir al calendario',
    );

    await create({ ...PLAN, participants: [{ ...LUCIA, userId: 'me' }] });
    expect(element().querySelector('.calendar-button')).not.toBeNull();

    await create(PLAN);
    expect(element().querySelector('.calendar-button')).toBeNull();

    await create({ ...PLAN, status: 'IN_PROGRESS' }, undefined, 'org');
    expect(element().querySelector('.calendar-button')).toBeNull();
  });

  it('should download the plan as an iCalendar file', async () => {
    await create(PLAN, undefined, 'org');
    const createObjectURL = vi.fn().mockReturnValue('blob:plan');
    const revokeObjectURL = vi.fn();
    Object.assign(URL, { createObjectURL, revokeObjectURL });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockReturnValue(undefined);

    element().querySelector<HTMLButtonElement>('.calendar-button button')!.click();
    await render();

    const file = createObjectURL.mock.calls[0][0] as Blob;
    expect(file.type).toBe('text/calendar;charset=utf-8');
    const ics = await file.text();
    expect(ics).toContain('UID:plan-plan-1@oneleft');
    expect(ics).toContain('SUMMARY:Partido de pádel\\, falta uno');
    expect(ics).toContain('LOCATION:Pistas del polideportivo');
    expect(ics).toContain('URL:http://localhost:8080/share/plans/plan-1');
    expect(click).toHaveBeenCalled();
    expect((click.mock.contexts[0] as HTMLAnchorElement).download).toBe(
      'partido-de-padel-falta-uno.ics',
    );
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:plan');
    click.mockRestore();
  });

  it('should open Google Calendar inside the Android app', async () => {
    await create(PLAN, undefined, 'org');
    const platform = TestBed.inject(NativePlatform);
    vi.spyOn(platform, 'isNative').mockReturnValue(true);
    const open = vi.spyOn(platform, 'openBrowser').mockResolvedValue();

    element().querySelector<HTMLButtonElement>('.calendar-button button')!.click();
    await render();

    const url = new URL(open.mock.calls[0][0]);
    expect(url.host).toBe('calendar.google.com');
    expect(url.searchParams.get('text')).toBe('Partido de pádel, falta uno');
    expect(url.searchParams.get('details')).toContain('Ver el plan en OneLeft');
  });

  it('should show the minimum of participants until the deadline and once confirmed (HU-039)', async () => {
    const minimum = { participants: 2, deadline: PLAN.startsAt, confirmed: false };
    await create({ ...PLAN, minimum });
    expect(element().querySelector('.plan-minimum')?.textContent).toMatch(
      /Sale si se apuntan al menos 2 · lo sabrás a las \d{2}:\d{2}/,
    );
    expect(element().querySelector('.plan-minimum--confirmed')).toBeNull();

    await create({ ...PLAN, minimum: { ...minimum, confirmed: true } });
    expect(element().querySelector('.plan-minimum--confirmed')?.textContent).toContain(
      'Confirmado: se llegó al mínimo de 2',
    );

    await create(PLAN);
    expect(element().querySelector('.plan-minimum')).toBeNull();
  });

  it('should explain a cancellation for not reaching the minimum and reload on the notice', async () => {
    await create({
      ...PLAN,
      minimum: { participants: 2, deadline: PLAN.startsAt, confirmed: false },
    });
    api.plan.mockReturnValue(
      of({
        ...PLAN,
        status: 'CANCELLED',
        minimum: { participants: 2, deadline: PLAN.startsAt, confirmed: false },
      }),
    );

    cancelled.next({
      planId: 'other',
      title: 'Otro',
      placeName: 'Pistas',
      startsAt: PLAN.startsAt,
      reason: 'MINIMUM_NOT_REACHED',
    });
    expect(api.plan).toHaveBeenCalledTimes(1);
    cancelled.next({
      planId: 'plan-1',
      title: PLAN.title,
      placeName: 'Pistas',
      startsAt: PLAN.startsAt,
      reason: 'MINIMUM_NOT_REACHED',
    });
    await render();

    expect(api.plan).toHaveBeenCalledTimes(2);
    expect(element().querySelector('.plan-state')?.textContent).toContain('Cancelado');
    expect(element().querySelector('.ended-hint')?.textContent).toContain(
      'no se llegó al mínimo de participantes',
    );
    expect(element().querySelector('.plan-minimum')).toBeNull();
    expect(element().querySelector('.join-button')).toBeNull();

    await create({ ...PLAN, status: 'CANCELLED' });
    expect(element().querySelector('.ended-hint')?.textContent).toContain('Este plan se canceló.');
  });

  it('should show the plan in English', async () => {
    await create(PLAN);
    TestBed.inject(TranslocoService).setActiveLang('en');
    await render();
    const card = element().querySelector('.plan-card')!;
    expect(card.textContent).toContain('2 spots left');
    expect(card.textContent).toContain('Intermediate');
    expect(card.textContent).toContain('Organized by Ana Test');
    expect(element().querySelector('.plan-time')?.textContent).toMatch(
      /At \d\d:\d\d · in 1 h (29|30) min/,
    );
    expect(element().querySelector('.join-button')?.textContent).toContain("I'm in");
  });

  it('should explain when the plan does not exist', async () => {
    await create(new Error('404'));
    expect(element().querySelector('.plan-error')).not.toBeNull();
  });

  it('should build initials from the participant name', async () => {
    await create(PLAN);
    const initials = (fixture.componentInstance as unknown as { initials: (n: string) => string })
      .initials;
    expect(initials('lucía  martín gómez')).toBe('LM');
  });
});
