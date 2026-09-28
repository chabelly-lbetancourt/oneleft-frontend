import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { PlansApi } from './plans-api';

describe('PlansApi', () => {
  it('should call the plans service through the gateway', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    const api = TestBed.inject(PlansApi);
    const http = TestBed.inject(HttpTestingController);
    const base = `${environment.apiUrl}/api/v1/plans`;
    const plan = {
      activity: 'PADEL', title: 'Pádel', description: null, startsAt: '2026-09-28T18:00:00Z', spots: 1, level: null,
      meetingPoint: { name: 'Pistas', latitude: 40.39, longitude: -3.62 },
    };

    api.publish(plan).subscribe();
    api.plan('abc').subscribe();
    api.mine().subscribe();

    const post = http.expectOne({ method: 'POST', url: base });
    expect(post.request.body).toEqual(plan);
    post.flush({});
    http.expectOne({ method: 'GET', url: `${base}/abc` }).flush({});
    http.expectOne({ method: 'GET', url: `${base}/mine` }).flush([]);
    http.verify();
  });
});
