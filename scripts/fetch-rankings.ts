/**
 * Amazon クリエイターズAPI を使ったランキング自動取得スクリプト
 *
 * 【実行方法】
 *   npx tsx scripts/fetch-rankings.ts
 *
 * 【必要条件】
 *   30日以内に10件の紹介料発生でアカウントが有効になります
 *
 * 【環境変数】(.env.local に設定)
 *   CREATORS_CREDENTIAL_ID     クリエイターズAPI 認証情報ID
 *   CREATORS_CREDENTIAL_SECRET クリエイターズAPI シークレット
 *   CREATORS_ASSOCIATE_TAG     アソシエイトタグ
 */

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// .env.local を読み込む
const ENV_PATH = path.join(process.cwd(), ".env.local");
if (fs.existsSync(ENV_PATH)) {
  fs.readFileSync(ENV_PATH, "utf-8")
    .split("\n")
    .forEach((line) => {
      const [key, ...vals] = line.split("=");
      if (key?.trim() && vals.length > 0) {
        process.env[key.trim()] = vals.join("=").trim();
      }
    });
}

const CREDENTIAL_ID = process.env.CREATORS_CREDENTIAL_ID;
const CREDENTIAL_SECRET = process.env.CREATORS_CREDENTIAL_SECRET;
const ASSOCIATE_TAG = process.env.CREATORS_ASSOCIATE_TAG ?? "amazonrankingbest-22";
const API_VERSION = process.env.CREATORS_VERSION ?? "3.3";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  });
}

if (!CREDENTIAL_ID || !CREDENTIAL_SECRET) {
  console.error("❌ クリエイターズAPIの認証情報が設定されていません");
  console.error("   .env.local に CREATORS_CREDENTIAL_ID と CREATORS_CREDENTIAL_SECRET を設定してください");
  process.exit(1);
}

const TOKEN_ENDPOINT = "https://api.amazon.co.jp/auth/o2/token";
const API_ENDPOINT = "https://creatorsapi.amazon/catalog/v1/searchItems";
const MARKETPLACE = "www.amazon.co.jp";
const TODAY = new Date().toISOString().split("T")[0];
const GENERATED_DIR = path.join(process.cwd(), "src/data/generated");
const HISTORY_DIR = path.join(process.cwd(), "ranking-history", TODAY);

// キャッシュ
let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry - 30000) {
    return cachedToken;
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: CREDENTIAL_ID!,
    client_secret: CREDENTIAL_SECRET!,
    scope: "creatorsapi::default",
  });

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`トークン取得失敗 (${res.status}): ${err}`);
  }

  const data = await res.json() as { access_token: string; expires_in: number };
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in ?? 3600) * 1000;
  return cachedToken;
}

interface GeneratedProduct {
  rank: number;
  asin: string;
  title: string;
  image: string;
  affiliateUrl: string;
  price: string | null;
  description: string | null;
  badge: string | null;
  updatedAt: string;
}

