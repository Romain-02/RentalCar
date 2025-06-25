import {Component, effect, inject, OnInit, WritableSignal} from '@angular/core';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {AgenciesService} from '../../services/agencies/agencies.service';
import {Agencies} from '../../models/Agency';

@Component({
  selector: 'app-list-agency',
  imports: [
    TableModule
  ],
  templateUrl: './list-agency.component.html',
  standalone: true,
  styleUrl: './list-agency.component.scss'
})
export class ListAgencyComponent implements OnInit{

  protected agenciesService: AgenciesService = inject(AgenciesService);
  protected agencies: WritableSignal<Agencies> = this.agenciesService.agencies;

  ngOnInit(): void {
    this.agenciesService.fetchAgencies();
  }

}
