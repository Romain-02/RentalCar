import {Component, Input} from '@angular/core';
import {User, UserFormErrors} from '../../../models/api/User';
import {Client, ClientFormErrors, DEFAULT_CLIENT} from '../../../models/api/Client';
import {DEFAULT_DRIVER_INFO, DriverInfo, DriverInfoFormErrors} from '../../../models/api/DriverInfo';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-driver-info-form',
  imports: [
    FormsModule,
  ],
  templateUrl: './driver-info-form.component.html',
  standalone: true,
  styleUrl: './driver-info-form.component.scss'
})
export class DriverInfoFormComponent {
  @Input()
  public driverInfoFormErrors!: DriverInfoFormErrors;
  @Input()
  isEditing: boolean = false;
  @Input()
  public user!: User;
}
