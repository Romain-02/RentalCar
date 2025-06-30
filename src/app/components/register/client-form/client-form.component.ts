import {Component, Input} from '@angular/core';
import {User} from '../../../models/api/User';
import {ClientFormErrors} from '../../../models/api/Client';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-client-form',
  imports: [
    FormsModule,
  ],
  templateUrl: './client-form.component.html',
  standalone: true,
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent{
  @Input()
  public clientFormErrors!: ClientFormErrors;
  @Input()
  public isEditing: boolean = false;
  @Input()
  public user!: User;
}
