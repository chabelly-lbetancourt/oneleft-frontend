import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Session } from './session';

/** Pages that need a session: without one, the OneLeft login page, which brings the user back afterwards. */
export const authGuard: CanActivateFn = (_route, state) =>
  inject(Session).isAuthenticated() ||
  inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });

/** Login and registration pages: with a session there is nothing to do there. */
export const guestGuard: CanActivateFn = () =>
  !inject(Session).isAuthenticated() || inject(Router).createUrlTree(['/']);
