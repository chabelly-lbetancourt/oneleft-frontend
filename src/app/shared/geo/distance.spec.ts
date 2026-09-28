import { formatDistance } from './distance';

describe('formatDistance', () => {
  it('should show metres rounded to 10 below one kilometre', () => {
    expect(formatDistance(34)).toBe('30 m');
    expect(formatDistance(603)).toBe('600 m');
    expect(formatDistance(999)).toBe('1000 m');
  });

  it('should show kilometres with the decimal separator of the language', () => {
    expect(formatDistance(1234)).toBe('1,2 km');
    expect(formatDistance(1234, 'en-GB')).toBe('1.2 km');
    expect(formatDistance(5000, 'en-GB')).toBe('5 km');
  });
});
