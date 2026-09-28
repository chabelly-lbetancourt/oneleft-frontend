import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { UserEvents } from '../../core/realtime/user-events';
import { PlanJoinedNotice } from '../model/published-plan';
import { JoinNotices } from './join-notices';

describe('JoinNotices', () => {
  it('should show a translated toast that opens the plan', () => {
    const notices = new Subject<PlanJoinedNotice>();
    TestBed.configureTestingModule({
      imports: [JoinNotices, translocoTesting()],
      providers: [provideRouter([]), { provide: UserEvents, useValue: { joined$: notices.asObservable() } }],
    });
    const fixture = TestBed.createComponent(JoinNotices);
    const messages = fixture.debugElement.injector.get(MessageService);
    const add = vi.spyOn(messages, 'add');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.detectChanges();

    notices.next({ planId: 'p1', title: 'Pádel', participantName: 'Lucía', freeSpots: 1, full: false });
    notices.next({ planId: 'p1', title: 'Pádel', participantName: 'Diego', freeSpots: 0, full: true });

    expect(add.mock.calls[0][0]).toMatchObject({
      summary: 'Alguien se ha apuntado',
      detail: 'Lucía se ha unido a «Pádel»',
      severity: 'info',
      data: 'p1',
    });
    expect(add.mock.calls[1][0]).toMatchObject({ summary: '¡Tu plan está completo!', severity: 'success' });

    (fixture.componentInstance as unknown as { open: (id: string) => void }).open('p1');
    expect(navigate).toHaveBeenCalledWith(['/plans', 'p1']);
  });
});
