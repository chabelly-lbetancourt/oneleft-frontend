/** Why the reputation changes (HU-009). */
export type ReputationReason =
  'ATTENDED' | 'ORGANIZED_HELD' | 'NO_SHOW' | 'LATE_CANCELLATION' | 'CONFIRMED_REPORT';

/** The rules, in the order they are explained, with their points. */
export const REPUTATION_RULES: readonly { reason: ReputationReason; points: number }[] = [
  { reason: 'ATTENDED', points: 10 },
  { reason: 'ORGANIZED_HELD', points: 20 },
  { reason: 'NO_SHOW', points: -15 },
  { reason: 'LATE_CANCELLATION', points: -10 },
  { reason: 'CONFIRMED_REPORT', points: -50 },
];

/** The score of someone: the sum of their entries, 0 without any. */
export interface Reputation {
  userId: string;
  score: number;
}

/** An entry of my ledger: why my reputation went up or down. */
export interface LedgerEntry {
  reason: ReputationReason;
  points: number;
  planId: string | null;
  planTitle: string | null;
  occurredAt: string;
}

/** A page of the ledger, the latest first. */
export interface LedgerPage {
  items: LedgerEntry[];
  page: number;
  size: number;
  total: number;
}

/** The badges for milestones (HU-044). */
export type BadgeCode =
  | 'FIRST_PLAN_ORGANIZED'
  | 'TEN_PLANS_COMPLETED'
  | 'TEN_ACTIVITIES'
  | 'ALWAYS_PUNCTUAL'
  | 'NEIGHBOURHOOD_SOUL';

/** A badge: how far, and since when it was earned. */
export interface BadgeProgress {
  badge: BadgeCode;
  progress: number;
  goal: number;
  earned: boolean;
  earnedAt: string | null;
}

/** I earned a badge (personal real-time stream). */
export interface BadgeEarnedNotice {
  badge: BadgeCode;
  earnedAt: string;
}

/** The icon of each badge. */
export const BADGE_ICONS: Record<BadgeCode, string> = {
  FIRST_PLAN_ORGANIZED: 'pi-flag',
  TEN_PLANS_COMPLETED: 'pi-check-circle',
  TEN_ACTIVITIES: 'pi-th-large',
  ALWAYS_PUNCTUAL: 'pi-clock',
  NEIGHBOURHOOD_SOUL: 'pi-heart',
};
