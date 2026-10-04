import {
  CalendarEvent,
  endOf,
  googleCalendarUrl,
  icsFileName,
  planIcs,
  utcStamp,
} from './plan-calendar';

describe('plan-calendar', () => {
  const event: CalendarEvent = {
    id: 'p1',
    title: 'Pádel; 2 contra 2, falta uno',
    description: 'Traed pala\nVer el plan: https://oneleft.app/share/plans/p1',
    location: 'Pistas de la Albufera',
    latitude: 39.47,
    longitude: -0.376,
    startsAt: new Date(Date.UTC(2026, 9, 4, 17, 30)),
    url: 'https://oneleft.app/share/plans/p1',
  };
  const now = new Date(Date.UTC(2026, 9, 4, 15, 0, 5, 123));
  const lines = (ics: string) => ics.split('\r\n');

  it('should write dates in UTC basic format and last 3 hours', () => {
    expect(utcStamp(event.startsAt)).toBe('20261004T173000Z');
    expect(endOf(event).toISOString()).toBe('2026-10-04T20:30:00.000Z');
  });

  it('should build a valid iCalendar event with a reminder 30 minutes before', () => {
    const ics = planIcs(event, now);
    expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
    expect(lines(ics)).toEqual(
      expect.arrayContaining([
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'UID:plan-p1@oneleft',
        'DTSTAMP:20261004T150005Z',
        'DTSTART:20261004T173000Z',
        'DTEND:20261004T203000Z',
        'SUMMARY:Pádel\\; 2 contra 2\\, falta uno',
        'LOCATION:Pistas de la Albufera',
        'GEO:39.47;-0.376',
        'TRIGGER:-PT30M',
        'END:VEVENT',
      ]),
    );
    expect(ics).toContain(
      'DESCRIPTION:Traed pala\\nVer el plan: https://oneleft.app/share/plans/p1',
    );
    expect(ics).not.toMatch(/[^\r]\n/);
  });

  it('should fold long lines at 75 octets without splitting characters', () => {
    const ics = planIcs({ ...event, title: 'Ñ'.repeat(100) }, now);
    const all = lines(ics);
    const start = all.findIndex((line) => line.startsWith('SUMMARY:'));
    const length = all.slice(start + 1).findIndex((line) => !line.startsWith(' ')) + 1;
    const summary = all.slice(start, start + length);
    const encoder = new TextEncoder();
    expect(summary.length).toBeGreaterThan(1);
    summary.forEach((line) => expect(encoder.encode(line).length).toBeLessThanOrEqual(75));
    expect(summary.map((line, i) => (i ? line.slice(1) : line)).join('')).toBe(
      'SUMMARY:' + 'Ñ'.repeat(100),
    );
  });

  it('should fill in the new event page of Google Calendar', () => {
    const url = new URL(googleCalendarUrl(event));
    expect(url.origin + url.pathname).toBe('https://calendar.google.com/calendar/render');
    expect(url.searchParams.get('action')).toBe('TEMPLATE');
    expect(url.searchParams.get('text')).toBe(event.title);
    expect(url.searchParams.get('dates')).toBe('20261004T173000Z/20261004T203000Z');
    expect(url.searchParams.get('location')).toBe('Pistas de la Albufera');
    expect(url.searchParams.get('details')).toBe(event.description);
  });

  it('should name the file after the plan', () => {
    expect(icsFileName('Pádel 2 contra 2, ¡falta uno!')).toBe('padel-2-contra-2-falta-uno.ics');
    expect(icsFileName('¡¿?!')).toBe('plan.ics');
    expect(icsFileName('a'.repeat(59) + ' b')).toBe('a'.repeat(59) + '.ics');
  });
});
