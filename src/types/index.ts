export interface Product {
  rank: number;
  asin: string;
  title: string;
  price?: string;
  image: string;
  affiliateUrl: string;
  description?: string;
  badge?: string;
  updatedAt: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: CategoryColor;
}

export type CategoryColor =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "red"
  | "yellow"
  | "pink"
  | "indigo"
  | "teal"
  | "gray";
