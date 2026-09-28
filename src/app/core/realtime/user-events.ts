import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, share, switchMap } from 'rxjs';
import { PlanJoinedNotice } from '../../shared/model/published-plan';
import { PlansApi } from '../api/plans-api';
import { Session } from '../auth/session';
import { EventStream } from './event-stream';

/**
 * Personal events of the signed-in user while the app is open (HU-005): someone has joined one of my plans.
 * A single connection is shared by every subscriber and closed when the user signs out.
 */
@Injectable({ providedIn: 'root' })
export class UserEvents {
  private readonly api = inject(PlansApi);
  private readonly session = inject(Session);
  private readonly stream = inject(EventStream);

  readonly joined$: Observable<PlanJoinedNotice> = toObservable(this.session.isAuthenticated).pipe(
    switchMap((signedIn) =>
      signedIn ? this.stream.open<PlanJoinedNotice>(this.api.eventsStreamUrl(), 'plan-joined') : EMPTY,
    ),
    share(),
  );
}
