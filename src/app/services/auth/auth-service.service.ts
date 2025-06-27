import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem('token');
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        if (response?.authorisation?.access_token) {
          localStorage.setItem('token', response.authorisation.access_token);
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  getToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.loggedInSubject.next(false);
      },
      error: (err) => {
        console.error('Logout failed', err);
        localStorage.removeItem('token');
        this.loggedInSubject.next(false);
      }
    });
  }

  getMe(): Observable<User> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      map((response: any) => {
        const user = response?.data?.user;
        const client = response?.data?.client;
        if (user && client) {
          return {
            id: client.id,
            name: user.name,
            firstname: client.firstname,
            lastname: client.lastname,
            email: user.email,
            city: client.city,
            country: client.country,
            postalCode: client.postalCode,
            phone: client.phone
          } as User;
        }
        throw new Error('Invalid response format');
      }),
    );
  }

  updateMe(id: any, user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/clients/${id}`, user);
  }
}
