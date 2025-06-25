import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {AgenciesService} from '../../../services/api/agencies.service';
import {Agencies, Agency} from '../../../models/api/Agency';
import {CarsService} from '../../../services/api/cars.service';
import {DropdownModule} from 'primeng/dropdown';
import {CarFilter, CarFilters} from '../../../models/api/Car';

@Component({
  selector: 'app-car-filter',
  imports: [
    DropdownModule
  ],
  templateUrl: './car-filter.component.html',
  standalone: true,
  styleUrl: './car-filter.component.scss'
})
export class CarFilterComponent implements OnInit{
  protected carsService: CarsService = inject(CarsService);
  protected agenciesService: AgenciesService = inject(AgenciesService);

  protected agencies: WritableSignal<Agencies> = this.agenciesService.agencies;
  protected agenciesWithAll: Signal<CarFilters> = computed(() =>
    this.agenciesToCarFilters(this.agencies()));

  public agenciesToCarFilters(agencies: Agencies): CarFilters{
    return [
      { agencyId: 0, agencyName: 'Toutes les agences' },
      ...(agencies.map((agency): CarFilter =>
        ({agencyId: agency.id, agencyName: agency.name})))
    ]
  }

  public setAgencyFilter(carFilter: CarFilter): void{
    if(carFilter.agencyId === 0){
      this.carsService.fetchCars();
      return;
    }
    this.carsService.fetchCarsByAgency(carFilter.agencyId);
  }

  ngOnInit(): void {
    this.agenciesService.fetchAgencies();
  }
}
