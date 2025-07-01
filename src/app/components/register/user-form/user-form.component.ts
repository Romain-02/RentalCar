import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {PasswordDirective} from 'primeng/password';
import {User, UserFormErrors} from '../../../models/api/User';
import {identity} from 'rxjs';

@Component({
  selector: 'app-user-form',
  imports: [
    FormsModule,
    InputText,
    PasswordDirective
  ],
  templateUrl: './user-form.component.html',
  standalone: true,
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input()
  public userFormErrors!: UserFormErrors;
  @Input()
  user!: User;

  getPasswordStrengthColor(index: number): string {
    const strength = this.calculatePasswordStrength();
    const baseClasses = 'transition-all duration-300';

    if (index < strength) {
      switch (strength) {
        case 1: return `${baseClasses} bg-red-500`;
        case 2: return `${baseClasses} bg-orange-500`;
        case 3: return `${baseClasses} bg-yellow-500`;
        case 4: return `${baseClasses} bg-green-500`;
        default: return `${baseClasses} bg-gray-200 dark:bg-gray-600`;
      }
    }
    return `${baseClasses} bg-gray-200 dark:bg-gray-600`;
  }

  getPasswordStrengthText(): string {
    const strength = this.calculatePasswordStrength();
    switch (strength) {
      case 1: return 'Faible';
      case 2: return 'Moyenne';
      case 3: return 'Bonne';
      case 4: return 'Excellente';
      default: return '';
    }
  }

  private calculatePasswordStrength(): number {
    if (!this.user.password) return 0;

    let strength = 0;
    const password = this.user.password;

    // Critere 1 : longueur minimale de 8 caractères
    if (password.length >= 8) strength++;
    // Critere 2 : Mini 1 minuscules, 1 majuscules
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    // Critere 3 : Mini 1 chiffre
    if (/\d/.test(password)) strength++;
    // Critere 4 : Mini 1 caractère spécial
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    return strength;
  }
}
