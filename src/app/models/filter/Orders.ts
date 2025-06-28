export type Order = {
  name: string,
  order: string
}

export const DEFAULT_VALUE_ORDER: string = "Par défaut"

export const orders: Order[] = [
  {name: "Croissant", order: "ASC"},
  {name: "Décroissant", order: "DESC"},
  {name: DEFAULT_VALUE_ORDER, order: DEFAULT_VALUE_ORDER}
]
