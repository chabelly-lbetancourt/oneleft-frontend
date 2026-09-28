import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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
}
