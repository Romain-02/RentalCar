import {Component, effect, inject, Input, OnChanges, OnInit, signal, WritableSignal} from '@angular/core';
import { Cars } from '../../../models/api/Car';
import { CarsService } from '../../../services/api/cars.service';
import {CarCardComponent} from '../../cards/car-card/car-card.component';
import {CarFilterComponent} from '../car-filter/car-filter.component';
import {CommonModule} from '@angular/common';
import {sign} from 'node:crypto';

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
export class CarListComponent implements OnInit, OnChanges {
  @Input()
  public parentCars: Cars | undefined = undefined;
  private carsService: CarsService = inject(CarsService);

  protected cars: WritableSignal<Cars> = signal([]);

  public ngOnInit(): void{
    if(!this.parentCars){
      this.cars = this.carsService.cars
      this.carsService.fetchCars();
    }else{
      this.cars.set(this.parentCars)
    }
  }

  ngOnChanges(): void {
    if (this.parentCars) {
      this.cars.set(this.parentCars);
    }
  }
}
