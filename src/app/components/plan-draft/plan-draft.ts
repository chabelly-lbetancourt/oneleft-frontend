import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Textarea } from 'primeng/textarea';
import { Dictation } from '@core/speech/dictation';
import { Language } from '@core/i18n/language';
import { DRAFT_MAX_LENGTH } from '@shared/model/plan-draft';

/** Message under the card: a translation key and its parameters. */
export interface DraftMessage {
  key: string;
  params?: Record<string, unknown>;
}

/**
 * «Tell it in one sentence» (HU-010): the person writes or dictates the plan and asks for the form to be filled in.
 * The card only collects the sentence; the page asks the service, fills in the form and the person reviews it and
 * publishes it as usual.
 */
@Component({
  selector: 'app-plan-draft',
  imports: [FormsModule, Button, Message, Textarea, TranslocoPipe],
  templateUrl: './plan-draft.html',
  styleUrl: './plan-draft.scss',
})
export class PlanDraftCard {
  private readonly dictation = inject(Dictation);
  private readonly language = inject(Language);

  readonly busy = input(false);
  readonly message = input<DraftMessage | null>(null);
  readonly severity = input<'error' | 'success' | 'info'>('info');
  readonly describe = output<string>();

  protected readonly maxLength = DRAFT_MAX_LENGTH;
  protected readonly text = signal('');
  protected readonly canDictate = this.dictation.supported;
  protected readonly listening = this.dictation.listening;
  protected readonly ready = computed(() => this.text().trim().length >= 3 && !this.busy());

  protected toggleDictation(): void {
    if (this.listening()) {
      this.dictation.stop();
      return;
    }
    this.dictation.start(
      this.language.locale(),
      (said) => this.text.set(said.slice(0, this.maxLength)),
      () => undefined,
    );
  }

  protected submit(): void {
    if (this.ready()) {
      this.describe.emit(this.text().trim());
    }
  }
}
