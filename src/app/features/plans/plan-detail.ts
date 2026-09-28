import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { filter } from 'rxjs';
import { PlansApi } from '../../core/api/plans-api';
import { Session } from '../../core/auth/session';
import { ApiErrorMessage, apiErrorMessage } from '../../core/i18n/api-error';
import { Language } from '../../core/i18n/language';
import { UserEvents } from '../../core/realtime/user-events';
import { activityKey, activityOf } from '../../shared/model/activities';
import { levelKey } from '../../shared/model/profile';
import { Plan } from '../../shared/model/published-plan';
import { clockTime, spotsKey, startsIn } from '../../shared/time/plan-time';

/** What the signed-in person can do with the plan. */
type Relation = 'organizer' | 'participant' | 'canJoin' | 'full' | 'closed';

@Component({
  selector: 'app-plan-detail',
  imports: [RouterLink, Avatar, Button, Message, Tag, TranslocoPipe],
  templateUrl: './plan-detail.html',
})
export class PlanDetail {
  private readonly api = inject(PlansApi);
  private readonly language = inject(Language);
  private readonly session = inject(Session);
  private readonly transloco = inject(TranslocoService);

  /** Route parameters (withComponentInputBinding) */
  readonly id = input.required<string>();
  readonly published = input<string>();

  protected readonly plan = signal<Plan | null>(null);
  protected readonly notFound = signal(false);
  protected readonly joining = signal(false);
  protected readonly joinError = signal<ApiErrorMessage | null>(null);
  protected readonly justJoined = signal(false);
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
  /** Same rules as the service: the button only appears when joining can work. */
  protected readonly relation = computed<Relation | null>(() => {
    const plan = this.plan();
    const me = this.session.userId();
    if (!plan) {
      return null;
    }
    if (plan.organizerId === me) {
      return 'organizer';
    }
    if (plan.participants.some((participant) => participant.userId === me)) {
      return 'participant';
    }
    if (plan.status === 'FULL' || plan.freeSpots === 0) {
      return 'full';
    }
    return plan.status === 'OPEN' && new Date(plan.startsAt).getTime() > Date.now() ? 'canJoin' : 'closed';
  });
  protected readonly isMe = (userId: string) => userId === this.session.userId();

  constructor() {
    effect(() => this.load(this.id()));
    // The organizer sees new participants at once when a notice about this plan arrives
    inject(UserEvents)
      .joined$.pipe(
        filter((notice) => notice.planId === this.id()),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.load(this.id()));
  }

  protected join(): void {
    this.joining.set(true);
    this.joinError.set(null);
    this.api.join(this.id()).subscribe({
      next: (plan) => {
        this.plan.set(plan);
        this.joining.set(false);
        this.justJoined.set(true);
      },
      error: (error) => {
        this.joining.set(false);
        this.joinError.set(apiErrorMessage(this.transloco, error, 'errors.joinFailed'));
        // The plan may have changed (for example, the last spot was taken): show its current state
        this.load(this.id());
      },
    });
  }

  protected initials(name: string): string {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]!.toUpperCase())
      .join('');
  }

  private load(id: string): void {
    this.api.plan(id).subscribe({
      next: (plan) => this.plan.set(plan),
      error: () => this.notFound.set(true),
    });
  }
}
