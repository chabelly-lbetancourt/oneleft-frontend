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
