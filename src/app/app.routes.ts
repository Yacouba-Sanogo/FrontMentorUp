import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/parrain-space/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'enfants-list',
    loadComponent: () => import('./features/parrain-space/enfants-list/enfants-list.page').then( m => m.EnfantsListPage)
  },
  {
    path: 'paiement',
    loadComponent: () => import('./features/parrain-space/paiement/paiement.page').then( m => m.PaiementPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/ecole-space/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'depenses-add',
    loadComponent: () => import('./features/ecole-space/depenses-add/depenses-add.page').then( m => m.DepensesAddPage)
  },
];
