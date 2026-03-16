import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Amazon 売れ筋ランキング";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* 背景装飾 */}
        <div style={{
          position: "absolute", top: 40, left: 60,
          fontSize: 80, opacity: 0.15,
          display: "flex",
        }}>🏆</div>
        <div style={{
          position: "absolute", bottom: 40, right: 60,
          fontSize: 80, opacity: 0.15,
          display: "flex",
        }}>🛒</div>

        {/* バッジ */}
        <div style={{
          background: "#f97316",
          borderRadius: 16,
          padding: "12px 36px",
          color: "white",
          fontSize: 32,
          fontWeight: 900,
          marginBottom: 24,
          display: "flex",
        }}>
          Amazon 売れ筋ランキング
        </div>

        {/* メインタイトル */}
        <div style={{
          fontSize: 56,
          fontWeight: 900,
          color: "#1c1917",
          textAlign: "center",
          lineHeight: 1.3,
          display: "flex",
        }}>
          ジャンル別 人気商品まとめ
        </div>

        {/* サブタイトル */}
        <div style={{
          fontSize: 28,
          color: "#78716c",
          marginTop: 20,
          display: "flex",
        }}>
          PC・カメラ・スマホ・ゲーム・本など毎日更新
        </div>

        {/* ランキングバッジ列 */}
        <div style={{
          display: "flex",
          gap: 16,
          marginTop: 40,
        }}>
          {["1位", "2位", "3位"].map((label, i) => (
            <div key={i} style={{
              width: 72, height: 72,
              borderRadius: "50%",
              background: i === 0 ? "#facc15" : i === 1 ? "#9ca3af" : "#d97706",
              color: "white",
              fontSize: 24,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
