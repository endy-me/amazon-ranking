interface RankTrendProps {
  change: number | null | undefined;
}

export function RankTrend({ change }: RankTrendProps) {
  if (change == null) {
    return (
      <span className="inline-flex items-center text-xs text-gray-400 font-medium">
        <span className="mr-0.5">✦</span>NEW
      </span>
    );
  }
  if (change > 0) {
    return (
      <span className="inline-flex items-center text-xs text-emerald-600 font-bold">
        ▲{change}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="inline-flex items-center text-xs text-red-500 font-bold">
        ▼{Math.abs(change)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-xs text-gray-400 font-medium">
      ─
    </span>
  );
}
