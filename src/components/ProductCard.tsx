import Image from "next/image";
import { Product } from "@/types";
import { RankBadge } from "./RankBadge";
import { RankTrend } from "./RankTrend";
import { EditorComment } from "./EditorComment";
import { PriceSparkline } from "./PriceSparkline";

interface PricePoint {
  date: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  variant?: "compact" | "full";
  priceHistory?: PricePoint[];
}

function StarRating({ rating, reviewCount }: { rating?: number; reviewCount?: number }) {
  if (!rating) return null;
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
      <span className="text-yellow-400 leading-none">
        {"★".repeat(full)}
        {half ? "½" : ""}
        {"☆".repeat(empty)}
      </span>
      <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
      {reviewCount != null && reviewCount > 0 && (
        <span className="text-gray-400">({reviewCount.toLocaleString()}件)</span>
      )}
    </span>
  );
}

export function ProductCard({ product, variant = "full", priceHistory }: ProductCardProps) {
  const reviewUrl = `https://www.amazon.co.jp/product-reviews/${product.asin}/`;

  if (variant === "compact") {
    return (
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
      >
        <RankBadge rank={product.rank} size="sm" />
        <div className="w-14 h-14 relative flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {product.title}
          </p>
          {product.price && (
            <p className="text-sm font-bold text-orange-600 mt-1">{product.price}</p>
          )}
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
      </a>
    );
  }

  const isTop3 = product.rank <= 3;
  const cardClass = isTop3
    ? "bg-white rounded-xl border-2 border-orange-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    : "bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden";

  // 現在価格を数値化（スパークライン用）
  const currentPriceNum = product.price
    ? parseFloat(product.price.replace(/[^0-9.]/g, "")) || undefined
    : undefined;

  return (
    <div className={cardClass}>
      {isTop3 && (
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-1.5 flex items-center gap-2">
          <span className="text-white text-xs font-black">
            {product.rank === 1 ? "🥇 1位" : product.rank === 2 ? "🥈 2位" : "🥉 3位"}
          </span>
          <span className="text-orange-100 text-xs">売れ筋ランキング上位</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex gap-4">
          {!isTop3 && (
            <div className="flex-shrink-0">
              <RankBadge rank={product.rank} size="sm" />
            </div>
          )}
          <div className={`relative flex-shrink-0 ${isTop3 ? "w-36 h-36" : "w-32 h-32"}`}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {product.badge && !isTop3 && (
                <span className="inline-block px-2 py-0.5 text-xs font-bold bg-orange-100 text-orange-700 rounded-full">
                  {product.badge}
                </span>
              )}
              <RankTrend change={product.rankChange} />
            </div>
            <h3 className={`font-semibold text-gray-900 leading-snug line-clamp-3 ${isTop3 ? "text-base" : "text-sm"}`}>
              {product.title}
            </h3>
            {product.price ? (
              <p className={`font-bold text-orange-600 mt-2 ${isTop3 ? "text-2xl" : "text-xl"}`}>
                {product.price}
              </p>
            ) : (
              <p className="text-sm text-gray-400 mt-2">価格はAmazonで確認</p>
            )}
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            {product.description && (
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description}</p>
            )}
            {/* 価格推移スパークライン */}
            {priceHistory && priceHistory.length >= 1 && (
              <PriceSparkline history={priceHistory} currentPrice={currentPriceNum} />
            )}
          </div>
        </div>
        <EditorComment rating={product.editorRating} comment={product.editorComment} url={product.editorUrl} />

        {/* Amazonレビューへのリンク */}
        <div className="mt-3 text-center">
          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs text-gray-400 hover:text-orange-500 transition-colors underline underline-offset-2"
          >
            Amazonのレビューを見る
          </a>
        </div>

        {/* メインCTA */}
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-3 block w-full text-center text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm bg-orange-500 hover:bg-orange-600"
        >
          {product.price ? "Amazonで購入する →" : "Amazonで価格を確認する →"}
        </a>
      </div>
      <div className="px-5 pb-3 text-right">
        <span className="text-xs text-gray-400">更新: {product.updatedAt}</span>
      </div>
    </div>
  );
}
