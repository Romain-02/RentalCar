import { Component } from '@angular/core';
import { ClientInformationsPhaseFormComponent } from '../client-informations-phase-form/client-informations-phase-form.component';
import { ClientDriverPhaseFormComponent } from '../client-driver-phase-form/client-driver-phase-form.component';
import { ClientBillingPhaseFormComponent } from '../client-billing-phase-form/client-billing-phase-form.component';

// ==============================================


@Component({
  selector: 'app-client-creation-form',
  imports: [ ClientInformationsPhaseFormComponent, ClientDriverPhaseFormComponent, ClientBillingPhaseFormComponent ],
  templateUrl: './client-creation-form.component.html',
  styleUrl: './client-creation-form.component.scss'
})
export class ClientCreationFormComponent {
  public phaseNumber: number = 1;

}
