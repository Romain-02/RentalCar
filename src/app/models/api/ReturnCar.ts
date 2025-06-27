import { Rental } from './Rental';

// ==============================================


export type ReturnCar = {
  id: number,
  milesAfter: number,
  interiorState: string,
  exteriorState: string,
  commentary: string,
  remainFuel: number,
  rental: Rental
};
