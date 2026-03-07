import Link from "next/link";
import { categories } from "@/data/categories";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-orange-500">Amazon</span>
            <span className="text-2xl font-black text-gray-800">売れ筋ランキング</span>
          </Link>
        </div>

        <nav className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full whitespace-nowrap transition-colors"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
