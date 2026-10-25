import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { FeedPage } from '@shared/model/feed';
import { BlockedPage, Report, ReportRequest } from '@shared/model/safety';
import {
  Connection,
  ConnectionPage,
  FeedAudience,
  HiddenPlan,
  NetworkList,
  PersonList,
  SocialAccount,
  SocialPerson,
  Visibility,
} from '@shared/model/social';

/** Paths of my lists under /me. */
const LISTS: Record<NetworkList, string> = {
  followers: 'followers',
  following: 'following',
  requests: 'requests',
  sent: 'requests/sent',
};

/** Client of the social service through the API Gateway (HU-047). */
@Injectable({ providedIn: 'root' })
export class SocialApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/v1/social`;

  /** My profile, created private the first time. */
  myAccount(): Observable<SocialAccount> {
    return this.http.get<SocialAccount>(`${this.base}/me`);
  }

  changeVisibility(visibility: Visibility): Observable<SocialAccount> {
    return this.http.put<SocialAccount>(`${this.base}/me/visibility`, { visibility });
  }

  /** Who sees my activity in their feeds (HU-059). */
  changeFeedAudience(feedAudience: FeedAudience): Observable<SocialAccount> {
    return this.http.put<SocialAccount>(`${this.base}/me/feed-audience`, { feedAudience });
  }

  person(userId: string): Observable<SocialPerson> {
    return this.http.get<SocialPerson>(`${this.base}/people/${userId}`);
  }

  /** Follows someone at once if their profile is public, or sends a request. */
  follow(userId: string): Observable<Connection> {
    return this.http.put<Connection>(`${this.base}/me/following/${userId}`, null);
  }

  /** Stops following someone, or takes back my request. */
  unfollow(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/me/following/${userId}`);
  }

  list(list: NetworkList, page = 0, size = 20): Observable<ConnectionPage> {
    return this.http.get<ConnectionPage>(`${this.base}/me/${LISTS[list]}`, {
      params: { page, size },
    });
  }

  /** The followers or who someone follows (HU-048), if their profile lets me see them. */
  listOf(userId: string, list: PersonList, page = 0, size = 20): Observable<ConnectionPage> {
    return this.http.get<ConnectionPage>(`${this.base}/people/${userId}/${list}`, {
      params: { page, size },
    });
  }

  /** What the people I follow do in the plans (HU-051), the latest first. */
  feed(page = 0, size = 20): Observable<FeedPage> {
    return this.http.get<FeedPage>(`${this.base}/me/feed`, { params: { page, size } });
  }

  /** Whether one of my plans is kept out of my activity (HU-059). */
  hiddenPlan(planId: string): Observable<HiddenPlan> {
    return this.http.get<HiddenPlan>(`${this.base}/me/hidden-plans/${planId}`);
  }

  hidePlan(planId: string): Observable<void> {
    return this.http.put<void>(`${this.base}/me/hidden-plans/${planId}`, null);
  }

  showPlan(planId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/me/hidden-plans/${planId}`);
  }

  accept(userId: string): Observable<Connection> {
    return this.http.post<Connection>(`${this.base}/me/requests/${userId}/accept`, null);
  }

  decline(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/me/requests/${userId}`);
  }

  removeFollower(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/me/followers/${userId}`);
  }

  /** Blocks someone (HU-033): we stop following each other and they are not told. */
  block(userId: string): Observable<void> {
    return this.http.put<void>(`${this.base}/me/blocked/${userId}`, null);
  }

  unblock(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/me/blocked/${userId}`);
  }

  /** The people I blocked, the latest first. */
  blocked(page = 0, size = 20): Observable<BlockedPage> {
    return this.http.get<BlockedPage>(`${this.base}/me/blocked`, { params: { page, size } });
  }

  /** Reports a person or a plan (HU-033); reporting it again while it is open gives the same report. */
  report(request: ReportRequest): Observable<Report> {
    return this.http.post<Report>(`${this.base}/reports`, request);
  }
}
