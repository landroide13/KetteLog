import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children:[
          {
            path: '',
            loadComponent: () => import('../tab1/tab1.page').then((m) => m.Tab1Page),
          },
          {
            path: 'session',
            loadComponent: () => import('../pages/session/session.page').then((m) => m.SessionPage),
          }
        ]
      },
      {
        path: 'tab2',
        children:[
          {
            path:'',
            loadComponent: () => import('../tab2/tab2.page').then((m) => m.Tab2Page),
          },
          {
            path: 'session-details/:id',
            loadComponent: () => import('../pages/session-details/session-details.page').then((m) => m.SessionDetailsPage),
          }
        ]
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
