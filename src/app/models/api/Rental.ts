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
