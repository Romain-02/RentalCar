import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// ==============================================


@Component({
  selector: 'app-client-driver-phase-form',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './client-driver-phase-form.component.html',
  styleUrl: './client-driver-phase-form.component.scss'
})
export class ClientDriverPhaseFormComponent {
  public driverInformations: any = {
    drivingLicenseNumber: '',
    drivingLicenseAcquisition: '',
    drivingLicenseValidation: '',
    drivingLicenseCountry: '',
    birthDate: '',
  };
  @Input() phaseNumber!: number;

  protected submit(): void{

  }

}
