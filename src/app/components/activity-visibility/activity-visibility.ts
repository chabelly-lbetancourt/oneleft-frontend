import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Message } from 'primeng/message';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { SocialApi } from '../../core/api/social-api';
import { ApiErrorMessage, apiErrorMessage } from '../../core/i18n/api-error';

/**
 * Whether one of my plans shows in my activity (HU-059): my followers see in their feeds that I published, joined or
 * completed it. For the organizer and the participants of a plan, in its detail.
 */
@Component({
  selector: 'app-activity-visibility',
  imports: [FormsModule, Message, ToggleSwitch, TranslocoPipe],
  templateUrl: './activity-visibility.html',
  styleUrl: './activity-visibility.scss',
})
export class ActivityVisibility {
  private readonly api = inject(SocialApi);
  private readonly transloco = inject(TranslocoService);

  readonly planId = input.required<string>();

  /** null while it is not known */
  protected readonly shown = signal<boolean | null>(null);
  protected readonly loadError = signal(false);
  protected readonly busy = signal(false);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  protected readonly inputId = computed(() => `activity-visibility-${this.planId()}`);

  constructor() {
    effect(() => {
      const planId = this.planId();
      untracked(() => this.load(planId));
    });
  }

  protected change(shown: boolean): void {
    this.busy.set(true);
    this.error.set(null);
    // At once, as the switch shows it
    this.shown.set(shown);
    const planId = this.planId();
    const request = shown ? this.api.showPlan(planId) : this.api.hidePlan(planId);
    request.subscribe({
      next: () => this.busy.set(false),
      error: (error) => {
        this.busy.set(false);
        // The switch goes back to what is saved
        this.shown.set(!shown);
        this.error.set(apiErrorMessage(this.transloco, error, 'errors.socialFailed'));
      },
    });
  }

  private load(planId: string): void {
    this.shown.set(null);
    this.loadError.set(false);
    this.api.hiddenPlan(planId).subscribe({
      next: ({ hidden }) => this.shown.set(!hidden),
      error: () => this.loadError.set(true),
    });
  }
}
