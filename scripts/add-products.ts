/**
 * 手動でランキングを更新するヘルパースクリプト
 *
 * 使い方:
 *   1. scripts/manual-input/{slug}.json を編集（ASINと商品情報を記入）
 *   2. npx tsx scripts/add-products.ts {slug}
 *      例: npx tsx scripts/add-products.ts pc
 *          npx tsx scripts/add-products.ts  ← 全カテゴリ一括
 *
 * manual-input/{slug}.json の形式:
 *   [
 *     { "asin": "B0XXXXXXXX", "title": "商品名", "price": "¥12,800", "image": "https://m.media-amazon.com/...", "description": "説明", "badge": "人気No.1" },
 *     ...
 *   ]
 */

import fs from "fs";
import path from "path";

const ASSOCIATE_TAG = "amazonrankingbest-22";
const TODAY = new Date().toISOString().split("T")[0];
const MANUAL_INPUT_DIR = path.join(process.cwd(), "scripts/manual-input");
const GENERATED_DIR = path.join(process.cwd(), "src/data/generated");
const HISTORY_DIR = path.join(process.cwd(), "ranking-history", TODAY);

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

interface ManualProduct {
  asin: string;
  title: string;
  price?: string;
  image: string;
  description?: string;
  badge?: string;
}

function processSlug(slug: string) {
  const inputPath = path.join(MANUAL_INPUT_DIR, `${slug}.json`);
  if (!fs.existsSync(inputPath)) {
    console.warn(`  ⚠ ${inputPath} が見つかりません。スキップします。`);
    return;
  }

  const inputs: ManualProduct[] = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

  const products = inputs.map((p, i) => ({
    rank: i + 1,
    asin: p.asin,
    title: p.title,
    image: p.image,
    affiliateUrl: `https://www.amazon.co.jp/dp/${p.asin}/?tag=${ASSOCIATE_TAG}`,
    price: p.price ?? null,
    description: p.description ?? null,
    badge: p.badge ?? null,
    updatedAt: TODAY,
  }));

  const data = { slug, updatedAt: TODAY, products };
  const json = JSON.stringify(data, null, 2);

  fs.writeFileSync(path.join(GENERATED_DIR, `${slug}.json`), json, "utf-8");
  fs.writeFileSync(path.join(HISTORY_DIR, `${slug}.json`), json, "utf-8");

  console.log(`  ✓ ${slug}: ${products.length}件更新`);
}

const ALL_SLUGS = [
  "laptop", "desktop", "display", "tablet", "amazon-devices",
  "smartphone", "smartwatch",
  "mirrorless-camera", "compact-camera", "action-camera",
  "earphone", "game-software",
  "books-engineering", "books-comic", "books-magazine", "books-photo",
];

const targetSlug = process.argv[2];
ensureDir(GENERATED_DIR);
ensureDir(HISTORY_DIR);
ensureDir(MANUAL_INPUT_DIR);

console.log(`=== 手動ランキング更新 (${TODAY}) ===`);

if (targetSlug) {
  processSlug(targetSlug);
} else {
  ALL_SLUGS.forEach(processSlug);
}

console.log("\n完了。 src/data/generated/ が更新されました。");
