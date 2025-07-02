import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from '../../models/api/User';
import {Rental} from '../../models/api/Rental';
import {AuthService} from '../../services/auth/auth-service.service';
import {translateString} from "../../services/utils/translateString";
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Cars} from '../../models/api/Car';



@Component({
  selector: 'app-rental-list',
  imports: [
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './rental-list.component.html',
  standalone: true,
  styleUrl: './rental-list.component.scss'
})
export class RentalListComponent{
  @Input()
  public parentCars: Cars | undefined = undefined;
  user: User | null = null;
  reservations: Rental[] = [];

  constructor(private authService: AuthService) { }

  trackByReservationId(index: number, reservation: Rental): any {
    return reservation.id;
  }

  cancelReservation(id: any): void {
    this.authService.cancelReservations(id).subscribe({
      next: (message) => {
        console.log('Reservation canceled successfully:', message);
        this.reservations = this.reservations.filter(reservation => reservation.id !== id);
      },
      error: (err) => {
        console.error('Failed to cancel reservation:', err);
      }
    });
  }

  protected readonly Date = Date;
  protected readonly translateString = translateString;

}
