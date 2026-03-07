import { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "pc",
    name: "PC・周辺機器",
    description: "ノートPC、デスクトップ、キーボード、マウスなど",
    icon: "💻",
    color: "blue",
  },
  {
    slug: "camera",
    name: "カメラ",
    description: "デジタルカメラ、レンズ、三脚などの撮影機材",
    icon: "📷",
    color: "purple",
  },
  {
    slug: "smartphone",
    name: "スマートフォン",
    description: "iPhone、Android、スマホアクセサリ",
    icon: "📱",
    color: "green",
  },
  {
    slug: "tablet",
    name: "タブレット",
    description: "iPad、Androidタブレット、電子書籍リーダー",
    icon: "📟",
    color: "teal",
  },
  {
    slug: "game-software",
    name: "ゲームソフト",
    description: "Switch、PS5、PCゲームなど各機種の人気ソフト",
    icon: "🎮",
    color: "red",
  },
  {
    slug: "toys",
    name: "おもちゃ",
    description: "知育玩具、フィギュア、ブロック、ボードゲーム",
    icon: "🧸",
    color: "yellow",
  },
  {
    slug: "books-comic",
    name: "本（コミック）",
    description: "人気漫画、新刊コミック、名作シリーズ",
    icon: "📚",
    color: "orange",
  },
  {
    slug: "books-magazine",
    name: "本（雑誌）",
    description: "週刊誌、月刊誌、専門誌",
    icon: "📰",
    color: "pink",
  },
  {
    slug: "books-practical",
    name: "本（実用書）",
    description: "ビジネス書、自己啓発、料理、健康",
    icon: "📖",
    color: "indigo",
  },
  {
    slug: "books-engineering",
    name: "本（エンジニア向け）",
    description: "プログラミング、インフラ、AI・機械学習",
    icon: "🔧",
    color: "gray",
  },
  {
    slug: "sale",
    name: "セール品",
    description: "タイムセール・特選タイムセール・お買い得商品",
    icon: "🏷️",
    color: "red",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
