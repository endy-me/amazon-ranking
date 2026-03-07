/**
 * Amazon.co.jp ベストセラーRSSフィード設定
 *
 * URLの確認方法:
 *   1. https://www.amazon.co.jp/gp/bestsellers/{カテゴリ}/ をブラウザで開く
 *   2. ページ右上の「RSS」リンクをクリック → そのURLをここに設定
 *
 * 数値ノードIDが必要な場合:
 *   Amazon.co.jpのカテゴリページURLに含まれる数字がノードID
 *   例: /gp/bestsellers/electronics/2351655051/ → node=2351655051
 */
export interface CategoryRSSConfig {
  slug: string;
  name: string;
  rssUrl: string;
}

export const categoryRSSMap: CategoryRSSConfig[] = [
  {
    slug: "pc",
    name: "PC・周辺機器",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/computers/ref=zg_bs_computers_rsslink",
  },
  {
    slug: "camera",
    name: "カメラ",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/camera/ref=zg_bs_camera_rsslink",
  },
  {
    // SIMフリースマートフォン カテゴリ
    // 確認: https://www.amazon.co.jp/gp/bestsellers/electronics/2351655051/
    slug: "smartphone",
    name: "スマートフォン",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/electronics/2351655051/ref=zg_bs_2351655051_rsslink",
  },
  {
    // タブレット カテゴリ
    // 確認: https://www.amazon.co.jp/gp/bestsellers/electronics/2048320051/
    slug: "tablet",
    name: "タブレット",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/electronics/2048320051/ref=zg_bs_2048320051_rsslink",
  },
  {
    slug: "game-software",
    name: "ゲームソフト",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/videogames/ref=zg_bs_videogames_rsslink",
  },
  {
    slug: "toys",
    name: "おもちゃ",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/toys/ref=zg_bs_toys_rsslink",
  },
  {
    slug: "books-comic",
    name: "コミック",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/comic/ref=zg_bs_comic_rsslink",
  },
  {
    slug: "books-magazine",
    name: "雑誌",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/magazine/ref=zg_bs_magazine_rsslink",
  },
  {
    // 実用書・暮らし・健康 ノードID: 466282
    // 確認: https://www.amazon.co.jp/gp/bestsellers/books/466282/
    slug: "books-practical",
    name: "実用書",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/books/466282/ref=zg_bs_466282_rsslink",
  },
  {
    // コンピュータ・IT ノードID: 466286
    // 確認: https://www.amazon.co.jp/gp/bestsellers/books/466286/
    slug: "books-engineering",
    name: "コンピュータ・IT書籍",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/books/466286/ref=zg_bs_466286_rsslink",
  },
  {
    // セール品はRSSがないため、タイムセール上位 (エレクトロニクス全体で代替)
    // ※ セール専用RSSは存在しないので別途手動更新を推奨
    slug: "sale",
    name: "タイムセール",
    rssUrl:
      "https://www.amazon.co.jp/gp/rss/bestsellers/electronics/ref=zg_bs_electronics_rsslink",
  },
];
