import { Component, computed, inject, input, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { SocialApi } from '@core/api/social-api';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import {
  MAX_REPORT_COMMENT,
  REPORT_REASONS,
  ReportReason,
  ReportTarget,
} from '@shared/model/safety';

/** «Otro motivo» needs a comment that says what happened (the same rule as the social service). */
const commentForOther = (group: AbstractControl): ValidationErrors | null => {
  const { reason, comment } = group.value as { reason: ReportReason | null; comment: string };
  return reason === 'OTHER' && !comment.trim() ? { commentRequired: true } : null;
};

/**
 * Reporting a person or a plan (HU-033): the reason and, if needed, what happened. The report waits for the
 * moderation; the reported person is not told.
 */
@Component({
  selector: 'app-report-form',
  imports: [Button, Message, ReactiveFormsModule, Select, Textarea, TranslocoPipe],
  templateUrl: './report-form.html',
  styleUrl: './report-form.scss',
})
export class ReportForm {
  private readonly api = inject(SocialApi);
  private readonly transloco = inject(TranslocoService);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly target = input.required<ReportTarget>();
  /** The person or the plan */
  readonly targetId = input.required<string>();
  /** Who organizes the plan, as the app shows it (only for a plan) */
  readonly organizerId = input<string>();
  /** Closed with «Cancelar» or after reporting */
  readonly closed = output<void>();

  protected readonly maxComment = MAX_REPORT_COMMENT;
  protected readonly form = this.formBuilder.group(
    {
      reason: this.formBuilder.control<ReportReason | null>(null, Validators.required),
      comment: this.formBuilder.control('', Validators.maxLength(MAX_REPORT_COMMENT)),
    },
    { validators: commentForOther },
  );
  private readonly lang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });
  protected readonly reasons = computed(() => {
    this.lang();
    return REPORT_REASONS.map((reason) => ({
      value: reason,
      label: this.transloco.translate(`safety.reasons.${reason}`),
    }));
  });
  private readonly reason = toSignal(this.form.controls.reason.valueChanges, {
    initialValue: null,
  });
  protected readonly commentRequired = computed(() => this.reason() === 'OTHER');
  protected readonly busy = signal(false);
  protected readonly sent = signal(false);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  protected readonly titleId = computed(() => `report-title-${this.targetId()}`);

  protected send(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { reason, comment } = this.form.getRawValue();
    this.busy.set(true);
    this.error.set(null);
    this.api
      .report({
        target: this.target(),
        targetId: this.targetId(),
        organizerId: this.target() === 'PLAN' ? this.organizerId() : undefined,
        reason: reason!,
        comment: comment.trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.busy.set(false);
          this.sent.set(true);
        },
        error: (error) => {
          this.busy.set(false);
          this.error.set(apiErrorMessage(this.transloco, error, 'errors.reportFailed'));
        },
      });
  }
}
