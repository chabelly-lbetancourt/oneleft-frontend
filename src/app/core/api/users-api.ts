import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Catalog, MyProfile, UpdateProfile } from '../../shared/model/profile';
import { UserProfile } from '../../shared/model/user';

/** Cliente del servicio users a través del API Gateway. */
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

  catalog(): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.base}/activities`);
  }
}
