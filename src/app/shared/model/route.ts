import { MeetingPoint } from './published-plan';

/** A point of a route, in degrees */
export type RoutePoint = Pick<MeetingPoint, 'latitude' | 'longitude'>;

/** How the person gets to the meeting point (HU-042): the profiles of the open routing service. */
export type TravelMode = 'foot' | 'bike';

export const TRAVEL_MODES: readonly TravelMode[] = ['foot', 'bike'];

/** A route to the meeting point: its length, how long it takes and the line to draw on the map. */
export interface TravelRoute {
  mode: TravelMode;
  distanceMeters: number;
  durationSeconds: number;
  /** From the start to the meeting point */
  path: RoutePoint[];
}
