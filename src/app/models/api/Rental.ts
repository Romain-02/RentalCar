// Types
import { Guarantees } from '../guarantees';
import { Withdrawal } from './Withdrawal';
import { User } from '../User';
import {ReturnCar} from './ReturnCar';
import {Car} from './Car';

// ==============================================


export type Rental = {
  id: number,
  state: string,
  startDate: string,
  endDate: string,
  withdrawal: Withdrawal | null,
  "client": User,
  "guarantee": Guarantees,
  "bill": null,
  "returnCar": ReturnCar | null,
  "additionalClause": null,
  "car": Car
};
