/** Hours without notices, local time (HH:mm or HH:mm:ss, as the API returns them). */
export interface QuietHours {
  start: string;
  end: string;
}

/** What each person wants to hear about (HU-006). Notices are off until the person turns them on. */
export interface NotificationPreferences {
  enabled: boolean;
  /** Approximate zone (rounded to about 1 km) */
  latitude: number | null;
  longitude: number | null;
  radiusMeters: number;
  /** Empty: every activity */
  activities: string[];
  quietHours: QuietHours | null;
  maxPerDay: number;
}

/** A plan that fits the person's preferences has been published nearby (real-time stream). */
export interface PlanNearbyNotice {
  planId: string;
  activity: string;
  title: string;
  placeName: string;
  startsAt: string;
  freeSpots: number;
  /** From the person's approximate zone, rounded to 100 m */
  distanceMeters: number;
}

/** A browser's Push API subscription, as the notifications service stores it. */
export interface PushSubscriptionRequest {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  language: string;
}

export const RADIUS_OPTIONS = [1000, 3000, 5000, 10000] as const;
export const MAX_PER_DAY = 20;
