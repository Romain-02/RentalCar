import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import {AuthService} from '../auth/auth-service.service';
import {FavoriteResponse} from '../../components/cards/car-card/car-card.component';
import {Favorite} from '../../models/api/Client';
import {User} from '../../models/api/User';
import {CarsService} from './cars.service';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private urlClients: string = environment.apiUrl + '/clients';
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
  private carsService: CarsService = inject(CarsService);
  public clients: WritableSignal<any[]> = signal<any[]>([]);

  public fetchClients(): void {
    const token: string | null = this.authService.token();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.httpClient.get<{ data: User[] }>(this.urlClients, { headers })
      .pipe(map(response => response.data), catchError(() => of([])))
      .subscribe(data => {
        this.clients.set(data);
      }
    );
  }

  public favorite(favorite: Favorite): void {
    this.httpClient.post<FavoriteResponse>(this.urlClients + "/favorite", favorite)
      .subscribe(_ =>
      this.carsService.fetchCars()
    )
  }

}
