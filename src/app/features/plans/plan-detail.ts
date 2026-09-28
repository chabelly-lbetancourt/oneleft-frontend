import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { PlansApi } from '../../core/api/plans-api';
import { Language } from '../../core/i18n/language';
import { activityKey, activityOf } from '../../shared/model/activities';
import { levelKey } from '../../shared/model/profile';
import { Plan } from '../../shared/model/published-plan';
import { clockTime, spotsKey, startsIn } from '../../shared/time/plan-time';

@Component({
  selector: 'app-plan-detail',
  imports: [RouterLink, Button, Message, Tag, TranslocoPipe],
  templateUrl: './plan-detail.html',
})
export class PlanDetail {
  private readonly api = inject(PlansApi);
  private readonly language = inject(Language);

  /** Route parameters (withComponentInputBinding) */
  readonly id = input.required<string>();
  readonly published = input<string>();

  protected readonly plan = signal<Plan | null>(null);
  protected readonly notFound = signal(false);
  protected readonly spotsKey = spotsKey;
  protected readonly activity = computed(() => activityOf(this.plan()?.activity ?? ''));
  protected readonly activityKey = computed(() => activityKey(this.activity().code));
  protected readonly levelKey = computed(() => levelKey(this.plan()?.level));
  protected readonly startsAt = computed(() => {
    const plan = this.plan();
    if (!plan) {
      return null;
    }
    const date = new Date(plan.startsAt);
    return { time: clockTime(date, this.language.locale()), relative: startsIn(date, new Date()) };
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
}
