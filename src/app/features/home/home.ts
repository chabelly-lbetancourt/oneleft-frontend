import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Session } from '../../core/auth/session';
import { PlanSummary } from '../../shared/model/plan';
import { SAMPLE_PLANS } from './sample-plans';

@Component({
  selector: 'app-home',
  imports: [Avatar, Button, RouterLink, Tag],
  templateUrl: './home.html',
})
export class Home {
  protected readonly session = inject(Session);
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

  protected freeSpotsLabel(plan: PlanSummary): string {
    return plan.freeSpots === 1 ? 'Falta 1' : `Faltan ${plan.freeSpots}`;
  }
}
