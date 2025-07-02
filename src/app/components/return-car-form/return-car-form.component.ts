import {Component, computed, effect, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth-service.service';
import {User} from '../../models/api/User';
import {
  DEFAULT_RETURN_CAR_FORM,
  DEFAULT_RETURN_CAR_FORM_ERRORS, ReturnCarBody,
  ReturnCarForm,
  ReturnCarFormErrors, StateOptions
} from '../../models/api/ReturnCar';
import {DEFAULT_RENTAL, Rental} from '../../models/api/Rental';
import {ReturnCarsService} from '../../services/api/returnCar.service';
import {DatePipe, NgIf} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {RentalsService} from '../../services/api/rentals.service';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-return-car-form',
  imports: [
    FormsModule,
    NgIf,
    InputText,
    Textarea,
    DropdownModule,
    ButtonDirective,
    DatePipe
  ],
  templateUrl: './return-car-form.component.html',
  standalone: true,
  styleUrl: './return-car-form.component.scss'
})
export class ReturnCarFormComponent implements OnInit{
  private authService: AuthService = inject(AuthService);
  private returnCarService: ReturnCarsService = inject(ReturnCarsService);
  private rentalService: RentalsService = inject(RentalsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  protected user: WritableSignal<User | null> = this.authService.user;
  protected isAgent: Signal<boolean> = computed(() => !!this.user()?.agency);
  protected states: WritableSignal<string[]> = this.returnCarService.states;
  protected stateWithTranslations: Signal<StateOptions> = computed(() => this.stateToStateWithTranslations(this.states()));
  protected rentals: WritableSignal<Rental[]> = this.rentalService.rentals;
  protected rental: Signal<Rental> = computed(() => this.rentals().
    find((rental) => rental.id === this.rentalId()) ?? DEFAULT_RENTAL);
  protected returnCarResult: Signal<ReturnCarForm | null> = this.returnCarService.returnCarResult
  protected rentalId: WritableSignal<number | null> = signal(null);

  protected returnCarForm: ReturnCarForm = DEFAULT_RETURN_CAR_FORM;
  protected returnCarFormErrors: ReturnCarFormErrors = DEFAULT_RETURN_CAR_FORM_ERRORS;

  constructor() {
    this.restoreReturnCarForm()
    effect(() => {
      if(this.returnCarResult()){
        this.router.navigate(['/cars'])
      }
    });
  }

  ngOnInit(): void {
    this.returnCarService.fetchStates();
    this.rentalService.fetchRentals();

    this.activatedRoute.paramMap.subscribe(async params => {
      const id: string | null = params.get('rentalId');
      this.rentalId.set(Number(id))
    });
  }

  convertFormToBody(returnCarForm: ReturnCarForm): ReturnCarBody{
    return {
      etatInterieur: returnCarForm.interiorState,
      etatExterieur: returnCarForm.exteriorState,
      kilometrage: returnCarForm.milesAfter,
      niveauEssence: returnCarForm.remainFuel,
      commentaire: returnCarForm.commentary,
      date: new Date().toLocaleDateString(),
      idReservation: this.rentalId() ?? -1
    }
  }

  onSubmit(): void{
    const returnCarBody: ReturnCarBody = this.convertFormToBody(this.returnCarForm);
    this.returnCarService.createReturnCar(returnCarBody);
  }

  stateToStateWithTranslations(states: string[]): StateOptions{
    return states.map((state) => ({
      name: state,
      translatedName: this.translateState(state)
    }))
  }

  translateState(state: string): string{
    switch (state){
      case 'POOR': return "Mauvais"
      case 'EXCELLENT': return "Excellent"
      case 'GOOD': return "Bon"
      case 'AVERAGE': return "Correct"
      case 'DAMAGED': return "Endommagé"
      default: return "Non renseigné"
    }
  }

  isValid(): boolean{
    let isValid: boolean = true;
    this.returnCarFormErrors = {...DEFAULT_RETURN_CAR_FORM_ERRORS}

    if(this.returnCarForm.commentary === ""){
      this.returnCarFormErrors.commentary = "Le champs de retour de la voiture est vide";
      isValid = false;
    }
    if(!this.states().includes(this.returnCarForm.interiorState)){
      this.returnCarFormErrors.interiorState = "Le champs d'état intérieur de retour de la voiture est vide";
      isValid = false;
    }
    console.log(this.returnCarForm, "test", this.states())
    if(!this.states().includes(this.returnCarForm.exteriorState)){
      this.returnCarFormErrors.exteriorState = "Le champs d'état extérieur de retour de la voiture est vide"
      isValid = false;
    }
    if(this.returnCarForm.milesAfter < 0){
      this.returnCarFormErrors.milesAfter = "Le nombre de miles doit être remplis"
      isValid = false;
    }
    if(this.returnCarForm.remainFuel < 0 || this.returnCarForm.remainFuel > 100){
      this.returnCarFormErrors.remainFuel = "La quantité d'essence doit être remplis en pourcentage"
      isValid = false;
    }
    return isValid;
  }

  restoreReturnCarForm(): void{
    if(typeof localStorage !== 'undefined'){
      const returnCarForm: string | null = localStorage.getItem('returnCarForm');
      if (this.returnCarForm.rental.id === -1 && returnCarForm) {
        this.returnCarForm = JSON.parse(returnCarForm);
      }
    }
  }
}
