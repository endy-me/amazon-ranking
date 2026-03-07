interface RankBadgeProps {
  rank: number;
  size?: "sm" | "lg";
}

export function RankBadge({ rank, size = "sm" }: RankBadgeProps) {
  const sizeClass = size === "lg" ? "w-12 h-12 text-2xl font-black" : "w-8 h-8 text-sm font-bold";

  if (rank === 1) {
    return (
      <div className={`${sizeClass} rounded-full bg-yellow-400 text-white flex items-center justify-center shadow-md`}>
        1
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className={`${sizeClass} rounded-full bg-gray-400 text-white flex items-center justify-center shadow-md`}>
        2
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className={`${sizeClass} rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md`}>
        3
      </div>
    );
  }
  return (
    <div className={`${sizeClass} rounded-full bg-gray-200 text-gray-600 flex items-center justify-center`}>
      {rank}
    </div>
  );
}
