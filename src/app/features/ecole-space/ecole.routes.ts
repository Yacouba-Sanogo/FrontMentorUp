/*
  =====================================================================================
  FICHIER DE ROUTAGE POUR L'ESPACE ÉCOLE
  -------------------------------------------------------------------------------------
  Ce fichier définit toutes les "URL" ou "routes" spécifiques à l'espace école.
  - Le chemin '' (vide) correspond à la racine de l'espace école, par exemple : /ecole/
  - On lui dit de charger la "DashboardPage" lorsqu'on accède à cette route.
  - C'est ce qui permet à l'application d'afficher le bon composant
    quand l'utilisateur est redirigé après la connexion.
  =====================================================================================
*/
import { Routes } from '@angular/router';

// On importe notre nouvelle page de dashboard
import { DashboardPage } from './dashboard/dashboard.page';

export const ECOLE_ROUTES: Routes = [
   {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  // On définit maintenant la route '/ecole/dashboard'
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    // Quand l'URL est '/ecole' ou '/ecole/' (le chemin est vide ici)
    path: '',
    
    // On charge le composant DashboardPage.
    component: DashboardPage,
  },
  // On pourrait ajouter d'autres routes spécifiques à l'école ici, par exemple :
  // {
  //   path: 'eleves', // correspondrait à /ecole/eleves
  //   loadComponent: () => import('./eleves-list/eleves-list.page').then(m => m.ElevesListPage)
  // }
];

