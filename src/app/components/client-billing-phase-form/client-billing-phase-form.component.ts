import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// ==============================================


@Component({
  selector: 'app-client-billing-phase-form',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './client-billing-phase-form.component.html',
  styleUrl: './client-billing-phase-form.component.scss'
})
export class ClientBillingPhaseFormComponent {
  public billingInformations = {
    billingAdress: "",
    country: '',
    city: '',
    postalCode: ''
  };
  @Input() phaseNumber!: number;

  protected submit(): void {

  }

}
