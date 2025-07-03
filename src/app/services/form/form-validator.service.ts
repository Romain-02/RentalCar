import { Injectable } from '@angular/core';
import {DEFAULT_RENTAL_FORM_ERRORS, RentalFormErrors, RentalValidation} from '../../models/api/Rental';
import {User} from '../../models/api/User';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  getEmptyFieldError(field: string): string{
    return `Le champs ${field} ne peut pas être vide`;
  }

  isFirstStepValid(user: User, alreadyAccount: boolean, rentalFormErrors: RentalFormErrors = DEFAULT_RENTAL_FORM_ERRORS): RentalValidation{
    rentalFormErrors = {...rentalFormErrors};
    let isValid: boolean = true;
    if(!user.email){
      rentalFormErrors.email = this.getEmptyFieldError("email")
      isValid = false;
    }
    if(user.password.length < 6){
      rentalFormErrors.password = "Le mot de passe doit faire au moins 6 caractères"
      isValid = false;
    }
    if(!user.name && alreadyAccount){
      rentalFormErrors.name = this.getEmptyFieldError("name")
      isValid = false;
    }
    return {isValid: isValid, rentalFormErrors}
  }

  isSecondStepValid(user: User, rentalFormErrors: RentalFormErrors = DEFAULT_RENTAL_FORM_ERRORS): RentalValidation{
    rentalFormErrors = {...rentalFormErrors};
    console.log("à l'int", rentalFormErrors)
    let isValid: boolean = true;

    if(!user.client?.firstname){
      rentalFormErrors.firstname = this.getEmptyFieldError("prénom")
      isValid = false;
    }
    if(!user.client?.lastname){
      rentalFormErrors.lastname = this.getEmptyFieldError("nom")
      isValid = false;
    }
    if(!user.client?.city){
      rentalFormErrors.city = this.getEmptyFieldError("ville")
      isValid = false;
    }
    if(!user.client?.country){
      rentalFormErrors.country = this.getEmptyFieldError("pays")
      isValid = false;
    }
    if(!(/^[0-9]{5}$/.test(user.client?.postalCode ?? ""))){
      rentalFormErrors.postalCode = "Le code postal doit être composé de 5 chiffres";
      isValid = false;
    }
    if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(user.client?.phone || '')) {
      rentalFormErrors.phone = "Le numéro de téléphone n'a pas le bon format";
      isValid = false;
    }
    if(!user.client?.billingAdress){
      rentalFormErrors.billingAdress = this.getEmptyFieldError("adresse de facturation")
      isValid = false;
    }
    return {isValid: isValid, rentalFormErrors: rentalFormErrors}
  }

  isThridStepValid(user: User, rentalFormErrors: RentalFormErrors = DEFAULT_RENTAL_FORM_ERRORS): RentalValidation{
    rentalFormErrors = {...rentalFormErrors};
    console.log("à l'int", rentalFormErrors)
    let isValid: boolean = true;
    if(!/^[a-zA-Z0-9]{1,15}(\d{2}){2}$/.test(user.client?.driverInfo?.drivingLicenseNumber ?? "")){
      rentalFormErrors.drivingLicenseNumber = "Le permis doit être composé de 1 à 15 caractère puis 4 chiffres"
      isValid = false;
    }
    if(!user.client?.driverInfo?.drivingLicenseCountry){
      rentalFormErrors.drivingLicenseCountry = this.getEmptyFieldError("pays d'obtention")
      isValid = false;
    }
    return {isValid: isValid, rentalFormErrors: rentalFormErrors}
  }
}
