import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { catchError, Observable, of } from 'rxjs';
import { ReputationApi } from '../../core/api/reputation-api';
import { SocialApi } from '../../core/api/social-api';
import { ApiErrorMessage, apiErrorMessage } from '../../core/i18n/api-error';
import { BadgeList } from '../../components/badge-list/badge-list';
import { CardSkeleton } from '../../components/card-skeleton/card-skeleton';
import { ReputationBadge } from '../../components/reputation-badge/reputation-badge';
import { PageLayout } from '../../layout/page-layout/page-layout';
import { BadgeProgress } from '../../shared/model/reputation';
import { SocialPerson } from '../../shared/model/social';
import { initials } from '../../shared/text/initials';

/**
 * Someone as I see them (HU-047): their name, counts, whether they follow me, and following them, asking to if their
 * profile is private, or stopping.
 */
@Component({
  selector: 'app-person-page',
  imports: [
    Avatar,
    BadgeList,
    Button,
    CardSkeleton,
    Message,
    PageLayout,
    ReputationBadge,
    RouterLink,
    Tag,
    TranslocoPipe,
  ],
  templateUrl: './person-page.html',
  styleUrl: './social.scss',
})
export class PersonPage {
  private readonly api = inject(SocialApi);
  private readonly reputationApi = inject(ReputationApi);
  private readonly transloco = inject(TranslocoService);

  /** Route parameter (withComponentInputBinding) */
  readonly id = input.required<string>();

  protected readonly person = signal<SocialPerson | null>(null);
  /** Their reputation (HU-009); null when it cannot be known */
  protected readonly reputation = signal<number | null>(null);
  /** The badges they earned (HU-044) */
  protected readonly badges = signal<BadgeProgress[]>([]);
  protected readonly notFound = signal(false);
  protected readonly busy = signal(false);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  protected readonly initials = computed(() => initials(this.person()?.name ?? ''));

  constructor() {
    effect(() => {
      const id = this.id();
      this.load(id);
      this.reputationApi
        .of(id)
        .pipe(catchError(() => of(null)))
        .subscribe((reputation) => this.reputation.set(reputation?.score ?? null));
      this.reputationApi
        .badgesOf(id)
        .pipe(catchError(() => of([])))
        .subscribe((badges) => this.badges.set(badges));
    });
  }

  protected follow(): void {
    this.change(this.api.follow(this.id()));
  }

  protected unfollow(): void {
    this.change(this.api.unfollow(this.id()));
  }

  /** Follow or unfollow, and then the person again with their counts. */
  private change(request: Observable<unknown>): void {
    this.busy.set(true);
    this.error.set(null);
    request.subscribe({
      next: () => this.load(this.id()),
      error: (error) => {
        this.busy.set(false);
        this.error.set(apiErrorMessage(this.transloco, error, 'errors.socialFailed'));
      },
    });
  }

  private load(id: string): void {
    this.api.person(id).subscribe({
      next: (person) => {
        this.person.set(person);
        this.busy.set(false);
      },
      error: () => {
        this.busy.set(false);
        this.notFound.set(true);
      },
    });
  }
}
