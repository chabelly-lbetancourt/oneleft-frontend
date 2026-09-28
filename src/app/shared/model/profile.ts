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
  zone: Zone | null;
  hobbies: Hobby[];
}

export interface UpdateProfile {
  displayName: string;
  zone: Zone | null;
  hobbies: Hobby[];
}

export interface Catalog {
  /** Activity codes; names come from the translations */
  activities: string[];
  levels: Level[];
}

export const LEVEL_LABELS: Record<Level, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
};

export const MAX_HOBBIES = 10;
