import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/api/User';
import {DriverInfoFormErrors} from '../../../models/api/DriverInfo';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-driver-info-form',
  imports: [
    FormsModule,
    InputText,
  ],
  templateUrl: './driver-info-form.component.html',
  standalone: true,
  styleUrl: './driver-info-form.component.scss'
})
export class DriverInfoFormComponent{
  @Input()
  public driverInfoFormErrors!: DriverInfoFormErrors;
  @Input()
  isEditing: boolean = false;
  @Input()
  public user!: User;
}
