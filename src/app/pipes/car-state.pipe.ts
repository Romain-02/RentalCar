import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'carState'
})
export class CarStatePipe implements PipeTransform {

  transform(value: string): string {
    if(value === "BOOKED") return "Réservé";
    if(value === "AVAILABLE") return "Disponible";
    if(value === "MAINTENANCE") return "Maintenance";
    return "Réservé";
  }

}
