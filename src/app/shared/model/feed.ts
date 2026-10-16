/** What someone I follow did in a plan (HU-051): published it, joined it or completed it (arrived). */
export type FeedActivityType = 'PUBLISHED' | 'JOINED' | 'COMPLETED';

/** An activity of my feed. */
export interface FeedItem {
  actorId: string;
  actorName: string;
  type: FeedActivityType;
  planId: string;
  planTitle: string;
  /** Activity of the plan (PADEL, RUNNING…) */
  planActivity: string;
  startsAt: string;
  occurredAt: string;
}

/** A page of my feed, the latest first. */
export interface FeedPage {
  items: FeedItem[];
  page: number;
  size: number;
  total: number;
}

/** Real-time notice: there is new activity in my feed (event feed-activity). */
export interface FeedActivityNotice {
  actorId: string;
  actorName: string;
  type: FeedActivityType;
  planId: string;
  planTitle: string;
  occurredAt: string;
}

/** The same activity, wherever it comes from: once per person, kind and plan, as the service keeps it. */
export const feedKey = ({ type, planId, actorId }: Pick<FeedItem, 'type' | 'planId' | 'actorId'>) =>
  `${type}:${planId}:${actorId}`;
