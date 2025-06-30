export type DriverInfo = {
  birthDate: Date,
  drivingLicenseNumber: string,
  drivingLicenseAcquisition: Date,
  drivingLicenseValidation: Date,
  drivingLicenseCountry: string
}

export const DEFAULT_DRIVER_INFO: DriverInfo = {
  birthDate: new Date(),
  drivingLicenseNumber: "",
  drivingLicenseAcquisition: new Date(),
  drivingLicenseValidation: new Date(),
  drivingLicenseCountry: ""
}

export type DriverInfoFormErrors = {
  drivingLicenseNumber: string,
  drivingLicenseCountry: string
};

export const DEFAULT_DRIVER_INFO_FORM_ERRORS: DriverInfoFormErrors = {
  drivingLicenseNumber: "",
  drivingLicenseCountry: ""
};
