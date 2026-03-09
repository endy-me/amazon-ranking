import fs from "fs";
import path from "path";
import { Product } from "@/types";

// 手動データ（フォールバック用）
import { pcProducts } from "./pc";
import { cameraProducts } from "./camera";
import { smartphoneProducts } from "./smartphone";
import { tabletProducts } from "./tablet";
import { gameSoftwareProducts } from "./game-software";
import { toysProducts } from "./toys";
import { booksComicProducts } from "./books-comic";
import { booksMagazineProducts } from "./books-magazine";
import { booksPracticalProducts } from "./books-practical";
import { booksEngineeringProducts } from "./books-engineering";
import { saleProducts } from "./sale";
import { smartwatchProducts } from "./smartwatch";
import { booksPhotoProducts } from "./books-photo";
import { actionCameraProducts } from "./action-camera";
import { mirrorlessCameraProducts } from "./mirrorless-camera";

const manualProductMap: Record<string, Product[]> = {
  pc: pcProducts,
  camera: cameraProducts,
  smartphone: smartphoneProducts,
  tablet: tabletProducts,
  "game-software": gameSoftwareProducts,
  toys: toysProducts,
  "books-comic": booksComicProducts,
  "books-magazine": booksMagazineProducts,
  "books-practical": booksPracticalProducts,
  "books-engineering": booksEngineeringProducts,
  sale: saleProducts,
  smartwatch: smartwatchProducts,
  "books-photo": booksPhotoProducts,
  "action-camera": actionCameraProducts,
  "mirrorless-camera": mirrorlessCameraProducts,
};

// 自動生成JSONを読み込む（存在する場合は優先）
function loadGeneratedProducts(slug: string): Product[] | null {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/data/generated",
      `${slug}.json`
    );
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as { products: Product[] };
    if (!Array.isArray(data.products) || data.products.length === 0) return null;

    return data.products;
  } catch {
    return null;
  }
}

export function getProductsBySlug(slug: string): Product[] {
  const generated = loadGeneratedProducts(slug);
  if (generated) return generated;
  return manualProductMap[slug] ?? [];
}

export function getTopProductsBySlug(slug: string, count = 5): Product[] {
  return getProductsBySlug(slug).slice(0, count);
}

// 更新日時を取得
export function getLastUpdated(slug: string): string | null {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/data/generated",
      `${slug}.json`
    );
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as { updatedAt: string };
    return data.updatedAt ?? null;
  } catch {
    return null;
  }
}

export { manualProductMap };
