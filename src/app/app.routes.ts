import { Routes } from '@angular/router';
import {DefaultLayoutComponent} from './components/default-layout/default-layout.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {GuaranteesPageComponent} from './components/rental/guarantees-page/guarantees-page.component';
import {OptionsPageComponent} from './components/rental/option-page/option-page.component';
import {ProfilComponent} from './components/profil/profil.component';
import {ListAgencyComponent} from './components/agency/list-agency/list-agency.component';
import {CarListComponent} from './components/car/car-list/car-list.component';
import {ClientPageComponent} from './components/rental/client-page/client-page.component';
import {WithdrawalFormComponent} from './components/withdrawal-form/withdrawal-form.component';
import {RentalConfirmationComponent} from './components/rental/rental-confirmation/rental-confirmation.component';
import {ReturnCarFormComponent} from './components/return-car-form/return-car-form.component';
import {ClientCreationFormComponent} from './components/client-creation-form/client-creation-form.component';
import {AgentRentalsComponent} from './components/agent-rentals/agent-rentals.component';


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
        path: 'rental/guarantees/:carId',
        title: 'guarantees',
        component: GuaranteesPageComponent
      },
      {
        path: 'returnCar/:rentalId',
        title: 'returnCar',
        component: ReturnCarFormComponent
      },
      {
        path: 'rental/options/:carId',
        title: 'options',
        component: OptionsPageComponent
      },
      {
        path: 'withdrawal/:rentalId',
        title: "Retrait d'une voiture",
        component: WithdrawalFormComponent
      },
      {
        path: 'rental/client-info/:carId',
        title: 'options',
        component: ClientPageComponent
      },
      {
        path: 'rental/confirmation/:carId',
        title: 'confirmation',
        component: RentalConfirmationComponent
      },
      {
        path: 'agent/rentals',
        title: 'Réservations',
        component: AgentRentalsComponent
      },
      {
        path: 'client/creation',
        title: 'Création du compte client',
        component: ClientCreationFormComponent
      }
    ]
  }
];
