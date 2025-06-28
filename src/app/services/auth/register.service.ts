import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl: string =  environment.apiUrl;

  register(name: string, email: string, password: string): Observable<any> {
    const body = {
      name: name,
      email: email,
      password: password
    };
    return this.httpClient.post(`${this.apiUrl}/register`, body);
  }
}
