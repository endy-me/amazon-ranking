import { Category } from "@/types";

export const categories: Category[] = [
  // PC・ガジェット
  {
    slug: "laptop",
    name: "ノートPC",
    description: "薄型・軽量・高性能ノートパソコン",
    icon: "💻",
    color: "blue",
  },
  {
    slug: "desktop",
    name: "デスクトップPC",
    description: "自作・メーカー製デスクトップパソコン",
    icon: "🖥️",
    color: "blue",
  },
  {
    slug: "display",
    name: "ディスプレイ",
    description: "4K・ゲーミング・在宅ワーク向けモニター",
    icon: "🖥️",
    color: "teal",
  },
  {
    slug: "tablet",
    name: "タブレット",
    description: "iPad、Androidタブレット",
    icon: "📟",
    color: "indigo",
  },
  {
    slug: "amazon-devices",
    name: "Amazonデバイス",
    description: "Echo、Fire TV、Kindle など Amazon 純正デバイス",
    icon: "📦",
    color: "orange",
  },
  // スマホ・ウォッチ
  {
    slug: "smartphone",
    name: "スマートフォン",
    description: "iPhone、Android スマートフォン本体",
    icon: "📱",
    color: "green",
  },
  {
    slug: "smartwatch",
    name: "スマートウォッチ",
    description: "Apple Watch、Galaxy Watch など",
    icon: "⌚",
    color: "purple",
  },
  // カメラ
  {
    slug: "mirrorless-camera",
    name: "ミラーレス一眼",
    description: "Sony、Nikon、Canon などのミラーレスカメラ",
    icon: "📷",
    color: "purple",
  },
  {
    slug: "compact-camera",
    name: "コンパクトデジカメ",
    description: "持ち運び簡単なコンパクトデジタルカメラ",
    icon: "📸",
    color: "pink",
  },
  {
    slug: "action-camera",
    name: "アクションカメラ",
    description: "GoPro など小型・防水アクションカメラ",
    icon: "🎥",
    color: "red",
  },
  // オーディオ・ゲーム
  {
    slug: "earphone",
    name: "イヤホン・ヘッドホン",
    description: "ワイヤレス・ノイズキャンセリングイヤホン",
    icon: "🎧",
    color: "indigo",
  },
  {
    slug: "game-software",
    name: "ゲーム",
    description: "Switch、PS5、PCゲームソフト・周辺機器",
    icon: "🎮",
    color: "red",
  },
  // 本
  {
    slug: "books-engineering",
    name: "コンピュータ・IT",
    description: "プログラミング、インフラ、AI・機械学習",
    icon: "🔧",
    color: "gray",
  },
  {
    slug: "books-comic",
    name: "コミック",
    description: "人気漫画、新刊コミック・ラノベ",
    icon: "📚",
    color: "orange",
  },
  {
    slug: "books-magazine",
    name: "雑誌",
    description: "週刊誌、月刊誌、専門誌",
    icon: "📰",
    color: "pink",
  },
  {
    slug: "books-photo",
    name: "写真集",
    description: "タレント・アイドル・アート写真集",
    icon: "🖼️",
    color: "yellow",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
