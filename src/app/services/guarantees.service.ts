import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Guarantees } from '../models/guarantees';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuaranteesService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  public guarantees: WritableSignal<Guarantees[]> = signal([]);

  private readonly apiUrl = 'http://localhost:8000/api/guarantees';

  public async getAllGuarantees(): Promise<Guarantees[]> {
    try {
      const guarantees$ = this.httpClient.get<any>(this.apiUrl);
      const response: any = await firstValueFrom(guarantees$);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des garanties:', error);
      return [];
    }
  }
}
