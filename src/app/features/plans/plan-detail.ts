import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { filter, merge, Observable } from 'rxjs';
import { PlansApi } from '../../core/api/plans-api';
import { Session } from '../../core/auth/session';
import { ApiErrorMessage, apiErrorMessage } from '../../core/i18n/api-error';
import { Language } from '../../core/i18n/language';
import { NativePlatform } from '../../core/platform';
import { UserEvents } from '../../core/realtime/user-events';
import { activityKey, activityOf } from '../../shared/model/activities';
import { levelKey } from '../../shared/model/profile';
import { Plan } from '../../shared/model/published-plan';
import { clockTime, spotsKey, startsIn } from '../../shared/time/plan-time';
import { IconTile } from '../../shared/ui/icon-tile';
import { PageHeader } from '../../shared/ui/page-header';
import { SpotSlots } from '../../shared/ui/spot-slots';

/** What the signed-in person can do with the plan. */
type Relation = 'guest' | 'organizer' | 'participant' | 'waiting' | 'canJoin' | 'full' | 'closed';

@Component({
  selector: 'app-plan-detail',
  imports: [Avatar, Button, IconTile, Message, PageHeader, SpotSlots, Tag, TranslocoPipe],
  templateUrl: './plan-detail.html',
})
export class PlanDetail {
  private readonly api = inject(PlansApi);
  private readonly language = inject(Language);
  private readonly session = inject(Session);
  private readonly transloco = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly platform = inject(NativePlatform);

  /** Route parameters (withComponentInputBinding) */
  readonly id = input.required<string>();
  readonly published = input<string>();

  protected readonly plan = signal<Plan | null>(null);
  protected readonly notFound = signal(false);
  protected readonly joining = signal(false);
  protected readonly joinError = signal<ApiErrorMessage | null>(null);
  protected readonly justJoined = signal(false);
  protected readonly justLeft = signal(false);
  protected readonly confirmingLeave = signal(false);
  /** A leave or waiting list request in progress */
  protected readonly busy = signal(false);
  /** Opened from a shared link without a session (HU-024): the public view of the plan */
  protected readonly isGuest = computed(() => !this.session.isAuthenticated());
  /** Browsers without the native share sheet copy the link instead */
  protected readonly copied = signal(false);
  protected readonly spotsKey = spotsKey;
  protected readonly activity = computed(() => activityOf(this.plan()?.activity ?? ''));
  /** The organizer and the participants, for the spots of the plan */
  protected readonly people = computed(() => {
    const plan = this.plan();
    return plan && !this.isGuest()
      ? [plan.organizerName, ...plan.participants.map((participant) => participant.name)]
      : [];
  });
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
    const upcoming = new Date(plan.startsAt).getTime() > Date.now();
    if (this.isGuest()) {
      if (plan.status === 'OPEN' && plan.freeSpots > 0 && upcoming) {
        return 'guest';
      }
      return plan.status === 'FULL' ? 'full' : 'closed';
    }
    if (plan.organizerId === me) {
      return 'organizer';
    }
    if (plan.participants.some((participant) => participant.userId === me)) {
      return 'participant';
    }
    if ((plan.waitlist ?? []).some((person) => person.userId === me)) {
      return 'waiting';
    }
    if (plan.status === 'FULL' || plan.freeSpots === 0) {
      return upcoming && plan.status === 'FULL' ? 'full' : 'closed';
    }
    return plan.status === 'OPEN' && upcoming ? 'canJoin' : 'closed';
  });
  /** 1 for the first person of the waiting list */
  protected readonly waitingPosition = computed(
    () =>
      (this.plan()?.waitlist ?? []).findIndex((person) => person.userId === this.session.userId()) +
      1,
  );
  protected readonly isMe = (userId: string) => userId === this.session.userId();

  constructor() {
    effect(() => this.load(this.id()));
    // The plan is refreshed at once when a notice about it arrives: someone joined or left, or my spot came up
    const events = inject(UserEvents);
    merge(events.joined$, events.left$, events.spotFreed$)
      .pipe(
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

  /** Without a session: sign in (or sign up) and come back to this plan to join it. */
  protected signIn(): void {
    void this.router.navigate(['/login'], { queryParams: { returnUrl: `/plans/${this.id()}` } });
  }

  /** Share sheet (Android app or Web Share API); where there is none, the link is copied. */
  protected async share(): Promise<void> {
    const plan = this.plan();
    if (!plan) {
      return;
    }
    const url = this.api.shareUrl(plan.id);
    const text = this.transloco.translate('plan.shareText', {
      activity: this.transloco.translate(this.activityKey()),
      time: this.startsAt()?.time,
      spots: this.transloco.translate(spotsKey(plan.freeSpots), { count: plan.freeSpots }),
    });
    const content = { title: plan.title, text, url };
    const sheet = this.platform.isNative()
      ? () => this.platform.share(content)
      : typeof navigator.share === 'function'
        ? () => navigator.share(content)
        : null;
    if (sheet) {
      try {
        await sheet();
      } catch {
        // The user closed the sheet: nothing to do
      }
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    this.copied.set(true);
  }

  protected leave(): void {
    this.change(this.api.leave(this.id()), 'errors.leaveFailed', () => {
      this.confirmingLeave.set(false);
      this.justJoined.set(false);
      this.justLeft.set(true);
    });
  }

  protected joinWaitlist(): void {
    this.change(this.api.joinWaitlist(this.id()), 'errors.waitlistFailed');
  }

  protected leaveWaitlist(): void {
    this.change(this.api.leaveWaitlist(this.id()), 'errors.waitlistFailed');
  }

  /** Leave or waiting list: shows the new plan or, if it fails, why and the current state of the plan. */
  private change(request: Observable<Plan>, fallback: string, done?: () => void): void {
    this.busy.set(true);
    this.joinError.set(null);
    request.subscribe({
      next: (plan) => {
        this.plan.set(plan);
        this.busy.set(false);
        done?.();
      },
      error: (error) => {
        this.busy.set(false);
        this.joinError.set(apiErrorMessage(this.transloco, error, fallback));
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
    (this.isGuest() ? this.api.publicPlan(id) : this.api.plan(id)).subscribe({
      next: (plan) => this.plan.set(plan),
      error: () => this.notFound.set(true),
    });
  }
}
