import {Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth/auth-service.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {LoginFormComponent} from './login-form/login-form.component';
import {User, UserFormErrors} from '../../models/api/User';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    ButtonDirective,
    LoginFormComponent,
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private router: Router = inject(Router)
  private authService: AuthService = inject(AuthService)

  protected user: Partial<User> = {email: "", password: ""};
  userFormErrors: UserFormErrors | null = null;
  errorMessage: string | null = null;

  onSubmit(): void {
    if(this.user.email && this.user.password){
      this.authService.login(this.user.email, this.user.password).subscribe({
        next: (response) => {
          this.router.navigate(['/'])
        },
        error: (response) => {
          console.log(response)
          this.errorMessage = response.error.message;
          this.userFormErrors = response.error.errors || null;
        }
      });
    }
  }
}
