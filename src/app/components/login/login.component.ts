import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {LoginFormComponent} from './login-form/login-form.component';
import {User} from '../../models/api/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    ButtonDirective,
    LoginFormComponent
  ],
  standalone: true,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected user: Partial<User> = {email: "", password: ""};
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if(this.user.email && this.user.password){
      this.authService.login(this.user.email, this.user.password).subscribe({
        next: (response) => {
          window.location.href = '/';
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    }
  }
}
