import { Routes } from '@angular/router';
import {DefaultLayoutComponent} from './components/default-layout/default-layout.component';
import {HomePageComponent} from './components/home-page/home-page.component';


export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        title: 'Accueil',
        component: HomePageComponent
      }
    ]
  }
];
