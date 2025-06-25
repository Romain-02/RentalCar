import {Component, inject, OnInit} from '@angular/core';
import { Cars } from '../../models/Car';
import { CarsService } from '../../services/cars.service';
import {CarCardComponent} from '../cards/car-card/car-card.component';

// ==============================================


@Component({
  selector: 'app-car-list',
  imports: [
    CarCardComponent
  ],
  templateUrl: './car-list.component.html',
  standalone: true,
  styleUrl: './car-list.component.scss'
})
export class CarListComponent implements OnInit {
  protected cars: Cars = [];
  private carsService: CarsService = inject(CarsService);

  public async ngOnInit(): Promise<void> {
    this.cars = await this.carsService.getAllCars();
  }

}
