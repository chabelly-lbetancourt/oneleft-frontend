export type Level = 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO';

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
  activities: { code: string; name: string }[];
  levels: Level[];
}

export const LEVEL_LABELS: Record<Level, string> = {
  PRINCIPIANTE: 'Principiante',
  INTERMEDIO: 'Intermedio',
  AVANZADO: 'Avanzado',
};

export const MAX_HOBBIES = 10;
