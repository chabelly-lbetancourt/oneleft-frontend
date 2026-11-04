import {
  ACTIVITIES,
  activitiesOfCategory,
  activityOf,
  CATEGORIES,
  groupActivities,
  INTEREST_ACTIVITIES,
  OTHER,
  OTHER_MAX_LENGTH,
} from './activities';

describe('activities (HU-068)', () => {
  it('should have 29 activities with a unique code that fits the services', () => {
    const codes = ACTIVITIES.map(({ code }) => code);

    expect(codes).toHaveLength(29);
    expect(new Set(codes).size).toBe(29);
    expect(codes.every((code) => code.length <= 20)).toBe(true);
  });

  it('should keep the order of the categories and leave «other» as the only one of its own', () => {
    expect(CATEGORIES).toEqual(['SPORT', 'CULTURE', 'LEISURE', 'FOOD_DRINK', 'OTHER']);
    expect(activitiesOfCategory('OTHER').map(({ code }) => code)).toEqual([OTHER]);
    expect(ACTIVITIES.every(({ category }) => CATEGORIES.includes(category))).toBe(true);
    expect(OTHER_MAX_LENGTH).toBe(30);
  });

  it('should not offer «other» as a hobby or an interest', () => {
    expect(INTEREST_ACTIVITIES).toHaveLength(28);
    expect(INTEREST_ACTIVITIES.map(({ code }) => code)).not.toContain(OTHER);
  });

  it('should group by category with translated labels and leave empty categories out', () => {
    const groups = groupActivities((key) => `t:${key}`, INTEREST_ACTIVITIES);

    expect(groups.map((group) => group.label)).toEqual([
      't:categories.SPORT',
      't:categories.CULTURE',
      't:categories.LEISURE',
      't:categories.FOOD_DRINK',
    ]);
    expect(groups[3].items).toEqual([
      { code: 'TAPAS', name: 't:activities.TAPAS' },
      { code: 'MEAL', name: 't:activities.MEAL' },
      { code: 'COFFEE', name: 't:activities.COFFEE' },
    ]);
  });

  it('should fall back to a neutral «other» for a code it does not know', () => {
    expect(activityOf('QUIDDITCH')).toEqual({
      code: 'QUIDDITCH',
      icon: 'pi-star',
      tone: 'tone-neutral',
      category: 'OTHER',
    });
    expect(activityOf('YOGA').category).toBe('SPORT');
  });
});
