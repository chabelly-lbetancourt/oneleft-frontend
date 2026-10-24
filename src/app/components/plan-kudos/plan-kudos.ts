import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Message } from 'primeng/message';
import { catchError, EMPTY, Subject, switchMap } from 'rxjs';
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
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

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

  /** Plans to load: only the answer for the last one is shown (#143) */
  private readonly loads = new Subject<string>();

  constructor() {
    this.loads
      .pipe(
        // A failed reload keeps what the panel showed, with its error (#143)
        switchMap((planId) => this.api.planKudos(planId).pipe(catchError(() => EMPTY))),
        takeUntilDestroyed(),
      )
      .subscribe((kudos) => this.kudos.set(kudos));
    effect(() => {
      const planId = this.planId();
      untracked(() => {
        // Another plan: nothing of the previous one until its kudos arrive
        this.kudos.set(null);
        this.error.set(null);
        this.loads.next(planId);
      });
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
    const planId = this.planId();
    this.busy.set(person.userId);
    this.error.set(null);
    this.api.giveKudos(planId, person.userId, kind).subscribe({
      next: () => {
        this.busy.set(null);
        if (planId !== this.planId()) {
          return;
        }
        this.kudos.update(
          (current) =>
            current && {
              ...current,
              people: current.people.map((other) =>
                other.userId === person.userId ? { ...other, given: kind } : other,
              ),
            },
        );
        this.focusGiven(person.userId);
      },
      error: (error) => {
        this.busy.set(null);
        this.error.set(apiErrorMessage(this.transloco, error, 'errors.kudosFailed'));
        // What the service says now: given, or no longer possible
        this.loads.next(planId);
      },
    });
  }

  /**
   * The chip that was pressed is gone: focus goes to «You gave …», which screen readers read out, instead of falling
   * back to the page (#143)
   */
  private focusGiven(userId: string): void {
    afterNextRender(
      () =>
        this.host.nativeElement
          .querySelector<HTMLElement>(`[data-given-for="${CSS.escape(userId)}"]`)
          ?.focus(),
      { injector: this.injector },
    );
  }
}
