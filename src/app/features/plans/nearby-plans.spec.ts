import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Subject } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { ApproximateLocation, LocationError } from '../../core/geo/approximate-location';
import { NearbyStream } from '../../core/realtime/nearby-stream';
import { NearbyPlan, NearbyPlanEvent, NearbyQuery } from '../../shared/model/nearby';
import { NearbyMap } from './nearby-map';
import { NearbyPlans } from './nearby-plans';

@Component({ selector: 'app-nearby-map', template: '' })
class FakeMap {
  readonly center = input.required<unknown>();
  readonly radius = input.required<number>();
  readonly plans = input<NearbyPlan[]>([]);
}

const nearby = (id: string, activity: string, distanceMeters: number, freeSpots = 1): NearbyPlan => ({
  distanceMeters,
  plan: {
    id,
    organizerId: 'org',
    organizerName: 'Ana',
    activity,
    title: `Plan ${id}`,
    description: null,
    meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.396, longitude: -3.63 },
    startsAt: new Date(Date.now() + 45 * 60_000).toISOString(),
    spots: 2,
    occupied: 0,
    freeSpots,
    level: null,
    status: 'OPEN',
    publishedAt: new Date().toISOString(),
  },
});

describe('NearbyPlans', () => {
  let fixture: ComponentFixture<NearbyPlans>;
  let component: NearbyPlans & Record<string, unknown>;
  let http: HttpTestingController;
  let events: Subject<NearbyPlanEvent>;
  const location = { current: vi.fn() };
  const stream = { watch: vi.fn() };
  const element = () => fixture.nativeElement as HTMLElement;
  const set = (name: string, value: unknown) => (component[name] as { set: (v: unknown) => void }).set(value);
  // whenStable() would wait for the pending HTTP requests, which the tests answer themselves
  const render = async () => {
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();
  };
  const nearbyRequest = (): TestRequest => http.expectOne((request) => request.url.endsWith('/api/v1/plans/nearby'));

  const create = async () => {
    fixture = TestBed.createComponent(NearbyPlans);
    component = fixture.componentInstance as NearbyPlans & Record<string, unknown>;
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    events = new Subject();
    stream.watch.mockImplementation(() => events.asObservable());
    location.current.mockResolvedValue({ latitude: 40.391, longitude: -3.629 });
    TestBed.configureTestingModule({
      imports: [NearbyPlans, translocoTesting()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ApproximateLocation, useValue: location },
        { provide: NearbyStream, useValue: stream },
      ],
    });
    TestBed.overrideComponent(NearbyPlans, { remove: { imports: [NearbyMap] }, add: { imports: [FakeMap] } });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should search around the user with the default filters and list the plans', async () => {
    await create();
    const request = nearbyRequest();
    expect(location.current).toHaveBeenCalledWith(3);
    expect(request.request.params.get('latitude')).toBe('40.391');
    expect(request.request.params.get('radius')).toBe('5000');
    expect(request.request.params.get('withinHours')).toBe('12');
    expect(request.request.params.has('activity')).toBe(false);
    request.flush([nearby('a', 'PADEL', 34), nearby('b', 'BOARD_GAMES', 1234, 2)]);
    await render();

    const cards = element().querySelectorAll('.nearby-card');
    expect(cards.length).toBe(2);
    expect(cards[0].getAttribute('href')).toBe('/plans/a');
    expect(cards[0].textContent).toContain('Pádel');
    expect(cards[0].textContent).toContain('Falta 1');
    expect(cards[1].querySelector('.nearby-distance')?.textContent).toBe('1,2 km');
    expect(cards[1].textContent).toContain('Faltan 2');
    expect(element().querySelector('.results-count')?.textContent).toContain('2 planes a menos de 5 km');
  });

  it('should search again and reopen the stream when a filter changes', async () => {
    await create();
    nearbyRequest().flush([]);
    await render();
    expect(element().querySelector('.empty')).not.toBeNull();
    const firstQuery = stream.watch.mock.calls[0][0] as NearbyQuery;
    expect(firstQuery.radius).toBe(5000);

    set('radius', 1000);
    set('withinHours', 3);
    set('activities', ['PADEL', 'TENNIS']);
    await render();

    const request = nearbyRequest();
    expect(request.request.params.get('radius')).toBe('1000');
    expect(request.request.params.get('withinHours')).toBe('3');
    expect(request.request.params.getAll('activity')).toEqual(['PADEL', 'TENNIS']);
    request.flush([]);
    expect(stream.watch).toHaveBeenLastCalledWith(
      expect.objectContaining({ radius: 1000, withinHours: 3, activities: ['PADEL', 'TENNIS'] }),
    );
    expect(events.observed).toBe(true);
  });

  it('should announce a new plan in real time and reload the list', async () => {
    await create();
    nearbyRequest().flush([]);
    await render();

    events.next({ planId: 'p9', activity: 'PADEL', startsAt: '', freeSpots: 2, distanceMeters: 603 });
    await render();

    const notice = element().querySelector('.new-plan-message');
    expect(notice?.textContent).toContain('Nuevo plan cerca: Pádel a 600 m');
    expect(notice?.querySelector('a')?.getAttribute('href')).toBe('/plans/p9');
    nearbyRequest().flush([nearby('p9', 'PADEL', 603, 2)]);
    await render();
    expect(element().querySelectorAll('.nearby-card').length).toBe(1);
  });

  it('should explain a denied location and try again', async () => {
    location.current.mockRejectedValueOnce(new LocationError('denied'));
    await create();
    expect(element().querySelector('.location-error')?.textContent).toContain('No se ha podido obtener tu ubicación');
    expect(stream.watch).not.toHaveBeenCalled();

    (element().querySelector('.location-error p-button button') as HTMLButtonElement).click();
    await render();
    nearbyRequest().flush([]);
    await render();
    expect(element().querySelector('.location-error')).toBeNull();

    location.current.mockRejectedValueOnce(new Error('unexpected'));
    await (component['locate'] as () => Promise<void>)();
    await render();
    expect(element().querySelector('.location-error')?.textContent).toContain('No se ha podido obtener tu ubicación');
  });

  it('should show an error when the plans cannot be loaded', async () => {
    await create();
    nearbyRequest().flush({}, { status: 500, statusText: 'Server error' });
    await render();
    expect(element().querySelector('.results-error')).not.toBeNull();
  });

  it('should show the plans on the map', async () => {
    await create();
    nearbyRequest().flush([nearby('a', 'PADEL', 34)]);
    set('view', 'map');
    await render();
    const map = fixture.debugElement.query((debug) => debug.componentInstance instanceof FakeMap);
    const instance = map.componentInstance as FakeMap;
    expect(instance.center()).toEqual({ latitude: 40.391, longitude: -3.629 });
    expect(instance.radius()).toBe(5000);
    expect(instance.plans().length).toBe(1);
    expect(element().querySelector('.nearby-card')).toBeNull();
  });

  it('should label the filters in the active language', async () => {
    await create();
    nearbyRequest().flush([]);
    TestBed.inject(TranslocoService).setActiveLang('en');
    await render();
    const labels = (name: string) => (component[name] as () => { label: string }[])().map((option) => option.label);
    expect(labels('windowOptions')).toEqual(['1 h', '3 h', '12 h']);
    expect(labels('viewOptions')).toEqual(['List', 'Map']);
    expect(labels('radiusOptions')).toEqual(['1 km', '3 km', '5 km', '10 km']);
    expect((component['activityOptions'] as () => { name: string }[])()[7].name).toBe('Board games');
    expect(element().querySelector('h1')?.textContent).toContain('Nearby plans');
  });
});
