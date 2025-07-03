export type Category = {
  id: number,
  name: string
};

export const DEFAULT_CATEGORY: Category = {
  id: -1,
  name: ""
};

export type Categories = Category[];
