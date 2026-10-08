import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth-guard';

/** Titles are translation keys (see TranslatedTitleStrategy). */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'titles.home',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/auth-page').then((m) => m.AuthPage),
    data: { mode: 'login' },
    title: 'titles.login',
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/auth-page').then((m) => m.AuthPage),
    data: { mode: 'register' },
    title: 'titles.register',
  },
  {
    path: 'profile',
    // Without a session, the login page, which comes back here afterwards
    canActivate: [authGuard],
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
    title: 'titles.profile',
  },
  {
    // Notices of nearby plans (HU-006)
    path: 'notifications',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/notifications/notification-settings').then((m) => m.NotificationSettings),
    title: 'titles.notifications',
  },
  {
    // Saved alerts (HU-036)
    path: 'notifications/alerts',
    canActivate: [authGuard],
    loadComponent: () => import('./features/notifications/saved-alerts').then((m) => m.SavedAlerts),
    title: 'titles.alerts',
  },
  {
    path: 'plans/new',
    canActivate: [authGuard],
    loadComponent: () => import('./features/plans/publish-plan').then((m) => m.PublishPlan),
    title: 'titles.newPlan',
  },
  {
    // Before plans/:id, which would otherwise take "nearby" as an id
    path: 'plans/nearby',
    canActivate: [authGuard],
    loadComponent: () => import('./features/plans/nearby-plans').then((m) => m.NearbyPlans),
    title: 'titles.nearby',
  },
  {
    // Public: a shared link opens it without a session (HU-024)
    path: 'plans/:id',
    loadComponent: () => import('./features/plans/plan-detail').then((m) => m.PlanDetail),
    title: 'titles.plan',
  },
  { path: '**', redirectTo: '' },
];
