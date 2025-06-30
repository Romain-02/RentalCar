export interface Option {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_OPTION: Option = {
  id: -1,
  name: "",
  price: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export type Options = Option[];
