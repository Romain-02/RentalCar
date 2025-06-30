import {Component, inject, OnInit} from '@angular/core';
import {RentalBody} from '../../../models/api/Rental';
import {RentalsService} from '../../../services/api/rentals.service';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-rental-confirmation',
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './rental-confirmation.component.html',
  standalone: true,
  styleUrl: './rental-confirmation.component.scss'
})
export class RentalConfirmationComponent implements OnInit{
  private rentalService: RentalsService = inject(RentalsService);

  protected rental: RentalBody = this.rentalService.rentalBody();

  ngOnInit(): void {
    console.log(this.rental, "rental")
  }
}
