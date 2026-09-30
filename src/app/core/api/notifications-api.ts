import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationPreferences, PushSubscriptionRequest } from '../../shared/model/notifications';

/** Client of the notifications service through the API Gateway (HU-006). */
@Injectable({ providedIn: 'root' })
export class NotificationsApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/v1/notifications`;

  preferences(): Observable<NotificationPreferences> {
    return this.http.get<NotificationPreferences>(`${this.base}/preferences`);
  }

  savePreferences(preferences: NotificationPreferences): Observable<NotificationPreferences> {
    return this.http.put<NotificationPreferences>(`${this.base}/preferences`, preferences);
  }

  /** Server key for Web Push, or null when the server has Web Push off. */
  pushPublicKey(): Observable<string | null> {
    return this.http.get<{ publicKey: string }>(`${this.base}/push/public-key`).pipe(
      map((response) => response.publicKey),
      catchError(() => of(null)),
    );
  }

  subscribe(subscription: PushSubscriptionRequest): Observable<void> {
    return this.http.put<void>(`${this.base}/push/subscriptions`, subscription);
  }

  unsubscribe(endpoint: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/push/subscriptions`, { params: { endpoint } });
  }
}
