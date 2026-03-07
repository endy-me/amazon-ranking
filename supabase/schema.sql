-- Amazon ランキング蓄積スキーマ
-- Supabase の SQL Editor に貼り付けて実行してください

CREATE TABLE IF NOT EXISTS ranking_snapshots (
  id          BIGSERIAL PRIMARY KEY,
  category    TEXT    NOT NULL,
  rank        INTEGER NOT NULL,
  asin        TEXT    NOT NULL,
  title       TEXT    NOT NULL,
  image       TEXT,
  price       TEXT,
  captured_at DATE    NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 高速クエリ用インデックス
CREATE INDEX IF NOT EXISTS idx_snapshots_category_date
  ON ranking_snapshots(category, captured_at DESC);

CREATE INDEX IF NOT EXISTS idx_snapshots_asin_date
  ON ranking_snapshots(asin, captured_at DESC);

-- 同一カテゴリ・日付・順位の重複を防ぐ
CREATE UNIQUE INDEX IF NOT EXISTS idx_snapshots_unique
  ON ranking_snapshots(category, captured_at, rank);

-- ランキング推移を取得するビュー（今日 vs 7日前）
CREATE OR REPLACE VIEW ranking_trends AS
SELECT
  t.category,
  t.rank        AS current_rank,
  t.asin,
  t.title,
  t.image,
  t.price,
  t.captured_at,
  p.rank        AS prev_rank,
  p.rank - t.rank AS rank_change  -- 正数=上昇, 負数=下降
FROM ranking_snapshots t
LEFT JOIN ranking_snapshots p
  ON  t.asin        = p.asin
  AND t.category    = p.category
  AND p.captured_at = t.captured_at - INTERVAL '7 days'
WHERE t.captured_at = CURRENT_DATE;
