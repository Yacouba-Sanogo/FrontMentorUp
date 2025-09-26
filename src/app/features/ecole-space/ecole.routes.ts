import { Routes } from '@angular/router';

// Ce fichier définit les routes pour l'espace de l'École
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', // Par défaut, on va sur le tableau de bord
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    // Charge le composant du tableau de bord
    loadComponent: () =>
      import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  // Nous ajouterons les autres routes (depenses-a-valider) ici plus tard
];
