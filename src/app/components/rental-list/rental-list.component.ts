import { Component } from '@angular/core';
import {User} from '../../models/api/User';
import {Rental} from '../../models/api/Rental';
import {AuthService} from '../../services/auth/auth-service.service';
import {translateString} from "../../services/utils/translateString";
import {DatePipe, NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-rental-list',
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
  ],
  templateUrl: './rental-list.component.html',
  standalone: true,
  styleUrl: './rental-list.component.scss'
})
export class RentalListComponent {
  user: User | null = null;
  reservations: Rental[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.user = user;
        console.log('User data fetched successfully:', this.user);

        this.authService.getReservations(user.client?.id).subscribe({
          next: (reservations: Rental[]) => {
            this.reservations = reservations;
            console.log('Reservations fetched successfully:', this.reservations);
          },
          error: (err) => {
            console.error('Failed to fetch reservations:', err);
          }
        });
      },
      error: (err) => {
        console.error('Failed to fetch user data:', err);
      }
    });
    console.log("RENTAL", this.reservations);
  }

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
