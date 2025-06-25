import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuaranteesService } from '../../services/guarantees.service';
import { Guarantees } from '../../models/guarantees';
import { Car } from '../../models/Car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-guarantees-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './guarantees-page.component.html',
  styleUrl: './guarantees-page.component.scss'
})
export class GuaranteesPageComponent implements OnInit {
  carId: number | null = null;
  car: Car | null = null;
  guarantees: Guarantees[] = [];
  selectedGuarantee: number | null = null;
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

          // Récupérer toutes les garanties disponibles
          this.guarantees = await this.guaranteesService.getAllGuarantees();
          this.loading = false;
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
          this.error = true;
          this.loading = false;
        }
      }
    });
  }

  selectGuarantee(guaranteeId: number): void {
    this.selectedGuarantee = guaranteeId;
  }

  isGuaranteeSelected(guaranteeId: number): boolean {
    return this.selectedGuarantee === guaranteeId;
  }
}
