import { getSupabaseClient } from "./supabase";

export interface RankSnapshot {
  category: string;
  rank: number;
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
  return (data as RankSnapshot[]).map((row) => ({ ...row, prev_rank: null, rank_change: null }));
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
