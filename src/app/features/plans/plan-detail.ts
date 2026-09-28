import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { PlansApi } from '../../core/api/plans-api';
import { activityOf } from '../../shared/model/activities';
import { LEVEL_LABELS } from '../../shared/model/profile';
import { Plan } from '../../shared/model/published-plan';
import { clockTime, startsInLabel } from '../../shared/time/plan-time';

@Component({
  selector: 'app-plan-detail',
  imports: [RouterLink, Button, Message, Tag],
  templateUrl: './plan-detail.html',
})
export class PlanDetail {
  private readonly api = inject(PlansApi);

  /** Route parameters (withComponentInputBinding) */
  readonly id = input.required<string>();
  readonly published = input<string>();

  protected readonly plan = signal<Plan | null>(null);
  protected readonly notFound = signal(false);
  protected readonly activity = computed(() => activityOf(this.plan()?.activity ?? ''));
  protected readonly levelLabel = computed(() => {
    const level = this.plan()?.level;
    return level ? LEVEL_LABELS[level] : 'Cualquier nivel';
  });
  protected readonly startsAt = computed(() => {
    const plan = this.plan();
    if (!plan) {
      return null;
    }
    const date = new Date(plan.startsAt);
    return { time: clockTime(date), relative: startsInLabel(date, new Date()) };
  });
  protected readonly mapUrl = computed(() => {
    const point = this.plan()?.meetingPoint;
    return point
      ? `https://www.openstreetmap.org/?mlat=${point.latitude}&mlon=${point.longitude}#map=17/${point.latitude}/${point.longitude}`
      : '';
  });

  constructor() {
    effect(() => {
      const id = this.id();
      this.api.plan(id).subscribe({
        next: (plan) => this.plan.set(plan),
        error: () => this.notFound.set(true),
      });
    });
  }

  protected spotsLabel(plan: Plan): string {
    return plan.freeSpots === 1 ? 'Falta 1' : `Faltan ${plan.freeSpots}`;
  }
}
