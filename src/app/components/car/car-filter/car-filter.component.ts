import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {AgenciesService} from '../../../services/api/agencies.service';
import {Agencies, Agency} from '../../../models/api/Agency';
import {CarsService} from '../../../services/api/cars.service';
import {DropdownModule} from 'primeng/dropdown';
import {CarFilter, CarFilters} from '../../../models/api/Car';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-car-filter',
  imports: [
    DropdownModule,
    FormsModule,
    CalendarModule
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

  protected selectedStartDate : WritableSignal<Date | null> = signal(null);
  protected selectedEndDate : WritableSignal<Date | null> = signal(null);
  protected selectedAgency : WritableSignal<CarFilter | null> = signal(null);

  protected minDate: Date = new Date();

  public agenciesToCarFilters(agencies: Agencies): CarFilters{
    return [
      { agencyId: 0, agencyName: 'Toutes les agences' },
      ...(agencies.map((agency): CarFilter =>
        ({agencyId: agency.id, agencyName: agency.name})))
    ]
  }

  /*public setAgencyFilter(carFilter: CarFilter): void{
    if(carFilter.agencyId === 0){
      this.carsService.fetchCars();
      return;
    }
    this.carsService.fetchCarsByAgency(carFilter.agencyId);
  }*/

  public setAgencyFilter(carFilter: CarFilter): void{
    this.selectedAgency.set(carFilter);
    this.applyFilters();
  }

  public onStartDateChange(): void {
    console.log('Date début changée:', this.selectedStartDate());

    // Si la date de fin est antérieure à la nouvelle date de début, la réinitialiser
    if (this.selectedEndDate() && this.selectedStartDate() &&
      this.selectedStartDate()! > this.selectedEndDate()!) {
      this.selectedEndDate.set(null);
    }
    this.applyFilters();
  }

  public onEndDateChange(): void {
    console.log('Date fin changée:', this.selectedEndDate());
    this.applyFilters();
  }

  private applyFilters(): void {
    const startDate = this.selectedStartDate();
    const endDate = this.selectedEndDate();
    const agency = this.selectedAgency();

    console.log('Application des filtres:', {
      startDate: startDate ? this.formatDate(startDate) : null,
      endDate: endDate ? this.formatDate(endDate) : null,
      agency: agency?.agencyId
    });

    if (startDate && endDate) {
      const startDateStr = this.formatDate(startDate);
      const endDateStr = this.formatDate(endDate);
      this.carsService.fetchAvailableCars(startDateStr, endDateStr);
    } else {
      if (agency && agency.agencyId !== 0) {
        this.carsService.fetchCarsByAgency(agency.agencyId);
      } else {
        this.carsService.fetchCars();
      }
    }
  }

  private formatDate(date: Date): string {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }

  public resetFilters(): void {
    this.selectedStartDate.set(null);
    this.selectedEndDate.set(null);
    this.selectedAgency.set({ agencyId: 0, agencyName: 'Toutes les agences' });
    this.carsService.fetchCars();
  }

  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      const agencyId: string | null = localStorage.getItem('agencyId')
      if(agencyId){
        localStorage.removeItem('agencyId')
        this.carsService.fetchCarsByAgency(Number(agencyId));
        return;
      }
    }
    this.agenciesService.fetchAgencies();
  }
}
