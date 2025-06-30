import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import {inject, WritableSignal} from '@angular/core';
import { AuthService } from './auth-service.service';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth: AuthService = inject(AuthService);
  const token: WritableSignal<string | null> = auth.token;

  if (!token()) {
    return next(req);
  }

  const headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${token()}`
  });

  const newReq: HttpRequest<any> = req.clone({
    headers
  });

  return next(newReq);
}
