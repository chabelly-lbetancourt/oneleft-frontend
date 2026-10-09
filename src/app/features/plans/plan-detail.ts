import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { catchError, filter, merge, Observable, of } from 'rxjs';
import { PlansApi } from '../../core/api/plans-api';
import { Session } from '../../core/auth/session';
import { ApiErrorMessage, apiErrorMessage } from '../../core/i18n/api-error';
import { Language } from '../../core/i18n/language';
import { NativePlatform } from '../../core/platform';
import { UserEvents } from '../../core/realtime/user-events';
import { activityKey, activityOf } from '../../shared/model/activities';
import { levelKey } from '../../shared/model/profile';
import { CardSkeleton } from '../../components/card-skeleton/card-skeleton';
import { IconTile } from '../../components/icon-tile/icon-tile';
import { SpotSlots } from '../../components/spot-slots/spot-slots';
import { PageLayout } from '../../layout/page-layout/page-layout';
import {
  ArrivalStatus,
  Forecast,
  FreePerson,
  LATE_OPTIONS,
  Plan,
} from '../../shared/model/published-plan';
import { clockTime, spotsKey, startsIn } from '../../shared/time/plan-time';
import {
  CalendarEvent,
  googleCalendarUrl,
  icsFileName,
  planIcs,
} from '../../shared/calendar/plan-calendar';

/** What the signed-in person can do with the plan. */
type Relation =
  'guest' | 'organizer' | 'participant' | 'waiting' | 'canJoin' | 'full' | 'closed' | 'ended';

/** States after the start (HU-007): nobody joins or leaves any more */
const ENDED: Plan['status'][] = ['IN_PROGRESS', 'FINISHED', 'CANCELLED'];

