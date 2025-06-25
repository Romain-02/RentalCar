import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login réussi:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
        console.error('Erreur lors du login:', error);
      }
    });
  }
}
