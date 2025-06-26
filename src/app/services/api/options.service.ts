import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Options } from '../../models/Option';
import {catchError, map, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  public options: WritableSignal<Options> = signal([]);

  private readonly urlOptions: string = 'http://localhost:8000/api/urlOptions';

  public fetchAllOptions(): void {
    this.httpClient.get<{ data: Options }>(this.urlOptions).pipe(
      map(res => res.data),
      catchError(() => of([]))
    ).subscribe(data => {
      this.options.set(data);
    });
  }
}
