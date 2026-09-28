import { clockTime, nextOccurrence, startsInLabel, startsInRange } from './plan-time';

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
    expect(startsInLabel(minutes(-1), now)).toBe('ya ha empezado');
    expect(startsInLabel(minutes(45), now)).toBe('en 45 min');
    expect(startsInLabel(minutes(120), now)).toBe('en 2 h');
    expect(startsInLabel(minutes(90), now)).toBe('en 1 h 30 min');
    expect(clockTime(new Date(2026, 8, 28, 9, 5))).toBe('09:05');
  });
});
