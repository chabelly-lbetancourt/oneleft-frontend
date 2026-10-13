import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { filter } from 'rxjs';
import { PlansApi } from '../../core/api/plans-api';
import { Session } from '../../core/auth/session';
import { ApproximateLocation, LocationError } from '../../core/geo/approximate-location';
import { ApiErrorMessage, apiErrorMessage } from '../../core/i18n/api-error';
import { Language } from '../../core/i18n/language';
import { UserEvents } from '../../core/realtime/user-events';
import {
  CHECK_IN_CLOSES_AFTER_MINUTES,
  CHECK_IN_OPENS_BEFORE_MINUTES,
  CheckIn,
  Plan,
} from '../../shared/model/published-plan';
import { clockTime } from '../../shared/time/plan-time';

const MINUTE = 60_000;
/** How often the window of the check-in is looked at again, so that it opens and closes on its own */
const TICK = 30_000;

/**
 * «I'm here» at the meeting point (HU-025), for the organizer and the participants of a plan, from 15 minutes before
 * the start to 30 minutes after it. A fresh, precise location is read only when the button is pressed and only sent to
 * check the geofence. The group sees who has arrived, updated in real time.
 */
@Component({
  selector: 'app-plan-check-in',
  imports: [Button, Message, TranslocoPipe],
  templateUrl: './plan-check-in.html',
  styleUrl: './plan-check-in.scss',
})
export class PlanCheckIn {
  private readonly api = inject(PlansApi);
  private readonly location = inject(ApproximateLocation);
  private readonly session = inject(Session);
  private readonly language = inject(Language);
  private readonly transloco = inject(TranslocoService);

  /** A plan of which I am the organizer or a participant */
  readonly plan = input.required<Plan>();

  private readonly now = signal(Date.now());
  protected readonly open = computed(() => {
    const plan = this.plan();
    const start = new Date(plan.startsAt).getTime();
    const now = this.now();
    return (
      plan.status !== 'CANCELLED' &&
      now >= start - CHECK_IN_OPENS_BEFORE_MINUTES * MINUTE &&
      now <= start + CHECK_IN_CLOSES_AFTER_MINUTES * MINUTE
    );
  });
  private readonly checkIns = signal<CheckIn[]>([]);
  /** Who has arrived, in order of arrival, with the time */
  protected readonly arrived = computed(() => {
    const me = this.session.userId();
    return this.checkIns().map((checkIn) => ({
      ...checkIn,
      mine: checkIn.userId === me,
      time: clockTime(new Date(checkIn.at), this.language.locale()),
    }));
  });
  protected readonly mine = computed(() => this.arrived().find(({ mine }) => mine) ?? null);
  protected readonly busy = signal(false);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  /** Plan whose check-ins have been asked for */
  private loadedFor: string | null = null;

  constructor() {
    const timer = setInterval(() => this.now.set(Date.now()), TICK);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
    effect(() => {
      const id = this.plan().id;
      if (this.open() && this.loadedFor !== id) {
        this.loadedFor = id;
        this.load(id);
      }
    });
    inject(UserEvents)
      .checkIn$.pipe(
        filter((notice) => notice.planId === this.plan().id),
        takeUntilDestroyed(),
      )
      .subscribe((notice) => this.load(notice.planId));
  }

  protected async checkIn(): Promise<void> {
    this.busy.set(true);
    this.error.set(null);
    try {
      const here = await this.location.precise();
      this.api.checkIn(this.plan().id, here).subscribe({
        next: (checkIn) => {
          this.checkIns.update((list) =>
            [...list.filter(({ userId }) => userId !== checkIn.userId), checkIn].sort((a, b) =>
              a.at.localeCompare(b.at),
            ),
          );
          this.busy.set(false);
        },
        error: (error) => this.fail(apiErrorMessage(this.transloco, error, 'errors.checkInFailed')),
      });
    } catch (error) {
      this.fail({ key: (error as LocationError).translationKey ?? 'errors.location.denied' });
    }
  }

  private fail(message: ApiErrorMessage): void {
    this.busy.set(false);
    this.error.set(message);
  }

  private load(id: string): void {
    this.api.checkIns(id).subscribe({
      next: (checkIns) => this.checkIns.set(checkIns),
      error: () => this.checkIns.set([]),
    });
  }
}
