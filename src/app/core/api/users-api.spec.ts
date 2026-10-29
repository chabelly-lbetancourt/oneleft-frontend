import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { UsersApi } from './users-api';

describe('UsersApi', () => {
  const base = `${environment.apiUrl}/api/v1/users`;
  let api: UsersApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(UsersApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should call the users service through the gateway', () => {
    api.me().subscribe();
    api.myProfile().subscribe();
    api.catalog().subscribe();
    api.updateMyProfile({ displayName: 'Ana', bio: null, zone: null, hobbies: [] }).subscribe();

    http.expectOne({ method: 'GET', url: `${base}/me` }).flush({});
    http.expectOne({ method: 'GET', url: `${base}/me/profile` }).flush({});
    http.expectOne({ method: 'GET', url: `${base}/activities` }).flush({});
    api.profileOf('ana').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/ana/profile` }).flush({});
    const put = http.expectOne({ method: 'PUT', url: `${base}/me/profile` });
    expect(put.request.body).toEqual({ displayName: 'Ana', bio: null, zone: null, hobbies: [] });
    put.flush({});
  });

  it('should download my data, delete my account and handle my consent (HU-045)', () => {
    api.myData().subscribe((file) => expect(file.size).toBeGreaterThan(0));
    const data = http.expectOne({ method: 'GET', url: `${base}/me/data` });
    expect(data.request.responseType).toBe('blob');
    data.flush(new Blob(['{}']));
    api.deleteMyAccount().subscribe();
    http.expectOne({ method: 'DELETE', url: `${base}/me/account` }).flush(null);
    api.consent().subscribe();
    http.expectOne({ method: 'GET', url: `${base}/me/consent` }).flush({});
    api.acceptConsent('2026-10-25').subscribe();
    const accept = http.expectOne({ method: 'PUT', url: `${base}/me/consent` });
    expect(accept.request.body).toEqual({ version: '2026-10-25' });
    accept.flush({});
  });
});
