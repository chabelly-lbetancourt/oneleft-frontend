import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { PlansApi } from '@core/api/plans-api';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import { UserEvents } from '@core/realtime/user-events';
import { levelKey } from '@shared/model/profile';
import { JoinRequest, Plan } from '@shared/model/published-plan';

/**
 * The requests for a spot in my plan (HU-069), for its organizer: who asked and with what message, to accept or reject.
 * It refreshes when someone asks. Only name and message: no contact data or location.
 */
@Component({
  selector: 'app-join-requests',
  imports: [Button, Message, TranslocoPipe],
  templateUrl: './join-requests.html',
  styleUrl: './join-requests.scss',
})
export class JoinRequests {
  private readonly api = inject(PlansApi);
  private readonly transloco = inject(TranslocoService);
  protected readonly levelKey = levelKey;

  readonly plan = input.required<Plan>();
  /** A request was decided: the page reloads the plan (the accepted person now takes a spot) */
  readonly changed = output<void>();

  protected readonly pending = signal<JoinRequest[]>([]);
  protected readonly busy = signal<string | null>(null);
  protected readonly error = signal<ApiErrorMessage | null>(null);

  constructor() {
    effect(() => {
      this.plan();
      untracked(() => this.load());
    });
    inject(UserEvents)
      .joinRequest$.pipe(
        filter((notice) => notice.planId === this.plan().id),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.load());
  }

  protected accept(request: JoinRequest): void {
    this.decide(request, this.api.acceptRequest(this.plan().id, request.userId));
  }

  protected reject(request: JoinRequest): void {
    this.decide(request, this.api.rejectRequest(this.plan().id, request.userId));
  }

  private load(): void {
    this.api.requests(this.plan().id).subscribe({
      next: (requests) => this.pending.set(requests.filter(({ status }) => status === 'PENDING')),
      error: () => this.pending.set([]),
    });
  }

  private decide(request: JoinRequest, call: { subscribe: (observer: object) => unknown }): void {
    this.busy.set(request.userId);
    this.error.set(null);
    call.subscribe({
      next: () => {
        this.busy.set(null);
        this.load();
        this.changed.emit();
      },
      error: (error: unknown) => {
        this.busy.set(null);
        this.error.set(apiErrorMessage(this.transloco, error, 'errors.requestFailed'));
        this.load();
        this.changed.emit();
      },
    });
  }
}
