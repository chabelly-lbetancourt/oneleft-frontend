import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { catchError, of } from 'rxjs';
import { UsersApi } from '@core/api/users-api';
import { Session } from '@core/auth/session';
import { ConsentStatus } from '@shared/model/account';

/**
 * Asks for the consent to the privacy text (HU-045) while someone has not accepted the version in force: after
 * signing up, and again when the text changes. It shows nothing without a session, once accepted, or if the service
 * does not say.
 */
@Component({
  selector: 'app-consent-card',
  imports: [Button, RouterLink, TranslocoPipe],
  templateUrl: './consent-card.html',
  styleUrl: './consent-card.scss',
})
export class ConsentCard {
  private readonly api = inject(UsersApi);

  protected readonly status = signal<ConsentStatus | null>(null);
  protected readonly busy = signal(false);
  protected readonly failed = signal(false);

  constructor() {
    if (inject(Session).isAuthenticated()) {
      this.api
        .consent()
        .pipe(catchError(() => of(null)))
        .subscribe((status) => this.status.set(status));
    }
  }

  protected accept(version: string): void {
    this.busy.set(true);
    this.failed.set(false);
    this.api.acceptConsent(version).subscribe({
      next: (status) => {
        this.busy.set(false);
        this.status.set(status);
      },
      error: () => {
        this.busy.set(false);
        this.failed.set(true);
      },
    });
  }
}
