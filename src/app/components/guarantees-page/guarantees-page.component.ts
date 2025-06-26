import {Component, inject, OnInit, computed, WritableSignal, Signal} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuaranteesService } from '../../services/api/guarantees.service';
import { Guarantees } from '../../models/guarantees';
import { CarsService } from '../../services/api/cars.service';
import {Car, Cars} from '../../models/api/Car';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-guarantees-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressSpinner],
  templateUrl: './guarantees-page.component.html',
  styleUrl: './guarantees-page.component.scss'
})
export class GuaranteesPageComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly guaranteesService: GuaranteesService = inject(GuaranteesService);
  private readonly carsService: CarsService = inject(CarsService);

  protected carId: number | null = null;
  protected cars: WritableSignal<Cars> = this.carsService.cars;
  protected car: Signal<Car | undefined> = computed(() => this.cars().find((car) =>
    car.id === this.carId
  ));
  protected guarantees: Signal<Guarantees> = this.guaranteesService.guarantees;
  protected selectedGuarantee: number | null = null;
  protected loading: boolean = true;
  protected error: boolean = false;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async params => {
      const id: string | null = params.get('carId');
      this.carId = id ? +id : null;

      if (this.carId !== null) {
        this.carsService.fetchCars();
        this.loading = false;
        this.guaranteesService.fetchAllGuarantees();
      }
    });
  }

  selectGuarantee(guaranteeId: number): void {
    this.selectedGuarantee = guaranteeId;
  }

  isGuaranteeSelected(guaranteeId: number): boolean {
    console.log(guaranteeId);
    return this.selectedGuarantee === guaranteeId;
  }
}
