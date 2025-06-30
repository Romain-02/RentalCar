import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/api/User';
import {DriverInfoFormErrors} from '../../../models/api/DriverInfo';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-driver-info-form',
  imports: [
    FormsModule,
  ],
  templateUrl: './driver-info-form.component.html',
  standalone: true,
  styleUrl: './driver-info-form.component.scss'
})
export class DriverInfoFormComponent{
  @Input()
  public driverInfoFormErrors!: DriverInfoFormErrors;
  @Input()
  public isEditing!: boolean;
  @Input()
  public user!: User;
}
