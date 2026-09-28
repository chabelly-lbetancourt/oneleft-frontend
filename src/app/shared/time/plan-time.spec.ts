import { clockTime, nextOccurrence, spotsKey, startsIn, startsInRange } from './plan-time';

describe('plan-time', () => {
  const now = new Date(2026, 8, 28, 17, 0, 0);

  it('should take a later time of today', () => {
    const date = nextOccurrence('18:30', now);
    expect(date.getDate()).toBe(28);
    expect(date.getHours()).toBe(18);
    expect(date.getMinutes()).toBe(30);
  });

  it('should take tomorrow when the time has already passed', () => {
    const late = new Date(2026, 8, 28, 23, 0, 0);
    const date = nextOccurrence('00:30', late);
    expect(date.getDate()).toBe(29);
    expect(nextOccurrence('17:00', now).getDate()).toBe(29);
  });

  it('should accept starts between 5 minutes and 12 hours', () => {
    const minutes = (m: number) => new Date(now.getTime() + m * 60_000);
    expect(startsInRange(minutes(4), now)).toBe(false);
    expect(startsInRange(minutes(5), now)).toBe(true);
    expect(startsInRange(minutes(720), now)).toBe(true);
    expect(startsInRange(minutes(721), now)).toBe(false);
  });

  it('should describe the time left', () => {
    const minutes = (m: number) => new Date(now.getTime() + m * 60_000);
    expect(startsIn(minutes(-1), now)).toEqual({ key: 'time.started', params: {} });
    expect(startsIn(minutes(45), now)).toEqual({ key: 'time.inMinutes', params: { minutes: 45 } });
    expect(startsIn(minutes(120), now)).toEqual({ key: 'time.inHours', params: { hours: 2 } });
    expect(startsIn(minutes(90), now)).toEqual({ key: 'time.inHoursMinutes', params: { hours: 1, minutes: 30 } });
  });

  it('should format the clock time in the locale of the language', () => {
    expect(clockTime(new Date(2026, 8, 28, 9, 5))).toBe('09:05');
    expect(clockTime(new Date(2026, 8, 28, 21, 5), 'en-GB')).toBe('21:05');
  });

  it('should choose the singular or plural spots label', () => {
    expect(spotsKey(1)).toBe('spots.one');
    expect(spotsKey(3)).toBe('spots.other');
  });
});
