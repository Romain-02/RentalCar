import {Component, computed, effect, inject, OnInit, Signal, WritableSignal} from '@angular/core';
import {DEFAULT_USER, User} from "../../../models/api/User";
import {DEFAULT_RENTAL_FORM_ERRORS, RentalFormErrors, RentalValidation} from "../../../models/api/Rental";
import {AuthService} from '../../../services/auth/auth-service.service';
import {FormsModule} from '@angular/forms';
import {RegisterService} from '../../../services/auth/register.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {UserFormComponent} from '../../register/user-form/user-form.component';
import {LoginFormComponent} from '../../login/login-form/login-form.component';
import {Button} from 'primeng/button';
import {ClientFormComponent} from '../../register/client-form/client-form.component';
import {DriverInfoFormComponent} from '../../register/driver-info-form/driver-info-form.component';
import {Client} from '../../../models/api/Client';
import {RentalsService} from '../../../services/api/rentals.service';
import {CarsService} from '../../../services/api/cars.service';
import {Car, Cars} from '../../../models/api/Car';
import {FormValidatorService} from '../../../services/form/form-validator.service';

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
    DriverInfoFormComponent,
    RouterLink
  ],
  templateUrl: './client-page.component.html',
  standalone: true,
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent implements OnInit{
  private readonly authService: AuthService = inject(AuthService);
  private readonly rentalService: RentalsService = inject(RentalsService);
  private readonly registerService: RegisterService = inject(RegisterService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly formValidatorService: FormValidatorService = inject(FormValidatorService);

  protected actualUser: WritableSignal<User | null>  = this.authService.user;
  protected user: User = this.actualUser() ?? DEFAULT_USER;
  protected rentalFormErrors: RentalFormErrors = DEFAULT_RENTAL_FORM_ERRORS;
  protected carId: number | null = null;

  protected activeIndex: number = 1;
  protected alreadyAccount: boolean = false;
  protected loading: boolean = false;
  protected errorMessage: string | null = null;
  protected alreadyConnected: boolean = !!this.actualUser();

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async params => {
      const id: string | null = params.get('carId');
      this.carId = id ? +id : null;
    });
  }

  register(): void{
    this.loading = true;
    this.registerService.register(this.user.name, this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Inscription success :', response);
        this.user = {...this.user, client: response.user?.client}
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
      next: (response) => {
        this.user = {...this.user, client: response.user.client}
      },
      error: (_) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    });
  }

  updateUserInfo(): void{
    if(this.alreadyAccount){
      this.login();
      this.activeIndex++;
    }else{
      this.register()
      if(!this.actualUser()){
        this.login();
      }
    }
  }

  updateClientInfo(): void{
    this.loading = true;
    if(this.user.client){
      this.authService.updateMe(this.user.client?.id, this.user.client).subscribe({
        next: (updatedClient: {data: Client}) => {
          console.log('Client data updated successfully:', updatedClient);
          this.router.navigate(['rental', 'confirmation',this.carId])
          this.rentalService.updateRentalBody({client: this.user.client})
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to update user data:', err);
          this.errorMessage = "Il y a eu une erreur avec l'enregistrement des informations"
          this.loading = false;
        }
      });
    }
  }

  changeAlreadyAccount(): void{
    this.alreadyAccount = !this.alreadyAccount;
  }

  next(): void{
    this.activeIndex++;
  }

  last(): void{
    this.activeIndex--;
  }

  isFirstStepValid(): boolean{
    const rentalValidation: RentalValidation = this.formValidatorService.isFirstStepValid(this.user, this.alreadyAccount);
    this.rentalFormErrors = rentalValidation.rentalFormErrors
    return rentalValidation.isValid;
  }

  isSecondStepValid(): boolean{
    const rentalValidation: RentalValidation = this.formValidatorService.isSecondStepValid(this.user);
    this.rentalFormErrors = rentalValidation.rentalFormErrors
    return rentalValidation.isValid;
  }

  isThridStepValid(): boolean{
    const rentalValidation: RentalValidation = this.formValidatorService.isThridStepValid(this.user);
    this.rentalFormErrors = rentalValidation.rentalFormErrors
    return rentalValidation.isValid;
  }
}
