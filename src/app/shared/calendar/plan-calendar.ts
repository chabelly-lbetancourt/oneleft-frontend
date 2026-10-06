/** A plan lasts 3 hours from its start, the same as in the plans service (HU-007). */
export const PLAN_DURATION_HOURS = 3;
/** The calendar reminds the plan as long before as the app does (HU-007). */
export const REMINDER_MINUTES = 30;

const HOUR = 3_600_000;
/** RFC 5545: content lines longer than 75 octets are folded. */
const MAX_LINE_OCTETS = 75;

/** A plan as an event of the personal calendar (HU-027). */
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  startsAt: Date;
  url: string;
}

export const endOf = (event: CalendarEvent): Date =>
  new Date(event.startsAt.getTime() + PLAN_DURATION_HOURS * HOUR);

/** UTC date-time in the basic format of iCalendar and Google Calendar: 20261004T173000Z. */
export const utcStamp = (date: Date): string =>
  date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

/** Escapes a TEXT value (RFC 5545, 3.3.11). */
const text = (value: string): string =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Folds a content line at 75 octets without splitting a character (RFC 5545, 3.1). */
const fold = (line: string): string => {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = '';
  let octets = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    // The continuation lines start with a space, which counts towards their 75 octets
    if (octets + size > MAX_LINE_OCTETS) {
      parts.push(current);
      current = ' ';
      octets = 1;
    }
    current += char;
    octets += size;
  }
  parts.push(current);
  return parts.join('\r\n');
};

/** iCalendar file (RFC 5545) of the plan, readable by Google Calendar, Apple Calendar and Outlook. */
export const planIcs = (event: CalendarEvent, now: Date): string =>
  [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//OneLeft//Plans//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    // Same UID for the same plan: adding it again updates the event instead of repeating it
    `UID:plan-${event.id}@oneleft`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${utcStamp(event.startsAt)}`,
    `DTEND:${utcStamp(endOf(event))}`,
    `SUMMARY:${text(event.title)}`,
    `DESCRIPTION:${text(event.description)}`,
    `LOCATION:${text(event.location)}`,
    `GEO:${event.latitude};${event.longitude}`,
    `URL:${event.url}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${text(event.title)}`,
    `TRIGGER:-PT${REMINDER_MINUTES}M`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .map(fold)
    .join('\r\n') + '\r\n';

/** Google Calendar's "new event" page, filled in: the Android app opens it in the Calendar app. */
export const googleCalendarUrl = (event: CalendarEvent): string => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${utcStamp(event.startsAt)}/${utcStamp(endOf(event))}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
};

/** File name from the title of the plan: "Pádel 2 contra 2" → "padel-2-contra-2.ics". */
export const icsFileName = (title: string): string => {
  const slug = title
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
    .replace(/-$/, '');
  return `${slug || 'plan'}.ics`;
};
