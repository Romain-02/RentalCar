import { Component } from '@angular/core';
import {RentalListComponent} from '../rental-list/rental-list.component';

@Component({
  selector: 'app-agent-rentals',
  imports: [
    RentalListComponent
  ],
  templateUrl: './agent-rentals.component.html',
  standalone: true,
  styleUrl: './agent-rentals.component.scss'
})
export class AgentRentalsComponent {

}
