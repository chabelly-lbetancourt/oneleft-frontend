/** Activity catalog: the codes are the contract with the users and plans services; names are translated. */
export interface Activity {
  code: string;
  icon: string;
  /** Tailwind classes of the activity colour (full class names, so Tailwind generates them) */
  tone: string;
}

export const ACTIVITIES: Activity[] = [
  { code: 'PADEL', icon: 'pi-bolt', tone: 'bg-lime-200 text-lime-900' },
  { code: 'FOOTBALL', icon: 'pi-flag', tone: 'bg-emerald-200 text-emerald-900' },
  { code: 'BASKETBALL', icon: 'pi-circle', tone: 'bg-orange-200 text-orange-900' },
  { code: 'TENNIS', icon: 'pi-bolt', tone: 'bg-yellow-200 text-yellow-900' },
  { code: 'RUNNING', icon: 'pi-directions-alt', tone: 'bg-sky-200 text-sky-900' },
  { code: 'CYCLING', icon: 'pi-compass', tone: 'bg-teal-200 text-teal-900' },
  { code: 'HIKING', icon: 'pi-map', tone: 'bg-green-200 text-green-900' },
  { code: 'BOARD_GAMES', icon: 'pi-th-large', tone: 'bg-violet-200 text-violet-900' },
  { code: 'CINEMA', icon: 'pi-video', tone: 'bg-rose-200 text-rose-900' },
  { code: 'CONCERTS', icon: 'pi-ticket', tone: 'bg-fuchsia-200 text-fuchsia-900' },
];

export const activityOf = (code: string): Activity =>
  ACTIVITIES.find((activity) => activity.code === code) ?? {
    code,
    icon: 'pi-star',
    tone: 'bg-sand text-ink',
  };

/** Translation key of an activity name. */
export const activityKey = (code: string): string => `activities.${code}`;
