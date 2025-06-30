import {Component, inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {RegisterService} from '../../services/auth/register.service';
import {Router, RouterLink} from '@angular/router';
import {Button, ButtonDirective} from 'primeng/button';
import {UserFormComponent} from './user-form/user-form.component';
import {DEFAULT_USER, User} from '../../models/api/User';
import {ClientFormComponent} from './client-form/client-form.component';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {LoginFormComponent} from '../login/login-form/login-form.component';
import {DriverInfoFormComponent} from './driver-info-form/driver-info-form.component';
import {AuthService} from '../../services/auth/auth-service.service';
import {
  DEFAULT_RENTAL_FORM_ERRORS, RentalFormErrors,
} from '../../models/api/Rental';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ButtonDirective,
    UserFormComponent,
    ProgressSpinner,
    RouterLink
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly registerService: RegisterService = inject(RegisterService);
  private readonly router: Router = inject(Router);

  protected user: User = DEFAULT_USER;
  protected errorMessage: string | null = null;
  protected loading: boolean = false;


  onSubmit() {
    this.register();
  }

  register(): void{
    this.loading = true;
    this.registerService.register(this.user.name, this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Inscription success :', response);
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Email ou mots de passe incorrects';
        console.error('Erreur lors du login:', error);
        this.loading = false;
      }
    })
  }


}


