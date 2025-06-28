// Types
import { Withdrawal } from './Withdrawal';
import {ReturnCar} from './ReturnCar';
import {Car} from './Car';
import {Guarantees} from './Guarantee';
import {User} from './User';

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

export type RentalFormErrors = {
  name: string,
  password: string,
  email: string
  firstname: string,
  lastname: string,
  city: string,
  postalCode: string,
  phone: string,
  country: string,
  billingAdress: string,
  drivingLicenseNumber: string,
  drivingLicenseCountry: string
};

export const DEFAULT_RENTAL_FORM_ERRORS: RentalFormErrors = {
  name: "",
  password: "",
  email: "",
  firstname: "",
  lastname: "",
  city: "",
  postalCode: "",
  phone: "",
  country: "",
  billingAdress: "",
  drivingLicenseNumber: "",
  drivingLicenseCountry: ""
};
