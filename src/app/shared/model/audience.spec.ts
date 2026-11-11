import { Audience, audienceParts, fits, isEveryone } from './audience';
import { ageOf, latestBirthDate } from './demographics';

describe('audience', () => {
  const women: Audience = { gender: 'WOMAN', minAge: 25, maxAge: 40 };

  it('should treat a missing or default audience as everyone', () => {
    expect(isEveryone(undefined)).toBe(true);
    expect(isEveryone({ gender: 'ALL', minAge: null, maxAge: null })).toBe(true);
    expect(isEveryone(women)).toBe(false);
  });

  it('should describe the gender and the ages as parts', () => {
    expect(audienceParts(women)).toEqual([
      { key: 'audience.only.WOMAN' },
      { key: 'audience.between', params: { min: 25, max: 40 } },
    ]);
    expect(audienceParts({ gender: 'ALL', minAge: 30, maxAge: null })).toEqual([
      { key: 'audience.from', params: { min: 30 } },
    ]);
    expect(audienceParts({ gender: 'MAN', minAge: null, maxAge: 35 })).toEqual([
      { key: 'audience.only.MAN' },
      { key: 'audience.upTo', params: { max: 35 } },
    ]);
    expect(audienceParts(null)).toEqual([]);
  });

  it('should fit only the gender and the ages of the plan', () => {
    expect(fits(women, { gender: 'WOMAN', age: 30 })).toBe(true);
    expect(fits(women, { gender: 'MAN', age: 30 })).toBe(false);
    expect(fits(women, { gender: 'NON_BINARY', age: 30 })).toBe(false);
    expect(fits(women, { gender: 'WOMAN', age: 24 })).toBe(false);
    expect(fits(women, { gender: 'WOMAN', age: 41 })).toBe(false);
    expect(fits(undefined, { gender: 'PREFER_NOT_TO_SAY', age: 18 })).toBe(true);
  });
});

describe('demographics', () => {
  it('should compute the age counting the birthday', () => {
    const now = new Date(2026, 10, 16);
    expect(ageOf('2000-11-16', now)).toBe(26);
    expect(ageOf('2000-11-17', now)).toBe(25);
    expect(ageOf('2000-12-01', now)).toBe(25);
  });

  it('should give 18 years ago as the latest date of birth', () => {
    expect(latestBirthDate(new Date(2026, 10, 16))).toBe('2008-11-16');
  });
});
