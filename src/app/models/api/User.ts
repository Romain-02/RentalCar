import {Client, DEFAULT_CLIENT} from './Client';

export type User = {
  id: number,
  name: string,
  password: string,
  email: string
  client?: Client
};

export const DEFAULT_USER: User = {
  id: -1,
  name: "",
  password: "",
  email: "",
  client: DEFAULT_CLIENT
}

export const DEFAULT_USER_WITHOUT_CLIENT: User = {
  id: -1,
  name: "",
  password: "",
  email: "",
  client: undefined
}

export type Users = User[];

export type UserFormErrors = {
  name: string,
  password: string,
  email: string
};

export const USER_FORM_ERRORS: UserFormErrors = {
  name: "",
  password: "",
  email: ""
};
