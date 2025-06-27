import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Rental} from '../../models/api/Rental';
import {HttpClient} from '@angular/common/http';
import {catchError, map, of} from 'rxjs';
import {environment} from '../../../environments/environment';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  public rentals: WritableSignal<Rental[]> = signal([]);
  private httpClient: HttpClient = inject(HttpClient);

  public fetchRentals (): void {
    this.httpClient.get<{ data: any[] }>(`${environment.apiUrl}/rentals`)
      .pipe(map(response => response.data), catchError(() => of([])))
      .subscribe(data => {
        this.rentals.set(data);
      }
    );
  }

}
