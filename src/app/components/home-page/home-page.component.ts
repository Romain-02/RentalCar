import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { CarsService } from '../../services/api/cars.service';
import { Cars } from '../../models/api/Car';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    NgForOf
  ]
})
export class HomePageComponent implements OnInit {
  private carsService: CarsService = inject(CarsService);

  protected cars: WritableSignal<Cars> = this.carsService.cars;

  private currentIndex = 0;

  public get transform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  public ngOnInit(): void {
    this.carsService.fetchCars();
  }

  public nextSlide(): void {
    if (this.currentIndex < this.cars().length - 1) {
      this.currentIndex++;
    }
  }

  public prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
