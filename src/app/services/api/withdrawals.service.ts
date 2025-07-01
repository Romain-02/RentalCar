import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Rental } from '../../models/api/Rental';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, of } from 'rxjs';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class WithdrawalsService {
  private httpClient: HttpClient = inject(HttpClient);

  public scheduleWithdrawal = (data: any) => {
    try{
      this.httpClient.post(`${environment.apiUrl}/withdrawals`, data).subscribe({
        next: (response) => {
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

}