async function fetchPage(token: string, config: { searchIndex: string; browseNodeId: string; keywords?: string }, page: number) {
  const body = {
    partnerTag: ASSOCIATE_TAG,
    partnerType: "Associates",
    searchIndex: config.searchIndex,
    ...(config.browseNodeId ? { browseNodeId: config.browseNodeId } : {}),
    ...(config.keywords ? { keywords: config.keywords } : {}),
    itemCount: 10,
    itemPage: page,
    sortBy: "Featured",
    resources: [
      "itemInfo.title",
      "images.primary.large",
      "images.primary.medium",
      "offersV2.listings.price",
      "browseNodeInfo.browseNodes.salesRank",
    ],
  };

  // 429 レートリミット時は最大3回リトライ（5秒・10秒・20秒待機）
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${token}, Version ${API_VERSION}`,
        "x-marketplace": MARKETPLACE,
      },
      body: JSON.stringify(body),
    });

    if (res.status === 429) {
      const waitMs = (attempt + 1) * 5000;
      console.warn(`  ⚠ レートリミット(429)。${waitMs / 1000}秒後にリトライ... (${attempt + 1}/3)`);
      await new Promise((r) => setTimeout(r, waitMs));
      continue;
    }

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`API エラー (${res.status}): ${err}`);
    }

    const data = await res.json() as {
      searchResult?: {
        items?: Array<{
          asin?: string;
          itemInfo?: { title?: { displayValue?: string } };
          images?: { primary?: { large?: { url?: string }; medium?: { url?: string } } };
          offersV2?: { listings?: Array<{ price?: { displayAmount?: string } }> };
        }>;
      };
    };

    return data.searchResult?.items ?? [];
  }

  throw new Error("API エラー: レートリミットを超過しました (429)");
}

async function searchItems(config: { slug: string; name: string; searchIndex: string; browseNodeId: string; keywords?: string | string[] }): Promise<GeneratedProduct[]> {
  const token = await getAccessToken();

  // keywords が配列の場合は各キーワードで1ページずつ取得してASINで重複排除
  // （VideoGames・Toys等、page2が返らないsearchIndexへの対処）
  const keywordList = Array.isArray(config.keywords) ? config.keywords : [config.keywords];
  const rawItems: Array<{ asin?: string; itemInfo?: { title?: { displayValue?: string } }; images?: { primary?: { large?: { url?: string }; medium?: { url?: string } } }; offersV2?: { listings?: Array<{ price?: { displayAmount?: string } }> } }> = [];
  const seenAsins = new Set<string>();

  for (let ki = 0; ki < keywordList.length; ki++) {
    const kw = keywordList[ki];
    const cfgForKw = { ...config, keywords: kw };
    const page1 = await fetchPage(token, cfgForKw, 1);
    await new Promise((r) => setTimeout(r, 500));
    const page2 = await fetchPage(token, cfgForKw, 2);
    for (const item of [...page1, ...page2]) {
      if (item.asin && !seenAsins.has(item.asin)) {
        seenAsins.add(item.asin);
        rawItems.push(item);
      }
    }
    if (ki < keywordList.length - 1) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return rawItems
    .slice(0, 20)
    .map((item, i) => {
      const asin = item.asin ?? "";
      const title = item.itemInfo?.title?.displayValue ?? "";
      const image =
        item.images?.primary?.large?.url ??
        item.images?.primary?.medium?.url ?? "";
      const price = item.offersV2?.listings?.[0]?.price?.displayAmount ?? null;

      if (!asin || !title) return null;

      return {
        rank: i + 1,
        asin,
        title,
        image,
        affiliateUrl: `https://www.amazon.co.jp/dp/${asin}/?tag=${ASSOCIATE_TAG}`,
        price,
        description: null,
        badge: i === 0 ? "1位" : null,
        updatedAt: TODAY,
      } satisfies GeneratedProduct;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
}