@Component({
  selector: 'app-plan-detail',
  imports: [
    Avatar,
    Button,
    CardSkeleton,
    IconTile,
    Message,
    PageLayout,
    SpotSlots,
    Tag,
    TranslocoPipe,
  ],
  templateUrl: './plan-detail.html',
  styleUrl: './plan-detail.scss',
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
  /** Weather forecast of an upcoming outdoor plan (HU-026); null without one */
  protected readonly forecast = signal<Forecast | null>(null);
  /** Plan whose forecast has been asked for */
  private forecastOf: string | null = null;
  /** The organizer and the participants can say how they are getting there until the start (HU-040) */
  protected readonly canAnnounce = computed(() =>
    ['organizer', 'participant'].includes(this.relation() ?? ''),
  );
  protected readonly lateOptions = LATE_OPTIONS;
  /** Statuses of the group, mine first */
  protected readonly arrivals = computed(() => {
    const me = this.session.userId();
    return [...(this.plan()?.arrivals ?? [])]
      .sort((a, b) => Number(b.userId === me) - Number(a.userId === me))
      .map((arrival) => ({
        ...arrival,
        mine: arrival.userId === me,
        key: arrival.status === 'LATE' ? 'plan.arrivalLate' : 'plan.arrivalOnTheWay',
      }));
  });
  protected readonly myArrival = computed(
    () => this.arrivals().find((arrival) => arrival.mine) ?? null,
  );
  /** Free people near my upcoming plan (HU-035); null until known, and for anyone but the organizer */
  protected readonly freePeople = signal<FreePerson[] | null>(null);
  protected readonly freePeopleView = computed(() => {
    const people = this.freePeople();
    if (!people || this.relation() !== 'organizer') {
      return null;
    }
    const locale = this.language.locale();
    return people.map((person) => ({
      km: (person.distanceMeters / 1000).toLocaleString(locale),
      levelKey: levelKey(person.level),
      activities: person.activities
        .map((code) => this.transloco.translate(activityKey(code)))
        .join(', '),
    }));
  });
  protected readonly weather = computed(() => {
    const forecast = this.forecast();
    if (!forecast || this.ended()) {
      return null;
    }
    const locale = this.language.locale();
    const number = (value: number) => Math.round(value).toLocaleString(locale);
    return {
      params: {
        temperature: number(forecast.temperature),
        rain: number(forecast.precipitationProbability),
        wind: number(forecast.windSpeed),
      },
      icon: forecast.precipitationProbability >= 30 ? 'pi-cloud' : 'pi-sun',
      rainLikely: forecast.rainLikely,
    };
  });
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
    if (ENDED.includes(plan.status)) {
      return 'ended';
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
  /** The organizer and the participants can add an upcoming plan to their calendar (HU-027) */
  protected readonly canAddToCalendar = computed(() =>
    ['organizer', 'participant'].includes(this.relation() ?? ''),
  );
  /** The plan has started, finished or been cancelled (HU-007) */
  protected readonly ended = computed(() => ENDED.includes(this.plan()?.status ?? 'OPEN'));
  protected readonly endedHintKey = computed(() => {
    const plan = this.plan();
    if (plan?.status === 'IN_PROGRESS') {
      return 'plan.startedHint';
    }
    if (plan?.status === 'FINISHED') {
      return 'plan.finishedHint';
    }
    return plan?.minimum ? 'plan.cancelledMinimumHint' : 'plan.cancelledHint';
  });
  /** Minimum of participants (HU-039), while the plan is upcoming: pending with its deadline, or confirmed */
  protected readonly minimum = computed(() => {
    const plan = this.plan();
    const minimum = plan?.minimum;
    if (!minimum || ENDED.includes(plan.status)) {
      return null;
    }
    return {
      key: minimum.confirmed ? 'plan.minimumConfirmed' : 'plan.minimumPending',
      params: {
        count: minimum.participants,
        time: clockTime(new Date(minimum.deadline), this.language.locale()),
      },
      confirmed: minimum.confirmed,
    };
  });

  constructor() {
    effect(() => this.load(this.id()));
    // The plan is refreshed at once when a notice about it arrives: someone joined or left, or my spot came up
    const events = inject(UserEvents);
    merge(events.joined$, events.left$, events.spotFreed$, events.cancelled$, events.arrival$)
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

  /**
   * iCalendar file for Google Calendar, Apple Calendar and Outlook. The WebView of the Android app cannot download
   * files, so there it opens Google Calendar with the event filled in.
   */
  protected async addToCalendar(): Promise<void> {
    const plan = this.plan();
    if (!plan) {
      return;
    }
    const url = this.api.shareUrl(plan.id);
    const event: CalendarEvent = {
      id: plan.id,
      title: plan.title,
      description: [plan.description, this.transloco.translate('plan.calendarLink', { url })]
        .filter(Boolean)
        .join('\n\n'),
      location: plan.meetingPoint.name,
      latitude: plan.meetingPoint.latitude,
      longitude: plan.meetingPoint.longitude,
      startsAt: new Date(plan.startsAt),
      url,
    };
    if (this.platform.isNative()) {
      await this.platform.openBrowser(googleCalendarUrl(event));
      return;
    }
    const file = new Blob([planIcs(event, new Date())], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = icsFileName(plan.title);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  /** «On my way» or «running late» (HU-040): the plan comes back with the statuses of the group. */
  protected announce(status: ArrivalStatus, minutesLate: number | null = null): void {
    this.change(this.api.announceArrival(this.id(), status, minutesLate), 'errors.arrivalFailed');
  }

  protected clearArrival(): void {
    this.change(this.api.clearArrival(this.id()), 'errors.arrivalFailed');
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
      next: (plan) => {
        this.plan.set(plan);
        // The forecast is asked once per plan, and not by guests (it needs a session). A plain field, not the plan
        // signal: the effect that loads the plan must not depend on it
        if (this.forecastOf !== plan.id && !this.isGuest() && !ENDED.includes(plan.status)) {
          this.forecastOf = plan.id;
          this.api.weather(plan.id).subscribe((forecast) => this.forecast.set(forecast));
          // Only the organizer sees who is free nearby (HU-035)
          if (plan.organizerId === this.session.userId()) {
            this.api
              .freePeople(plan.id)
              .pipe(catchError(() => of([])))
              .subscribe((people) => this.freePeople.set(people));
          }
        }
      },
      error: () => this.notFound.set(true),
    });
  }
}
