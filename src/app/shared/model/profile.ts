export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Zone {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Hobby {
  activity: string;
  level: Level;
}

export interface MyProfile {
  userId: string;
  displayName: string;
  /** A few words about me (HU-048) */
  bio: string | null;
  zone: Zone | null;
  hobbies: Hobby[];
}

export interface UpdateProfile {
  displayName: string;
  bio: string | null;
  zone: Zone | null;
  hobbies: Hobby[];
}

export interface Catalog {
  /** Activity codes; names come from the translations */
  activities: string[];
  levels: Level[];
}

export const LEVELS: Level[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

/** Translation key of a level; no level means any level. */
export const levelKey = (level: Level | null | undefined): string => `levels.${level ?? 'ANY'}`;

export const MAX_HOBBIES = 10;
export const MAX_BIO = 300;

/** The profile of someone else (HU-048): no coordinates. */
export interface PublicProfile {
  userId: string;
  displayName: string;
  bio: string | null;
  zoneName: string | null;
  hobbies: Hobby[];
}
