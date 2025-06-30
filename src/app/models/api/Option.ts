export interface Option {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_OPTION: Option = {
  id: -1,
  name: "",
  price: 0,
  createdAt: "02-05-2025",
  updatedAt: "02-05-2025",
}

export type Options = Option[];
