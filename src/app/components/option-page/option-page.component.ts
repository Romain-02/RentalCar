// src/app/components/option-page/option-page.component.ts
import {Component, computed, inject, OnInit, Signal, WritableSignal} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OptionsService } from '../../services/api/options.service';
import { Options } from '../../models/Option';
import {CarsService} from '../../services/api/cars.service';
import {Car, Cars} from '../../models/api/Car';
import {Guarantees} from '../../models/guarantees';

@Component({
  selector: 'app-options-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './option-page.component.html',
  styleUrl: './option-page.component.scss'
})
export class OptionsPageComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly optionsService: OptionsService = inject(OptionsService);
  private readonly carsService: CarsService = inject(CarsService);

  protected options: WritableSignal<Options> = this.optionsService.options;
  protected cars: WritableSignal<Cars> = this.carsService.cars;
  protected car: Signal<Car> = computed(() => this.cars().find((car) =>
    car.id === this.carId
  ));

  private carId: number | null = null;
  private selectedOptions: number[] = [];
  private loading: boolean = true;
  private error: boolean = false;

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async params => {
      const id: string | null = params.get('carId');
      this.carId = id ? +id : null;

      if (this.carId) {
        this.carsService.fetchCars();
        this.optionsService.fetchAllOptions();
        this.loading = false;
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
    return this.options()
      .filter(option => this.selectedOptions.includes(option.id))
      .reduce((total, option) => total + option.price, 0);
  }
}
