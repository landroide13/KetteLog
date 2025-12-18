import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'session',
    loadComponent: () => import('./pages/session/session.page').then( m => m.SessionPage)
  },
  {
    path: 'session-details',
    loadComponent: () => import('./pages/session-details/session-details.page').then( m => m.SessionDetailsPage)
  },
];
