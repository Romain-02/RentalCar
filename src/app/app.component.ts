import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListAgencyComponent} from './components/list-agency/list-agency.component';
import {CarListComponent} from './components/car-list/car-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarListComponent, ListAgencyComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rentalCarLensClient';
}
