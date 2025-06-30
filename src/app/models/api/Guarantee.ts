export interface Guarantee {
  id: number;
  state: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_GUARANTEE: Guarantee = {
  id: -1,
  state: "",
  amount: 0,
  createdAt: "02-05-2025",
  updatedAt: "02-05-2025"
}

export type Guarantees = Guarantee[];
