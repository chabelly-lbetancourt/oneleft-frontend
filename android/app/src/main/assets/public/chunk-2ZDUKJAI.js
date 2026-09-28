// src/app/shared/time/plan-time.ts
var MIN_LEAD_MINUTES = 5;
var MAX_HORIZON_HOURS = 12;
var MINUTE = 6e4;
var nextOccurrence = (time, now) => {
  const [hours, minutes] = time.split(":").map(Number);
  const candidate = new Date(now);
  candidate.setHours(hours, minutes, 0, 0);
  if (candidate.getTime() <= now.getTime()) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return candidate;
};
var startsInRange = (startsAt, now) => {
  const diff = startsAt.getTime() - now.getTime();
  return diff >= MIN_LEAD_MINUTES * MINUTE && diff <= MAX_HORIZON_HOURS * 60 * MINUTE;
};
var startsIn = (startsAt, now) => {
  const minutes = Math.round((startsAt.getTime() - now.getTime()) / MINUTE);
  if (minutes <= 0) {
    return { key: "time.started", params: {} };
  }
  if (minutes < 60) {
    return { key: "time.inMinutes", params: { minutes } };
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? { key: "time.inHours", params: { hours } } : { key: "time.inHoursMinutes", params: { hours, minutes: rest } };
};
var clockTime = (date, locale = "es-ES") => date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", hour12: false });
var spotsKey = (freeSpots) => freeSpots === 1 ? "spots.one" : "spots.other";

export {
  MAX_HORIZON_HOURS,
  nextOccurrence,
  startsInRange,
  startsIn,
  clockTime,
  spotsKey
};
//# debugId=c92d15fb-339f-507e-85e0-f28b3a16dbd5
//# sourceMappingURL=chunk-2ZDUKJAI.js.map
