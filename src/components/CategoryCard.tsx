import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import { Product } from "@/types";

const colorMap: Record<string, { bg: string; border: string; text: string; btn: string }> = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-100",   text: "text-blue-700",   btn: "bg-blue-600 hover:bg-blue-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-700", btn: "bg-purple-600 hover:bg-purple-700" },
  green:  { bg: "bg-green-50",  border: "border-green-100",  text: "text-green-700",  btn: "bg-green-600 hover:bg-green-700" },
  teal:   { bg: "bg-teal-50",   border: "border-teal-100",   text: "text-teal-700",   btn: "bg-teal-600 hover:bg-teal-700" },
  red:    { bg: "bg-red-50",    border: "border-red-100",    text: "text-red-700",    btn: "bg-red-600 hover:bg-red-700" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-100", text: "text-yellow-700", btn: "bg-yellow-600 hover:bg-yellow-700" },
  orange: { bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-700", btn: "bg-orange-600 hover:bg-orange-700" },
  pink:   { bg: "bg-pink-50",   border: "border-pink-100",   text: "text-pink-700",   btn: "bg-pink-600 hover:bg-pink-700" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-700", btn: "bg-indigo-600 hover:bg-indigo-700" },
  gray:   { bg: "bg-gray-50",   border: "border-gray-200",   text: "text-gray-700",   btn: "bg-gray-700 hover:bg-gray-800" },
  violet:  { bg: "bg-violet-50",  border: "border-violet-100",  text: "text-violet-700",  btn: "bg-violet-600 hover:bg-violet-700" },
  amber:   { bg: "bg-amber-50",   border: "border-amber-100",   text: "text-amber-700",   btn: "bg-amber-600 hover:bg-amber-700" },
  fuchsia: { bg: "bg-fuchsia-50", border: "border-fuchsia-100", text: "text-fuchsia-700", btn: "bg-fuchsia-600 hover:bg-fuchsia-700" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-700", btn: "bg-emerald-600 hover:bg-emerald-700" },
  lime:    { bg: "bg-lime-50",    border: "border-lime-100",    text: "text-lime-700",    btn: "bg-lime-600 hover:bg-lime-700" },
};

interface CategoryCardProps {
  category: Category;
  topProducts: Product[];
}

export function CategoryCard({ category, topProducts }: CategoryCardProps) {
  const colors = colorMap[category.color] ?? colorMap.gray;

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} overflow-hidden`}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h2 className={`text-lg font-bold ${colors.text}`}>{category.name}</h2>
            <p className="text-xs text-gray-500">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-white divide-y divide-gray-50">
        {topProducts.map((product, idx) => (
          <a
            key={product.asin}
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
              idx === 0 ? "bg-yellow-400" : idx === 1 ? "bg-gray-400" : idx === 2 ? "bg-amber-600" : "bg-gray-300"
            }`}>
              {idx + 1}
            </span>
            <div className="w-11 h-11 relative flex-shrink-0">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {product.title}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                {product.price && (
                  <p className="text-xs font-bold text-orange-600">{product.price}</p>
                )}
                {product.rating != null && (
                  <span className="text-xs text-yellow-500 font-medium">
                    ★{product.rating.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="p-4">
        <Link
          href={`/category/${category.slug}`}
          className={`block text-center text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors ${colors.btn}`}
        >
          ランキングをすべて見る →
        </Link>
      </div>
    </div>
  );
}
