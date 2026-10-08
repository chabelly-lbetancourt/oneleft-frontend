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
  /** Optional minimum of participants and its deadline (HU-039): both or neither */
  minParticipants?: number | null;
  minimumDeadline?: string | null;
}

/** An activity someone free would do and their level in it (HU-035). */
export interface Interest {
  activity: string;
  level: Level | null;
}

/** «I'm free now» (HU-035): until when, around an approximate zone, for which activities (none: any). */
export interface Availability {
  until: string;
  latitude: number;
  longitude: number;
  interests: Interest[];
}

/** Someone free near my plan: no name and no place (HU-035). */
export interface FreePerson {
  /** Rounded to 500 m */
  distanceMeters: number;
  /** In the activity of the plan; null if they did not say */
  level: Level | null;
  activities: string[];
}

/** Weather forecast at the time and place of an outdoor plan (HU-026). */
export interface Forecast {
  time: string;
  /** °C */
  temperature: number;
  /** Chance of rain, % */
  precipitationProbability: number;
  /** km/h */
  windSpeed: number;
  rainLikely: boolean;
}

/** If fewer people have joined by the deadline, the plan is cancelled (HU-039). */
export interface PlanMinimum {
  participants: number;
  deadline: string;
  /** Reached at the deadline: the plan goes ahead */
  confirmed: boolean;
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

/** A plan I am in has been cancelled because it did not reach its minimum (HU-039). */
export interface PlanCancelledNotice {
  planId: string;
  title: string;
  placeName: string;
  startsAt: string;
  reason: 'MINIMUM_NOT_REACHED';
}

/** A plan from a shared link, without a session (HU-024) */
export interface PublicPlan extends PublishPlan {
  id: string;
  occupied: number;
  freeSpots: number;
  status: Plan['status'];
  minimum?: PlanMinimum | null;
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
  /** Null when the plan goes ahead with anyone (HU-039) */
  minimum?: PlanMinimum | null;
}
