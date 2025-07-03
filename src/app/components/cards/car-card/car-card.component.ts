import {Component, inject, Input, WritableSignal} from '@angular/core';
import {Car} from '../../../models/api/Car';
import {RouterLink} from '@angular/router';
import {CarStatePipe} from '../../../pipes/car-state.pipe';
import {NgClass} from '@angular/common';
import {AuthService} from '../../../services/auth/auth-service.service';
import {User} from '../../../models/api/User';
import {ClientsService} from '../../../services/api/clients.service';
import {Favorite} from '../../../models/api/Client';

// ==============================================

export type FavoriteResponse = {
  message: string,
  favorites: Favorite[]
}

@Component({
  selector: 'app-car-card',
  imports: [
    RouterLink,
    CarStatePipe,
    NgClass
  ],
  templateUrl: './car-card.component.html',
  standalone: true,
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent {
  private authService: AuthService = inject(AuthService);
  private clientService: ClientsService = inject(ClientsService);

  private user: WritableSignal<User | null> = this.authService.user;

  @Input() car!: Car;
  @Input() isProfile!: boolean;

  isFavorite(): boolean{
    if(!this.isProfile && this.car.clients){
      return this.car.clients.some((client) => client.id === this.user()?.client?.id)
    }
    return false;
  }

  favorite(car_id: number): void{
    const user: User | null = this.user();
    if(user && user?.client){
      this.clientService.favorite({
        car_id: car_id,
        client_id: user.client.id
      });
    }
  }

  getStateClasses(state: string): string {
    switch (state) {
      case 'AVAILABLE':
        return 'bg-green-600/90 shadow-green-500/25';
      case 'BOOKED':
        return 'bg-red-600/90 shadow-red-500/25';
      case 'MAINTENANCE':
        return 'bg-blue-600/90 shadow-blue-500/25';
      case 'REPARATION':
        return 'bg-orange-600/90 shadow-orange-500/25';
      default:
        return 'bg-gray-600/90 shadow-gray-500/25';
    }
  }

  getButtonClasses(state: string): string {
    switch (state) {
      case 'AVAILABLE':
        return 'bg-green-700 hover:bg-green-800 text-white cursor-pointer hover:shadow-xl';
      case 'BOOKED':
        return 'bg-red-100 text-red-700 cursor-not-allowed opacity-75';
      case 'MAINTENANCE':
        return 'bg-blue-100 text-blue-700 cursor-not-allowed opacity-75';
      case 'REPARATION':
        return 'bg-orange-100 text-orange-700 cursor-not-allowed opacity-75';
      default:
        return 'bg-gray-100 text-gray-700 cursor-not-allowed opacity-75';
    }
  }

  getButtonText(state: string): string {
    switch (state) {
      case 'AVAILABLE':
        return 'Réserver';
      case 'BOOKED':
        return 'Indisponible';
      case 'MAINTENANCE':
        return 'En maintenance';
      case 'REPARATION':
        return 'En réparation';
      default:
        return 'Indisponible';
    }
  }
}
