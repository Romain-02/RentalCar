import { Routes } from '@angular/router';
import {DefaultLayoutComponent} from './components/default-layout/default-layout.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {CarListComponent} from './components/car-list/car-list.component';
import {ProfilComponent} from './components/profil/profil.component';


export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        title: 'Accueil',
        component: HomePageComponent
      },
      {
        path: 'login',
        title: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        title: 'register',
        component: RegisterComponent
      },
      {
        path: 'cars',
        title: 'cars',
        component: CarListComponent
      },
      {
        path: 'profil',
        title: 'profil',
        component: ProfilComponent
      }
    ]
  }
];
