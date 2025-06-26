import { Component, Input } from '@angular/core';
import { Car } from '../../../models/api/Car';
import {RouterLink} from '@angular/router';

// ==============================================


@Component({
  selector: 'app-car-card',
  imports: [
    RouterLink
  ],
  templateUrl: './car-card.component.html',
  standalone: true,
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent {
  @Input() car!: Car;
}
