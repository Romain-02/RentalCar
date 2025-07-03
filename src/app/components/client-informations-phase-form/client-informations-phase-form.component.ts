import { Component, inject, Input, OnInit, Output, Signal, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../services/api/clients.service';

// ==============================================


@Component({
  selector: 'app-client-informations-phase-form',
  imports: [FormsModule],
  templateUrl: './client-informations-phase-form.component.html',
  styleUrl: './client-informations-phase-form.component.scss'
})
export class ClientInformationsPhaseFormComponent implements OnInit {
  @Input() phaseNumber!: number;
  @Output() phaseChange = new EventEmitter<any>();
  public clientInformations: any = {
    firstName: '',
    lastName: '',
    phone: '',
    userId: 1
  };
  private clientService: ClientsService = inject(ClientsService);
  protected usersList: Signal<any[]> = this.clientService.users;

  public ngOnInit(): void {
    this.clientService.fetchUsers();
  }

  public setPhase = (phase: number): void => this.phaseChange.emit(phase);

  protected submit(): void {
    this.clientService.createClient(this.clientInformations);
    this.setPhase(2);
  }

}
