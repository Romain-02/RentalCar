import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {PasswordDirective} from 'primeng/password';
import {User, UserFormErrors} from '../../../models/api/User';

@Component({
  selector: 'app-user-form',
  imports: [
    FormsModule,
    InputText,
    PasswordDirective
  ],
  templateUrl: './user-form.component.html',
  standalone: true,
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input()
  public userFormErrors!: UserFormErrors;
  @Input()
  user!: User;
}
