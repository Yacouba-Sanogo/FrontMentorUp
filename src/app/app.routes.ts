import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login', // Redirige vers la page de login par défaut
    pathMatch: 'full',
  },
  {
    path: 'auth',
    // Lazy loading pour le module d'authentification
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'parrain',
    // Lazy loading pour l'espace du parrain, protégé par le guard
    loadChildren: () => import('./features/parrain-space/parrain.routes').then((m) => m.routes),
    canActivate: [authGuard], // Seuls les utilisateurs connectés peuvent accéder
  },
  {
    path: 'ecole',
    // Lazy loading pour l'espace de l'école, protégé par le guard
    loadChildren: () => import('./features/ecole-space/ecole.routes').then((m) => m.routes),
    canActivate: [authGuard], // Seuls les utilisateurs connectés peuvent accéder
  },
  // Ajoutez d'autres routes de haut niveau ici si nécessaire
];
