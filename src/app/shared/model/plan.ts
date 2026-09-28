import { Level } from './profile';

export interface PlanSummary {
  id: string;
  activity: string;
  title: string;
  zone: string;
  distanceKm: number;
  startsAt: Date;
  totalSpots: number;
  freeSpots: number;
  level?: Level;
  participants: string[];
}
