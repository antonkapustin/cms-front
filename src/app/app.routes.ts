import { Routes } from '@angular/router';
import { Login } from './page/login/login';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    loadComponent: () => import('./page/main/main').then((mod) => mod.Main),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./page/products/products').then((mod) => mod.Products),
  },
];
