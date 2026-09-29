import { Component, computed, inject, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Language } from '../../core/i18n/language';
import { formatDistance } from '../geo/distance';
import { activityKey, activityOf } from '../model/activities';
import { Plan } from '../model/published-plan';
import { clockTime, spotsKey, startsIn } from '../time/plan-time';
import { SpotSlots } from './spot-slots';

/**
 * A plan as a match ticket: the activity stub on the left and, on the right, when, where, who is in and how
 * many spots are left. The caller wraps it in its link (so each list keeps its own class for the tests).
 */
@Component({
  selector: 'app-plan-ticket',
  imports: [SpotSlots, TranslocoPipe],
  template: `
    @let current = plan();
    <article class="plan-ticket sticker sticker-link flex overflow-hidden">
      <div
        class="flex w-16 shrink-0 flex-col items-center justify-center gap-1 border-r-2 border-dashed border-ink {{
          activity().tone
        }}"
      >
        <i class="pi {{ activity().icon }} text-2xl" aria-hidden="true"></i>
        <span class="font-display text-sm font-extrabold">{{ time() }}</span>
      </div>
      <div class="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="text-xs font-bold uppercase tracking-wide text-surface-600">
              {{ activityKey() | transloco }} · {{ relative().key | transloco: relative().params }}
            </p>
            <h2 class="font-display text-lg font-extrabold leading-tight">{{ current.title }}</h2>
          </div>
          <span
            class="spots-left slot shrink-0 rounded-full px-2.5 py-0.5 text-xs font-extrabold whitespace-nowrap"
            >{{ spotsKey(current.freeSpots) | transloco: { count: current.freeSpots } }}</span
          >
        </div>
        <p class="truncate text-sm text-surface-600">
          <i class="pi pi-map-marker text-xs" aria-hidden="true"></i>
          {{ current.meetingPoint.name }}
          @if (distanceMeters() !== null) {
            · <span class="nearby-distance font-semibold text-ink">{{ distance() }}</span>
          }
        </p>
        <app-spot-slots [names]="names()" [free]="current.freeSpots" />
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
