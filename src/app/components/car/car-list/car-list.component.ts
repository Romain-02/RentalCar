import {Component, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { Cars } from '../../../models/api/Car';
import { CarsService } from '../../../services/api/cars.service';
import {CarCardComponent} from '../../cards/car-card/car-card.component';
import {CarFilterComponent} from '../car-filter/car-filter.component';
import {CommonModule} from '@angular/common';

// ==============================================


@Component({
  selector: 'app-car-list',
  imports: [CommonModule,
    CarCardComponent,
    CarFilterComponent,
  ],
  templateUrl: './car-list.component.html',
  standalone: true,
  styleUrl: './car-list.component.scss'
})
export class CarListComponent implements OnInit {
  private carsService: CarsService = inject(CarsService);

  protected cars: WritableSignal<Cars> = this.carsService.cars;

  public ngOnInit(): void{
    this.carsService.fetchCars();
  }
}
