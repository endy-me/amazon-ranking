"use client";

import { useRouter } from "next/navigation";

interface Props {
  slug: string;
  dates: string[]; // 新しい順
}

export function RankingHistoryNav({ slug, dates }: Props) {
  const router = useRouter();

  if (dates.length === 0) return null;

  const recent = dates.slice(0, 7);
  const older = dates.slice(7);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold text-gray-800 mb-3">過去のランキングを見る</h2>
      <div className="flex flex-wrap items-center gap-2">
        {recent.map((date) => (
          <button
            key={date}
            onClick={() => router.push(`/category/${slug}/${date}`)}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
          >
            {date}
          </button>
        ))}
        {older.length > 0 && (
          <select
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) router.push(`/category/${slug}/${e.target.value}`);
            }}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 cursor-pointer focus:outline-none focus:border-orange-300"
          >
            <option value="" disabled>
              それ以前 ▾
            </option>
            {older.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
