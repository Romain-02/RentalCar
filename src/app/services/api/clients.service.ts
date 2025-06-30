import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { User } from '../../models/User';
import {AuthService} from '../auth/auth-service.service';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private urlClients: string = environment.apiUrl + '/clients';
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
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

}
