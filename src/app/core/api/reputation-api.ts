import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BadgeProgress, LedgerPage, Reputation } from '../../shared/model/reputation';

/** Client of the reputation service through the API Gateway (HU-009). */
@Injectable({ providedIn: 'root' })
export class ReputationApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/v1/reputation`;

  mine(): Observable<Reputation> {
    return this.http.get<Reputation>(`${this.base}/me`);
  }

  /** Why my reputation went up or down, the latest first. */
  ledger(page = 0, size = 20): Observable<LedgerPage> {
    return this.http.get<LedgerPage>(`${this.base}/me/ledger`, { params: { page, size } });
  }

  of(userId: string): Observable<Reputation> {
    return this.http.get<Reputation>(`${this.base}/people/${userId}`);
  }

  /** My badges, earned or not, with how far I am (HU-044). */
  myBadges(): Observable<BadgeProgress[]> {
    return this.http.get<BadgeProgress[]>(`${this.base}/me/badges`);
  }

  /** The badges someone has earned. */
  badgesOf(userId: string): Observable<BadgeProgress[]> {
    return this.http.get<BadgeProgress[]>(`${this.base}/people/${userId}/badges`);
  }

  /** URL of the scores of several people (1 to 50), for the lists of plans. */
  scoresUrl(): string {
    return `${this.base}/scores`;
  }
}
