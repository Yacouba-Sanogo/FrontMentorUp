import { Routes } from '@angular/router';

// Ce fichier définit les routes pour l'espace du Parrain
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
  // Nous ajouterons les autres routes (enfants-list, paiement) ici plus tard
];
