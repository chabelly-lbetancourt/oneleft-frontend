/** Why the reputation changes (HU-009); the weekly streak (HU-062) gives a bonus that grows week after week. */
export type ReputationReason =
  | 'ATTENDED'
  | 'ORGANIZED_HELD'
  | 'NO_SHOW'
  | 'LATE_CANCELLATION'
  | 'CONFIRMED_REPORT'
  | 'KUDOS'
  | 'WEEKLY_STREAK';

/** The rules, in the order they are explained, with their points. */
export const REPUTATION_RULES: readonly { reason: ReputationReason; points: number }[] = [
  { reason: 'ATTENDED', points: 10 },
  { reason: 'ORGANIZED_HELD', points: 20 },
  { reason: 'NO_SHOW', points: -15 },
  { reason: 'LATE_CANCELLATION', points: -10 },
  { reason: 'CONFIRMED_REPORT', points: -50 },
  { reason: 'KUDOS', points: 5 },
];

/** The level of someone, from their score (HU-062). */
export type ReputationLevel = 'NEW' | 'REGULAR' | 'NEIGHBOURHOOD_REFERENCE' | 'LEGEND';

/** The levels, from the lowest, with the score at which each one starts and its emoji. */
export const REPUTATION_LEVELS: readonly {
  level: ReputationLevel;
  minScore: number;
  emoji: string;
}[] = [
  { level: 'NEW', minScore: 0, emoji: '🌱' },
  { level: 'REGULAR', minScore: 100, emoji: '⚡' },
  { level: 'NEIGHBOURHOOD_REFERENCE', minScore: 500, emoji: '🔥' },
  { level: 'LEGEND', minScore: 1500, emoji: '👑' },
];

/** The emoji of a level. */
export function levelEmoji(level: ReputationLevel): string {
  return REPUTATION_LEVELS.find((each) => each.level === level)?.emoji ?? '';
}

/**
 * The score of someone: the sum of their entries, 0 without any. The level and the score of the next one (HU-062) may
 * be missing while the service does not give them; {@code nextLevelAt} is null at the last level.
 */
export interface Reputation {
  userId: string;
  score: number;
  level?: ReputationLevel;
  nextLevelAt?: number | null;
}

/** My weekly streak (HU-062): weeks in a row with a plan checked in, and the points of the next week of it. */
export interface Streak {
  weeks: number;
  thisWeek: boolean;
  nextBonus: number;
  maxBonus: number;
}

/** What someone has done (HU-048): only plans held, with a check-in, count. */
export interface PersonStats {
  userId: string;
  plansCompleted: number;
  plansOrganized: number;
  activities: number;
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

/** What a kudos recognizes (HU-060); only the organizer can be told that they organized well. */
export type KudosKind = 'PUNCTUAL' | 'GOOD_VIBES' | 'GREAT_LEVEL' | 'GREAT_ORGANIZER';

export const KUDOS_KINDS: readonly KudosKind[] = [
  'PUNCTUAL',
  'GOOD_VIBES',
  'GREAT_LEVEL',
  'GREAT_ORGANIZER',
];

/** Someone else who arrived at a plan, and the kudos I gave them, if any. */
export interface KudosPerson {
  userId: string;
  organizer: boolean;
  given: KudosKind | null;
}

/** The kudos of a plan for me: whether I can still give them and until when (null if I did not arrive). */
export interface PlanKudos {
  open: boolean;
  until: string | null;
  people: KudosPerson[];
}

/** How many kudos of a kind someone received. */
export interface KudosCount {
  kind: KudosKind;
  count: number;
}

/** Real-time notice: someone of a plan gave me a kudos (event kudos). */
export interface KudosNotice {
  giverName: string;
  kind: KudosKind;
  planId: string;
  givenAt: string;
}
