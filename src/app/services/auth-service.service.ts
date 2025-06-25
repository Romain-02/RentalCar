import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        if (response && response.authorisation && response.authorisation.access_token) {
          localStorage.setItem('token', response.authorisation.access_token);
        }
      })
    );
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout(): void {
    const token = this.getToken();
    if (token) {
      this.http.post(`${this.apiUrl}/logout`, {}, {
        headers: { Authorization: token }
      }).subscribe({
        next: () => {
          localStorage.removeItem('token');
        },
        error: (err) => {
          console.error('Logout failed', err);
          localStorage.removeItem('token');
        }
      });
    } else {
      localStorage.removeItem('token');
    }
  }
}
