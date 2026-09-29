import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { FakeSession } from '../../../testing/fake-session';
import { authGuard, guestGuard } from './auth-guard';
import { Session } from './session';

describe('auth guards', () => {
  let session: FakeSession;
  const run = (guard: typeof authGuard, url = '/plans/new') =>
    TestBed.runInInjectionContext(() =>
      guard({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot),
    );

  beforeEach(() => {
    session = new FakeSession();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: Session, useValue: session }],
    });
  });

  it('should send the user to the login page and remember where they were going', () => {
    const result = run(authGuard) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/login?returnUrl=%2Fplans%2Fnew');
    session.signIn('Ana');
    expect(run(authGuard)).toBe(true);
  });

  it('should keep people with a session away from the login and registration pages', () => {
    expect(run(guestGuard)).toBe(true);
    session.signIn('Ana');
    expect(TestBed.inject(Router).serializeUrl(run(guestGuard) as UrlTree)).toBe('/');
  });
});
