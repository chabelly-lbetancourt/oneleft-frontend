import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { UserEvents } from '../../core/realtime/user-events';
import { PlanJoinedNotice, PlanLeftNotice, SpotFreedNotice } from '../model/published-plan';
import { JoinNotices } from './join-notices';

describe('JoinNotices', () => {
  it('should show a translated toast that opens the plan', () => {
    const notices = new Subject<PlanJoinedNotice>();
    const left = new Subject<PlanLeftNotice>();
    const spots = new Subject<SpotFreedNotice>();
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

    (fixture.componentInstance as unknown as { open: (id: string) => void }).open('p1');
    expect(navigate).toHaveBeenCalledWith(['/plans', 'p1']);
  });
});
