import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { RoutingApi, RoutingError } from '@core/api/routing-api';
import {
  ApproximateLocation,
  LocationError,
  MEETING_POINT_DECIMALS,
} from '@core/geo/approximate-location';
import { NativePlatform } from '@core/platform';
import { TravelMode, TravelRoute } from '@shared/model/route';
import { PlanRoute } from './plan-route';

const MEETING_POINT = { name: '<b>Pistas</b>', latitude: 40.396, longitude: -3.63 };
const HERE = { latitude: 40.392, longitude: -3.631 };

const routeOf = (mode: TravelMode, durationSeconds: number): TravelRoute => ({
  mode,
  distanceMeters: 1240,
  durationSeconds,
  path: [HERE, { latitude: 40.394, longitude: -3.63 }, MEETING_POINT],
});

describe('PlanRoute', () => {
  let fixture: ComponentFixture<PlanRoute>;
  const api = { route: vi.fn() };
  const location = { precise: vi.fn() };
  const platform = { isNative: vi.fn(() => false) };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async () => {
    fixture = TestBed.createComponent(PlanRoute);
    fixture.componentRef.setInput('meetingPoint', MEETING_POINT);
    await render();
  };
  const click = async (selector: string) => {
    element().querySelector<HTMLElement>(selector)!.click();
    await render();
  };
  const chooseMode = async (label: string) => {
    const options = [
      ...element().querySelectorAll<HTMLElement>('.plan-route__modes p-togglebutton'),
    ];
    options.find((option) => option.textContent?.includes(label))!.click();
    await render();
  };
  const chooseBike = () => chooseMode('En bici');
  const openLink = () => element().querySelector<HTMLAnchorElement>('.plan-route__open')!;

  beforeEach(() => {
    vi.clearAllMocks();
    platform.isNative.mockReturnValue(false);
    location.precise.mockResolvedValue(HERE);
    api.route.mockImplementation((mode: TravelMode) =>
      of(routeOf(mode, mode === 'foot' ? 900 : 4000)),
    );
    TestBed.configureTestingModule({
      imports: [PlanRoute, translocoTesting()],
      providers: [
        { provide: RoutingApi, useValue: api },
        { provide: ApproximateLocation, useValue: location },
        { provide: NativePlatform, useValue: platform },
      ],
    });
  });

  it('should not read the location nor ask for the route until the person presses the button', async () => {
    await create();
    expect(location.precise).not.toHaveBeenCalled();
    expect(api.route).not.toHaveBeenCalled();
    expect(element().textContent).toContain('OpenStreetMap (FOSSGIS)');
    expect(element().querySelector('.plan-route__map')).toBeNull();
  });

  it('should draw the walking route with how long it takes, the distance and when the person arrives', async () => {
    await create();
    await click('.plan-route__show button');

    expect(location.precise).toHaveBeenCalledWith(MEETING_POINT_DECIMALS);
    expect(api.route).toHaveBeenCalledWith('foot', HERE, MEETING_POINT);
    const summary = element().querySelector('.plan-route__summary')!.textContent;
    expect(summary).toContain('15 min');
    expect(summary).toContain('1,2 km');
    expect(summary).toMatch(/llegas hacia las \d{1,2}:\d{2}/);
    const map = element().querySelector('.plan-route__map')!;
    expect(map.getAttribute('aria-label')).toContain('<b>Pistas</b>');
    expect(map.querySelector('.route-line')).not.toBeNull();
    expect(map.querySelector('.route-start')).not.toBeNull();
    expect(map.querySelector('.route-end')).not.toBeNull();
    expect(map.querySelector('.leaflet-control-attribution')?.textContent).toContain('FOSSGIS');
    expect(element().querySelector('.plan-route__show')).toBeNull();
  });

  it('should ask for the cycling route with the same location once, and keep each route', async () => {
    await create();
    await click('.plan-route__show button');
    await chooseBike();

    expect(location.precise).toHaveBeenCalledTimes(1);
    expect(api.route).toHaveBeenLastCalledWith('bike', HERE, MEETING_POINT);
    expect(element().querySelector('.plan-route__summary')!.textContent).toContain('1 h 7 min');
    await chooseMode('A pie');
    expect(api.route).toHaveBeenCalledTimes(2);
    expect(element().querySelector('.plan-route__summary')!.textContent).toContain('15 min');
  });

  it('should only change the way of getting there before the person asks for the route', async () => {
    await create();
    await chooseBike();
    expect(api.route).not.toHaveBeenCalled();
    await click('.plan-route__show button');
    expect(api.route).toHaveBeenCalledWith('bike', HERE, MEETING_POINT);
  });

  it('should say so when the route cannot be worked out and still offer the maps link', async () => {
    api.route.mockReturnValue(throwError(() => new RoutingError('timeout')));
    await create();
    await click('.plan-route__show button');

    expect(element().querySelector('.plan-route__error')?.textContent).toContain(
      'Ahora no podemos calcular la ruta',
    );
    expect(element().querySelector('.plan-route__map')).toBeNull();
    expect(openLink().href).toContain('openstreetmap.org/directions');
  });

  it('should explain why when the location is denied, without asking for the route', async () => {
    location.precise.mockRejectedValue(new LocationError('denied'));
    await create();
    await click('.plan-route__show button');

    expect(api.route).not.toHaveBeenCalled();
    expect(element().querySelector('.plan-route__error')?.textContent).toContain(
      'No se ha podido obtener tu ubicación',
    );
  });

  it('should not ask twice while the first route is on its way', async () => {
    const pending = new Subject<TravelRoute>();
    api.route.mockReturnValue(pending);
    await create();
    await click('.plan-route__show button');
    expect(element().querySelector('.plan-route__show button')?.hasAttribute('disabled')).toBe(
      true,
    );
    pending.next(routeOf('foot', 60));
    pending.complete();
    await render();
    expect(api.route).toHaveBeenCalledTimes(1);
  });

  it('should open openstreetmap.org in a new tab in the browser, with the start once it is known', async () => {
    await create();
    expect(openLink().target).toBe('_blank');
    expect(openLink().rel).toBe('noopener');
    expect(new URL(openLink().href).searchParams.get('route')).toBe(';40.396,-3.63');
    expect(openLink().textContent).toContain('Abrir la ruta en OpenStreetMap');

    await click('.plan-route__show button');
    expect(new URL(openLink().href).searchParams.get('route')).toBe('40.392,-3.631;40.396,-3.63');
  });

  it('should hand the meeting point to the maps apps of the device with a geo: link in the Android app', async () => {
    platform.isNative.mockReturnValue(true);
    await create();
    expect(openLink().getAttribute('href')).toBe(
      'geo:40.396,-3.63?q=40.396,-3.63(%3Cb%3EPistas%3C%2Fb%3E)',
    );
    expect(openLink().hasAttribute('target')).toBe(false);
    expect(openLink().textContent).toContain('Abrir en la app de mapas');
  });
});
