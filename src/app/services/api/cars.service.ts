import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Cars} from '../../models/api/Car';
import {catchError, map, of} from 'rxjs';
import {environment} from '../../../environments/environment';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private readonly urlCars: string = environment.apiUrl + '/cars';
  private readonly urlCarsAvailability: string = environment.apiUrl + '/availability';
  private readonly urlCarsByAgency: string = this.urlCars + "/agency/";
  private readonly httpClient: HttpClient = inject(HttpClient);

  public readonly cars: WritableSignal<Cars> = signal<Cars>([]);
  public readonly startDate: WritableSignal<string> = signal('');
  public readonly endDate: WritableSignal<string> = signal('');

  public fetchCars(): void {
    this.httpClient.get<{ data: Cars }>(this.urlCars).pipe(
      map(res => res.data),
      catchError(() => of([]))
    ).subscribe(data => {
      this.cars.set(data);
    });
  }

  public fetchCarsByAgency(agencyId: number): void {
    this.httpClient.get<{ data: Cars }>(this.urlCarsByAgency + agencyId).pipe(
      map(res => res.data),
      catchError(() => of([]))
    ).subscribe(data => {
      this.cars.set(data);
    });
  }

  public fetchAvailableCars(startDate: string, endDate: string): void {
    console.log('Requête API avec params:', { start_date: startDate, end_date: endDate });

    const params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate);

    this.httpClient.get<{data: Cars}>(this.urlCarsAvailability, {params}).pipe(
      map(res => res.data),
      catchError((error) => {
        console.error('Erreur API fetchAvailableCars:', error);
        return of([]);
      })
    ).subscribe(data => {
      console.log('Voitures disponibles reçues:', data);
      this.cars.set(data);
      this.startDate.set(startDate);
      this.endDate.set(endDate);
    });
  }

  public checkCarAvailability(carId: number, startDate: string, endDate: string, excludeRentalId?: number) {
    let params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate);

    if (excludeRentalId) {
      params = params.set('exclude_rental_id', excludeRentalId.toString());
    }

    return this.httpClient.get<{ data: any }>(this.urlCars + `/${carId}/availability`, { params }).pipe(
      map(res => res.data),
      catchError(() => of(null))
    );
  }

  public setDateRange(startDate: string, endDate: string) {
    this.startDate.set(startDate);
    this.endDate.set(endDate);
  }
}
