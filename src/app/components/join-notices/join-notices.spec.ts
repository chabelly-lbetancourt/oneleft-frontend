import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { UserEvents } from '../../core/realtime/user-events';
import { PlanNearbyNotice } from '../../shared/model/notifications';
import {
  PlanJoinedNotice,
  PlanLeftNotice,
  PlanCancelledNotice,
  PlanReminderNotice,
  SpotFreedNotice,
} from '../../shared/model/published-plan';
import { JoinNotices } from './join-notices';

describe('JoinNotices', () => {
  it('should show a translated toast that opens the plan', () => {
    const notices = new Subject<PlanJoinedNotice>();
    const left = new Subject<PlanLeftNotice>();
    const spots = new Subject<SpotFreedNotice>();
    const nearby = new Subject<PlanNearbyNotice>();
    const reminders = new Subject<PlanReminderNotice>();
    const cancelled = new Subject<PlanCancelledNotice>();
    TestBed.configureTestingModule({
      imports: [JoinNotices, translocoTesting()],
      providers: [
        provideRouter([]),
        {
          provide: UserEvents,
          useValue: {
            joined$: notices.asObservable(),
            left$: left.asObservable(),
            spotFreed$: spots.asObservable(),
            nearby$: nearby.asObservable(),
            reminder$: reminders.asObservable(),
            cancelled$: cancelled.asObservable(),
          },
        },
      ],
    });
    const fixture = TestBed.createComponent(JoinNotices);
    const messages = fixture.debugElement.injector.get(MessageService);
    const add = vi.spyOn(messages, 'add');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.detectChanges();

    notices.next({
      planId: 'p1',
      title: 'Pádel',
      participantName: 'Lucía',
      freeSpots: 1,
      full: false,
    });
    notices.next({
      planId: 'p1',
      title: 'Pádel',
      participantName: 'Diego',
      freeSpots: 0,
      full: true,
    });

    expect(add.mock.calls[0][0]).toMatchObject({
      summary: 'Alguien se ha apuntado',
      detail: 'Lucía se ha unido a «Pádel»',
      severity: 'info',
      data: 'p1',
    });
    expect(add.mock.calls[1][0]).toMatchObject({
      summary: '¡Tu plan está completo!',
      severity: 'success',
    });

    left.next({
      planId: 'p1',
      title: 'Pádel',
      participantName: 'Lucía',
      promotedName: 'Diego',
      freeSpots: 0,
      full: true,
    });
    left.next({
      planId: 'p1',
      title: 'Pádel',
      participantName: 'Diego',
      promotedName: null,
      freeSpots: 1,
      full: false,
    });
    spots.next({ planId: 'p2', title: 'Cine' });
    expect(add.mock.calls[2][0]).toMatchObject({
      summary: 'Alguien ha salido de tu plan',
      detail: 'Lucía ha salido de «Pádel» y entra Diego',
      icon: 'pi-user-minus',
    });
    expect(add.mock.calls[3][0]).toMatchObject({ detail: 'Diego ha salido de «Pádel»' });
    expect(add.mock.calls[4][0]).toMatchObject({
      summary: '¡Tienes plaza!',
      detail: 'Se ha liberado una plaza en «Cine» y es para ti',
      severity: 'success',
      data: 'p2',
    });

    nearby.next({
      planId: 'p3',
      activity: 'PADEL',
      title: 'Pádel 2 contra 2',
      placeName: 'Pistas de la Albufera',
      startsAt: '2026-11-16T17:20:00Z',
      freeSpots: 1,
      distanceMeters: 700,
    });
    expect(add.mock.calls[5][0]).toMatchObject({
      summary: 'Plan cerca de ti',
      icon: 'pi-map-marker',
      data: 'p3',
    });
    expect(add.mock.calls[5][0].detail).toMatch(
      /^«Pádel 2 contra 2» · Pádel a las \d{2}:\d{2} · Pistas de la Albufera · a 0,7 km · Falta 1$/,
    );

    reminders.next({
      planId: 'p4',
      title: 'Pádel 2 contra 2',
      placeName: 'Pistas de la Albufera',
      startsAt: '2026-11-16T17:20:00Z',
    });
    expect(add.mock.calls[6][0]).toMatchObject({
      summary: 'Tu plan empieza pronto',
      icon: 'pi-clock',
      data: 'p4',
    });
    expect(add.mock.calls[6][0].detail).toMatch(
      /^«Pádel 2 contra 2» empieza a las \d{2}:\d{2} en Pistas de la Albufera$/,
    );

    cancelled.next({
      planId: 'p5',
      title: 'Pádel 2 contra 2',
      placeName: 'Pistas de la Albufera',
      startsAt: '2026-11-16T17:20:00Z',
      reason: 'MINIMUM_NOT_REACHED',
    });
    expect(add.mock.calls[7][0]).toMatchObject({
      summary: 'Plan cancelado',
      icon: 'pi-times-circle',
      severity: 'warn',
      data: 'p5',
    });
    expect(add.mock.calls[7][0].detail).toMatch(
      /^«Pádel 2 contra 2» de las \d{2}:\d{2} se ha cancelado: no se llegó al mínimo de participantes$/,
    );

    (fixture.componentInstance as unknown as { open: (id: string) => void }).open('p1');
    expect(navigate).toHaveBeenCalledWith(['/plans', 'p1']);
  });
});
