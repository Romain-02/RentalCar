import {Component, inject, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth/auth-service.service';
import {DEFAULT_USER, User} from '../../models/api/User';
import {ButtonDirective} from 'primeng/button';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClientFormComponent} from '../register/client-form/client-form.component';
import {Client} from '../../models/api/Client';
import {DriverInfoFormComponent} from '../register/driver-info-form/driver-info-form.component';
import {DEFAULT_RENTAL_FORM_ERRORS, RentalFormErrors, RentalValidation} from '../../models/api/Rental';
import {FormValidatorService} from '../../services/form/form-validator.service';
import {RentalListComponent} from '../rental-list/rental-list.component';
import {CarListComponent} from '../car/car-list/car-list.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  imports: [
    ButtonDirective,
    NgIf,
    FormsModule,
    ClientFormComponent,
    DriverInfoFormComponent,
    RentalListComponent,
    CarListComponent
  ],
  standalone: true,
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private formValidatorService: FormValidatorService = inject(FormValidatorService);

  user: User = DEFAULT_USER;
  isEditing: boolean = false;
  protected rentalFormErrors: RentalFormErrors = DEFAULT_RENTAL_FORM_ERRORS;

  ngOnInit(): void {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.user = {...user};
        console.log('User data fetched successfully:', this.user);
      },
      error: (err) => {
        console.error('Failed to fetch user data:', err);
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.user.client) {
      this.authService.updateMe(this.user.client.id, this.user.client).subscribe({
        next: (updatedClient: {data: Client}) => {
          console.log('Client data updated successfully:', updatedClient);
        },
        error: (err) => {
          console.error('Failed to update user data:', err);
        }
      });
    }
  }

  isInfosValid(): boolean{
    const rentalFirstValidation: RentalValidation = this.formValidatorService.isThridStepValid(this.user);
    this.rentalFormErrors = {...rentalFirstValidation.rentalFormErrors};
    const rentalSecondValidation: RentalValidation = this.formValidatorService.isSecondStepValid(this.user, this.rentalFormErrors);
    this.rentalFormErrors = {...rentalSecondValidation.rentalFormErrors};
    return rentalFirstValidation.isValid && rentalSecondValidation.isValid
  }
}
