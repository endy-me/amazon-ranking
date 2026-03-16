import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/data/categories";
import { getRankingByDate, isDbAvailable } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { mergeEditorPicks } from "@/lib/editor-picks";
import { Product } from "@/types";
import Link from "next/link";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

interface Props {
  params: Promise<{ slug: string; date: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, date } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} 売れ筋ランキング ${date} | Amazon人気商品まとめ`,
    description: `${date}時点のAmazon ${category.name}売れ筋ランキング。`,
  };
}

export default async function CategoryDatePage({ params }: Props) {
  const { slug, date } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  if (!(await isDbAvailable())) notFound();

  const dbRows = await getRankingByDate(slug, date);
  if (dbRows.length === 0) notFound();

  let products: Product[] = dbRows.map((row) => ({
    rank: row.current_rank,
    asin: row.asin,
    title: row.title,
    image: row.image ?? "",
    affiliateUrl: `https://www.amazon.co.jp/dp/${row.asin}/?tag=amazonrankingbest-22`,
    price: row.price ?? undefined,
    updatedAt: date,
    rankChange: null,
  }));

  products = mergeEditorPicks(products);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* パンくず */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-500 transition-colors">
          ホーム
        </Link>
        <span>/</span>
        <Link
          href={`/category/${slug}`}
          className="hover:text-orange-500 transition-colors"
        >
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{date}</span>
      </nav>

      {/* カテゴリヘッダー */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {category.name} 売れ筋ランキング
          </h1>
          <p className="text-sm text-gray-500 mt-1">{date} 時点</p>
        </div>
      </div>

      {/* 過去データ注記 */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5 text-xs text-gray-600 mb-6 flex items-center gap-2">
        <span>📅</span>
        <span>
          これは過去のランキングです。
          <Link
            href={`/category/${slug}`}
            className="text-orange-500 hover:underline ml-1"
          >
            最新ランキングはこちら →
          </Link>
        </span>
      </div>

      {/* アフィリエイト免責 */}
      <div className="bg-orange-50 border border-orange-100 rounded-lg px-4 py-2 text-xs text-gray-500 mb-6">
        ※ 当サイトはAmazonアソシエイト・プログラムの参加者です。リンクを経由してご購入いただくと、紹介料が発生する場合があります。
      </div>

      {/* ランキングリスト */}
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.asin} product={product} variant="full" />
        ))}
      </div>
    </div>
  );
}
