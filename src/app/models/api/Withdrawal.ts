import { User } from '../User';
import { Rental } from './Rental';

// ==============================================


export type Withdrawal = {
  id: number,
  milesBefore: number,
  interiorState: string,
  exteriorState: string,
  commentary: string,
  fuel: number,
  rental: Rental,
  client: User
};
