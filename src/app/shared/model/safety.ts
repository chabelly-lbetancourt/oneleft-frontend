/** What a report is about (HU-033): a person or one of their plans. */
export type ReportTarget = 'PERSON' | 'PLAN';

/** Why someone reports a person or a plan (HU-033). */
export type ReportReason = 'SPAM' | 'HARASSMENT' | 'INAPPROPRIATE' | 'FAKE' | 'DANGEROUS' | 'OTHER';

/** The reasons, in the order the form offers them: «Otro motivo» last. */
export const REPORT_REASONS: readonly ReportReason[] = [
  'HARASSMENT',
  'INAPPROPRIATE',
  'DANGEROUS',
  'FAKE',
  'SPAM',
  'OTHER',
];

/** Longest comment of a report: the same limit as the social service. */
export const MAX_REPORT_COMMENT = 500;

/** A report as it is sent: for a plan, who organizes it as the app shows it. */
export interface ReportRequest {
  target: ReportTarget;
  targetId: string;
  organizerId?: string;
  reason: ReportReason;
  comment?: string;
}

/** My report, as it was saved: it waits for the moderation. */
export interface Report {
  id: string;
  target: ReportTarget;
  targetId: string;
  reason: ReportReason;
  status: 'OPEN';
  reportedAt: string;
}

/** Someone I blocked and since when. */
export interface BlockedPerson {
  userId: string;
  name: string;
  since: string;
}

export interface BlockedPage {
  items: BlockedPerson[];
  page: number;
  size: number;
  total: number;
}
