import { PlanSummary } from '../../shared/model/plan';

const inMinutes = (minutes: number) => new Date(Date.now() + minutes * 60_000);

/**
 * Sample data to lay out the home screen.
 * Replaced by the plans service API in HU-004 · See nearby plans.
 */
export const SAMPLE_PLANS: PlanSummary[] = [
  {
    id: 'demo-1',
    activity: 'Pádel',
    icon: 'pi-bolt',
    title: 'Partido de pádel, falta uno',
    zone: 'Vallecas',
    distanceKm: 1.2,
    startsAt: inMinutes(55),
    totalSpots: 4,
    freeSpots: 1,
    level: 'Nivel medio',
    participants: ['LM', 'JR', 'AP'],
  },
  {
    id: 'demo-2',
    activity: 'Fútbol 7',
    icon: 'pi-flag',
    title: 'Fútbol 7 en el polideportivo',
    zone: 'Moratalaz',
    distanceKm: 2.8,
    startsAt: inMinutes(95),
    totalSpots: 14,
    freeSpots: 2,
    participants: ['DG', 'MS', 'PL', 'RC'],
  },
  {
    id: 'demo-3',
    activity: 'Juegos de mesa',
    icon: 'pi-th-large',
    title: 'Catan en la cafetería',
    zone: 'Campus Sur UPM',
    distanceKm: 0.4,
    startsAt: inMinutes(30),
    totalSpots: 4,
    freeSpots: 1,
    participants: ['IV', 'CS', 'BT'],
  },
  {
    id: 'demo-4',
    activity: 'Concierto',
    icon: 'pi-ticket',
    title: 'Me sobra una entrada para esta noche',
    zone: 'Malasaña',
    distanceKm: 5.1,
    startsAt: inMinutes(180),
    totalSpots: 2,
    freeSpots: 1,
    participants: ['NR'],
  },
];
