import {Component, computed, inject, OnInit, signal, Signal} from '@angular/core';
import {RentalsService} from '../../services/api/rentals.service';
import {Rental} from '../../models/api/Rental';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {compileClassMetadata} from '@angular/compiler';

// ==============================================


@Component({
  selector: 'app-withdrawal-form',
  imports: [
    FormsModule
  ],
  templateUrl: './withdrawal-form.component.html',
  styleUrl: './withdrawal-form.component.scss'
})
export class WithdrawalFormComponent implements OnInit {
  private rentalService: RentalsService = inject(RentalsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private rentalId = signal<number | null>(null);
  private rentals: Signal<any[]> = this.rentalService.rentals;
  protected rental: any | null = computed(() => this.rentalService.rentals().find((rent: Rental) => rent.id === Number(this.rentalId())) ?? null);

  protected miles !: number;
  protected fuel !: number;
  protected interiorState !: string;
  protected exteriorState !: string;
  protected commentary !: string;

  public ngOnInit(): void {
    this.rentalService.fetchRentals();

    console.log(this.rentals());

    this.activatedRoute.paramMap.subscribe(async (params: any) => {
      const id: string | null = params.get('rentalId');
      this.rentalId.set(Number(id));
    });

    console.log(this.rental());
  }

}
