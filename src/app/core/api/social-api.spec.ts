import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { SocialApi } from './social-api';

describe('SocialApi', () => {
  const base = `${environment.apiUrl}/api/v1/social`;
  let api: SocialApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(SocialApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should call the endpoints of the social service', () => {
    api.myAccount().subscribe();
    http.expectOne({ method: 'GET', url: `${base}/me` }).flush({});
    api.changeVisibility('PUBLIC').subscribe();
    const visibility = http.expectOne({ method: 'PUT', url: `${base}/me/visibility` });
    expect(visibility.request.body).toEqual({ visibility: 'PUBLIC' });
    visibility.flush({});
    api.person('ana').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/people/ana` }).flush({});
    api.follow('ana').subscribe();
    http.expectOne({ method: 'PUT', url: `${base}/me/following/ana` }).flush({});
    api.unfollow('ana').subscribe();
    http.expectOne({ method: 'DELETE', url: `${base}/me/following/ana` }).flush(null);
    api.accept('lucia').subscribe();
    http.expectOne({ method: 'POST', url: `${base}/me/requests/lucia/accept` }).flush({});
    api.decline('lucia').subscribe();
    http.expectOne({ method: 'DELETE', url: `${base}/me/requests/lucia` }).flush(null);
    api.removeFollower('lucia').subscribe();
    http.expectOne({ method: 'DELETE', url: `${base}/me/followers/lucia` }).flush(null);
  });

  it('should page every list', () => {
    api.list('followers').subscribe();
    http.expectOne(`${base}/me/followers?page=0&size=20`).flush({ items: [] });
    api.list('following', 1).subscribe();
    http.expectOne(`${base}/me/following?page=1&size=20`).flush({ items: [] });
    api.list('requests').subscribe();
    http.expectOne(`${base}/me/requests?page=0&size=20`).flush({ items: [] });
    api.list('sent', 0, 5).subscribe();
    http.expectOne(`${base}/me/requests/sent?page=0&size=5`).flush({ items: [] });
  });
});
