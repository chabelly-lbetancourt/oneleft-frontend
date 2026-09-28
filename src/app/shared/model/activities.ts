/** Catálogo de actividades: los códigos son el contrato con los servicios users y plans. */
export const ACTIVITIES: { code: string; name: string; icon: string }[] = [
  { code: 'PADEL', name: 'Pádel', icon: 'pi-bolt' },
  { code: 'FUTBOL', name: 'Fútbol', icon: 'pi-flag' },
  { code: 'BALONCESTO', name: 'Baloncesto', icon: 'pi-circle' },
  { code: 'TENIS', name: 'Tenis', icon: 'pi-bolt' },
  { code: 'RUNNING', name: 'Running', icon: 'pi-directions-alt' },
  { code: 'CICLISMO', name: 'Ciclismo', icon: 'pi-compass' },
  { code: 'SENDERISMO', name: 'Senderismo', icon: 'pi-map' },
  { code: 'JUEGOS_DE_MESA', name: 'Juegos de mesa', icon: 'pi-th-large' },
  { code: 'CINE', name: 'Cine', icon: 'pi-video' },
  { code: 'CONCIERTOS', name: 'Conciertos', icon: 'pi-ticket' },
];

export const activityOf = (code: string) =>
  ACTIVITIES.find((activity) => activity.code === code) ?? { code, name: code, icon: 'pi-star' };
