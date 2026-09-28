import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'OneLeft · Planes para ya',
  },
  {
    path: 'perfil',
    // Si no hay sesión, redirige al login de Keycloak y vuelve aquí después
    canActivate: [autoLoginPartialRoutesGuard],
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
    title: 'OneLeft · Mi perfil',
  },
  {
    path: 'planes/nuevo',
    canActivate: [autoLoginPartialRoutesGuard],
    loadComponent: () => import('./features/plans/publish-plan').then((m) => m.PublishPlan),
    title: 'OneLeft · Publicar un plan',
  },
  {
    path: 'planes/:id',
    canActivate: [autoLoginPartialRoutesGuard],
    loadComponent: () => import('./features/plans/plan-detail').then((m) => m.PlanDetail),
    title: 'OneLeft · Plan',
  },
  { path: '**', redirectTo: '' },
];
