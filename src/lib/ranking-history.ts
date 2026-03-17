import fs from "fs";
import path from "path";
import { Product } from "@/types";

const HISTORY_DIR = path.join(process.cwd(), "ranking-history");

interface HistoryFile {
  slug: string;
  updatedAt: string;
  products: Array<{
    rank: number;
    asin: string;
    title: string;
    image: string;
    affiliateUrl: string;
    price: string | null;
    updatedAt: string;
  }>;
}

/** ranking-history/ から利用可能な日付一覧を取得（新しい順） */
export function getAvailableDatesFromHistory(slug: string): string[] {
  if (!fs.existsSync(HISTORY_DIR)) return [];
  const dates = fs
    .readdirSync(HISTORY_DIR)
    .filter((name) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(name)) return false;
      const filePath = path.join(HISTORY_DIR, name, `${slug}.json`);
      return fs.existsSync(filePath);
    })
    .sort()
    .reverse();
  return dates;
}

/** ranking-history/[date]/[slug].json から商品リストを取得 */
export function getRankingFromHistory(
  slug: string,
  date: string
): Product[] | null {
  const filePath = path.join(HISTORY_DIR, date, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const data: HistoryFile = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data.products.map((p) => ({
      rank: p.rank,
      asin: p.asin,
      title: p.title,
      image: p.image ?? "",
      affiliateUrl: `https://www.amazon.co.jp/dp/${p.asin}/?tag=amazonrankingbest-22`,
      price: p.price ?? undefined,
      updatedAt: p.updatedAt ?? date,
      rankChange: null,
    }));
  } catch {
    return null;
  }
}
