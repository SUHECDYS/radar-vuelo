import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-hotspots/dashboard-hotspots.page').then(m => m.DashboardHotspotsPage)
  },
  {
    path: 'aeropuerto/:icao',
    loadComponent: () => import('./pages/aeropuerto-panel/aeropuerto-panel.page').then(m => m.AeropuertoPanelPage)
  },
  {
    path: 'vuelo/:id',
    loadComponent: () => import('./pages/vuelo-detalle/vuelo-detalle.page').then(m => m.VueloDetallePage)
  }
];