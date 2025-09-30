import { Routes } from '@angular/router';

// CORRECTION : On exporte la constante sous le nom 'PARRAIN_ROUTES'
export const PARRAIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    // La page n'existe pas encore, mais la route est prête et correcte
    loadComponent: () => import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
];

