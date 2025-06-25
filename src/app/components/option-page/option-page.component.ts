// src/app/components/option-page/option-page.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OptionsService } from '../../services/options.service';
import { Option, Options } from '../../models/Option';
import { Car } from '../../models/Car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-options-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './option-page.component.html',
  styleUrl: './option-page.component.scss'
})
export class OptionsPageComponent implements OnInit {
  carId: number | null = null;
  car: Car | null = null;
  options: Options = [];
  selectedOptions: number[] = [];
  loading = true;
  error = false;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly optionsService = inject(OptionsService);
  private readonly carsService = inject(CarsService);

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async params => {
      const id = params.get('carId');
      this.carId = id ? +id : null;

      if (this.carId) {
        try {
          // Récupérer les informations de la voiture
          const cars = await this.carsService.getAllCars();
          this.car = cars.find(car => car.id === this.carId) || null;

          // Récupérer toutes les options disponibles
          this.options = await this.optionsService.getAllOptions();
          this.loading = false;
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
          this.error = true;
          this.loading = false;
        }
      }
    });
  }

  toggleOption(optionId: number): void {
    const index = this.selectedOptions.indexOf(optionId);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(optionId);
    }
  }

  isOptionSelected(optionId: number): boolean {
    return this.selectedOptions.includes(optionId);
  }

  getTotalPrice(): number {
    return this.options
      .filter(option => this.selectedOptions.includes(option.id))
      .reduce((total, option) => total + option.price, 0);
  }
}
