import { HttpClient } from '@angular/common/http';
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
  private readonly urlCarsByAgency: string = this.urlCars + "/agency/";
  private readonly httpClient: HttpClient = inject(HttpClient);

  public readonly cars: WritableSignal<Cars> = signal<Cars>([]);

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
}
