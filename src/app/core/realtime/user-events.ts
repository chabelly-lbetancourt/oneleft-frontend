import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, filter, map, Observable, share, switchMap } from 'rxjs';
import { PlanNearbyNotice } from '../../shared/model/notifications';
import {
  PlanArrivalNotice,
  PlanCancelledNotice,
  PlanJoinedNotice,
  PlanLeftNotice,
  PlanReminderNotice,
  SpotFreedNotice,
} from '../../shared/model/published-plan';
import { PlansApi } from '../api/plans-api';
import { Session } from '../auth/session';
import { EventStream, StreamEvent } from './event-stream';

const PLAN_JOINED = 'plan-joined';
const PLAN_LEFT = 'plan-left';
const SPOT_FREED = 'plan-spot';
const PLAN_NEARBY = 'plan-nearby';
const PLAN_REMINDER = 'plan-reminder';
const PLAN_CANCELLED = 'plan-cancelled';
const PLAN_ARRIVAL = 'plan-arrival';

/**
 * Personal events of the signed-in user while the app is open: someone has joined (HU-005) or left (HU-023) one of
 * my plans, a spot I was waiting for is now mine, a plan I like has been published nearby (HU-006), a plan I am in
 * is about to start (HU-007) or has been cancelled for not reaching its minimum (HU-039). A single connection is shared by every subscriber and closed when the user signs out.
 */
@Injectable({ providedIn: 'root' })
export class UserEvents {
  private readonly api = inject(PlansApi);
  private readonly session = inject(Session);
  private readonly stream = inject(EventStream);

  private readonly events$: Observable<StreamEvent> = toObservable(
    this.session.isAuthenticated,
  ).pipe(
    switchMap((signedIn) =>
      signedIn
        ? this.stream.openEvents(this.api.eventsStreamUrl(), [
            PLAN_JOINED,
            PLAN_LEFT,
            SPOT_FREED,
            PLAN_NEARBY,
            PLAN_REMINDER,
            PLAN_CANCELLED,
            PLAN_ARRIVAL,
          ])
        : EMPTY,
    ),
    share(),
  );

  readonly joined$ = this.of<PlanJoinedNotice>(PLAN_JOINED);
  readonly left$ = this.of<PlanLeftNotice>(PLAN_LEFT);
  readonly spotFreed$ = this.of<SpotFreedNotice>(SPOT_FREED);
  readonly nearby$ = this.of<PlanNearbyNotice>(PLAN_NEARBY);
  readonly reminder$ = this.of<PlanReminderNotice>(PLAN_REMINDER);
  readonly cancelled$ = this.of<PlanCancelledNotice>(PLAN_CANCELLED);
  /** Someone of the group of my plan is on the way or running late (HU-040) */
  readonly arrival$ = this.of<PlanArrivalNotice>(PLAN_ARRIVAL);

  private of<T>(name: string): Observable<T> {
    return this.events$.pipe(
      filter((message) => message.event === name),
      map((message) => message.data as T),
    );
  }
}
