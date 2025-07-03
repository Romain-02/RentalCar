import {Component, effect, inject, OnInit, WritableSignal} from '@angular/core';
import {User} from '../../models/api/User';
import {Rental} from '../../models/api/Rental';
import {AuthService} from '../../services/auth/auth-service.service';
import {translateString} from "../../services/utils/translateString";
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {RentalsService} from '../../services/api/rentals.service';



@Component({
  selector: 'app-rental-list',
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    RouterLink
  ],
  templateUrl: './rental-list.component.html',
  standalone: true,
  styleUrl: './rental-list.component.scss'
})
export class RentalListComponent implements OnInit{
  private authService: AuthService = inject(AuthService);
  private rentalsService: RentalsService = inject(RentalsService);

  user: User | null = null;
  reservations: Rental[] = [];
  errorMessage: string = '';

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.user = user;
        console.log('User data fetched successfully:', this.user);

        if(!this.user.agency){
          this.authService.getReservations(user.client?.id).subscribe({
            next: (reservations: Rental[]) => {
              this.reservations = reservations;
              console.log('Reservations fetched successfully:', this.reservations);
            },
            error: (err) => {
              console.error('Failed to fetch reservations:', err);
            }
          });
        }else{
          this.authService.getAgentReservations().subscribe({
            next: (reservations: Rental[]) => {
              this.reservations = reservations;
              console.log('Reservations fetched successfully:', this.reservations);
            },
            error: (err) => {
              console.error('Failed to fetch reservations:', err);
            }
          });
        }
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
    this.errorMessage = '';
    this.authService.cancelReservations(id).subscribe({
      next: (message) => {
        console.log('Reservation canceled successfully:', message);
        this.rentalsService.fetchRentals()
      },
      error: (err) => {
        console.error('Failed to cancel reservation:', err);
        this.errorMessage = 'Vous ne pouvez plus annuler la location, la date de début est déjà dépassée.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }

  protected readonly Date = Date;
  protected readonly translateString = translateString;
}
