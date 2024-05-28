import { Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'appointment',
    pathMatch: 'full'
  },
  {
    path: 'appointment',
    loadChildren: () => import('@appointment/api-appointment').then(m => m.routes)
  }
]

export const routes: Routes = appRoutes;
