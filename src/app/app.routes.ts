import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

/** Titles are translation keys (see TranslatedTitleStrategy). */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'titles.home',
  },
  {
    path: 'profile',
    // Without a session, redirects to the Keycloak login and comes back here afterwards
    canActivate: [autoLoginPartialRoutesGuard],
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
    title: 'titles.profile',
  },
  {
    path: 'plans/new',
    canActivate: [autoLoginPartialRoutesGuard],
    loadComponent: () => import('./features/plans/publish-plan').then((m) => m.PublishPlan),
    title: 'titles.newPlan',
  },
  {
    // Before plans/:id, which would otherwise take "nearby" as an id
    path: 'plans/nearby',
    canActivate: [autoLoginPartialRoutesGuard],
    loadComponent: () => import('./features/plans/nearby-plans').then((m) => m.NearbyPlans),
    title: 'titles.nearby',
  },
  {
    path: 'plans/:id',
    canActivate: [autoLoginPartialRoutesGuard],
    loadComponent: () => import('./features/plans/plan-detail').then((m) => m.PlanDetail),
    title: 'titles.plan',
  },
  { path: '**', redirectTo: '' },
];
