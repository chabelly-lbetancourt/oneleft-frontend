import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Connection,
  ConnectionPage,
  NetworkList,
  SocialAccount,
  SocialPerson,
  Visibility,
} from '../../shared/model/social';

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

  accept(userId: string): Observable<Connection> {
    return this.http.post<Connection>(`${this.base}/me/requests/${userId}/accept`, null);
  }

  decline(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/me/requests/${userId}`);
  }

  removeFollower(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/me/followers/${userId}`);
  }
}
