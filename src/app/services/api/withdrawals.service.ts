import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Rental } from '../../models/api/Rental';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, of } from 'rxjs';
import {Withdrawal, WithdrawalResponse} from '../../models/api/Withdrawal';
import {RentalsService} from './rentals.service';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class WithdrawalsService {
  private httpClient: HttpClient = inject(HttpClient);
  private rentalsService: RentalsService = inject(RentalsService);

  public withdrawalResult: WritableSignal<Withdrawal | null> = signal(null);

  public scheduleWithdrawal = (data: any) => {
    try{
      this.httpClient.post<WithdrawalResponse>(`${environment.apiUrl}/withdrawals`, data).subscribe({
        next: (response) => {
          this.withdrawalResult.set(response.data);
          this.addWithdrawalToReservation();
          console.log('Réponse serveur:', response);
        },
        error: (error) => {
          console.error('Erreur lors de la requête:', error);
        }
      });;
    }
    catch(error){
      console.log(error);
    }
  }

  private addWithdrawalToReservation(): void{
    const rentals: Rental[] = this.rentalsService.rentals();
    const newRentals: Rental[] = rentals.map((rental) => {
      if(rental.id === this.withdrawalResult()?.rental?.id){
        return {
          ...rental,
          withdrawal: this.withdrawalResult()
        }
      }
      return rental
    })
    this.rentalsService.rentals.set(newRentals);
  }
}
