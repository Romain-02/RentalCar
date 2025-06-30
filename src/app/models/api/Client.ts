import {DEFAULT_USER_WITHOUT_CLIENT, User} from './User';
import {DEFAULT_DRIVER_INFO, DriverInfo} from './DriverInfo';

export type Client = {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  city: string,
  country: string,
  postalCode: string,
  phone: string,
  billingAdress: string,
  user: User,
  driverInfo: DriverInfo
}

export const DEFAULT_CLIENT: Client = {
  id: -1,
  firstname: "",
  lastname: "",
  email: "",
  city: "",
  country: "",
  postalCode: "",
  phone: "",
  billingAdress: "",
  user: DEFAULT_USER_WITHOUT_CLIENT,
  driverInfo: DEFAULT_DRIVER_INFO
}

export type Clients = Client[]

export type ClientFormErrors = {
  firstname: string,
  lastname: string,
  city: string,
  postalCode: string,
  phone: string,
  country: string,
  billingAdress: string
};

export const DEFAULT_CLIENT_FORM_ERRORS: ClientFormErrors = {
  firstname: "",
  lastname: "",
  city: "",
  postalCode: "",
  phone: "",
  country: "",
  billingAdress: ""
};
