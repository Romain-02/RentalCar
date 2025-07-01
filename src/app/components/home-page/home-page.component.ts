import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { CarsService } from '../../services/api/cars.service';
import { Cars } from '../../models/api/Car';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
})
export class HomePageComponent implements OnInit {
  private carsService: CarsService = inject(CarsService);
  private router: Router = inject(Router);

  protected cars: WritableSignal<Cars> = this.carsService.cars;

  private currentIndex = 0;

  public get transform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  public ngOnInit(): void {
    this.carsService.fetchCars();
  }

  public nextSlide(): void {
    if (this.currentIndex < this.cars().length - 1) {
      this.currentIndex++;
    }
  }

  public prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Naviguer vers liste des agences
  public navigateToAgencies(): void {
    this.router.navigate(['/list-agency']);
  }

  // Naviguer vers la liste des voitures
  public navigateToCars(): void {
    this.router.navigate(['/cars']);
  }

  // Récup la lamborghini
  public getLamborghiniId(): number | null{
    const lamborghini = this.cars().find(car =>
    car.name.toLowerCase().includes('lamborghini') && car.name.toLowerCase().includes('huracán')
    );
    return lamborghini ? lamborghini.id : null;
  }

  // Pour utiliser dans le template
  public navigateToLamborghini(): void {
    const lambId = this.getLamborghiniId();
    if (lambId) {
      this.router.navigate(['/guarantees', lambId]);
    }
  }
}
