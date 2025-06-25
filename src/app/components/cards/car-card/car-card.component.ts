import { Component, Input } from '@angular/core';
import { Car } from '../../../models/Car';

// ==============================================


@Component({
  selector: 'app-car-card',
  imports: [],
  templateUrl: './car-card.component.html',
  standalone: true,
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent {
  @Input() car!: Car;
}
