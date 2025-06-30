import { Component, Input } from '@angular/core';
import { Car } from '../../../models/api/Car';
import {RouterLink} from '@angular/router';
import {CarStatePipe} from '../../../pipes/car-state.pipe';

// ==============================================


@Component({
  selector: 'app-car-card',
  imports: [
    RouterLink,
    CarStatePipe
  ],
  templateUrl: './car-card.component.html',
  standalone: true,
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent {
  @Input() car!: Car;
}
