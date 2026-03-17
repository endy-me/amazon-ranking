import { Category } from "@/types";

export const categories: Category[] = [
  // テック・ガジェット
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
    slug: "pc-accessories",
    name: "パソコン・周辺機器",
    description: "キーボード・マウス・ストレージ・周辺機器全般",
    icon: "🖱️",
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
  {
    slug: "amazon-renewed",
    name: "Amazon整備済み品",
    description: "認定整備済みの高品質リファービッシュ品",
    icon: "♻️",
    color: "teal",
  },
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
  {
    slug: "earphone",
    name: "イヤホン・ヘッドホン",
    description: "ワイヤレス・ノイズキャンセリングイヤホン",
    icon: "🎧",
    color: "indigo",
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
  // エンタメ
  {
    slug: "game-software",
    name: "ゲーム",
    description: "Switch、PS5、PCゲームソフト・周辺機器",
    icon: "🎮",
    color: "red",
  },
  {
    slug: "dvd",
    name: "CD・DVD",
    description: "人気アーティストのCD・Blu-ray・ミュージックビデオ",
    icon: "🎵",
    color: "violet",
  },
  // 本
  {
    slug: "books-all",
    name: "本（総合）",
    description: "Amazon和書・洋書の売れ筋総合ランキング",
    icon: "📖",
    color: "amber",
  },
  {
    slug: "books-comic",
    name: "コミック",
    description: "人気漫画、新刊コミック・ラノベ",
    icon: "📚",
    color: "orange",
  },
  {
    slug: "books-engineering",
    name: "コンピュータ・IT",
    description: "プログラミング、インフラ、AI・機械学習",
    icon: "🔧",
    color: "gray",
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
  // ライフスタイル
  {
    slug: "hobby",
    name: "ホビー",
    description: "プラモデル・フィギュア・鉄道模型・ラジコン",
    icon: "🎨",
    color: "yellow",
  },
  {
    slug: "toys",
    name: "おもちゃ",
    description: "子ども向けおもちゃ・知育玩具・ボードゲーム",
    icon: "🧸",
    color: "orange",
  },
  {
    slug: "fashion",
    name: "ファッション",
    description: "メンズ・レディース・バッグ・シューズ",
    icon: "👗",
    color: "fuchsia",
  },
  {
    slug: "beauty",
    name: "ビューティ",
    description: "スキンケア・コスメ・ヘアケア",
    icon: "💄",
    color: "pink",
  },
  {
    slug: "drugstore",
    name: "日用品",
    description: "洗剤・衛生用品・ヘルスケア・サプリ",
    icon: "🧴",
    color: "emerald",
  },
  {
    slug: "food",
    name: "食品・飲料",
    description: "お菓子・飲み物・調味料・グルメ食品",
    icon: "🍱",
    color: "lime",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
