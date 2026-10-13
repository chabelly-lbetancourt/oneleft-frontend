import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
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
    expect(api.scoresUrl()).toBe(`${base}/scores`);
    http.verify();
  });
});
