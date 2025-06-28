import {Component, inject, Input, OnInit, WritableSignal} from '@angular/core';
import {DEFAULT_USER, User} from "../../../models/api/User";
import {DEFAULT_RENTAL_FORM_ERRORS, RentalFormErrors} from "../../../models/api/Rental";
import {AuthService} from '../../../services/auth/auth-service.service';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {RegisterService} from '../../../services/auth/register.service';
import {Router} from '@angular/router';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {UserFormComponent} from '../../register/user-form/user-form.component';
import {LoginFormComponent} from '../../login/login-form/login-form.component';
import {Button} from 'primeng/button';
import {ClientFormComponent} from '../../register/client-form/client-form.component';
import {DriverInfoFormComponent} from '../../register/driver-info-form/driver-info-form.component';

@Component({
  selector: 'app-client-page',
  imports: [
    FormsModule,
    Stepper,
    StepList,
    Step,
    StepPanels,
    UserFormComponent,
    StepPanel,
    LoginFormComponent,
    Button,
    ClientFormComponent,
    DriverInfoFormComponent
  ],
  templateUrl: './client-page.component.html',
  standalone: true,
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent implements OnInit{
  protected activeIndex: number = 1;

  private readonly authService: AuthService = inject(AuthService);
  private readonly registerService: RegisterService = inject(RegisterService);
  private readonly router: Router = inject(Router);

  protected actualUser: WritableSignal<User | null>  = this.authService.user;
  protected user: User = this.actualUser() ?? DEFAULT_USER;
  protected rentalFormErrors: RentalFormErrors = DEFAULT_RENTAL_FORM_ERRORS;

  protected alreadyAccount: boolean = false;
  protected loading: boolean = false;
  protected errorMessage: string | null = null;

  register(): void{
    this.loading = true;
    this.registerService.register(this.user.name, this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Inscription success :', response);
        this.activeIndex++;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Email ou mots de passe incorrects';
        console.error('Erreur lors du login:', error);
        this.loading = false;
      }
    })
  }

  login():void{
    this.authService.login(this.user.email, this.user.password).subscribe({
      error: (_) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    });
  }

  updateUserInfo(): void{
    if(this.alreadyAccount){
      this.login();
    }else{
      this.register()
    }
  }

  updateClientInfo(): void{
    this.loading = true;
    if(!this.actualUser()){
      this.login();
    }
    this.authService.updateMe(this.user.client?.id, this.user).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        console.log('User data updated successfully:', this.user);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to update user data:', err);
        this.loading = false;
      }
    });
  }

  changeAlreadyAccount(): void{
    this.alreadyAccount = !this.alreadyAccount;
  }

  getEmptyFieldError(field: string): string{
    return `Le champs ${field} ne peut pas être vide`;
  }

  next(): void{
    this.activeIndex++;
  }

  isFirstStepValid(): boolean{
    this.rentalFormErrors = {...DEFAULT_RENTAL_FORM_ERRORS};
    let isValid: boolean = true;
    if(!this.user.email){
      this.rentalFormErrors.email = this.getEmptyFieldError("email")
      isValid = false;
    }
    if(this.user.password.length < 6){
      this.rentalFormErrors.password = "Le mot de passe doit faire au moins 6 caractères"
      isValid = false;
    }
    if(!this.user.name && !this.alreadyAccount){
      this.rentalFormErrors.name = this.getEmptyFieldError("name")
      isValid = false;
    }
    return isValid
  }

  isSecondStepValid(): boolean{
    this.rentalFormErrors = {...DEFAULT_RENTAL_FORM_ERRORS};
    let isValid: boolean = true;

    if(!this.user.client?.firstname){
      this.rentalFormErrors.firstname = this.getEmptyFieldError("prénom")
      isValid = false;
    }
    if(!this.user.client?.lastname){
      this.rentalFormErrors.lastname = this.getEmptyFieldError("nom")
      isValid = false;
    }
    if(!this.user.client?.city){
      this.rentalFormErrors.city = this.getEmptyFieldError("ville")
      isValid = false;
    }
    if(!this.user.client?.country){
      this.rentalFormErrors.country = this.getEmptyFieldError("pays")
      isValid = false;
    }
    if(!(/^[0-9]{5}$/.test(this.user.client?.postalCode ?? ""))){
      this.rentalFormErrors.postalCode = "Le code postal doit être composé de 5 chiffres";
      isValid = false;
    }
    if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(this.user.client?.phone || '')) {
      this.rentalFormErrors.phone = "Le numéro de téléphone n'a pas le bon format";
      isValid = false;
    }
    if(!this.user.client?.billingAdress){
      this.rentalFormErrors.billingAdress = this.getEmptyFieldError("adresse de facturation")
      isValid = false;
    }
    return isValid
  }

  isThridStepValid(): boolean{
    this.rentalFormErrors = {...DEFAULT_RENTAL_FORM_ERRORS};
    let isValid: boolean = true;
    if(!/^[a-zA-Z0-9]{1,15}(\d{2}){2}$/.test(this.user.client?.driverInfo?.drivingLicenseNumber ?? "")){
      this.rentalFormErrors.drivingLicenseNumber = "Le permis doit être composé de 1 à 15 caractère puis 4 chiffres"
      isValid = false;
    }
    if(!this.user.client?.driverInfo?.drivingLicenseCountry){
      this.rentalFormErrors.drivingLicenseCountry = this.getEmptyFieldError("pays d'obtention")
      isValid = false;
    }
    return isValid;
  }

  ngOnInit(): void {
    console.log(this.user)
  }

  protected readonly DEFAULT_USER = DEFAULT_USER;
}