// カテゴリ設定
const CATEGORY_CONFIG = [
  // テック・ガジェット
  { slug: "laptop",            name: "ノートPC",              searchIndex: "Computers",             browseNodeId: "2151981051" },
  { slug: "desktop",           name: "デスクトップPC",        searchIndex: "Computers",             browseNodeId: "2151949051" },
  { slug: "pc-accessories",    name: "パソコン・周辺機器",    searchIndex: "Computers",             browseNodeId: ""           },
  { slug: "display",           name: "ディスプレイ",          searchIndex: "Computers",             browseNodeId: "2151982051" },
  { slug: "tablet",            name: "タブレット",            searchIndex: "Computers",             browseNodeId: "2152014051" },
  { slug: "amazon-devices",    name: "Amazonデバイス",        searchIndex: "Electronics",           browseNodeId: "",           keywords: "Amazon Echo Fire Kindle" },
  { slug: "amazon-renewed",    name: "Amazon整備済み品",      searchIndex: "Electronics",           browseNodeId: "",           keywords: "整備済み品" },
  { slug: "smartphone",        name: "スマートフォン",        searchIndex: "Electronics",           browseNodeId: "128188011"  },
  { slug: "smartwatch",        name: "スマートウォッチ",      searchIndex: "Electronics",           browseNodeId: "2725002051" },
  { slug: "earphone",          name: "イヤホン・ヘッドホン",  searchIndex: "Electronics",           browseNodeId: "7251477051" },
  // カメラ
  { slug: "mirrorless-camera", name: "ミラーレス一眼",        searchIndex: "Electronics",           browseNodeId: "2285020051" },
  { slug: "compact-camera",    name: "コンパクトデジカメ",    searchIndex: "Electronics",           browseNodeId: "387455011"  },
  { slug: "action-camera",     name: "アクションカメラ",      searchIndex: "Electronics",           browseNodeId: "2680377051" },
  // エンタメ
  { slug: "game-software",     name: "ゲーム",                searchIndex: "VideoGames",            browseNodeId: "",           keywords: ["Nintendo Switch", "PlayStation Xbox PC ゲーム"] },
  { slug: "dvd",               name: "DVD・ブルーレイ",       searchIndex: "Music",                 browseNodeId: "",           keywords: "DVD ブルーレイ 映画" },
  // 本
  { slug: "books-all",         name: "本（総合）",            searchIndex: "Books",                 browseNodeId: ""           },
  { slug: "books-comic",       name: "コミック",              searchIndex: "Books",                 browseNodeId: "2501045051" },
  { slug: "books-engineering", name: "コンピュータ・IT",      searchIndex: "Books",                 browseNodeId: "466298"     },
  { slug: "books-magazine",    name: "雑誌",                  searchIndex: "Books",                 browseNodeId: "13384021"   },
  { slug: "books-photo",       name: "写真集",                searchIndex: "Books",                 browseNodeId: "500592"     },
  // ライフスタイル
  { slug: "hobby",             name: "ホビー",                searchIndex: "Hobbies",               browseNodeId: ""           },
  { slug: "toys",              name: "おもちゃ",              searchIndex: "Toys",                  browseNodeId: "",           keywords: ["おもちゃ 人気", "知育玩具 ブロック フィギュア"] },
  { slug: "fashion",           name: "ファッション",          searchIndex: "Apparel",               browseNodeId: ""           },
  { slug: "beauty",            name: "ビューティ",            searchIndex: "Beauty",                browseNodeId: ""           },
  { slug: "drugstore",         name: "日用品",                searchIndex: "HealthPersonalCare",    browseNodeId: ""           },
  { slug: "food",              name: "食品・飲料",            searchIndex: "GroceryAndGourmetFood", browseNodeId: ""           },
];

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function processCategory(config: { slug: string; name: string; searchIndex: string; browseNodeId: string; keywords?: string }) {
  console.log(`\n[${config.name}] 取得中...`);
  try {
    const products = await searchItems(config);
    if (products.length === 0) {
      console.warn("  ⚠ 商品が取得できませんでした");
      return;
    }

    const data = { slug: config.slug, name: config.name, updatedAt: TODAY, products };
    const json = JSON.stringify(data, null, 2);

    fs.writeFileSync(path.join(GENERATED_DIR, `${config.slug}.json`), json, "utf-8");
    fs.writeFileSync(path.join(HISTORY_DIR, `${config.slug}.json`), json, "utf-8");

    // Supabase に保存
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const rows = products.map((p) => ({
        category: config.slug,
        rank: p.rank,
        asin: p.asin,
        title: p.title,
        image: p.image || null,
        price: p.price || null,
        captured_at: TODAY,
      }));
      const { error } = await supabase
        .from("ranking_snapshots")
        .upsert(rows, { onConflict: "category,captured_at,rank" });
      if (error) {
        console.warn(`  ⚠ Supabase書き込みエラー: ${error.message}`);
      } else {
        console.log(`  ✓ Supabaseに${rows.length}件保存`);
      }
    }

    console.log(`  ✓ ${products.length}件取得`);
  } catch (err) {
    console.error(`  ✗ ${(err as Error).message}`);
  }
}

async function main() {
  console.log("=== Amazon クリエイターズAPI ランキング自動更新 ===");
  console.log(`更新日: ${TODAY}`);
  ensureDir(GENERATED_DIR);
  ensureDir(HISTORY_DIR);

  for (const config of CATEGORY_CONFIG) {
    await processCategory(config);
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\n=== 完了 ===");
  console.log(`生成先: src/data/generated/`);
  console.log(`履歴:   ranking-history/${TODAY}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
