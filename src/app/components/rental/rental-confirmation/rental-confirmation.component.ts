import {Component, effect, inject, OnInit, WritableSignal} from '@angular/core';
import {Rental, RentalBody} from '../../../models/api/Rental';
import {RentalsService} from '../../../services/api/rentals.service';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CarsService} from '../../../services/api/cars.service';

@Component({
  selector: 'app-rental-confirmation',
  imports: [
    DatePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './rental-confirmation.component.html',
  standalone: true,
  styleUrl: './rental-confirmation.component.scss'
})
export class RentalConfirmationComponent implements OnInit{
  private rentalService: RentalsService = inject(RentalsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private carsService: CarsService = inject(CarsService);
  private router: Router = inject(Router);

  protected rental: RentalBody = this.rentalService.rentalBody();
  protected rentalResultSignal: WritableSignal<Rental | null> = this.rentalService.rentalResult;
  protected rentalError: WritableSignal<string> = this.rentalService.rentalError;
  protected carId: number | null = null;
  protected loading: boolean = false;

  constructor() {
    effect(() => {
      if(this.rentalResultSignal() !== null){
        this.router.navigate(['/profil'])
      }
    });
  }

  rent(): void{
    this.rentalService.createRental();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async params => {
      const id: string | null = params.get('carId');
      this.carId = id ? +id : null;

      if (this.carId) {
        this.carsService.fetchCars();
        this.loading = false;
      }
    });
  }
}
