import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { UserEvents } from '../../core/realtime/user-events';

/**
 * Toasts of the personal events: someone joined or left one of my plans, or a spot I was waiting for is mine.
 * Tapping one opens the plan.
 */
@Component({
  selector: 'app-join-notices',
  imports: [Toast],
  providers: [MessageService],
  template: `
    <p-toast position="top-center" key="joins">
      <ng-template let-message #message>
        <button
          type="button"
          class="join-notice flex w-full gap-3 text-left"
          (click)="open(message.data)"
        >
          <i class="pi {{ message.icon }} text-2xl text-primary-600" aria-hidden="true"></i>
          <span class="flex-1">
            <span class="block font-semibold">{{ message.summary }}</span>
            <span class="block text-sm">{{ message.detail }}</span>
          </span>
        </button>
      </ng-template>
    </p-toast>
  `,
})
export class JoinNotices {
  private readonly messages = inject(MessageService);
  private readonly transloco = inject(TranslocoService);
  private readonly router = inject(Router);

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

  protected open(planId: string): void {
    this.messages.clear('joins');
    void this.router.navigate(['/plans', planId]);
  }
}
