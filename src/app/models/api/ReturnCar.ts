import {DEFAULT_RENTAL, Rental} from './Rental';

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

export type ReturnCarForm = {
  milesAfter: number,
  interiorState: string,
  exteriorState: string,
  commentary: string,
  remainFuel: number,
  rental: Rental
}

export const DEFAULT_RETURN_CAR_FORM: ReturnCarForm  = {
  milesAfter: 0,
  interiorState: "",
  exteriorState: "",
  commentary: "",
  remainFuel: 0,
  rental: DEFAULT_RENTAL
}

export type ReturnCarBody  = {
  etatInterieur: string,
  etatExterieur: string,
  kilometrage: number,
  niveauEssence: number,
  commentaire: string,
  date: string,
  idReservation: number
}

export type ReturnCarFormErrors = {
  milesAfter: string,
  interiorState: string,
  exteriorState: string,
  commentary: string,
  remainFuel: string,
  rental: string
}

export const DEFAULT_RETURN_CAR_FORM_ERRORS: ReturnCarFormErrors  = {
  milesAfter: "",
  interiorState: "",
  exteriorState: "",
  commentary: "",
  remainFuel: "",
  rental: ""
}

export type StateOption = {
  name: string,
  translatedName: string
}

export type StateOptions = StateOption[]
