import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NearbyPlanEvent, NearbyQuery } from '../../shared/model/nearby';
import { PlansApi } from '../api/plans-api';
import { EventStream } from './event-stream';

export { RECONNECT_DELAY_MS } from './event-stream';

/** New plans near the user, in real time (HU-004). */
@Injectable({ providedIn: 'root' })
export class NearbyStream {
  private readonly api = inject(PlansApi);
  private readonly events = inject(EventStream);

  watch(query: NearbyQuery): Observable<NearbyPlanEvent> {
    return this.events.open<NearbyPlanEvent>(this.api.nearbyStreamUrl(query), 'plan-published');
  }
}
