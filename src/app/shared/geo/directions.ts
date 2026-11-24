import { MeetingPoint } from '@shared/model/published-plan';
import { RoutePoint, TravelMode } from '@shared/model/route';

/** The engines of openstreetmap.org/directions for each way of getting there (the same OSRM servers as the route) */
const OSM_ENGINES: Record<TravelMode, string> = {
  foot: 'fossgis_osrm_foot',
  bike: 'fossgis_osrm_bike',
};

const point = ({ latitude, longitude }: RoutePoint): string => `${latitude},${longitude}`;

/**
 * geo: URI (RFC 5870 and the Android extension `q=lat,lon(label)`): Android offers every maps app installed (Google
 * Maps, OsmAnd, Organic Maps…), which then navigates from where the device is. The brackets would end the label early,
 * so they are taken out of the name.
 */
export const geoUri = (meetingPoint: MeetingPoint): string => {
  const label = encodeURIComponent(meetingPoint.name.replaceAll(/[()\s]+/g, ' ').trim());
  return `geo:${point(meetingPoint)}?q=${point(meetingPoint)}(${label})`;
};

/**
 * The route on openstreetmap.org, for the browser: the same map and routing service as the app, without Google. Without
 * a start, openstreetmap.org asks for it there; with one (when the person has already asked for the route) it is drawn.
 */
export const osmDirectionsUrl = (
  meetingPoint: MeetingPoint,
  mode: TravelMode,
  from: RoutePoint | null = null,
): string => {
  const params = new URLSearchParams({
    engine: OSM_ENGINES[mode],
    route: `${from ? point(from) : ''};${point(meetingPoint)}`,
  });
  return `https://www.openstreetmap.org/directions?${params.toString()}`;
};
