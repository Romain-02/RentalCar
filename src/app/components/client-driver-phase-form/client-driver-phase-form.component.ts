import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ClientsService} from '../../services/api/clients.service';

// ==============================================


@Component({
  selector: 'app-client-driver-phase-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './client-driver-phase-form.component.html',
  styleUrl: './client-driver-phase-form.component.scss'
})
export class ClientDriverPhaseFormComponent {
  @Input() phaseNumber!: number;
  @Output() phaseChange = new EventEmitter<any>();
  public driverInformations: any = {
    drivingLicenseNumber: '',
    drivingLicenseAcquisition: '',
    drivingLicenseValidation: '',
    drivingLicenseCountry: '',
    birthDate: '',
  };
  private clientService: ClientsService = inject(ClientsService);

  public setPhase = (phase: number): void => this.phaseChange.emit(phase);

  protected submit(): void{
    this.clientService.createDriverInfos(this.driverInformations);
    this.setPhase(3);
  }

}
