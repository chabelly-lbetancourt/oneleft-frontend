import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, filter, map, Observable, share, switchMap } from 'rxjs';
import {
  PlanJoinedNotice,
  PlanLeftNotice,
  SpotFreedNotice,
} from '../../shared/model/published-plan';
import { PlansApi } from '../api/plans-api';
import { Session } from '../auth/session';
import { EventStream, StreamEvent } from './event-stream';

const PLAN_JOINED = 'plan-joined';
const PLAN_LEFT = 'plan-left';
const SPOT_FREED = 'plan-spot';

/**
 * Personal events of the signed-in user while the app is open: someone has joined (HU-005) or left (HU-023) one of
 * my plans, or a spot I was waiting for is now mine. A single connection is shared by every subscriber and closed
 * when the user signs out.
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
        ? this.stream.openEvents(this.api.eventsStreamUrl(), [PLAN_JOINED, PLAN_LEFT, SPOT_FREED])
        : EMPTY,
    ),
    share(),
  );

  readonly joined$ = this.of<PlanJoinedNotice>(PLAN_JOINED);
  readonly left$ = this.of<PlanLeftNotice>(PLAN_LEFT);
  readonly spotFreed$ = this.of<SpotFreedNotice>(SPOT_FREED);

  private of<T>(name: string): Observable<T> {
    return this.events$.pipe(
      filter((message) => message.event === name),
      map((message) => message.data as T),
    );
  }
}
