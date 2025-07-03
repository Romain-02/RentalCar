import {Component, computed, effect, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import { RentalsService } from '../../services/api/rentals.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WithdrawalsService } from '../../services/api/withdrawals.service';
import {DatePipe} from '@angular/common';
import {Withdrawal} from '../../models/api/Withdrawal';

// ==============================================


@Component({
  selector: 'app-withdrawal-form',
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './withdrawal-form.component.html',
  standalone: true,
  styleUrl: './withdrawal-form.component.scss'
})
export class WithdrawalFormComponent implements OnInit {
  private rentalService: RentalsService = inject(RentalsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private withdrawalService: WithdrawalsService = inject(WithdrawalsService);
  private router: Router = inject(Router);

  protected rentalId: WritableSignal<number | null> = signal<number | null>(null);
  private rentals: Signal<any[]> = this.rentalService.rentals;
  private withdrawalResult: Signal<Withdrawal | null> = this.withdrawalService.withdrawalResult;
  protected rental = computed(() => {
    const id = this.rentalId();
    return this.rentals().find((rent) => rent.id === id) ?? null;
  });

  protected miles !: number;
  protected fuel !: number;
  protected interiorState !: string;
  protected exteriorState !: string;
  protected commentary !: string;
  protected date !: string;

  constructor() {
    effect(() => {
      if(this.withdrawalResult()){
        this.router.navigate(['agent/rentals'])
      }
    });
  }

  public ngOnInit(): void {
    this.rentalService.fetchRentals();

    this.activatedRoute.paramMap.subscribe((params: any) => {
      const id: string | null = params.get('rentalId');
      this.rentalId.set(Number(id));
    });
  }

  public canSubmit(): boolean {
    return this.miles > 0 && this.fuel > 0 && this.exteriorState !== '' && this.exteriorState !== '' && this.commentary !== "";
  }

  public submit(): void {
    this.withdrawalService.scheduleWithdrawal({
      idVoiture: this.rental().car.id,
      idReservation: this.rental().id,
      kilometrage: this.miles,
      niveauEssence: this.fuel,
      etatExterieur: this.exteriorState,
      etatInterieur: this.interiorState,
      commentaire: this.commentary,
      date: this.date
    });
  }
}
