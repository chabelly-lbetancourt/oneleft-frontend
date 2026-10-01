import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Language } from '../../core/i18n/language';
import { UserEvents } from '../../core/realtime/user-events';
import { activityKey } from '../../shared/model/activities';
import { PlanNearbyNotice } from '../../shared/model/notifications';
import { clockTime, spotsKey } from '../../shared/time/plan-time';

/**
 * Toasts of the personal events: someone joined or left one of my plans, a spot I was waiting for is mine, or a plan I
 * like has been published nearby (HU-006). Tapping one opens the plan.
 */
@Component({
  selector: 'app-join-notices',
  imports: [Toast],
  providers: [MessageService],
  template: `
    <p-toast position="top-center" key="joins">
      <ng-template let-message #message>
        <button type="button" class="join-notice" (click)="open(message.data)">
          <i class="join-notice__icon pi {{ message.icon }}" aria-hidden="true"></i>
          <span class="join-notice__text">
            <span class="join-notice__title">{{ message.summary }}</span>
            <span class="join-notice__detail">{{ message.detail }}</span>
          </span>
        </button>
      </ng-template>
    </p-toast>
  `,
  styleUrl: './join-notices.scss',
})
export class JoinNotices {
  private readonly messages = inject(MessageService);
  private readonly transloco = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly language = inject(Language);

  constructor() {
    const events = inject(UserEvents);
    const destroyRef = inject(DestroyRef);
    events.left$.pipe(takeUntilDestroyed(destroyRef)).subscribe((notice) =>
      this.show(
        'pi-user-minus',
        'notices.leftTitle',
        notice.promotedName
          ? this.transloco.translate('notices.leftAndIn', {
              name: notice.participantName,
              title: notice.title,
              promoted: notice.promotedName,
            })
          : this.transloco.translate('notices.left', {
              name: notice.participantName,
              title: notice.title,
            }),
        notice.planId,
      ),
    );
    events.spotFreed$
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((notice) =>
        this.show(
          'pi-check-circle',
          'notices.spotTitle',
          this.transloco.translate('notices.spot', { title: notice.title }),
          notice.planId,
          'success',
        ),
      );
    events.nearby$
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((notice) =>
        this.show('pi-map-marker', 'notices.nearbyTitle', this.nearby(notice), notice.planId),
      );
    events.joined$.pipe(takeUntilDestroyed(destroyRef)).subscribe((notice) =>
      this.messages.add({
        key: 'joins',
        icon: 'pi-user-plus',
        severity: notice.full ? 'success' : 'info',
        summary: this.transloco.translate(
          notice.full ? 'notices.fullTitle' : 'notices.joinedTitle',
        ),
        detail: this.transloco.translate('notices.joined', {
          name: notice.participantName,
          title: notice.title,
          count: notice.freeSpots,
        }),
        life: 8000,
        data: notice.planId,
      }),
    );
  }

  private show(
    icon: string,
    title: string,
    detail: string,
    planId: string,
    severity = 'info',
  ): void {
    this.messages.add({
      key: 'joins',
      icon,
      severity,
      summary: this.transloco.translate(title),
      detail,
      life: 8000,
      data: planId,
    });
  }

  /** "Padel at 18:20 · Pistas de la Albufera · 0.7 km · 1 spot left", in the app's language. */
  private nearby(notice: PlanNearbyNotice): string {
    return this.transloco.translate('notices.nearby', {
      title: notice.title,
      activity: this.transloco.translate(activityKey(notice.activity)),
      time: clockTime(new Date(notice.startsAt), this.language.locale()),
      place: notice.placeName,
      km: (notice.distanceMeters / 1000).toLocaleString(this.language.locale(), {
        maximumFractionDigits: 1,
      }),
      spots: this.transloco.translate(spotsKey(notice.freeSpots), { count: notice.freeSpots }),
    });
  }

  protected open(planId: string): void {
    this.messages.clear('joins');
    void this.router.navigate(['/plans', planId]);
  }
}
