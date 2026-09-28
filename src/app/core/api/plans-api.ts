import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { nearbyParams, NearbyQuery, toQueryString } from '../../shared/model/nearby';
import { Plan, PublishPlan } from '../../shared/model/published-plan';

/** Client of the plans service through the API Gateway. */
@Injectable({ providedIn: 'root' })
export class PlansApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/v1/plans`;

  publish(plan: PublishPlan): Observable<Plan> {
    return this.http.post<Plan>(this.base, plan);
  }

  plan(id: string): Observable<Plan> {
    return this.http.get<Plan>(`${this.base}/${id}`);
  }

  mine(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.base}/mine`);
  }

  /** URL of the nearby plans list; the page reads it through httpResource so it can reload it. */
  nearbyUrl(): string {
    return `${this.base}/nearby`;
  }

  /** URL of the Server-Sent Events stream with new plans matching the search. */
  nearbyStreamUrl(query: NearbyQuery): string {
    return `${this.base}/nearby/stream?${toQueryString(nearbyParams(query))}`;
  }
}
