/** Activity catalog: the codes are the contract with the users and plans services; names are translated. */
export const ACTIVITIES: { code: string; icon: string }[] = [
  { code: 'PADEL', icon: 'pi-bolt' },
  { code: 'FOOTBALL', icon: 'pi-flag' },
  { code: 'BASKETBALL', icon: 'pi-circle' },
  { code: 'TENNIS', icon: 'pi-bolt' },
  { code: 'RUNNING', icon: 'pi-directions-alt' },
  { code: 'CYCLING', icon: 'pi-compass' },
  { code: 'HIKING', icon: 'pi-map' },
  { code: 'BOARD_GAMES', icon: 'pi-th-large' },
  { code: 'CINEMA', icon: 'pi-video' },
  { code: 'CONCERTS', icon: 'pi-ticket' },
];

export const activityOf = (code: string) =>
  ACTIVITIES.find((activity) => activity.code === code) ?? { code, icon: 'pi-star' };

/** Translation key of an activity name. */
export const activityKey = (code: string): string => `activities.${code}`;
