import { initials } from './initials';

describe('initials', () => {
  it('should take the first letter of the first two words', () => {
    expect(initials('Lucía Martín Pérez')).toBe('LM');
    expect(initials('  ana  ')).toBe('A');
    expect(initials('')).toBe('?');
  });
});
