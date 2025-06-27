import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {RegisterService} from '../../services/register.service';
import {Router} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {PasswordDirective} from 'primeng/password';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    NgIf,
    InputText,
    PasswordDirective,
    ButtonDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);

  name: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string | null = null;

  onSubmit() {
    this.registerService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Inscription success :', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Email ou mots de passe incorrects';
        console.error('Erreur lors du login:', error);
      }
    })
  }
}


