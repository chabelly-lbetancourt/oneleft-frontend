export interface PlanSummary {
  id: string;
  activity: string;
  icon: string;
  title: string;
  zone: string;
  distanceKm: number;
  startsAt: Date;
  totalSpots: number;
  freeSpots: number;
  level?: string;
  participants: string[];
}
