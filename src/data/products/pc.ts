import { Product } from "@/types";

// ASINとタグは実際のものに差し替えてください
const ASSOCIATE_TAG = "amazonrankingbest-22";

export const pcProducts: Product[] = [
  {
    rank: 1,
    asin: "B0D4FJHGBF",
    title: "Apple MacBook Air 13インチ M3チップ 8GBメモリ 256GB SSD",
    price: "¥164,800",
    image:
      "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B0D4FJHGBF/?tag=${ASSOCIATE_TAG}`,
    description:
      "M3チップ搭載で圧倒的な処理性能。軽量・薄型設計で持ち運びも快適。バッテリー最大18時間。",
    badge: "定番人気",
    updatedAt: "2026-03-06",
  },
  {
    rank: 2,
    asin: "B0CX23V2ZK",
    title: "Logicool MX MASTER 3S 高性能ワイヤレスマウス",
    price: "¥13,750",
    image:
      "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B0CX23V2ZK/?tag=${ASSOCIATE_TAG}`,
    description:
      "8000DPIの精密センサーと静音クリックを採用。6つのカスタマイズボタン搭載。",
    badge: "人気No.1",
    updatedAt: "2026-03-06",
  },
  {
    rank: 3,
    asin: "B08N5WRWNW",
    title: "HHKB Professional HYBRID Type-S 日本語配列",
    price: "¥36,850",
    image:
      "https://m.media-amazon.com/images/I/61mMpDkvwgL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B08N5WRWNW/?tag=${ASSOCIATE_TAG}`,
    description:
      "静電容量無接点方式の最高峰キーボード。Bluetooth・USB両対応。",
    updatedAt: "2026-03-06",
  },
  {
    rank: 4,
    asin: "B09V3KXJPB",
    title: "ASUS ROG Zephyrus G14 ゲーミングノートPC AMD Ryzen 9",
    price: "¥239,800",
    image:
      "https://m.media-amazon.com/images/I/81dTHytrYqL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B09V3KXJPB/?tag=${ASSOCIATE_TAG}`,
    description:
      "Ryzen 9 + RTX 4060搭載の薄型ゲーミングノート。WQXGA 165Hz液晶。",
    updatedAt: "2026-03-06",
  },
  {
    rank: 5,
    asin: "B0BQRJ3D6G",
    title: "BenQ EW2880U 28インチ 4K モニター USB-C 65W給電",
    price: "¥54,800",
    image:
      "https://m.media-amazon.com/images/I/71q0Q43BKSL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B0BQRJ3D6G/?tag=${ASSOCIATE_TAG}`,
    description:
      "4K IPS液晶で色再現性が高い。USB-C一本でノートPCへの給電・映像出力が可能。",
    updatedAt: "2026-03-06",
  },
];
