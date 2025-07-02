import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DEFAULT_RETURN_CAR_FORM, ReturnCar, ReturnCarBody, ReturnCarForm} from '../../models/api/ReturnCar';
import {HttpClient} from '@angular/common/http';
import {catchError, map, of} from 'rxjs';
import {environment} from '../../../environments/environment';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class ReturnCarsService {
  public returnCars: WritableSignal<ReturnCar[]> = signal([]);
  public states: WritableSignal<string[]> = signal([]);
  public returnCarsError: WritableSignal<string> = signal("");
  public returnCarResult: WritableSignal<ReturnCar | null> = signal(null);
  private httpClient: HttpClient = inject(HttpClient);

  public createReturnCar(returnCarBody: ReturnCarBody): void {
    this.httpClient.post<{ data: ReturnCar }>(
      `${environment.apiUrl}/returnCars`,
      returnCarBody
    )
      .pipe(
        map(response => response.data),
        catchError((error) => {
          this.returnCarsError.set(error?.error?.error || "Une erreur inconnue est survenue");
          this.returnCarResult.set(null);
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.returnCarResult.set(data);
          this.returnCarsError.set("");
        }
      });
  }

  public fetchReturnCars (): void {
    this.httpClient.get<{ data: any[] }>(`${environment.apiUrl}/returnCars`)
      .pipe(map(response => response.data), catchError(() => of([])))
      .subscribe(data => {
        this.returnCars.set(data);
      }
    );
  }

  public fetchStates(): void {
    this.httpClient.get<{ data: string[] }>(`${environment.apiUrl}/returnCar/states`)
      .pipe(map(response => response.data), catchError(() => of([])))
      .subscribe(data => {
          this.states.set(data);
        }
      );
  }
}
