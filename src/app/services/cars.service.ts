import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Cars} from '../models/Car';
import {firstValueFrom} from 'rxjs';
import {Category} from '../models/Category';
import {Agency} from '../models/Agency';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private HttpClient: HttpClient = inject(HttpClient);

  public async getAllCars(): Promise<Cars> {
    const cars$ = this.HttpClient.get<Cars>(`http://localhost:8000/api/cars`);
    const response: any = await firstValueFrom(cars$);
    return response.data;
  }

}
