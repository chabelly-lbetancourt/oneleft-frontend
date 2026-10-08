import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { PlansApi } from './plans-api';

describe('PlansApi', () => {
  it('should call the plans service through the gateway', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const api = TestBed.inject(PlansApi);
    const http = TestBed.inject(HttpTestingController);
    const base = `${environment.apiUrl}/api/v1/plans`;
    const plan = {
      activity: 'PADEL',
      title: 'Pádel',
      description: null,
      startsAt: '2026-09-28T18:00:00Z',
      spots: 1,
      level: null,
      meetingPoint: { name: 'Pistas', latitude: 40.39, longitude: -3.62 },
    };

    api.publish(plan).subscribe();
    api.plan('abc').subscribe();
    api.mine().subscribe();
    const forecasts: unknown[] = [];
    api.weather('abc').subscribe((forecast) => forecasts.push(forecast));
    api.weather('abc').subscribe((forecast) => forecasts.push(forecast));
    api.join('abc').subscribe();

    const post = http.expectOne({ method: 'POST', url: base });
    expect(post.request.body).toEqual(plan);
    post.flush({});
    http.expectOne({ method: 'GET', url: `${base}/abc` }).flush({});
    http.expectOne({ method: 'GET', url: `${base}/mine` }).flush([]);
    http.expectOne({ method: 'POST', url: `${base}/abc/participants` }).flush({});
    // Free mode and the free people near my plan (HU-035)
    api.myAvailability().subscribe();
    http.expectOne({ method: 'GET', url: `${base}/availability/me` }).flush(null);
    const request = { hours: 2, latitude: 40.39, longitude: -3.63, interests: [] };
    api.startAvailability(request).subscribe();
    const put = http.expectOne({ method: 'PUT', url: `${base}/availability/me` });
    expect(put.request.body).toEqual(request);
    put.flush({});
    api.stopAvailability().subscribe();
    http.expectOne({ method: 'DELETE', url: `${base}/availability/me` }).flush(null);
    api.freePeople('abc').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/abc/free-people` }).flush([]);
    // A forecast, and none (204 or an error) without breaking the page (HU-026)
    const weather = http.match({ method: 'GET', url: `${base}/abc/weather` });
    weather[0].flush({ temperature: 17 });
    weather[1].flush('down', { status: 503, statusText: 'Service Unavailable' });
    expect(forecasts).toEqual([{ temperature: 17 }, null]);
    expect(api.eventsStreamUrl()).toBe(`${base}/events/stream`);
    http.verify();
  });

  it('should read a shared plan without a session and build its share link (HU-024)', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const api = TestBed.inject(PlansApi);
    const http = TestBed.inject(HttpTestingController);
    let plan: unknown;

    api.publicPlan('abc').subscribe((shared) => (plan = shared));
    http
      .expectOne({ method: 'GET', url: `${environment.apiUrl}/api/v1/public/plans/abc` })
      .flush({ id: 'abc', title: 'Pádel', freeSpots: 1 });

    expect(plan).toEqual({
      id: 'abc',
      title: 'Pádel',
      freeSpots: 1,
      organizerId: '',
      organizerName: '',
      publishedAt: '',
      participants: [],
      waitlist: [],
    });
    expect(api.shareUrl('abc')).toBe(
      new URL(`${environment.apiUrl}/share/plans/abc`, location.origin).href,
    );
    http.verify();
  });

  it('should build the nearby URLs with repeated activities', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const api = TestBed.inject(PlansApi);
    const base = `${environment.apiUrl}/api/v1/plans`;
    expect(api.nearbyUrl()).toBe(`${base}/nearby`);
    expect(
      api.nearbyStreamUrl({
        latitude: 40.39,
        longitude: -3.63,
        radius: 1000,
        activities: [],
        withinHours: 12,
      }),
    ).toBe(`${base}/nearby/stream?latitude=40.39&longitude=-3.63&radius=1000&withinHours=12`);
  });
});
