import { Product } from "@/types";

const ASSOCIATE_TAG = "amazonrankingbest-22";

export const booksEngineeringProducts: Product[] = [
  {
    rank: 1,
    asin: "4297140683",
    title: "ソフトウェア設計のトレードオフと誤り",
    price: "¥4,180",
    image:
      "https://m.media-amazon.com/images/I/81mhoCeIpCL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/4297140683/?tag=${ASSOCIATE_TAG}`,
    description:
      "現場で迷いがちな設計判断を体系的に解説。中上級エンジニア必読の一冊。",
    badge: "エンジニア必読",
    updatedAt: "2026-03-06",
  },
  {
    rank: 2,
    asin: "4815626960",
    title: "生成AIアプリケーション開発入門 LLMを使ったプロダクト開発",
    price: "¥3,740",
    image:
      "https://m.media-amazon.com/images/I/81U9W4LXYGL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/4815626960/?tag=${ASSOCIATE_TAG}`,
    description:
      "LLMを使ったプロダクト開発の基礎から実践まで。RAG・エージェント構築も解説。",
    badge: "AI開発必読",
    updatedAt: "2026-03-06",
  },
  {
    rank: 3,
    asin: "4814400454",
    title: "良いコード/悪いコードで学ぶ設計入門",
    price: "¥3,278",
    image:
      "https://m.media-amazon.com/images/I/81WJHZ9AOOL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/4814400454/?tag=${ASSOCIATE_TAG}`,
    description:
      "具体的なコード例でオブジェクト指向設計を学ぶ。保守性の高いコードの書き方がわかる。",
    updatedAt: "2026-03-06",
  },
  {
    rank: 4,
    asin: "4048930060",
    title: "達人プログラマー ―熟達に向けたあなたの旅― 第2版",
    price: "¥3,740",
    image:
      "https://m.media-amazon.com/images/I/91YPBHEJX3L._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/4048930060/?tag=${ASSOCIATE_TAG}`,
    description:
      "プログラマーとして成長し続けるための哲学と実践を説く名著。改訂版で現代に対応。",
    badge: "定番名著",
    updatedAt: "2026-03-06",
  },
  {
    rank: 5,
    asin: "4297127342",
    title: "マイクロサービスパターン 実践的システムデザインのためのケーススタディ",
    price: "¥4,620",
    image:
      "https://m.media-amazon.com/images/I/81i0PCmEknL._AC_SX679_.jpg",
    affiliateUrl: `https://www.amazon.co.jp/dp/4297127342/?tag=${ASSOCIATE_TAG}`,
    description:
      "マイクロサービスアーキテクチャの設計・実装パターンを豊富なケーススタディで解説。",
    updatedAt: "2026-03-06",
  },
];
