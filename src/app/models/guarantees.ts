export interface Guarantee {
  id: number;
  state: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export type Guarantees = Guarantee[];
