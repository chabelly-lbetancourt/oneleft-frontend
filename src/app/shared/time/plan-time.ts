/** Reglas de la hora de inicio de un plan, iguales que en el servicio plans. */
export const MIN_LEAD_MINUTES = 5;
export const MAX_HORIZON_HOURS = 12;

const MINUTE = 60_000;

/**
 * Convierte una hora del día («18:30») en la próxima vez que ocurre a partir de `now`:
 * si ya ha pasado hoy, es la de mañana (un plan a las 00:30 publicado a las 23:00).
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

/** Texto relativo: «en 45 min», «en 2 h», «en 1 h 30 min», «ya ha empezado». */
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

/** Hora local en formato 24 h, por ejemplo «18:30». */
export const clockTime = (date: Date): string =>
  date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
