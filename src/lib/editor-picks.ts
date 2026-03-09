import editorPicksData from "@/data/editor-picks.json";
import { Product } from "@/types";

interface EditorPick {
  rating: number;
  comment: string;
}

const picks = editorPicksData as unknown as Record<string, EditorPick>;

export function mergeEditorPicks(products: Product[]): Product[] {
  return products.map((p) => {
    const pick = picks[p.asin];
    if (!pick) return p;
    return {
      ...p,
      editorRating: pick.rating,
      editorComment: pick.comment,
    };
  });
}
