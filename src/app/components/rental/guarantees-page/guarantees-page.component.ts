import {Component, inject, OnInit, computed, WritableSignal, Signal, effect} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuaranteesService } from '../../../services/api/guarantees.service';
import {Guarantee, Guarantees} from '../../../models/api/Guarantee';
import { CarsService } from '../../../services/api/cars.service';
import {Car, Cars} from '../../../models/api/Car';
import {ProgressSpinner} from 'primeng/progressspinner';
import {RentalsService} from '../../../services/api/rentals.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-guarantees-page',
  standalone: true,
    imports: [CommonModule, ProgressSpinner, FormsModule],
  templateUrl: './guarantees-page.component.html',
  styleUrl: './guarantees-page.component.scss'
})
export class GuaranteesPageComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly rentalService: RentalsService = inject(RentalsService);
  private readonly guaranteesService: GuaranteesService = inject(GuaranteesService);
  private readonly carsService: CarsService = inject(CarsService);
  private readonly router: Router = inject(Router);

  protected carId: number | null = null;
  protected cars: WritableSignal<Cars> = this.carsService.cars;
  protected car: Signal<Car | undefined> = computed(() => this.cars().find((car) =>
    car.id === this.carId
  ));
  protected guarantees: Signal<Guarantees> = this.guaranteesService.guarantees;
  protected selectedGuarantee: number | null = null;
  protected startDate: string = new Date().toISOString().split('T')[0];
  protected endDate: string = new Date().toISOString().split('T')[0];
  protected loading: boolean = true;
  protected error: boolean = false;
  protected dateError: string = ""

  constructor() {
    effect(() => {
      const car: Car | undefined = this.car();
      const currentCar: Car = this.rentalService.rentalBody().car;

      if (car && (!currentCar || currentCar.id !== car.id) && car.id >= 0) {
        this.rentalService.updateRentalBody({car: car, });
      }
    });
  }

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
    this.rentalService.updateRentalBody({guarantee: this.guarantees().find(
      (guarantee) => guarantee.id === guaranteeId)})
  }

  isGuaranteeSelected(guaranteeId: number): boolean {
    return this.selectedGuarantee === guaranteeId;
  }

  isValid(): boolean {
    if(new Date(this.startDate) > new Date(this.endDate)){
      this.dateError = "La date de départ ne peut pas être plus grande que la date de retour";
      return false;
    }else{
      this.dateError = "";
    }
    return !!this.selectedGuarantee && !!this.startDate && !!this.endDate;
  }

  next(): void{
    this.rentalService.updateRentalBody({startDate: new Date(this.startDate), endDate: new Date(this.endDate)})
    this.router.navigate(['rental', 'options', this.carId])
  }

  calculateDurationInDays(): number {
    if (!this.startDate || !this.endDate) return 0;
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }
}
