import { Component, computed, inject, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Language } from '../../core/i18n/language';
import { formatDistance } from '../../shared/geo/distance';
import { activityKey, activityOf } from '../../shared/model/activities';
import { Plan } from '../../shared/model/published-plan';
import { clockTime, spotsKey, startsIn } from '../../shared/time/plan-time';
import { IconTile } from '../icon-tile/icon-tile';
import { SpotSlots } from '../spot-slots/spot-slots';

/**
 * A plan in a list: the activity, when, where, who is in and how many spots are left. The caller wraps it in its link (so each list keeps its own class for the tests).
 */
@Component({
  selector: 'app-plan-ticket',
  imports: [IconTile, SpotSlots, TranslocoPipe],
  templateUrl: './plan-ticket.html',
  styleUrl: './plan-ticket.scss',
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
