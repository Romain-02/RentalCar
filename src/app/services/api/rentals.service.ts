import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DEFAULT_RENTAL_BODY, Rental, RentalBody} from '../../models/api/Rental';
import {HttpClient} from '@angular/common/http';
import {catchError, map, of} from 'rxjs';
import {environment} from '../../../environments/environment';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  public rentals: WritableSignal<Rental[]> = signal([]);
  public rentalBody: WritableSignal<RentalBody> = signal(DEFAULT_RENTAL_BODY);
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {
    this.restoreRentalBody();
  }

  public updateRentalBody(rentalBody: Partial<RentalBody>): void{
    const currentRentalBody: RentalBody = this.rentalBody();
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem('rentalBody', JSON.stringify(currentRentalBody));
    }
    this.rentalBody.set({...currentRentalBody, ...rentalBody})
  }

  public createRental(): void {
    this.httpClient.post(`${environment.apiUrl}/rentals`, this.rentalBody())
      .pipe(map(response => response), catchError(() => of([])))
      .subscribe(data => {
        console.log(data)
        }
      );
  }

  public fetchRentals (): void {
    this.httpClient.get<{ data: any[] }>(`${environment.apiUrl}/rentals`)
      .pipe(map(response => response.data), catchError(() => of([])))
      .subscribe(data => {
        this.rentals.set(data);
      }
    );
  }

  restoreRentalBody(): void{
    if(typeof localStorage !== 'undefined'){
      const rentalBody: string | null = localStorage.getItem('rentalBody');
      if (!this.rentalBody() && rentalBody) {
        if (rentalBody) {
          console.log(rentalBody)
          this.rentalBody.set(JSON.parse(rentalBody));
        }
      }
    }
  }
}
