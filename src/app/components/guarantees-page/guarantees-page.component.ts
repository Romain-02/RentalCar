import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuaranteesService } from '../../services/guarantees.service';
import { Guarantees } from '../../models/guarantees';
import { Car } from '../../models/Car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-guarantees-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guarantees-page.component.html',
  styleUrl: './guarantees-page.component.scss'
})
export class GuaranteesPageComponent implements OnInit {
  carId: number | null = null;
  car: Car | null = null;
  guarantees: Guarantees[] = [];
  loading = true;
  error = false;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly guaranteesService = inject(GuaranteesService);
  private readonly carsService = inject(CarsService);

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async params => {
      const id = params.get('carId');
      this.carId = id ? +id : null;

      if (this.carId) {
        try {
          // Récupérer les informations de la voiture
          const cars = await this.carsService.getAllCars();
          this.car = cars.find(car => car.id === this.carId) || null;

          // Récupérer les garanties pour cette voiture
          this.guarantees = await this.guaranteesService.getGuaranteesByCarId(this.carId);
          this.loading = false;
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
          this.error = true;
          this.loading = false;
        }
      }
    });
  }
}
