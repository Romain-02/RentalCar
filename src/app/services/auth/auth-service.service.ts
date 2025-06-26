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
    const token = this.getToken();
    if (token) {
      this.http.post(`${this.apiUrl}/logout`, {}, {
        headers: { Authorization: token }
      }).subscribe({
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
    } else {
      localStorage.removeItem('token');
      this.loggedInSubject.next(false);
    }
  }

  getMe(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      return new Observable<User>((observer) => {
        observer.error(new Error('No token found'));
      });
    }
    return this.http.get(`${this.apiUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      map((response: any) => {
        const user = response?.data?.user;
        if (user) {
          return {
            name: user.name,
            mail: user.email
          } as User;
        }
        throw new Error('Invalid response format');
      }),
    );
  }
}
