import {Component, inject} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ClientsService} from '../../services/api/clients.service';
import {Router} from '@angular/router';

// ==============================================


@Component({
  selector: 'app-client-billing-phase-form',
  imports: [ReactiveFormsModule, FormsModule],
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
  private clientService: ClientsService = inject(ClientsService);
  private router: Router = inject(Router)

  protected submit(): void {
    this.clientService.addClientBillingInformations(this.billingInformations);
    this.router.navigate(['/']);
  }

}
