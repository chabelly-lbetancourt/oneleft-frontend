import { Component, computed, inject, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Language } from '../../core/i18n/language';
import { formatDistance } from '../geo/distance';
import { activityKey, activityOf } from '../model/activities';
import { Plan } from '../model/published-plan';
import { clockTime, spotsKey, startsIn } from '../time/plan-time';
import { SpotSlots } from './spot-slots';

/**
 * A plan in a list: the activity, when, where, who is in and how many spots are left. The caller wraps it in its link (so each list keeps its own class for the tests).
 */
@Component({
  selector: 'app-plan-ticket',
  imports: [SpotSlots, TranslocoPipe],
  template: `
    @let current = plan();
    <article class="plan-ticket card card-link flex gap-4 p-4">
      <div [class]="'grid size-11 shrink-0 place-items-center rounded-xl ' + activity().tone">
        <i class="pi {{ activity().icon }} text-lg" aria-hidden="true"></i>
      </div>
      <div class="flex min-w-0 flex-1 flex-col gap-1.5">
        <div class="flex items-start justify-between gap-3">
          <h2 class="text-base font-semibold leading-snug">{{ current.title }}</h2>
          <span
            class="spots-left shrink-0 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-primary-700 ring-1 ring-primary-200"
            >{{ spotsKey(current.freeSpots) | transloco: { count: current.freeSpots } }}</span
          >
        </div>
        <p class="text-sm text-surface-600">
          {{ activityKey() | transloco }} ·
          <span class="font-semibold text-ink">{{ time() }}</span> ·
          {{ relative().key | transloco: relative().params }}
        </p>
        <div class="mt-1 flex items-center justify-between gap-3">
          <p class="min-w-0 truncate text-sm text-surface-600">
            <i class="pi pi-map-marker text-xs" aria-hidden="true"></i>
            {{ current.meetingPoint.name }}
            @if (distanceMeters() !== null) {
              · <span class="nearby-distance font-medium text-ink">{{ distance() }}</span>
            }
          </p>
          <app-spot-slots class="shrink-0" [names]="names()" [free]="current.freeSpots" />
        </div>
      </div>
    </article>
  `,
})
export class PlanTicket {
  private readonly language = inject(Language);

  readonly plan = input.required<Plan>();
  readonly distanceMeters = input<number | null>(null);

  protected readonly activity = computed(() => activityOf(this.plan().activity));
  protected readonly activityKey = computed(() => activityKey(this.plan().activity));
  protected readonly time = computed(() =>
    clockTime(new Date(this.plan().startsAt), this.language.locale()),
  );
  protected readonly relative = computed(() =>
    startsIn(new Date(this.plan().startsAt), new Date()),
  );
  protected readonly names = computed(() => [
    this.plan().organizerName,
    ...(this.plan().participants ?? []).map((participant) => participant.name),
  ]);
  protected readonly distance = computed(() =>
    formatDistance(this.distanceMeters() ?? 0, this.language.locale()),
  );
  protected readonly spotsKey = spotsKey;
}
