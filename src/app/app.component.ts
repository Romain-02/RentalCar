import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TestNgPrimeComponent} from './components/test-ng-prime/test-ng-prime.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestNgPrimeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rentalCarLensClient';
}
