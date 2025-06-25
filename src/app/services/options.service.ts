import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Option, Options } from '../models/Option';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  public options: WritableSignal<Options> = signal([]);

  private readonly apiUrl = 'http://localhost:8000/api/options';

  public async getAllOptions(): Promise<Options> {
    try {
      const options$ = this.httpClient.get<any>(this.apiUrl);
      const response: any = await firstValueFrom(options$);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des options:', error);
      return [];
    }
  }
}
