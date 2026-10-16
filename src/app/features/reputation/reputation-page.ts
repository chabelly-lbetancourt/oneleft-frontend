import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { ReputationApi } from '@core/api/reputation-api';
import { Language } from '@core/i18n/language';
import { UserEvents } from '@core/realtime/user-events';
import { BadgeList } from '@components/badge-list/badge-list';
import { CardSkeleton } from '@components/card-skeleton/card-skeleton';
import { PageLayout } from '@layout/page-layout/page-layout';
import { BadgeProgress, LedgerEntry, REPUTATION_RULES } from '@shared/model/reputation';

const PAGE_SIZE = 20;

/**
 * «My reputation» (HU-009): my score, my badges (HU-044), how it works and every entry of my ledger, so I know why it
 * went up or down.
 */
@Component({
  selector: 'app-reputation-page',
  imports: [BadgeList, Button, CardSkeleton, PageLayout, RouterLink, TranslocoPipe],
  templateUrl: './reputation-page.html',
  styleUrl: './reputation-page.scss',
})
export class ReputationPage implements OnInit {
  private readonly api = inject(ReputationApi);
  private readonly language = inject(Language);
  private readonly destroyRef = inject(DestroyRef);
  private readonly events = inject(UserEvents);

  protected readonly score = signal<number | null>(null);
  protected readonly entries = signal<LedgerEntry[]>([]);
  protected readonly total = signal(0);
  protected readonly loadError = signal(false);
  /** My badges (HU-044); empty while unknown, without hiding the rest */
  protected readonly badges = signal<BadgeProgress[]>([]);
  protected readonly rules = REPUTATION_RULES;
  private page = 0;

  ngOnInit(): void {
    this.load();
    // A badge earned while the page is open (HU-044): the new badge, score and entries at once
    this.events.badge$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.load());
  }

  private load(): void {
    this.api.mine().subscribe({
      next: (reputation) => this.score.set(reputation.score),
      error: () => this.loadError.set(true),
    });
    this.read(0);
    this.api
      .myBadges()
      .subscribe({ next: (badges) => this.badges.set(badges), error: () => undefined });
  }

  protected more(): void {
    this.read(this.page + 1);
  }

  /** «+10», «−15» */
  protected signed(points: number): string {
    return points > 0 ? `+${points}` : `−${Math.abs(points)}`;
  }

  protected date(entry: LedgerEntry): string {
    return new Intl.DateTimeFormat(this.language.locale(), {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(entry.occurredAt));
  }

  private read(page: number): void {
    this.api.ledger(page, PAGE_SIZE).subscribe({
      next: (result) => {
        this.page = page;
        this.entries.update((entries) =>
          page === 0 ? result.items : [...entries, ...result.items],
        );
        this.total.set(result.total);
      },
      error: () => this.loadError.set(true),
    });
  }
}
