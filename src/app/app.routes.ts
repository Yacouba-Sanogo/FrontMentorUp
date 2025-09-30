import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

// Ce fichier est le chef d'orchestre. Il ne change pas.
export const routes: Routes = [
  {
    path: 'auth',
    // Il attend une variable nommée AUTH_ROUTES du fichier auth.routes.ts
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'parrain',
    // Il attend une variable nommée PARRAIN_ROUTES du fichier parrain.routes.ts
    loadChildren: () => import('./features/parrain-space/parrain.routes').then((m) => m.PARRAIN_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'ecole',
    // Il attend une variable nommée ECOLE_ROUTES du fichier ecole.routes.ts
    loadChildren: () => import('./features/ecole-space/ecole.routes').then((m) => m.ECOLE_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];

