export type Agency = {
  id: number,
  name: string,
  postalCode: string,
  city: string,
  address: string,
  phone: string,
  mail: string
};

export const DEFAULT_AGENCY: Agency = {
  id: -1,
  name: "",
  postalCode: "",
  city: "",
  address: "",
  phone: "",
  mail: ""
};

export type Agencies = Agency[];
