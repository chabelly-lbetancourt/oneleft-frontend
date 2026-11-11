import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Textarea } from 'primeng/textarea';
import { PlansApi } from '@core/api/plans-api';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import { Plan } from '@shared/model/published-plan';

/** The longest message with a request, the same as the service asks. */
const MESSAGE_MAX_LENGTH = 140;

/**
 * «Ask for a spot» (HU-069): in a plan whose organizer chooses who comes, nobody joins directly. The person asks, with
 * a short optional message, sees what became of their request and can withdraw it while it is pending.
 */
@Component({
  selector: 'app-request-spot',
  imports: [FormsModule, Button, Message, Textarea, TranslocoPipe],
  templateUrl: './request-spot.html',
  styleUrl: './request-spot.scss',
})
export class RequestSpot {
  private readonly api = inject(PlansApi);
  private readonly transloco = inject(TranslocoService);

  readonly plan = input.required<Plan>();
  /** The request changed: the page reloads the plan */
  readonly changed = output<void>();

  protected readonly maxLength = MESSAGE_MAX_LENGTH;
  protected readonly message = signal('');
  protected readonly busy = signal(false);
  protected readonly error = signal<ApiErrorMessage | null>(null);

  protected status(): string | null {
    return this.plan().myRequest?.status ?? null;
  }

  protected ask(): void {
    this.run(
      this.api.askForSpot(this.plan().id, this.message().trim() || null),
      'errors.requestFailed',
    );
  }

  protected withdraw(): void {
    this.run(this.api.withdrawRequest(this.plan().id), 'errors.requestFailed');
  }

  private run(request: { subscribe: (observer: object) => unknown }, fallback: string): void {
    this.busy.set(true);
    this.error.set(null);
    request.subscribe({
      next: () => {
        this.busy.set(false);
        this.message.set('');
        this.changed.emit();
      },
      error: (error: unknown) => {
        this.busy.set(false);
        this.error.set(apiErrorMessage(this.transloco, error, fallback));
        this.changed.emit();
      },
    });
  }
}
