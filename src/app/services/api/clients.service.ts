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
  public users: WritableSignal<any[]> = signal<any[]>([]);
  public createdClientId: WritableSignal<number> = signal<number>(0);

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

  public createClient(data: any): void {
    const token: string | null = this.authService.token();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.httpClient.post<{ data: User }>(this.urlClients, data, { headers })
      .pipe(
        map(response => {
          this.createdClientId.set(response.data.id);
          return response.data
        }),
        catchError((error) => {
          const errorMsg = error.error?.message || 'Erreur lors de la création du client';
          console.log(errorMsg);
          return of([])
        })
      )
      .subscribe({
        next: () => {
        },
        error: () => {}
      });
  }

  public createDriverInfos(data: any): void {
    const token: string | null = this.authService.token();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.httpClient.post<{ data: User }>(`${this.urlClients}/${this.createdClientId()}/driver`, data, { headers })
      .pipe(
        map(response => response.data),
        catchError((error) => {
          const errorMsg = error.error?.message || 'Erreur lors de la création des infos conducteur';
          return of([])
        })
      ).subscribe({next: () => {}});
  }

  public addClientBillingInformations(data: any): void {
    const token: string | null = this.authService.token();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.httpClient.patch<{ data: User }>(`${this.urlClients}/${this.createdClientId()}/billing`, data, { headers })
      .pipe(
        map(response => response.data),
        catchError((error) => {
          const errorMsg = error.error?.message || 'Erreur lors de l ajout des informations de facturation';
          return of([])
        })
      ).subscribe({next: () => {
        this.createdClientId.set(0);
      }});
  }

  public fetchUsers(): void {
    const token: string | null = this.authService.token();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.httpClient.get<{ data: any[] }>(`${environment.apiUrl}/users`, { headers })
      .pipe(map(response => response.data), catchError(() => of([])))
      .subscribe(data => {
          this.users.set(data);
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
