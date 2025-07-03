import { CanActivateFn } from '@angular/router';
import {AuthService} from '../services/auth/auth-service.service';
import {inject} from '@angular/core';

export const clientCreationGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  return !authService.user()?.agency;

};
