import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
import {
  BadgeProgress,
  DAILY_CAPS,
  LedgerEntry,
  levelEmoji,
  Reputation,
  REPUTATION_LEVELS,
  REPUTATION_RULES,
  Streak,
} from '@shared/model/reputation';

const PAGE_SIZE = 20;

/** How far I am from the next level (HU-062): the bar goes from the start of my level to the start of the next one */
interface LevelProgress {
  min: number;
  max: number;
  now: number;
  missing: number;
  next: (typeof REPUTATION_LEVELS)[number];
}

/**
 * «My reputation» (HU-009): my score, my level and how far the next one is, my weekly streak (HU-062), my badges
 * (HU-044), how it works and every entry of my ledger, so I know why it went up or down.
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

  protected readonly reputation = signal<Reputation | null>(null);
  protected readonly score = computed(() => this.reputation()?.score ?? null);
  /** My level, when the service gives it (HU-062) */
  protected readonly level = computed(() => this.reputation()?.level ?? null);
  protected readonly levelEmoji = computed(() => {
    const level = this.level();
    return level ? levelEmoji(level) : '';
  });
  /** The bar to the next level; null at the last one or without a level */
  protected readonly progress = computed(() => levelProgress(this.reputation()));
  /** My weekly streak (HU-062); null while unknown, without hiding the rest */
  protected readonly streak = signal<Streak | null>(null);
  protected readonly entries = signal<LedgerEntry[]>([]);
  protected readonly total = signal(0);
  protected readonly loadError = signal(false);
  /** My badges (HU-044); empty while unknown, without hiding the rest */
  protected readonly badges = signal<BadgeProgress[]>([]);
  protected readonly rules = REPUTATION_RULES;
  /** The daily caps, for the note on the limits that keep the reputation fair (HU-066) */
  protected readonly dailyCaps = DAILY_CAPS;
  private page = 0;

  ngOnInit(): void {
    this.load();
    // A badge earned while the page is open (HU-044): the new badge, score and entries at once
    this.events.badge$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.load());
  }

  private load(): void {
    this.api.mine().subscribe({
      next: (reputation) => this.reputation.set(reputation),
      error: () => this.loadError.set(true),
    });
    this.api
      .myStreak()
      .subscribe({ next: (streak) => this.streak.set(streak), error: () => undefined });
    this.read(0);
    this.api
      .myBadges()
      .subscribe({ next: (badges) => this.badges.set(badges), error: () => undefined });
  }

  protected more(): void {
    this.read(this.page + 1);
  }

  /** «Your streak: 3 weeks in a row», or that there is none yet */
  protected streakKey(streak: Streak): string {
    if (streak.weeks === 0) {
      return 'reputation.streak.none';
    }
    return streak.weeks === 1 ? 'reputation.streak.weeksOne' : 'reputation.streak.weeks';
  }

  /** What the next check-in of the streak gives: next week if this one already counts, or this week to keep it */
  protected streakNextKey(streak: Streak): string {
    if (streak.thisWeek) {
      return 'reputation.streak.nextWeek';
    }
    return streak.weeks === 0 ? 'reputation.streak.start' : 'reputation.streak.keep';
  }

  /** «+10», «−15», and «0» for an entry that gave nothing (HU-066) */
  protected signed(points: number): string {
    if (points === 0) {
      return '0';
    }
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

function levelProgress(reputation: Reputation | null): LevelProgress | null {
  const index = REPUTATION_LEVELS.findIndex(({ level }) => level === reputation?.level);
  const next = REPUTATION_LEVELS[index + 1];
  if (!reputation || index < 0 || !next || reputation.nextLevelAt == null) {
    return null;
  }
  const min = REPUTATION_LEVELS[index].minScore;
  const max = reputation.nextLevelAt;
  // A negative score is still the first level: the bar starts empty
  const now = Math.min(Math.max(reputation.score, min), max);
  return { min, max, now, missing: max - reputation.score, next };
}
