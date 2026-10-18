import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { ReputationApi } from './reputation-api';

describe('ReputationApi', () => {
  const base = `${environment.apiUrl}/api/v1/reputation`;

  it('should call the endpoints of the reputation service', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const api = TestBed.inject(ReputationApi);
    const http = TestBed.inject(HttpTestingController);

    api.mine().subscribe();
    http.expectOne({ method: 'GET', url: `${base}/me` }).flush({});
    api.ledger(1).subscribe();
    http.expectOne(`${base}/me/ledger?page=1&size=20`).flush({ items: [] });
    api.of('ana').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/people/ana` }).flush({});
    api.myBadges().subscribe();
    http.expectOne({ method: 'GET', url: `${base}/me/badges` }).flush([]);
    api.badgesOf('ana').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/people/ana/badges` }).flush([]);
    api.statsOf('ana').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/people/ana/stats` }).flush({});
    expect(api.scoresUrl()).toBe(`${base}/scores`);
    // Kudos (HU-060)
    api.planKudos('p1').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/plans/p1/kudos` }).flush({ people: [] });
    api.giveKudos('p1', 'ana', 'GOOD_VIBES').subscribe();
    const give = http.expectOne({ method: 'POST', url: `${base}/plans/p1/kudos` });
    expect(give.request.body).toEqual({ receiverId: 'ana', kind: 'GOOD_VIBES' });
    give.flush({});
    api.kudosOf('ana').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/people/ana/kudos` }).flush([]);
    http.verify();
  });
});
