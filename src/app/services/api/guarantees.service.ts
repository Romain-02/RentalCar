import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Guarantees } from '../../models/guarantees';
import {catchError, firstValueFrom, map, of} from 'rxjs';
import {Cars} from '../../models/api/Car';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuaranteesService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  public guarantees: WritableSignal<Guarantees> = signal([]);

  private readonly urlGuarantees: string = environment.apiUrl + '/guarantees';

  public fetchAllGuarantees(): void {
    this.httpClient.get<{ data: Guarantees }>(this.urlGuarantees).pipe(
      map(res => res.data),
      catchError(() => of([]))
    ).subscribe(data => {
      this.guarantees.set(data);
    });
  }
}
