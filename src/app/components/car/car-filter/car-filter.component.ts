import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {AgenciesService} from '../../../services/api/agencies.service';
import {Agencies, Agency, AgencyFilters} from '../../../models/Agency';
import {CarsService} from '../../../services/api/cars.service';
import {DropdownModule} from 'primeng/dropdown';

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
  protected agenciesWithAll: Signal<AgencyFilters> = computed(() => [
    { id: 0, name: 'Toutes les agences' },
    ...this.agencies()
  ]);

  public setAgencyFilter(agency: Agency): void{
    if(agency.id === 0){
      this.carsService.fetchCars();
      return;
    }
    this.carsService.fetchCarsByAgency(agency.id);
  }

  ngOnInit(): void {
    this.agenciesService.fetchAgencies();
  }
}
