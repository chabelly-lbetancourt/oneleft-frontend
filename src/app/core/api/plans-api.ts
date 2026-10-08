import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { nearbyParams, NearbyQuery, toQueryString } from '../../shared/model/nearby';
import { Forecast, Plan, PublicPlan, PublishPlan } from '../../shared/model/published-plan';

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

  /**
   * A plan without a session, as anyone with a shared link sees it (HU-024): no people and an approximate place.
   * It comes as a plan with nobody in it, so the same page can show it.
   */
  publicPlan(id: string): Observable<Plan> {
    return this.http.get<PublicPlan>(`${environment.apiUrl}/api/v1/public/plans/${id}`).pipe(
      map((plan) => ({
        ...plan,
        organizerId: '',
        organizerName: '',
        publishedAt: '',
        participants: [],
        waitlist: [],
      })),
    );
  }

  /**
   * Weather forecast of an upcoming outdoor plan (HU-026). Null when there is none (204: indoor, started or the
   * weather service did not answer) and on any error: the plan is shown the same.
   */
  weather(id: string): Observable<Forecast | null> {
    return this.http
      .get<Forecast | null>(`${this.base}/${id}/weather`)
      .pipe(catchError(() => of(null)));
  }

  /** Link to share a plan: its page gives messaging apps a preview and then opens the plan (HU-024). */
  shareUrl(id: string): string {
    return new URL(`${environment.apiUrl}/share/plans/${id}`, globalThis.location?.origin).href;
  }

  mine(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.base}/mine`);
  }

  /** Takes a free spot in the plan (HU-005). */
  join(id: string): Observable<Plan> {
    return this.http.post<Plan>(`${this.base}/${id}/participants`, null);
  }

  /** Gives the spot back (HU-023): the first person waiting takes it. */
  leave(id: string): Observable<Plan> {
    return this.http.delete<Plan>(`${this.base}/${id}/participants/me`);
  }

  /** Waits for a spot of a full plan (HU-023). */
  joinWaitlist(id: string): Observable<Plan> {
    return this.http.post<Plan>(`${this.base}/${id}/waitlist`, null);
  }

  leaveWaitlist(id: string): Observable<Plan> {
    return this.http.delete<Plan>(`${this.base}/${id}/waitlist/me`);
  }

  /** URL of the personal Server-Sent Events stream (someone joined one of my plans). */
  eventsStreamUrl(): string {
    return `${this.base}/events/stream`;
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
