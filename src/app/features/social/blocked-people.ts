import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { SocialApi } from '@core/api/social-api';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import { CardSkeleton } from '@components/card-skeleton/card-skeleton';
import { PageLayout } from '@layout/page-layout/page-layout';
import { BlockedPerson } from '@shared/model/safety';
import { initials } from '@shared/text/initials';

const PAGE_SIZE = 20;

/** The people I blocked (HU-033), the latest first, to unblock them. */
@Component({
  selector: 'app-blocked-people',
  imports: [Avatar, Button, CardSkeleton, Message, PageLayout, RouterLink, TranslocoPipe],
  templateUrl: './blocked-people.html',
  styleUrl: './social.scss',
})
export class BlockedPeople {
  private readonly api = inject(SocialApi);
  private readonly transloco = inject(TranslocoService);

  /** null while the first page is loading */
  protected readonly people = signal<BlockedPerson[] | null>(null);
  protected readonly total = signal(0);
  protected readonly loadError = signal(false);
  /** Whose unblock is on its way */
  protected readonly busy = signal<string | null>(null);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  protected readonly initials = initials;
  private page = 0;

  constructor() {
    this.load();
  }

  protected more(): void {
    this.page++;
    this.load();
  }

  protected unblock(person: BlockedPerson): void {
    this.busy.set(person.userId);
    this.error.set(null);
    this.api.unblock(person.userId).subscribe({
      next: () => {
        this.busy.set(null);
        this.people.update((list) => (list ?? []).filter(({ userId }) => userId !== person.userId));
        this.total.update((total) => total - 1);
      },
      error: (error) => {
        this.busy.set(null);
        this.error.set(apiErrorMessage(this.transloco, error, 'errors.blockFailed'));
      },
    });
  }

  private load(): void {
    this.api.blocked(this.page, PAGE_SIZE).subscribe({
      next: ({ items, total }) => {
        this.people.update((list) => [...(this.page ? (list ?? []) : []), ...items]);
        this.total.set(total);
      },
      error: () => this.loadError.set(true),
    });
  }
}
