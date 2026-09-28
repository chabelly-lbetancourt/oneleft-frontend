import { Plan } from './published-plan';

/** Search for nearby plans (HU-004); the same filters as the plans service. */
export interface NearbyQuery {
  latitude: number;
  longitude: number;
  /** Radius in metres (500 to 25,000) */
  radius: number;
  /** Activity codes; empty means all of them */
  activities: string[];
  /** Plans starting within the next hours (1 to 12) */
  withinHours: number;
}

export interface NearbyPlan {
  plan: Plan;
  distanceMeters: number;
}

/** Real-time notice of a newly published plan that matches the search. */
export interface NearbyPlanEvent {
  planId: string;
  activity: string;
  startsAt: string;
  freeSpots: number;
  distanceMeters: number;
}

/** Query string parameters of a nearby search (activities are repeated: activity=PADEL&activity=TENNIS). */
export const nearbyParams = (query: NearbyQuery): Record<string, string | number | string[]> => ({
  latitude: query.latitude,
  longitude: query.longitude,
  radius: query.radius,
  withinHours: query.withinHours,
  ...(query.activities.length ? { activity: query.activities } : {}),
});

export const toQueryString = (params: Record<string, string | number | string[]>): string =>
  Object.entries(params)
    .flatMap(([key, value]) => (Array.isArray(value) ? value : [value]).map((item) => [key, String(item)]))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
