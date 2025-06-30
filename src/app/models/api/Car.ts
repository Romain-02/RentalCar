import {Category, DEFAULT_CATEGORY} from './Category';
import {Agency, DEFAULT_AGENCY} from './Agency';

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

export const DEFAULT_CAR: Car = {
  id: -1,
  name: "",
  numberPlate: "",
  brand: "",
  description: "",
  miles: 0,
  state: "AVAILABLE",
  releaseYear: 2025,
  image: "",
  category: DEFAULT_CATEGORY,
  agency: DEFAULT_AGENCY
};

export type Cars = Car[];

export type CarFilter = {
  agencyId: number,
  agencyName: string
}

export type CarFilters = CarFilter[]
