export type Agency = {
  id: number,
  name: string,
  postalCode: string,
  city: string,
  address: string,
  phone: string,
  mail: string
};

export type Agencies = Agency[];

export type AgencyFilter = {
  id: number,
  name: string
}

export type AgencyFilters = AgencyFilter[]
