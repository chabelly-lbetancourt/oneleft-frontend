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

/** Relative text: "en 45 min", "en 2 h", "en 1 h 30 min", "ya ha empezado". */
export const startsInLabel = (startsAt: Date, now: Date): string => {
  const minutes = Math.round((startsAt.getTime() - now.getTime()) / MINUTE);
  if (minutes <= 0) {
    return 'ya ha empezado';
  }
  if (minutes < 60) {
    return `en ${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `en ${hours} h` : `en ${hours} h ${rest} min`;
};

/** Local time in 24-hour format, for example "18:30". */
export const clockTime = (date: Date): string =>
  date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
