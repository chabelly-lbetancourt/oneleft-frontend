import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Message } from 'primeng/message';
import { PersonAvatar } from '@components/person-avatar/person-avatar';
import { ReputationApi } from '@core/api/reputation-api';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import { Language } from '@core/i18n/language';
import { KUDOS_KINDS, KudosKind, KudosPerson, PlanKudos } from '@shared/model/reputation';

/**
 * Kudos in a plan that ended (HU-060): whoever arrived gives one to each of the others who arrived, up to a week
 * after it. Shows nothing to whoever did not arrive.
 */
@Component({
  selector: 'app-plan-kudos',
  imports: [Message, PersonAvatar, TranslocoPipe],
  templateUrl: './plan-kudos.html',
  styleUrl: './plan-kudos.scss',
})
export class PlanKudosPanel {
  private readonly api = inject(ReputationApi);
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);

  readonly planId = input.required<string>();
  /** The names of the people of the plan, by id */
  readonly names = input.required<ReadonlyMap<string, string>>();
  readonly photos = input<ReadonlyMap<string, string>>(new Map());

  /** null while loading */
  protected readonly kudos = signal<PlanKudos | null>(null);
  /** The person a kudos is being given to */
  protected readonly busy = signal<string | null>(null);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  protected readonly until = computed(() => {
    const until = this.kudos()?.until;
    return until
      ? new Intl.DateTimeFormat(this.language.locale(), { day: 'numeric', month: 'long' }).format(
          new Date(until),
        )
      : '';
  });

  constructor() {
    effect(() => {
      const planId = this.planId();
      untracked(() => this.load(planId));
    });
  }

  /** Organized well, only for the organizer */
  protected kindsFor(person: KudosPerson): readonly KudosKind[] {
    return person.organizer
      ? KUDOS_KINDS
      : KUDOS_KINDS.filter((kind) => kind !== 'GREAT_ORGANIZER');
  }

  protected nameOf(person: KudosPerson): string {
    return this.names().get(person.userId) ?? this.transloco.translate('kudos.someone');
  }

  protected give(person: KudosPerson, kind: KudosKind): void {
    this.busy.set(person.userId);
    this.error.set(null);
    this.api.giveKudos(this.planId(), person.userId, kind).subscribe({
      next: () => {
        this.busy.set(null);
        this.kudos.update(
          (current) =>
            current && {
              ...current,
              people: current.people.map((other) =>
                other.userId === person.userId ? { ...other, given: kind } : other,
              ),
            },
        );
      },
      error: (error) => {
        this.busy.set(null);
        this.error.set(apiErrorMessage(this.transloco, error, 'errors.kudosFailed'));
        // What the service says now: given, or no longer possible
        this.load(this.planId());
      },
    });
  }

  private load(planId: string): void {
    this.api.planKudos(planId).subscribe({
      next: (kudos) => this.kudos.set(kudos),
      error: () => this.kudos.set(null),
    });
  }
}
