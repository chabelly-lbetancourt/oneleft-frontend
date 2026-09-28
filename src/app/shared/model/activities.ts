/** Activity catalog: the codes are the contract with the users and plans services. */
export const ACTIVITIES: { code: string; name: string; icon: string }[] = [
  { code: 'PADEL', name: 'Pádel', icon: 'pi-bolt' },
  { code: 'FOOTBALL', name: 'Fútbol', icon: 'pi-flag' },
  { code: 'BASKETBALL', name: 'Baloncesto', icon: 'pi-circle' },
  { code: 'TENNIS', name: 'Tenis', icon: 'pi-bolt' },
  { code: 'RUNNING', name: 'Running', icon: 'pi-directions-alt' },
  { code: 'CYCLING', name: 'Ciclismo', icon: 'pi-compass' },
  { code: 'HIKING', name: 'Senderismo', icon: 'pi-map' },
  { code: 'BOARD_GAMES', name: 'Juegos de mesa', icon: 'pi-th-large' },
  { code: 'CINEMA', name: 'Cine', icon: 'pi-video' },
  { code: 'CONCERTS', name: 'Conciertos', icon: 'pi-ticket' },
];

export const activityOf = (code: string) =>
  ACTIVITIES.find((activity) => activity.code === code) ?? { code, name: code, icon: 'pi-star' };
