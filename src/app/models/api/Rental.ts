// Types
import { Withdrawal } from './Withdrawal';
import {ReturnCar} from './ReturnCar';
import {Car, DEFAULT_CAR} from './Car';
import {DEFAULT_GUARANTEE, Guarantee} from './Guarantee';
import {Options} from './Option';
import {Client, DEFAULT_CLIENT} from './Client';

// ==============================================


export type Rental = {
  id: number,
  state: string,
  startDate: string,
  endDate: string,
  withdrawal: Withdrawal | null,
  client: Client,
  guarantee: Guarantee,
  bill: null,
  returnCar: ReturnCar | null,
  additionalClause: null,
  car: Car
};

export const DEFAULT_RENTAL: Rental = {
  id: -1,
  state: "",
  startDate: "",
  endDate: "",
  withdrawal: null,
  client: DEFAULT_CLIENT,
  guarantee: DEFAULT_GUARANTEE,
  bill: null,
  returnCar: null,
  additionalClause: null,
  car: DEFAULT_CAR
};

export type RentalBody = {
  startDate: Date,
  endDate: Date,
  client: Client,
  guarantee: Guarantee,
  options: Options,
  car: Car
};

export const DEFAULT_RENTAL_BODY: RentalBody = {
  startDate: new Date(),
  endDate: new Date(),
  client: DEFAULT_CLIENT,
  guarantee: DEFAULT_GUARANTEE,
  options: [],
  car: DEFAULT_CAR
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

export type RentalValidation = {
  isValid: boolean,
  rentalFormErrors: RentalFormErrors
}
