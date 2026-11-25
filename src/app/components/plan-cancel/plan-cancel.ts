import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { PlansApi } from '@core/api/plans-api';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import { LATE_CANCELLATION_MS, Plan } from '@shared/model/published-plan';
import { REPUTATION_RULES } from '@shared/model/reputation';

/** Reputation points a late cancellation costs the organizer (HU-009), as a positive number */
const LATE_CANCELLATION_POINTS = Math.abs(
  REPUTATION_RULES.find(({ reason }) => reason === 'LATE_CANCELLATION')?.points ?? 0,
);

/**
 * «Cancel plan», for the organizer of a plan until it starts. It asks first and says what cancelling means right now:
 * whoever joined is told and, less than an hour before the start, it costs reputation. The organizer gets no notice of
 * their own cancellation, so the result is said here, in a live region, and the page is told to show the plan cancelled.
 */
@Component({
  selector: 'app-plan-cancel',
  imports: [Button, Message, TranslocoPipe],
  templateUrl: './plan-cancel.html',
  styleUrl: './plan-cancel.scss',
})
export class PlanCancel {
  private readonly api = inject(PlansApi);
  private readonly transloco = inject(TranslocoService);
  private readonly injector = inject(Injector);

  /** A plan I organize */
  readonly plan = input.required<Plan>();
  /** The plan has been cancelled */
  readonly cancelled = output<void>();
  /** It could not be cancelled: the plan may have changed meanwhile */
  readonly failed = output<void>();

  /** Until it starts, and only once */
  protected readonly canCancel = computed(() => {
    const { status, startsAt } = this.plan();
    return (status === 'OPEN' || status === 'FULL') && new Date(startsAt).getTime() > Date.now();
  });
  protected readonly confirming = signal(false);
  protected readonly cancelling = signal(false);
  /** Less than an hour to the start when the confirmation opened: cancelling costs reputation (HU-009) */
  protected readonly late = signal(false);
  protected readonly latePoints = LATE_CANCELLATION_POINTS;
  /** I have just cancelled the plan: said in the live region */
  protected readonly done = signal(false);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  private readonly confirmPanel = viewChild<ElementRef<HTMLElement>>('confirmPanel');
  private readonly cancelButton = viewChild('cancelButton', { read: ElementRef });
  private readonly status = viewChild<ElementRef<HTMLElement>>('status');

  /** Asks before cancelling: the confirmation takes the focus. */
  protected ask(): void {
    this.late.set(new Date(this.plan().startsAt).getTime() - Date.now() < LATE_CANCELLATION_MS);
    this.error.set(null);
    this.confirming.set(true);
    this.focus(() => this.confirmPanel()?.nativeElement);
  }

  /** The plan stays: the focus goes back to where it was. */
  protected keep(): void {
    this.confirming.set(false);
    this.focusButton();
  }

  protected cancel(): void {
    this.cancelling.set(true);
    this.api.cancel(this.plan().id).subscribe({
      next: () => {
        this.cancelling.set(false);
        this.confirming.set(false);
        this.done.set(true);
        // The button is gone with the plan: the focus goes to what happened instead of being lost
        this.focus(() => this.status()?.nativeElement);
        this.cancelled.emit();
      },
      error: (error) => {
        this.cancelling.set(false);
        this.confirming.set(false);
        this.error.set(apiErrorMessage(this.transloco, error, 'errors.cancelFailed'));
        this.focusButton();
        this.failed.emit();
      },
    });
  }

  private focusButton(): void {
    this.focus(
      () =>
        (this.cancelButton()?.nativeElement as HTMLElement | undefined)?.querySelector('button') ??
        null,
    );
  }

  private focus(target: () => HTMLElement | null | undefined): void {
    afterNextRender(() => target()?.focus(), { injector: this.injector });
  }
}
