import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PlanJoinedNotice } from '../../shared/model/published-plan';
import { Session } from '../auth/session';
import { EventStream } from './event-stream';
import { UserEvents } from './user-events';

describe('UserEvents', () => {
  it('should open one shared personal stream only while signed in', async () => {
    const authenticated = signal(false);
    const source = new Subject<PlanJoinedNotice>();
    const stream = { open: vi.fn(() => source.asObservable()) };
    TestBed.configureTestingModule({
      providers: [
        { provide: Session, useValue: { isAuthenticated: authenticated } },
        { provide: EventStream, useValue: stream },
      ],
    });
    const events = TestBed.inject(UserEvents);
    const first: PlanJoinedNotice[] = [];
    const second: PlanJoinedNotice[] = [];
    events.joined$.subscribe((notice) => first.push(notice));
    events.joined$.subscribe((notice) => second.push(notice));
    TestBed.tick();
    expect(stream.open).not.toHaveBeenCalled();

    authenticated.set(true);
    TestBed.tick();
    const notice = { planId: 'p1', title: 'Pádel', participantName: 'Lucía', freeSpots: 0, full: true };
    source.next(notice);

    expect(stream.open).toHaveBeenCalledOnce();
    expect(stream.open).toHaveBeenCalledWith(`${environment.apiUrl}/api/v1/plans/events/stream`, 'plan-joined');
    expect(first).toEqual([notice]);
    expect(second).toEqual([notice]);

    authenticated.set(false);
    TestBed.tick();
    expect(source.observed).toBe(false);
  });
});
