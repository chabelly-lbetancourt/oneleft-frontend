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

export interface Plan extends PublishPlan {
  id: string;
  organizerId: string;
  organizerName: string;
  occupied: number;
  freeSpots: number;
  status: 'OPEN' | 'FULL' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED';
  publishedAt: string;
  participants: Participant[];
}
