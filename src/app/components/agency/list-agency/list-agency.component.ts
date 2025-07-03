import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {AgenciesService} from '../../../services/api/agencies.service';
import {Agencies} from '../../../models/api/Agency';
import {CarFilterComponent} from '../../car/car-filter/car-filter.component';
import {AgencyFilterComponent} from '../agency-filter/agency-filter.component';
import {Router} from '@angular/router';
import {CarsService} from '../../../services/api/cars.service';

@Component({
  selector: 'app-list-agency',
  imports: [
    TableModule,
    AgencyFilterComponent
  ],
  templateUrl: './list-agency.component.html',
  standalone: true,
  styleUrl: './list-agency.component.scss'
})
export class ListAgencyComponent implements OnInit{
  protected agenciesService: AgenciesService = inject(AgenciesService);
  protected router: Router = inject(Router);

  protected agencies: WritableSignal<Agencies> = this.agenciesService.agencies;

  ngOnInit(): void {
    this.agenciesService.fetchAgencies();
  }

  clickAgency(agencyId: number): void{
    this.router.navigate(['/cars']);
    localStorage.setItem('agencyId', JSON.stringify(agencyId))
  }

  protected readonly length = length;
}
