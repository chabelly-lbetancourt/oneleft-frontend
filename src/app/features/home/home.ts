import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { environment } from '../../../environments/environment';
import { Session } from '../../core/auth/session';
import { Language } from '../../core/i18n/language';
import { activityOf } from '../../shared/model/activities';
import { PlanSummary } from '../../shared/model/plan';
import { levelKey } from '../../shared/model/profile';
import { Plan } from '../../shared/model/published-plan';
import { clockTime, spotsKey, startsIn } from '../../shared/time/plan-time';
import { LanguageSwitcher } from '../../shared/ui/language-switcher';
import { SAMPLE_PLANS } from './sample-plans';

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
  protected readonly levelKey = levelKey;
  protected readonly plans = signal<PlanSummary[]>(SAMPLE_PLANS);
  protected readonly plansByStart = computed(() =>
    [...this.plans()].sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime()),
  );

  protected startsIn(startsAt: Date | string) {
    return startsIn(new Date(startsAt), new Date());
  }

  protected clockTime(startsAt: string): string {
    return clockTime(new Date(startsAt), this.language.locale());
  }
}
