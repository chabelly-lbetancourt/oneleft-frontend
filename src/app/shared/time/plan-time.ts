/** Start time rules of a plan, the same as in the plans service. */
export const MIN_LEAD_MINUTES = 5;
export const MAX_HORIZON_HOURS = 12;

const MINUTE = 60_000;

/**
 * Turns a time of day ("18:30") into its next occurrence from `now`:
 * if it has already passed today, it is tomorrow's (a plan at 00:30 published at 23:00).
 */
export const nextOccurrence = (time: string, now: Date): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const candidate = new Date(now);
  candidate.setHours(hours, minutes, 0, 0);
  if (candidate.getTime() <= now.getTime()) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return candidate;
};

export const startsInRange = (startsAt: Date, now: Date): boolean => {
  const diff = startsAt.getTime() - now.getTime();
  return diff >= MIN_LEAD_MINUTES * MINUTE && diff <= MAX_HORIZON_HOURS * 60 * MINUTE;
};

/** Translation key and parameters of a relative time. */
export interface RelativeTime {
  key: string;
  params: Record<string, number>;
}

/** Relative start: "in 45 min", "in 2 h", "in 1 h 30 min" or "already started" (keys under time.*). */
export const startsIn = (startsAt: Date, now: Date): RelativeTime => {
  const minutes = Math.round((startsAt.getTime() - now.getTime()) / MINUTE);
  if (minutes <= 0) {
    return { key: 'time.started', params: {} };
  }
  if (minutes < 60) {
    return { key: 'time.inMinutes', params: { minutes } };
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0
    ? { key: 'time.inHours', params: { hours } }
    : { key: 'time.inHoursMinutes', params: { hours, minutes: rest } };
};

/** Local time in 24-hour format in the given locale, for example "18:30". */
export const clockTime = (date: Date, locale = 'es-ES'): string =>
  date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false });

/** Translation key of the free spots label: singular or plural (the count goes as a parameter). */
export const spotsKey = (freeSpots: number): string => (freeSpots === 1 ? 'spots.one' : 'spots.other');
