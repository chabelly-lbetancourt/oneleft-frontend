/** Activity catalog: the codes are the contract with the users and plans services; names are translated. */
export interface Activity {
  code: string;
  icon: string;
  /** Tone class of the activity colour (styles/objects/_tones.scss) */
  tone: string;
}

export const ACTIVITIES: Activity[] = [
  { code: 'PADEL', icon: 'pi-bolt', tone: 'tone-lime' },
  { code: 'FOOTBALL', icon: 'pi-flag', tone: 'tone-emerald' },
  { code: 'BASKETBALL', icon: 'pi-circle', tone: 'tone-orange' },
  { code: 'TENNIS', icon: 'pi-bolt', tone: 'tone-yellow' },
  { code: 'RUNNING', icon: 'pi-directions-alt', tone: 'tone-sky' },
  { code: 'CYCLING', icon: 'pi-compass', tone: 'tone-teal' },
  { code: 'HIKING', icon: 'pi-map', tone: 'tone-green' },
  { code: 'BOARD_GAMES', icon: 'pi-th-large', tone: 'tone-violet' },
  { code: 'CINEMA', icon: 'pi-video', tone: 'tone-rose' },
  { code: 'CONCERTS', icon: 'pi-ticket', tone: 'tone-fuchsia' },
];

export const activityOf = (code: string): Activity =>
  ACTIVITIES.find((activity) => activity.code === code) ?? {
    code,
    icon: 'pi-star',
    tone: 'tone-neutral',
  };

/** Translation key of an activity name. */
export const activityKey = (code: string): string => `activities.${code}`;
