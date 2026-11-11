import { Demographics } from './demographics';

/** For whom a plan is by gender (HU-070): everyone, only women or only men. */
export type AudienceGender = 'ALL' | 'WOMAN' | 'MAN';

export const AUDIENCE_GENDERS: AudienceGender[] = ['ALL', 'WOMAN', 'MAN'];

/** For whom a plan is (HU-070), with an optional range of ages. */
export interface Audience {
  gender: AudienceGender;
  minAge: number | null;
  maxAge: number | null;
}

/** Nothing to say: for everyone and at any age. */
export const isEveryone = (audience: Audience | null | undefined): boolean =>
  !audience || (audience.gender === 'ALL' && audience.minAge == null && audience.maxAge == null);

/**
 * The parts of the preference of a plan as translation keys with their parameters: «only women» and «25–40 years», or
 * «from 25 years» and «up to 40 years». Empty for a plan for everyone.
 */
export const audienceParts = (
  audience: Audience | null | undefined,
): { key: string; params?: Record<string, unknown> }[] => {
  if (isEveryone(audience) || !audience) {
    return [];
  }
  const parts: { key: string; params?: Record<string, unknown> }[] = [];
  if (audience.gender !== 'ALL') {
    parts.push({ key: `audience.only.${audience.gender}` });
  }
  const { minAge, maxAge } = audience;
  if (minAge != null && maxAge != null) {
    parts.push({ key: 'audience.between', params: { min: minAge, max: maxAge } });
  } else if (minAge != null) {
    parts.push({ key: 'audience.from', params: { min: minAge } });
  } else if (maxAge != null) {
    parts.push({ key: 'audience.upTo', params: { max: maxAge } });
  }
  return parts;
};

/**
 * Whether I fit a plan, from my own date of birth and gender; {@code null} if I have not set them. The service decides in
 * the end: this only keeps the button away from someone who cannot join.
 */
export const fits = (
  audience: Audience | null | undefined,
  mine: Pick<Demographics, 'gender'> & { age: number },
): boolean => {
  if (isEveryone(audience) || !audience) {
    return true;
  }
  const genderFits = audience.gender === 'ALL' || audience.gender === mine.gender;
  return (
    genderFits &&
    (audience.minAge == null || mine.age >= audience.minAge) &&
    (audience.maxAge == null || mine.age <= audience.maxAge)
  );
};
