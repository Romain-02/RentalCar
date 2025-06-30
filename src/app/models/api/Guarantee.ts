export interface Guarantee {
  id: number;
  state: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_GUARANTEE: Guarantee = {
  id: -1,
  state: "",
  amount: 0,
  createdAt: new Date(),
  updatedAt: new Date()
}

export type Guarantees = Guarantee[];
