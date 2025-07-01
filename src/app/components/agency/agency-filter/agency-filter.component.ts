import {Component, computed, inject, OnInit, Signal, WritableSignal} from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {AgenciesService} from '../../../services/api/agencies.service';
import {Agencies} from '../../../models/api/Agency';
import {ParamService} from '../../../services/utils/ParamService';
import {DEFAULT_VALUE_ORDER, orders} from '../../../models/filter/Orders';

const DEFAULT_VALUE_FILTER: string = "Tous"

@Component({
  selector: 'app-agency-filter',
  imports: [
    DropdownModule
  ],
  templateUrl: './agency-filter.component.html',
  standalone: true,
  styleUrl: './agency-filter.component.scss'
})
export class AgencyFilterComponent{
  protected paramService: ParamService = inject(ParamService);
  protected agenciesService: AgenciesService = inject(AgenciesService);

  private filters: Map<string, string> = new Map();

  protected agencies: WritableSignal<Agencies> = this.agenciesService.agencies;
  protected cityFilters: Signal<string[]> = computed(() => this.agenciesToCities(this.agencies()));
  protected postalCodeFilters: Signal<string[]> = computed(() => this.agenciesToPostalCodes(this.agencies()));

  public agenciesToCities(agencies: Agencies): string[]{
    return this.addDefaultValueToList(agencies.map((agency) => agency.city));
  }

  public agenciesToPostalCodes(agencies: Agencies): string[]{
    return this.addDefaultValueToList(agencies.map((agency) => agency.postalCode));
  }

  public addDefaultValueToList(list: string[]): string[]{
    list.sort();
    return [DEFAULT_VALUE_FILTER, ...list]
  }

  public addAgencyFilter(filterName: string, value: string): void{
    if([DEFAULT_VALUE_ORDER, DEFAULT_VALUE_FILTER].includes(value)){
      this.filters.delete(filterName);
    }else{
      this.filters.set(filterName, value);
    }

    const queryParams: string = this.paramService.mapToQueryParam(this.filters);
    this.agenciesService.fetchAgencies(queryParams);
  }

  protected readonly orders = orders;
}
