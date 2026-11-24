import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, timeout } from 'rxjs';
import { RoutePoint, TravelMode, TravelRoute } from '@shared/model/route';

/**
 * The OSRM servers of FOSSGIS for OpenStreetMap (the ones openstreetmap.org uses for its directions): unlike the OSRM
 * demo server, which only routes cars, they have walking and cycling profiles. The profile is chosen by the server;
 * the «driving» in the path is how OSRM names its only profile.
 */
export const OSRM_URL = 'https://routing.openstreetmap.de';
const SERVERS: Record<TravelMode, string> = { foot: 'routed-foot', bike: 'routed-bike' };
/** A shared, free service: past this the person is told that the route is not available, instead of waiting */
export const ROUTING_TIMEOUT_MS = 10_000;

/** What OSRM answers, only the fields that are used (https://project-osrm.org/docs/v5.24.0/api/#route-service) */
interface OsrmResponse {
  code: string;
  routes?: {
    distance: number;
    duration: number;
    geometry: { coordinates: [number, number][] };
  }[];
}

/** The route could not be worked out: no answer, no route between both points or a timeout. */
export class RoutingError extends Error {
  constructor(reason: string) {
    super(`The route could not be worked out: ${reason}`);
  }
}

/**
 * Client of the open routing service (HU-042). It goes straight to a third party, so it skips the interceptors: the
 * access token of OneLeft is never sent there. It is only called when the person asks for the route.
 */
@Injectable({ providedIn: 'root' })
export class RoutingApi {
  private readonly http = new HttpClient(inject(HttpBackend));

  route(mode: TravelMode, from: RoutePoint, to: RoutePoint): Observable<TravelRoute> {
    const points = [from, to]
      .map(({ latitude, longitude }) => `${longitude},${latitude}`)
      .join(';');
    return this.http
      .get<OsrmResponse>(`${OSRM_URL}/${SERVERS[mode]}/route/v1/driving/${points}`, {
        params: { overview: 'full', geometries: 'geojson', steps: 'false' },
      })
      .pipe(
        timeout(ROUTING_TIMEOUT_MS),
        map((response) => toRoute(mode, response)),
      );
  }
}

const toRoute = (mode: TravelMode, response: OsrmResponse): TravelRoute => {
  const best = response.routes?.[0];
  if (response.code !== 'Ok' || !best) {
    throw new RoutingError(response.code);
  }
  return {
    mode,
    distanceMeters: best.distance,
    durationSeconds: best.duration,
    path: best.geometry.coordinates.map(([longitude, latitude]) => ({ latitude, longitude })),
  };
};
