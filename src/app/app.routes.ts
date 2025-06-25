import { Routes } from '@angular/router';

// ==============================================


export const routes: Routes = [
  {
    path: 'cars',
    loadComponent: () => import('./components/car/car-list/car-list.component').then((x) => x.CarListComponent),
  }
];
