import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PlanJoinedNotice,
  PlanLeftNotice,
  SpotFreedNotice,
} from '../../shared/model/published-plan';
import { Session } from '../auth/session';
import { EventStream, StreamEvent } from './event-stream';
import { UserEvents } from './user-events';

describe('UserEvents', () => {
  it('should open one shared personal stream only while signed in and split it by event', async () => {
    const authenticated = signal(false);
    const source = new Subject<StreamEvent>();
    const stream = { openEvents: vi.fn(() => source.asObservable()) };
    TestBed.configureTestingModule({
      providers: [
        { provide: Session, useValue: { isAuthenticated: authenticated } },
        { provide: EventStream, useValue: stream },
      ],
    });
    const events = TestBed.inject(UserEvents);
    const joined: PlanJoinedNotice[] = [];
    const joinedToo: PlanJoinedNotice[] = [];
    const left: PlanLeftNotice[] = [];
    const spots: SpotFreedNotice[] = [];
    events.joined$.subscribe((notice) => joined.push(notice));
    events.joined$.subscribe((notice) => joinedToo.push(notice));
    events.left$.subscribe((notice) => left.push(notice));
    events.spotFreed$.subscribe((notice) => spots.push(notice));
    TestBed.tick();
    expect(stream.openEvents).not.toHaveBeenCalled();

    authenticated.set(true);
    TestBed.tick();
    const join = {
      planId: 'p1',
      title: 'Pádel',
      participantName: 'Lucía',
      freeSpots: 0,
      full: true,
    };
    const leave = {
      planId: 'p1',
      title: 'Pádel',
      participantName: 'Lucía',
      promotedName: 'Diego',
      freeSpots: 0,
      full: true,
    };
    const spot = { planId: 'p2', title: 'Cine' };
    source.next({ event: 'plan-joined', data: join });
    source.next({ event: 'plan-left', data: leave });
    source.next({ event: 'plan-spot', data: spot });

    expect(stream.openEvents).toHaveBeenCalledOnce();
    expect(stream.openEvents).toHaveBeenCalledWith(
      `${environment.apiUrl}/api/v1/plans/events/stream`,
      ['plan-joined', 'plan-left', 'plan-spot'],
    );
    expect(joined).toEqual([join]);
    expect(joinedToo).toEqual([join]);
    expect(left).toEqual([leave]);
    expect(spots).toEqual([spot]);

    authenticated.set(false);
    TestBed.tick();
    expect(source.observed).toBe(false);
  });
});
