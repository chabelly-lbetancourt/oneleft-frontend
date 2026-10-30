import { Level } from '@shared/model/profile';

/** What a draft could not fill in; each one is a field of the publish form. */
export type DraftField = 'activity' | 'title' | 'meetingPoint' | 'startsAt' | 'spots';

/** A plan understood from a sentence (HU-010), checked by the service but not published. */
export interface PlanDraft {
  activity: string | null;
  title: string | null;
  description: string | null;
  /** The place as the person named it, even if no place was found for it */
  place: string | null;
  meetingPoint: { name: string; latitude: number; longitude: number } | null;
  startsAt: string | null;
  spots: number | null;
  level: Level | null;
  minParticipants: number | null;
  missing: DraftField[];
  /** startsAt.window (OneLeft is for the next hours) and meetingPoint.notFound */
  warnings: string[];
}

/** The longest sentence the service reads, the same as it asks. */
export const DRAFT_MAX_LENGTH = 300;
