import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, firstValueFrom, map, of} from 'rxjs';
import {Agencies} from '../../models/api/Agency';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgenciesService {

  private readonly urlAgencies: string = environment.apiUrl + '/agencies';
  private readonly httpClient: HttpClient = inject(HttpClient);

  public readonly agencies: WritableSignal<Agencies> = signal<Agencies>([]);

  public fetchAgencies(queryParams: string = ""): void {
    this.httpClient.get<{ data: Agencies }>(this.urlAgencies + queryParams).pipe(
      map(res => res.data),
      catchError(() => of([]))
    ).subscribe(data => {
      this.agencies.set(data);
    });
  }
}
