import { httpResource } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { environment } from '../../../environments/environment';
import { Session } from '../../core/auth/session';
import { Language } from '../../core/i18n/language';
import { UserEvents } from '../../core/realtime/user-events';
import { activityOf } from '../../shared/model/activities';
import { Plan } from '../../shared/model/published-plan';
import { clockTime, spotsKey, startsIn } from '../../shared/time/plan-time';
import { LanguageSwitcher } from '../../shared/ui/language-switcher';

@Component({
  selector: 'app-home',
  imports: [Avatar, Button, LanguageSwitcher, RouterLink, Tag, TranslocoPipe],
  templateUrl: './home.html',
})
export class Home {
  protected readonly session = inject(Session);
  private readonly language = inject(Language);
  /** Plans I organize that have not started yet (only with a session). */
  protected readonly myPlans = httpResource<Plan[]>(() =>
    this.session.isAuthenticated() ? `${environment.apiUrl}/api/v1/plans/mine` : undefined,
  );
  protected readonly activityOf = activityOf;
  protected readonly spotsKey = spotsKey;

  constructor() {
    // Free spots of my plans change when someone joins: refresh the list with each notice
    inject(UserEvents)
      .joined$.pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(() => this.myPlans.reload());
  }

  protected startsIn(startsAt: string) {
    return startsIn(new Date(startsAt), new Date());
  }

  protected clockTime(startsAt: string): string {
    return clockTime(new Date(startsAt), this.language.locale());
  }
}
