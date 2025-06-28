import {Component, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PasswordDirective} from 'primeng/password';
import {InputText} from 'primeng/inputtext';
import {User, UserFormErrors} from '../../../models/api/User';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    PasswordDirective,
    InputText
  ],
  templateUrl: './login-form.component.html',
  standalone: true,
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Input()
   userFormErrors!: UserFormErrors;
  @Input()
  user: Partial<User> = {email: "", password: ""}
}
