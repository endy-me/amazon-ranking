interface PricePoint {
  date: string;
  price: number;
}

interface PriceSparklineProps {
  history: PricePoint[];
  currentPrice?: number;
}

export function PriceSparkline({ history, currentPrice }: PriceSparklineProps) {
  // 現在価格をhistoryに追加（当日データがなければ）
  const today = new Date().toISOString().split("T")[0];
  const points: PricePoint[] = [...history];
  if (currentPrice != null && points.at(-1)?.date !== today) {
    points.push({ date: today, price: currentPrice });
  }

  if (points.length < 2) return null;

  const W = 120;
  const H = 36;
  const PAD = 3;

  const prices = points.map((p) => p.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const rangeP = maxP - minP || 1;

  const toX = (i: number) => PAD + (i / (points.length - 1)) * (W - PAD * 2);
  const toY = (p: number) => PAD + ((maxP - p) / rangeP) * (H - PAD * 2);

  const polyline = points.map((p, i) => `${toX(i)},${toY(p.price)}`).join(" ");

  const first = points[0].price;
  const last = points[points.length - 1].price;
  const diff = last - first;
  const pct = ((diff / first) * 100).toFixed(1);
  const isDown = diff < 0;
  const isFlat = diff === 0;
  const color = isDown ? "#16a34a" : isFlat ? "#9ca3af" : "#ef4444";

  return (
    <div className="mt-2 flex items-center gap-2">
      <svg width={W} height={H} className="flex-shrink-0">
        <polyline
          points={polyline}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* 最新点 */}
        <circle
          cx={toX(points.length - 1)}
          cy={toY(last)}
          r="2.5"
          fill={color}
        />
      </svg>
      <div className="text-xs leading-tight">
        <span className="text-gray-400 block">{points[0].date.slice(5)} → {points.at(-1)!.date.slice(5)}</span>
        {!isFlat && (
          <span className={`font-bold ${isDown ? "text-green-600" : "text-red-500"}`}>
            {isDown ? "▼" : "▲"}{Math.abs(diff).toLocaleString()}円 ({isDown ? "" : "+"}{pct}%)
          </span>
        )}
        {isFlat && <span className="text-gray-400">価格変動なし</span>}
      </div>
    </div>
  );
}
