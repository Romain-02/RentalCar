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

  public async fetchGuarantees(): Promise<void> {
    const guarantees$ = this.httpClient.get<any>(this.apiUrl);
    const response: any = await firstValueFrom(guarantees$);
    this.guarantees.set(response.data);
  }

  public async getGuaranteeById(id: number): Promise<Guarantees | null> {
    try {
      const guarantee$ = this.httpClient.get<any>(`${this.apiUrl}/${id}`);
      const response: any = await firstValueFrom(guarantee$);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la garantie:', error);
      return null;
    }
  }

  public async getGuaranteesByCarId(carId: number): Promise<Guarantees[]> {
    try {
      const guarantees$ = this.httpClient.get<any>(`${this.apiUrl}?car_id=${carId}`);
      const response: any = await firstValueFrom(guarantees$);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des garanties pour la voiture:', error);
      return [];
    }
  }
}
