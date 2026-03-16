import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者について | Amazon売れ筋ランキング",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-orange-500 transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-gray-700">運営者について</span>
      </nav>

      <h1 className="text-2xl font-black text-gray-900 mb-8">運営者について</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl flex-shrink-0">
            🧑‍💻
          </div>
          <div>
            <p className="text-xl font-black text-gray-900">エンディ</p>
            <a
              href="https://x.com/endyme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-orange-600 hover:underline"
            >
              @endyme
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          Amazonで売れている商品を手軽にチェックできるサイトとして運営しています。PC・カメラ・スマホ・ゲームなど、ジャンル別のランキングを毎日更新中です。
        </p>

        <div className="border-t border-gray-100 pt-6 space-y-3 text-sm text-gray-600">
          <div className="flex gap-3">
            <span className="font-bold w-24 flex-shrink-0">サイト名</span>
            <span>Amazon売れ筋ランキング</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold w-24 flex-shrink-0">運営者</span>
            <span>エンディ</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold w-24 flex-shrink-0">X（旧Twitter）</span>
            <a href="https://x.com/endyme" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">@endyme</a>
          </div>
          <div className="flex gap-3">
            <span className="font-bold w-24 flex-shrink-0">お問い合わせ</span>
            <a
              href="https://docs.google.com/forms/d/1Wa15qcwCD75d0-PHjqYZnm7wI00kQPBJE2T4n3TzoF4/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline"
            >
              お問い合わせフォーム
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
