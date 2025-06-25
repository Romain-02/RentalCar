import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, firstValueFrom, map, of} from 'rxjs';
import {Agencies} from '../../models/Agency';

@Injectable({
  providedIn: 'root',
})
export class AgenciesService {

  private readonly urlAgencies: string = 'http://localhost:8000/api/agencies';
  private readonly httpClient: HttpClient = inject(HttpClient);

  public readonly agencies: WritableSignal<Agencies> = signal<Agencies>([]);

  public fetchAgencies(): void {
    this.httpClient.get<{ data: Agencies }>(this.urlAgencies).pipe(
      map(res => res.data),
      catchError(() => of([]))
    ).subscribe(data => {
      console.log(data, "her")
      this.agencies.set(data);
    });
  }
}
