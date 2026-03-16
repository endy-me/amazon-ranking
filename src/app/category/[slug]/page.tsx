import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsBySlug } from "@/data/products";
import { getRankingWithTrend, getAvailableDates, isDbAvailable } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { RankingHistoryNav } from "@/components/RankingHistoryNav";
import { Product } from "@/types";
import { mergeEditorPicks } from "@/lib/editor-picks";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} 売れ筋ランキング | Amazon人気商品まとめ`,
    description: `Amazon ${category.name}の売れ筋ランキング。${category.description}の人気商品をランキング形式で紹介。`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  // DBが使える場合はSupabaseから取得（推移データ付き）
  let products: Product[] = [];
  let hasDbData = false;

  if (await isDbAvailable()) {
    const dbRows = await getRankingWithTrend(slug, 20);
    if (dbRows.length > 0) {
      hasDbData = true;
      products = dbRows.map((row) => ({
        rank: row.current_rank,
        asin: row.asin,
        title: row.title,
        image: row.image ?? "",
        affiliateUrl: `https://www.amazon.co.jp/dp/${row.asin}/?tag=amazonrankingbest-22`,
        price: row.price ?? undefined,
        updatedAt: row.captured_at,
        rankChange: row.rank_change,
      }));
    }
  }

  // DBが使えない or データなし → 手動データにフォールバック
  if (!hasDbData) {
    products = getProductsBySlug(slug);
  }

  products = mergeEditorPicks(products);

  // 過去日付一覧（DBがある場合のみ、最新日を除いた過去分）
  const availableDates = hasDbData ? (await getAvailableDates(slug)).slice(1) : [];

  const updatedAt = products[0]?.updatedAt ?? "";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* パンくず */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-500 transition-colors">
          ホーム
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{category!.name}</span>
      </nav>

      {/* カテゴリヘッダー */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{category!.icon}</span>
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {category!.name} 売れ筋ランキング
          </h1>
          <p className="text-sm text-gray-500 mt-1">{category!.description}</p>
          <div className="flex items-center gap-3 mt-1">
            {updatedAt && (
              <p className="text-xs text-gray-400">最終更新: {updatedAt}</p>
            )}
            {hasDbData && (
              <span className="text-xs text-emerald-600 font-medium">
                ▲▼ 先週比の順位変動を表示中
              </span>
            )}
          </div>
        </div>
      </div>

      {/* アフィリエイト免責 */}
      <div className="bg-orange-50 border border-orange-100 rounded-lg px-4 py-2 text-xs text-gray-500 mb-6">
        ※ 当サイトはAmazonアソシエイト・プログラムの参加者です。リンクを経由してご購入いただくと、紹介料が発生する場合があります。
      </div>

      {/* ランキングリスト */}
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4">🔧</p>
          <p>このカテゴリは準備中です</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductCard key={product.asin} product={product} variant="full" />
          ))}
        </div>
      )}

      <RankingHistoryNav slug={slug} dates={availableDates} />

      {/* 他のカテゴリ */}
      <div className="mt-12">
        <h2 className="text-lg font-bold text-gray-800 mb-4">他のカテゴリを見る</h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== slug)
            .map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
