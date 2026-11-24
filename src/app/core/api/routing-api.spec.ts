import { HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TravelRoute } from '@shared/model/route';
import { OSRM_URL, ROUTING_TIMEOUT_MS, RoutingApi, RoutingError } from './routing-api';

const FROM = { latitude: 40.392, longitude: -3.631 };
const TO = { latitude: 40.396, longitude: -3.63 };

describe('RoutingApi', () => {
  let api: RoutingApi;
  let http: HttpTestingController;
  const intercepted: HttpRequest<unknown>[] = [];

  beforeEach(() => {
    intercepted.length = 0;
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([
            (request, next) => {
              intercepted.push(request);
              return next(request);
            },
          ]),
        ),
        provideHttpClientTesting(),
      ],
    });
    api = TestBed.inject(RoutingApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    vi.useRealTimers();
  });

  it('should ask the walking server for the route, longitude first, and turn it into points', () => {
    let route: TravelRoute | undefined;
    api.route('foot', FROM, TO).subscribe((value) => (route = value));

    const request = http.expectOne(
      ({ url }) => url === `${OSRM_URL}/routed-foot/route/v1/driving/-3.631,40.392;-3.63,40.396`,
    );
    expect(request.request.params.get('overview')).toBe('full');
    expect(request.request.params.get('geometries')).toBe('geojson');
    request.flush({
      code: 'Ok',
      routes: [
        {
          distance: 612.4,
          duration: 441.2,
          geometry: {
            coordinates: [
              [-3.631, 40.392],
              [-3.63, 40.396],
            ],
          },
        },
      ],
    });

    expect(route).toEqual({
      mode: 'foot',
      distanceMeters: 612.4,
      durationSeconds: 441.2,
      path: [FROM, TO],
    });
  });

  it('should ask the cycling server for a bike route', () => {
    api.route('bike', FROM, TO).subscribe();
    http
      .expectOne(({ url }) => url.startsWith(`${OSRM_URL}/routed-bike/route/v1/driving/`))
      .flush({ code: 'Ok', routes: [{ distance: 1, duration: 1, geometry: { coordinates: [] } }] });
  });

  it('should never send the requests through the interceptors, so the OneLeft token stays at home', () => {
    api.route('foot', FROM, TO).subscribe();
    http
      .expectOne(() => true)
      .flush({ code: 'Ok', routes: [{ distance: 1, duration: 1, geometry: { coordinates: [] } }] });
    expect(intercepted).toEqual([]);
  });

  it('should fail when there is no route between both points', () => {
    let error: unknown;
    api.route('foot', FROM, TO).subscribe({ error: (value) => (error = value) });
    http.expectOne(() => true).flush({ code: 'NoRoute', routes: [] });
    expect(error).toBeInstanceOf(RoutingError);
  });

  it('should give up when the service does not answer in time', () => {
    vi.useFakeTimers();
    let error: unknown;
    api.route('foot', FROM, TO).subscribe({ error: (value) => (error = value) });
    const request = http.expectOne(() => true);
    vi.advanceTimersByTime(ROUTING_TIMEOUT_MS);
    expect(error).toBeDefined();
    expect(request.cancelled).toBe(true);
  });
});
