import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListAgencyComponent} from './components/list-agency/list-agency.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListAgencyComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rentalCarLensClient';
}
