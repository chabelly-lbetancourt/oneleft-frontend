/** Gender of a person (HU-070): «non-binary» and «prefer not to say» fit the plans for everyone only. */
export type Gender = 'WOMAN' | 'MAN' | 'NON_BINARY' | 'PREFER_NOT_TO_SAY';

export const GENDERS: Gender[] = ['WOMAN', 'MAN', 'NON_BINARY', 'PREFER_NOT_TO_SAY'];

export const genderKey = (gender: Gender): string => `genders.${gender}`;

/** Of age, as the service asks (HU-070). */
export const MIN_AGE = 18;

/** The age band other people see instead of the date of birth. */
export interface AgeBand {
  from: number;
  to: number | null;
  label: string;
}

/** My date of birth and gender (HU-070): the date is only mine, others only see the age band. */
export interface Demographics {
  birthDate: string;
  gender: Gender;
  ageBand: AgeBand;
  /** How many times the date of birth can still be changed */
  changesLeft: number;
}

export interface SaveDemographics {
  birthDate: string;
  gender: Gender;
}

/** Age in whole years of someone born on {@code birthDate} (yyyy-MM-dd), at {@code now}. */
export const ageOf = (birthDate: string, now = new Date()): number => {
  const [year, month, day] = birthDate.split('-').map(Number);
  const birthday = now.getMonth() + 1 > month || (now.getMonth() + 1 === month && now.getDate() >= day);
  return now.getFullYear() - year - (birthday ? 0 : 1);
};

/** The latest date of birth of someone of age today, as yyyy-MM-dd. */
export const latestBirthDate = (now = new Date()): string => {
  const limit = new Date(now.getFullYear() - MIN_AGE, now.getMonth(), now.getDate());
  return `${limit.getFullYear()}-${String(limit.getMonth() + 1).padStart(2, '0')}-${String(limit.getDate()).padStart(2, '0')}`;
};
