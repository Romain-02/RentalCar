export type DriverInfo = {
  birthDate: string,
  drivingLicenseNumber: string,
  drivingLicenseAcquisition: string,
  drivingLicenseValidation: string,
  drivingLicenseCountry: string
}

export const DEFAULT_DRIVER_INFO: DriverInfo = {
  birthDate: "02-05-2025",
  drivingLicenseNumber: "",
  drivingLicenseAcquisition: "02-05-2025",
  drivingLicenseValidation: "02-05-2025",
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
