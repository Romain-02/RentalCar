import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import {User} from '../../models/api/User';
import {environment} from '../../../environments/environment';
import {DEFAULT_DRIVER_INFO} from '../../models/api/DriverInfo';
import {Client} from '../../models/api/Client';
import { Rental } from '../../models/api/Rental';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  private apiUrl: string = environment.apiUrl;
  public user: WritableSignal<User | null> = signal(null);
  public token: WritableSignal<string | null> = signal(null);
  public isLoggedIn: Signal<boolean> = computed(() => !!this.token());

  constructor() {
    this.restoreSession();
  }

  responseToUser(response: any): User{
    return {
      ...response.user,
      client: {
        ...response.user?.client,
        driverInfo: {
          ...response.user?.client?.driverInfo
        }
      }
    }
  }


  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        if (response?.authorisation?.access_token) {
          const user: User = this.responseToUser(response);
          this.token.set(response.authorisation.access_token)
          this.user.set(user);
          localStorage.setItem('token', JSON.stringify(response.authorisation.access_token))
          localStorage.setItem('user', JSON.stringify(user))
        }
      })
    );
  }

  restoreSession(): void{
    if(typeof localStorage !== 'undefined'){
      if (!this.token()) {
        const token: string | null = localStorage.getItem('token');
        if (token) {
          this.token.set(JSON.parse(token));
        }
      }

      if(!this.user()){
        const user: string | null = localStorage.getItem('user');
        if(user){
          this.user.set(JSON.parse(user));
        }
        console.log(this.user())
      }
    }
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => {
        localStorage.setItem('token', JSON.stringify(null))
        localStorage.setItem('user', JSON.stringify(null))
        this.token.set(null)
        this.user.set(null);
        },
      error: (err) => {
        console.error('Logout failed', err);
        localStorage.setItem('token', JSON.stringify(null))
        localStorage.setItem('user', JSON.stringify(null))
        this.token.set(null)
        this.user.set(null);
      }
    });
  }

  getMe(): Observable<User> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      map((response: any) => {
        const user: User | undefined = response?.data?.user;
        if (user) {
          this.user.set(user);
          return user
        }
        throw new Error('Invalid response format');
      }),
    );
  }

  updateMe(id: any, client: Client): Observable<{data: Client}> {
    const token: string | null = this.token();
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const response: Observable<{data: Client}> = this.http.patch<{data: Client}>(`${this.apiUrl}/clients/${id}`, client, {headers})
    response.subscribe({
      next: (clientResponse) => {
        const updatedClient: Client = clientResponse.data;
        const currentUser: User | null = this.user();
        if (currentUser) {
          this.user.set({...currentUser, client: updatedClient});
        }
      }
    });
    return response;
  }

  getReservations(id: any): Observable<Rental[]> {
    return this.http.get<{ data: Rental[]}>(`${this.apiUrl}/rentals/client/${id}`).pipe(
      map((response: any) => response.data),
    );
  }

  cancelReservations(id: any): Observable<any> {
    return this.http.get<{ data: Rental[]}>(`${this.apiUrl}/rentals/cancel/${id}`).pipe(
      map((response: any) => response.message),
    );
  }
}
