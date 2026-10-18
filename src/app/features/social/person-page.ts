import { Component, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { catchError, Observable, of } from 'rxjs';
import { PhotosApi } from '@core/api/photos-api';
import { ReputationApi } from '@core/api/reputation-api';
import { SocialApi } from '@core/api/social-api';
import { UsersApi } from '@core/api/users-api';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import { BadgeList } from '@components/badge-list/badge-list';
import { CardSkeleton } from '@components/card-skeleton/card-skeleton';
import { PersonActivity } from '@components/person-activity/person-activity';
import { PersonAvatar } from '@components/person-avatar/person-avatar';
import { ReputationBadge } from '@components/reputation-badge/reputation-badge';
import { PageLayout } from '@layout/page-layout/page-layout';
import { activityKey } from '@shared/model/activities';
import { levelKey, PublicProfile } from '@shared/model/profile';
import { BadgeProgress, KudosCount, PersonStats } from '@shared/model/reputation';
import { SocialPerson } from '@shared/model/social';

/**
 * Someone as I see them, their social profile (HU-047, HU-048): their photo, name, bio, hobbies, counts, statistics,
 * reputation and badges; following them, asking to if their profile is private, or stopping; and their recent plans
 * and their network, if their profile lets me see them.
 */
@Component({
  selector: 'app-person-page',
  imports: [
    BadgeList,
    Button,
    CardSkeleton,
    Message,
    PageLayout,
    PersonActivity,
    PersonAvatar,
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
  private readonly photosApi = inject(PhotosApi);
  private readonly usersApi = inject(UsersApi);
  private readonly transloco = inject(TranslocoService);

  /** Route parameter (withComponentInputBinding) */
  readonly id = input.required<string>();

  protected readonly person = signal<SocialPerson | null>(null);
  /** Their reputation (HU-009); null when it cannot be known */
  protected readonly reputation = signal<number | null>(null);
  /** The badges they earned (HU-044) */
  protected readonly badges = signal<BadgeProgress[]>([]);
  /** The kudos they received, by kind, the ones they have (HU-060) */
  protected readonly kudos = signal<KudosCount[]>([]);
  /** Their bio and hobbies, from their profile (HU-048); null without a profile */
  protected readonly profile = signal<PublicProfile | null>(null);
  /** What they have done (HU-048); null when it cannot be known */
  protected readonly stats = signal<PersonStats | null>(null);
  protected readonly activityKey = activityKey;
  protected readonly levelKey = levelKey;
  protected readonly notFound = signal(false);
  protected readonly busy = signal(false);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  /** Their profile photo (HU-020); null without one */
  protected readonly photo = signal<string | null>(null);

  constructor() {
    effect(() => {
      const id = this.id();
      this.load(id);
      this.reputationApi
        .of(id)
        .pipe(catchError(() => of(null)))
        .subscribe((reputation) => this.reputation.set(reputation?.score ?? null));
      this.photosApi
        .photosOf([id])
        .pipe(catchError(() => of([])))
        .subscribe((photos) => this.photo.set(photos[0]?.url ?? null));
      this.usersApi
        .profileOf(id)
        .pipe(catchError(() => of(null)))
        .subscribe((profile) => this.profile.set(profile));
      this.reputationApi
        .statsOf(id)
        .pipe(catchError(() => of(null)))
        .subscribe((stats) => this.stats.set(stats));
      this.reputationApi
        .badgesOf(id)
        .pipe(catchError(() => of([])))
        .subscribe((badges) => this.badges.set(badges));
      this.reputationApi
        .kudosOf(id)
        .pipe(catchError(() => of([])))
        .subscribe((kudos) => this.kudos.set(kudos.filter(({ count }) => count > 0)));
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
