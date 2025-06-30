import {Component, Input, OnInit} from '@angular/core';
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
export class ClientFormComponent implements OnInit{
  @Input()
  public clientFormErrors!: ClientFormErrors;
  @Input()
  public isEditing!: boolean;
  @Input()
  public user!: User;

  ngOnInit(): void {
    console.log(this.user, "user ", this.isEditing)
  }


}
