import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amazon 売れ筋ランキング | ジャンル別人気商品まとめ",
  description:
    "PC・カメラ・スマホ・ゲーム・本など、Amazonで今売れている商品をジャンル別にランキング形式で紹介。最新の人気商品をチェックしよう。",
  openGraph: {
    title: "Amazon 売れ筋ランキング | ジャンル別人気商品まとめ",
    description: "PC・カメラ・スマホ・ゲーム・本など、Amazonで今売れている商品をジャンル別にランキング形式で紹介。",
    type: "website",
    locale: "ja_JP",
    siteName: "Amazon 売れ筋ランキング",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon 売れ筋ランキング | ジャンル別人気商品まとめ",
    description: "PC・カメラ・スマホ・ゲーム・本など、Amazonで今売れている商品をジャンル別にランキング形式で紹介。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} bg-gray-50 text-gray-900 antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
