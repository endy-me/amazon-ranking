import Image from "next/image";
import { Product } from "@/types";
import { RankBadge } from "./RankBadge";

interface ProductCardProps {
  product: Product;
  variant?: "compact" | "full";
}

export function ProductCard({ product, variant = "full" }: ProductCardProps) {
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
        </div>
      </a>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <RankBadge rank={product.rank} size={product.rank <= 3 ? "lg" : "sm"} />
          </div>
          <div className="w-32 h-32 relative flex-shrink-0">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap mb-1">
              {product.badge && (
                <span className="inline-block px-2 py-0.5 text-xs font-bold bg-orange-100 text-orange-700 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-3">
              {product.title}
            </h3>
            {product.price && (
              <p className="text-xl font-bold text-orange-600 mt-2">{product.price}</p>
            )}
            {product.description && (
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description}</p>
            )}
          </div>
        </div>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-4 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-sm"
        >
          Amazonで見る →
        </a>
      </div>
      <div className="px-5 pb-3 text-right">
        <span className="text-xs text-gray-400">更新: {product.updatedAt}</span>
      </div>
    </div>
  );
}
