import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

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

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login réussi:', response);
      },
      error: (error) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
        console.error('Erreur lors du login:', error);
      }
    });
  }
}
