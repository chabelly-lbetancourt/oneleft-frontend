import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Catalog, MyProfile, PublicProfile, UpdateProfile } from '../../shared/model/profile';
import { UserProfile } from '../../shared/model/user';

/** Client of the users service through the API Gateway. */
@Injectable({ providedIn: 'root' })
export class UsersApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/v1/users`;

  me(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.base}/me`);
  }

  myProfile(): Observable<MyProfile> {
    return this.http.get<MyProfile>(`${this.base}/me/profile`);
  }

  updateMyProfile(profile: UpdateProfile): Observable<MyProfile> {
    return this.http.put<MyProfile>(`${this.base}/me/profile`, profile);
  }

  /** The profile of someone else: bio and hobbies, no coordinates (HU-048). */
  profileOf(userId: string): Observable<PublicProfile> {
    return this.http.get<PublicProfile>(`${this.base}/${userId}/profile`);
  }

  catalog(): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.base}/activities`);
  }
}
