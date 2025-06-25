import { Category } from './Category';
import { Agency } from './Agency';

// ==============================================


export type Car = {
  id: number,
  name: string,
  numberPlate: string,
  brand: string,
  description: string,
  miles: number,
  state: string,
  releaseYear: number,
  image: string,
  category: Category,
  agency: Agency
};

export type Cars = Car[];
