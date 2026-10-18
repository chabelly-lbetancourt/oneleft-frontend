import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, filter, map, Observable, share, switchMap } from 'rxjs';
import { FeedActivityNotice } from '@shared/model/feed';
import { PlanNearbyNotice } from '@shared/model/notifications';
import { BadgeEarnedNotice, KudosNotice } from '@shared/model/reputation';
import {
  PlanArrivalNotice,
  PlanCancelledNotice,
  PlanCheckInNotice,
  PlanJoinedNotice,
  PlanLeftNotice,
  PlanReminderNotice,
  SpotFreedNotice,
} from '@shared/model/published-plan';
import { PlansApi } from '@core/api/plans-api';
import { Session } from '@core/auth/session';
import { EventStream, StreamEvent } from './event-stream';

const PLAN_JOINED = 'plan-joined';
const PLAN_LEFT = 'plan-left';
const SPOT_FREED = 'plan-spot';
const PLAN_NEARBY = 'plan-nearby';
const PLAN_REMINDER = 'plan-reminder';
const PLAN_CANCELLED = 'plan-cancelled';
const PLAN_ARRIVAL = 'plan-arrival';
const PLAN_CHECK_IN = 'plan-check-in';
const BADGE_EARNED = 'badge-earned';
const FEED_ACTIVITY = 'feed-activity';
const KUDOS = 'kudos';

/**
 * Personal events of the signed-in user while the app is open: someone has joined (HU-005) or left (HU-023) one of
 * my plans, a spot I was waiting for is now mine, a plan I like has been published nearby (HU-006), a plan I am in
 * is about to start (HU-007) or has been cancelled for not reaching its minimum (HU-039), someone of the group is on
 * the way (HU-040) or has arrived (HU-025), I earned a badge (HU-044) or someone I follow did something in a plan
 * (HU-051), or someone gave me a kudos (HU-060). A single connection is shared by every subscriber and closed when the
 * user signs out.
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
            PLAN_CHECK_IN,
            BADGE_EARNED,
            FEED_ACTIVITY,
            KUDOS,
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
  /** Someone of the group of my plan arrived at the meeting point (HU-025) */
  readonly checkIn$ = this.of<PlanCheckInNotice>(PLAN_CHECK_IN);
  /** I earned a badge (HU-044) */
  readonly badge$ = this.of<BadgeEarnedNotice>(BADGE_EARNED);
  /** Someone I follow published, joined or completed a plan (HU-051) */
  readonly feedActivity$ = this.of<FeedActivityNotice>(FEED_ACTIVITY);
  /** Someone of a plan gave me a kudos (HU-060) */
  readonly kudos$ = this.of<KudosNotice>(KUDOS);

  private of<T>(name: string): Observable<T> {
    return this.events$.pipe(
      filter((message) => message.event === name),
      map((message) => message.data as T),
    );
  }
}
