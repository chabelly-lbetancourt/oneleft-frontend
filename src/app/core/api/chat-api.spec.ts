import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ChatApi } from './chat-api';

describe('ChatApi', () => {
  it('should read the latest messages of a chat and the page before a moment (HU-008)', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const api = TestBed.inject(ChatApi);
    const http = TestBed.inject(HttpTestingController);
    const url = `${environment.apiUrl}/api/v1/chats/plan-1/messages`;

    api.history('plan-1').subscribe();
    api.history('plan-1', '2026-10-12T18:00:00Z').subscribe();

    const [latest, older] = http.match((request) => request.url === url);
    expect(latest.request.params.keys()).toEqual([]);
    expect(older.request.params.get('before')).toBe('2026-10-12T18:00:00Z');
    latest.flush({});
    older.flush({});
    http.verify();
  });
});
