/** Activity catalog: the codes are the contract with the users and plans services; names are translated. */
export interface Activity {
  code: string;
  icon: string;
  /** Tailwind classes of the activity colour (full class names, so Tailwind generates them) */
  tone: string;
}

export const ACTIVITIES: Activity[] = [
  { code: 'PADEL', icon: 'pi-bolt', tone: 'bg-lime-100 text-lime-700' },
  { code: 'FOOTBALL', icon: 'pi-flag', tone: 'bg-emerald-100 text-emerald-700' },
  { code: 'BASKETBALL', icon: 'pi-circle', tone: 'bg-orange-100 text-orange-700' },
  { code: 'TENNIS', icon: 'pi-bolt', tone: 'bg-yellow-100 text-yellow-700' },
  { code: 'RUNNING', icon: 'pi-directions-alt', tone: 'bg-sky-100 text-sky-700' },
  { code: 'CYCLING', icon: 'pi-compass', tone: 'bg-teal-100 text-teal-700' },
  { code: 'HIKING', icon: 'pi-map', tone: 'bg-green-100 text-green-700' },
  { code: 'BOARD_GAMES', icon: 'pi-th-large', tone: 'bg-violet-100 text-violet-700' },
  { code: 'CINEMA', icon: 'pi-video', tone: 'bg-rose-100 text-rose-700' },
  { code: 'CONCERTS', icon: 'pi-ticket', tone: 'bg-fuchsia-100 text-fuchsia-700' },
];

export const activityOf = (code: string): Activity =>
  ACTIVITIES.find((activity) => activity.code === code) ?? {
    code,
    icon: 'pi-star',
    tone: 'bg-surface-100 text-ink',
  };

/** Translation key of an activity name. */
export const activityKey = (code: string): string => `activities.${code}`;
