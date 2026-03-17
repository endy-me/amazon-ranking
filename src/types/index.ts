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
  rankChange?: number | null; // 正数=上昇, 負数=下降, null=初登場
  editorRating?: number;   // 1〜5
  editorComment?: string;  // 中の人コメント
  editorUrl?: string;      // ブログ記事などのURL
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
  | "gray"
  | "violet"
  | "amber"
  | "fuchsia"
  | "emerald"
  | "lime";
