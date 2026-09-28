import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { UsersApi } from './users-api';

describe('UsersApi', () => {
  const base = `${environment.apiUrl}/api/v1/users`;
  let api: UsersApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(UsersApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should call the users service through the gateway', () => {
    api.me().subscribe();
    api.myProfile().subscribe();
    api.catalog().subscribe();
    api.updateMyProfile({ displayName: 'Ana', zone: null, hobbies: [] }).subscribe();

    http.expectOne({ method: 'GET', url: `${base}/me` }).flush({});
    http.expectOne({ method: 'GET', url: `${base}/me/profile` }).flush({});
    http.expectOne({ method: 'GET', url: `${base}/activities` }).flush({});
    const put = http.expectOne({ method: 'PUT', url: `${base}/me/profile` });
    expect(put.request.body).toEqual({ displayName: 'Ana', zone: null, hobbies: [] });
    put.flush({});
  });
});
