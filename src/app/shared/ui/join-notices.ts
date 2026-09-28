import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { UserEvents } from '../../core/realtime/user-events';

/** Toast for the organizer when someone joins one of their plans; tapping it opens the plan. */
@Component({
  selector: 'app-join-notices',
  imports: [Toast],
  providers: [MessageService],
  template: `
    <p-toast position="top-center" key="joins">
      <ng-template let-message #message>
        <button type="button" class="join-notice flex w-full gap-3 text-left" (click)="open(message.data)">
          <i class="pi pi-user-plus text-2xl text-primary" aria-hidden="true"></i>
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
    inject(UserEvents)
      .joined$.pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((notice) =>
        this.messages.add({
          key: 'joins',
          severity: notice.full ? 'success' : 'info',
          summary: this.transloco.translate(notice.full ? 'notices.fullTitle' : 'notices.joinedTitle'),
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

  protected open(planId: string): void {
    this.messages.clear('joins');
    void this.router.navigate(['/plans', planId]);
  }
}
