import { Level } from './profile';

export interface MeetingPoint {
  name: string;
  latitude: number;
  longitude: number;
}

export interface PublishPlan {
  activity: string;
  title: string;
  description: string | null;
  meetingPoint: MeetingPoint;
  startsAt: string;
  spots: number;
  level: Level | null;
}

export interface Participant {
  userId: string;
  name: string;
  joinedAt: string;
}

/** Someone has joined one of my plans (personal real-time stream). */
export interface PlanJoinedNotice {
  planId: string;
  title: string;
  participantName: string;
  freeSpots: number;
  full: boolean;
}

/** Someone has left one of my plans; maybe someone from the waiting list came in (HU-023). */
export interface PlanLeftNotice {
  planId: string;
  title: string;
  participantName: string;
  promotedName: string | null;
  freeSpots: number;
  full: boolean;
}

/** A spot of a plan I was waiting for is now mine (HU-023). */
export interface SpotFreedNotice {
  planId: string;
  title: string;
}

/** A plan I am in is about to start (HU-007). */
export interface PlanReminderNotice {
  planId: string;
  title: string;
  placeName: string;
  startsAt: string;
}

/** A plan from a shared link, without a session (HU-024) */
export interface PublicPlan extends PublishPlan {
  id: string;
  occupied: number;
  freeSpots: number;
  status: Plan['status'];
}

export interface Plan extends PublishPlan {
  id: string;
  organizerId: string;
  organizerName: string;
  occupied: number;
  freeSpots: number;
  status: 'OPEN' | 'FULL' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED';
  publishedAt: string;
  participants: Participant[];
  /** People waiting for a spot, first to last (HU-023) */
  waitlist: Participant[];
}
