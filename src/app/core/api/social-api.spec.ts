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
    api.listOf('ana', 'followers').subscribe();
    http.expectOne(`${base}/people/ana/followers?page=0&size=20`).flush({ items: [] });
    api.listOf('ana', 'following', 2).subscribe();
    http.expectOne(`${base}/people/ana/following?page=2&size=20`).flush({ items: [] });
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

  it('should keep my activity private when I want', () => {
    api.changeFeedAudience('NOBODY').subscribe();
    const audience = http.expectOne({ method: 'PUT', url: `${base}/me/feed-audience` });
    expect(audience.request.body).toEqual({ feedAudience: 'NOBODY' });
    audience.flush({});
    api.hiddenPlan('p1').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/me/hidden-plans/p1` }).flush({});
    api.hidePlan('p1').subscribe();
    http.expectOne({ method: 'PUT', url: `${base}/me/hidden-plans/p1` }).flush(null);
    api.showPlan('p1').subscribe();
    http.expectOne({ method: 'DELETE', url: `${base}/me/hidden-plans/p1` }).flush(null);
  });

  it('should page my feed', () => {
    api.feed().subscribe();
    http.expectOne({ method: 'GET', url: `${base}/me/feed?page=0&size=20` }).flush({ items: [] });
    api.feed(2, 10).subscribe();
    http.expectOne(`${base}/me/feed?page=2&size=10`).flush({ items: [] });
  });
});
