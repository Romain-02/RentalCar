import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CarListComponent} from './components/car-list/car-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rentalCarLensClient';
}
