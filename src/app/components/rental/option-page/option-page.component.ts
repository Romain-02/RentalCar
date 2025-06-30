// src/app/components/option-page/option-page.component.ts
import {Component, computed, inject, OnInit, Signal, WritableSignal} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OptionsService } from '../../../services/api/options.service';
import {DEFAULT_OPTION, Options} from '../../../models/api/Option';
import {CarsService} from '../../../services/api/cars.service';
import {Car, Cars} from '../../../models/api/Car';
import {RentalsService} from '../../../services/api/rentals.service';

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
  private readonly rentalsService: RentalsService = inject(RentalsService);

  protected options: WritableSignal<Options> = this.optionsService.options;
  protected cars: WritableSignal<Cars> = this.carsService.cars;
  protected car: Signal<Car | undefined> = computed(() => this.cars().find((car) =>
    car.id === this.carId
  ));

  protected carId: number | null = null;
  protected selectedOptions: number[] = [];
  protected loading: boolean = true;
  protected error: boolean = false;

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
    const index: number = this.selectedOptions.indexOf(optionId);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(optionId);
    }
    const options: Options = this.selectedOptions.map((selectedOptionId) =>
      this.options().find((option) => selectedOptionId === option.id) ?? DEFAULT_OPTION
    )
    this.rentalsService.updateRentalBody({options: options});
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
