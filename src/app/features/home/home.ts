import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { environment } from '../../../environments/environment';
import { Session } from '../../core/auth/session';
import { activityOf } from '../../shared/model/activities';
import { Plan } from '../../shared/model/published-plan';
import { PlanSummary } from '../../shared/model/plan';
import { clockTime, startsInLabel } from '../../shared/time/plan-time';
import { SAMPLE_PLANS } from './sample-plans';

@Component({
  selector: 'app-home',
  imports: [Avatar, Button, RouterLink, Tag],
  templateUrl: './home.html',
})
export class Home {
  protected readonly session = inject(Session);
  /** Plans I organize that have not started yet (only with a session). */
  protected readonly myPlans = httpResource<Plan[]>(() =>
    this.session.isAuthenticated() ? `${environment.apiUrl}/api/v1/plans/mine` : undefined,
  );
  protected readonly activityOf = activityOf;
  protected readonly plans = signal<PlanSummary[]>(SAMPLE_PLANS);
  protected readonly plansByStart = computed(() =>
    [...this.plans()].sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime()),
  );

  protected startsIn(plan: PlanSummary): string {
    const minutes = Math.max(0, Math.round((plan.startsAt.getTime() - Date.now()) / 60_000));
    if (minutes < 60) {
      return `en ${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest === 0 ? `en ${hours} h` : `en ${hours} h ${rest} min`;
  }

  protected myPlanTime(plan: Plan): string {
    const date = new Date(plan.startsAt);
    return `${clockTime(date)} · ${startsInLabel(date, new Date())}`;
  }

  protected freeSpotsLabel(plan: { freeSpots: number }): string {
    return plan.freeSpots === 1 ? 'Falta 1' : `Faltan ${plan.freeSpots}`;
  }
}
