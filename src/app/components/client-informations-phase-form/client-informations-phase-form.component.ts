import {Component, inject, Input, OnInit, Signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../services/api/clients.service';

// ==============================================


@Component({
  selector: 'app-client-informations-phase-form',
  imports: [
    FormsModule
  ],
  templateUrl: './client-informations-phase-form.component.html',
  styleUrl: './client-informations-phase-form.component.scss'
})
export class ClientInformationsPhaseFormComponent implements OnInit {
  private clientService: ClientsService = inject(ClientsService);
  public clientInformations: any = {
    firstName: '',
    lastName: '',
    phone: '',
    userId: 1
  };
  protected usersList: Signal<any[]> = this.clientService.users;
  @Input() phaseNumber!: number;

  public ngOnInit(): void {
    this.clientService.fetchUsers();
  }

  protected submit(): void {
    this.clientService.createClient(this.clientInformations);
  }

}
