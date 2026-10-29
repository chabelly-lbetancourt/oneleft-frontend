import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '@core/auth/auth-guard';

/** Titles are translation keys (see TranslatedTitleStrategy). */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/home/home').then((m) => m.Home),
    title: 'titles.home',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('@features/auth/auth-page').then((m) => m.AuthPage),
    data: { mode: 'login' },
    title: 'titles.login',
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('@features/auth/auth-page').then((m) => m.AuthPage),
    data: { mode: 'register' },
    title: 'titles.register',
  },
  {
    path: 'profile',
    // Without a session, the login page, which comes back here afterwards
    canActivate: [authGuard],
    loadComponent: () => import('@features/profile/profile').then((m) => m.Profile),
    title: 'titles.profile',
  },
  {
    // Notices of nearby plans (HU-006)
    path: 'notifications',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@features/notifications/notification-settings').then((m) => m.NotificationSettings),
    title: 'titles.notifications',
  },
  {
    // Saved alerts (HU-036)
    path: 'notifications/alerts',
    canActivate: [authGuard],
    loadComponent: () => import('@features/notifications/saved-alerts').then((m) => m.SavedAlerts),
    title: 'titles.alerts',
  },
  {
    // Following people (HU-047): my followers, the people I follow and the requests
    path: 'network',
    canActivate: [authGuard],
    loadComponent: () => import('@features/social/network').then((m) => m.Network),
    title: 'titles.network',
  },
  {
    // My data, my consent and deleting my account (HU-045)
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('@features/account/account').then((m) => m.Account),
    title: 'titles.account',
  },
  {
    // The privacy text (HU-045): public, to read before signing up
    path: 'privacy',
    loadComponent: () => import('@features/account/privacy').then((m) => m.Privacy),
    title: 'titles.privacy',
  },
  {
    // The people I blocked (HU-033)
    path: 'blocked',
    canActivate: [authGuard],
    loadComponent: () => import('@features/social/blocked-people').then((m) => m.BlockedPeople),
    title: 'titles.blocked',
  },
  {
    // What the people I follow do in the plans (HU-051)
    path: 'feed',
    canActivate: [authGuard],
    loadComponent: () => import('@features/social/feed').then((m) => m.Feed),
    title: 'titles.feed',
  },
  {
    // My reputation and why it went up or down (HU-009)
    path: 'reputation',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@features/reputation/reputation-page').then((m) => m.ReputationPage),
    title: 'titles.reputation',
  },
  {
    // Someone as I see them, to follow them (HU-047)
    path: 'people/:id',
    canActivate: [authGuard],
    loadComponent: () => import('@features/social/person-page').then((m) => m.PersonPage),
    title: 'titles.person',
  },
  {
    path: 'plans/new',
    canActivate: [authGuard],
    loadComponent: () => import('@features/plans/publish-plan').then((m) => m.PublishPlan),
    title: 'titles.newPlan',
  },
  {
    // Before plans/:id, which would otherwise take "nearby" as an id
    path: 'plans/nearby',
    canActivate: [authGuard],
    loadComponent: () => import('@features/plans/nearby-plans').then((m) => m.NearbyPlans),
    title: 'titles.nearby',
  },
  {
    // The chat of a plan (HU-008): only for its organizer and participants, which the service checks
    path: 'plans/:id/chat',
    canActivate: [authGuard],
    loadComponent: () => import('@features/plans/plan-chat').then((m) => m.PlanChat),
    title: 'titles.chat',
  },
  {
    // Public: a shared link opens it without a session (HU-024)
    path: 'plans/:id',
    loadComponent: () => import('@features/plans/plan-detail').then((m) => m.PlanDetail),
    title: 'titles.plan',
  },
  { path: '**', redirectTo: '' },
];
