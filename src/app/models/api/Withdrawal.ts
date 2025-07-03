import { Rental } from './Rental';
import {User} from './User';

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

export type WithdrawalResponse = {
  message: string,
  data: Withdrawal,
  success: true
};
