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
  public rentalResult: WritableSignal<Rental | null> = signal(null);
  public rentalError: WritableSignal<string> = signal("");
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {
    this.restoreRentalBody();
  }

  public updateRentalBody(rentalBody: Partial<RentalBody>): void{
    const currentRentalBody: RentalBody = this.rentalBody();
    const newRentalBody: RentalBody = {...currentRentalBody, ...rentalBody};
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem('rentalBody', JSON.stringify(newRentalBody));
    }
    this.rentalBody.set(newRentalBody);
  }

  public rentalBodyToBody(rentalBody: RentalBody){
    return {
      ...rentalBody,
      car_id: rentalBody.car.id,
      client_id: rentalBody.client.id,
      guarantee_id: rentalBody.guarantee.id
    }
  }

  public createRental(): void {
    this.httpClient.post<{ data: Rental }>(
      `${environment.apiUrl}/rentals`,
      this.rentalBodyToBody(this.rentalBody())
    )
      .pipe(
        map(response => response.data),
        catchError((error) => {
          this.rentalError.set(error?.error?.error || "Une erreur inconnue est survenue");
          this.rentalResult.set(null);
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.rentalResult.set(data);
          this.rentalError.set("");
        }
      });
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
      if (this.rentalBody().car.id === -1 && rentalBody) {
          this.rentalBody.set(JSON.parse(rentalBody));
      }
    }
  }
}
