import { Product } from "@/types";

const ASSOCIATE_TAG = "amazonrankingbest-22";

export const booksComicProducts: Product[] = [
  {
    rank: 1,
    asin: "B0D7XH5ZYJ",
    title: "ワンピース 110巻 (ジャンプコミックス)",
    price: "¥528",
    image:
      "https://m.media-amazon.com/images/I/91xBCWJQ2ML._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B0D7XH5ZYJ/?tag=${ASSOCIATE_TAG}`,
    description:
      "尾田栄一郎が描く国民的冒険漫画の最新巻。エッグヘッド編クライマックス。",
    badge: "最新巻",
    updatedAt: "2026-03-06",
  },
  {
    rank: 2,
    asin: "B0D9VQV9BM",
    title: "鬼滅の刃 外伝 吾峠呼世晴短編集",
    price: "¥528",
    image:
      "https://m.media-amazon.com/images/I/81Ax4nkk4FL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B0D9VQV9BM/?tag=${ASSOCIATE_TAG}`,
    description:
      "大人気シリーズの番外編・短編集。ファン必読の一冊。",
    updatedAt: "2026-03-06",
  },
  {
    rank: 3,
    asin: "B0D3HXLP3T",
    title: "呪術廻戦 27巻 (ジャンプコミックス)",
    price: "¥528",
    image:
      "https://m.media-amazon.com/images/I/81r+dBPdO2L._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B0D3HXLP3T/?tag=${ASSOCIATE_TAG}`,
    description:
      "圧倒的な作画と展開で話題沸騰。最終章に向け物語が加速する最新刊。",
    badge: "話題沸騰",
    updatedAt: "2026-03-06",
  },
  {
    rank: 4,
    asin: "B0CVNTPCGK",
    title: "葬送のフリーレン 14巻",
    price: "¥528",
    image:
      "https://m.media-amazon.com/images/I/71XPcnKQgLL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B0CVNTPCGK/?tag=${ASSOCIATE_TAG}`,
    description:
      "アニメで大ヒット中の冒険ファンタジー。心に染みる余韻が魅力。",
    updatedAt: "2026-03-06",
  },
  {
    rank: 5,
    asin: "B0CGWLMV8F",
    title: "進撃の巨人 全34巻 完結セット",
    price: "¥17,952",
    image:
      "https://m.media-amazon.com/images/I/91HVjNkFQiL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/B0CGWLMV8F/?tag=${ASSOCIATE_TAG}`,
    description:
      "社会現象を巻き起こした超大作が完結。全34巻セットでイッキ読み。",
    badge: "完結記念",
    updatedAt: "2026-03-06",
  },
];
