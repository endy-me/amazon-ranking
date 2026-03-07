import { categories } from "@/data/categories";
import { getTopProductsBySlug } from "@/data/products";
import { CategoryCard } from "@/components/CategoryCard";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          <span className="text-orange-500">Amazon</span> 売れ筋ランキング
        </h1>
        <p className="text-gray-500 text-sm">
          ジャンルごとに今売れている商品をピックアップ。気になる商品をAmazonで今すぐチェック。
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
          定期更新中
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const topProducts = getTopProductsBySlug(category.slug, 5);
          return (
            <CategoryCard
              key={category.slug}
              category={category}
              topProducts={topProducts}
            />
          );
        })}
      </div>

      <div className="mt-12 bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center">
        <p className="text-xs text-gray-500">
          ※ 当サイトはAmazonアソシエイト・プログラムの参加者です。<br />
          掲載商品の価格・在庫状況はリアルタイムで変動します。購入前にAmazonで最新情報をご確認ください。
        </p>
      </div>
    </div>
  );
}
