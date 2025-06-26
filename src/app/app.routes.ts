import { Routes } from '@angular/router';
import {DefaultLayoutComponent} from './components/default-layout/default-layout.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {GuaranteesPageComponent} from './components/guarantees-page/guarantees-page.component';
import {OptionsPageComponent} from './components/option-page/option-page.component';
import {ProfilComponent} from './components/profil/profil.component';
import {ListAgencyComponent} from './components/agency/list-agency/list-agency.component';
import {CarListComponent} from './components/car/car-list/car-list.component';


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
      },
      {
        path: 'list-agency',
        title: 'list-agency',
        component: ListAgencyComponent
      },
      {
        path: 'guarantees/:carId',
        title: 'guarantees',
        component: GuaranteesPageComponent
      },
      {
        path: 'options/:carId',
        title: 'options',
        component: OptionsPageComponent
      }
    ]
  }
];
