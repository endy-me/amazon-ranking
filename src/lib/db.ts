import { getSupabaseClient } from "./supabase";

export interface RankSnapshot {
  category: string;
  current_rank: number;
  asin: string;
  title: string;
  image: string | null;
  price: string | null;
  captured_at: string;
  prev_rank: number | null;
  rank_change: number | null;
}

// カテゴリの最新ランキング（推移付き）を取得
export async function getRankingWithTrend(
  category: string,
  limit = 20
): Promise<RankSnapshot[]> {
  const { data, error } = await getSupabaseClient()
    .from("ranking_trends")
    .select("*")
    .eq("category", category)
    .order("current_rank", { ascending: true })
    .limit(limit);

  if (error || !data) return [];
  return data as RankSnapshot[];
}

// 最終更新日を取得
export async function getLastCapturedDate(
  category: string
): Promise<string | null> {
  const { data } = await getSupabaseClient()
    .from("ranking_snapshots")
    .select("captured_at")
    .eq("category", category)
    .order("captured_at", { ascending: false })
    .limit(1)
    .single();

  return (data as { captured_at: string } | null)?.captured_at ?? null;
}

// 特定ASINの順位推移（過去30日）
export async function getAsinHistory(
  asin: string,
  category: string,
  days = 30
): Promise<{ captured_at: string; rank: number }[]> {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const { data } = await getSupabaseClient()
    .from("ranking_snapshots")
    .select("captured_at, rank")
    .eq("asin", asin)
    .eq("category", category)
    .gte("captured_at", since)
    .order("captured_at", { ascending: true });

  return data ?? [];
}

// 利用可能な日付一覧を取得（新しい順）
export async function getAvailableDates(category: string): Promise<string[]> {
  const { data } = await getSupabaseClient()
    .from("ranking_snapshots")
    .select("captured_at")
    .eq("category", category)
    .order("captured_at", { ascending: false });

  if (!data) return [];
  const seen = new Set<string>();
  const dates: string[] = [];
  for (const row of data as { captured_at: string }[]) {
    const date = String(row.captured_at).substring(0, 10);
    if (!seen.has(date)) {
      seen.add(date);
      dates.push(date);
    }
  }
  return dates;
}

// 特定日のランキングを取得
export async function getRankingByDate(
  category: string,
  date: string
): Promise<RankSnapshot[]> {
  const { data } = await getSupabaseClient()
    .from("ranking_snapshots")
    .select("*")
    .eq("category", category)
    .like("captured_at", `${date}%`)
    .order("rank", { ascending: true });

  if (!data) return [];
  return (data as { category: string; rank: number; asin: string; title: string; image: string | null; price: string | null; captured_at: string }[]).map((row) => ({ ...row, current_rank: row.rank, prev_rank: null, rank_change: null }));
}

// カテゴリ内の全ASINの価格履歴をまとめて取得（SSGビルド時用）
export async function getPriceHistoryBatch(
  asins: string[],
  category: string,
  days = 60
): Promise<Record<string, { date: string; price: number }[]>> {
  if (asins.length === 0) return {};
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const { data } = await getSupabaseClient()
    .from("ranking_snapshots")
    .select("asin, captured_at, price")
    .eq("category", category)
    .in("asin", asins)
    .gte("captured_at", since)
    .not("price", "is", null)
    .order("captured_at", { ascending: true });

  const result: Record<string, { date: string; price: number }[]> = {};
  for (const row of (data ?? []) as { asin: string; captured_at: string; price: string }[]) {
    const num = parseFloat(row.price.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) continue;
    const date = String(row.captured_at).substring(0, 10);
    if (!result[row.asin]) result[row.asin] = [];
    // 同日の重複を除く
    if (result[row.asin].at(-1)?.date !== date) {
      result[row.asin].push({ date, price: num });
    }
  }
  return result;
}

// DBが利用可能かチェック
export async function isDbAvailable(): Promise<boolean> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return false;
  }
  try {
    const { error } = await getSupabaseClient()
      .from("ranking_snapshots")
      .select("id")
      .limit(1);
    return !error;
  } catch {
    return false;
  }
}
