import { Level } from './profile';

export interface MeetingPoint {
  name: string;
  latitude: number;
  longitude: number;
}

export interface PublishPlan {
  activity: string;
  /** The name of the activity when it is OTHER (HU-068); null or absent for any other */
  activityOther?: string | null;
  /** The organizer chooses who comes (HU-069): people ask for a spot and the organizer decides */
  chooseCompanion?: boolean | null;
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

/** How someone of the group is getting to the plan (HU-040). */
export type ArrivalStatus = 'ON_THE_WAY' | 'LATE';

/** «On my way» or «running late (N min)» of someone of the group, until the plan starts (HU-040). */
export interface Arrival {
  userId: string;
  name: string;
  status: ArrivalStatus;
  minutesLate: number | null;
  at: string;
}

/** Someone of the group of my plan is on the way or running late (personal real-time stream). */
export interface PlanArrivalNotice {
  planId: string;
  title: string;
  name: string;
  status: ArrivalStatus;
  minutesLate: number | null;
}

/** Delays that can be announced, in minutes. */
export const LATE_OPTIONS = [5, 10, 15, 30] as const;

/** Someone of the group arrived at the meeting point (HU-025). */
export interface CheckIn {
  userId: string;
  name: string;
  at: string;
}

/** Someone of the group of my plan arrived at the meeting point (personal real-time stream). */
export interface PlanCheckInNotice {
  planId: string;
  title: string;
  name: string;
}

/** The check-in opens this many minutes before the start of the plan... */
export const CHECK_IN_OPENS_BEFORE_MINUTES = 15;
/** ...and closes this many minutes after it. */
export const CHECK_IN_CLOSES_AFTER_MINUTES = 30;

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
/** What became of a request for a spot (HU-069); a pending one expires when the plan starts. */
export type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN' | 'EXPIRED';

/** A request for a spot in a plan whose organizer chooses who comes (HU-069). */
export interface JoinRequest {
  userId: string;
  name: string;
  message: string | null;
  status: RequestStatus;
  requestedAt: string;
  decidedAt: string | null;
}

/** Someone asked for a spot in one of my plans (HU-069) */
export interface JoinRequestNotice {
  planId: string;
  title: string;
  requesterId: string;
  requesterName: string;
}

/** The organizer decided on my request, or the plan filled up first (HU-069) */
export interface RequestDecidedNotice {
  planId: string;
  title: string;
  decision: RequestStatus;
  planFull: boolean;
}

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
  /** Whether the organizer chooses who comes (HU-069) */
  requiresApproval?: boolean;
  /** My request for a spot, if I asked (HU-069) */
  myRequest?: JoinRequest | null;
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
  /** Only for the group of the plan, until it starts (HU-040) */
  arrivals?: Arrival[];
}

/** A plan someone took part in, for their social profile (HU-048): what and when, never where. */
export interface RecentPlan {
  planId: string;
  title: string;
  activity: string;
  startsAt: string;
  role: 'ORGANIZER' | 'ATTENDEE';
}
