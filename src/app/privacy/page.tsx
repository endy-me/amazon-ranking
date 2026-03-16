import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Amazon売れ筋ランキング",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-orange-500 transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-gray-700">プライバシーポリシー</span>
      </nav>

      <h1 className="text-2xl font-black text-gray-900 mb-8">プライバシーポリシー</h1>

      <div className="prose prose-gray max-w-none space-y-8 text-sm text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">個人情報の収集について</h2>
          <p>当サイト（Amazon売れ筋ランキング）では、お問い合わせフォームを通じてお名前・メールアドレス等の個人情報をご提供いただく場合があります。取得した個人情報は、お問い合わせへの回答のみに使用し、第三者への提供は行いません。</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">アクセス解析ツールについて</h2>
          <p>当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。Google AnalyticsはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。収集されるデータはGoogleのプライバシーポリシーに基づいて管理されます。</p>
          <p className="mt-2">Google Analyticsの利用規約・プライバシーポリシーについては、<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Googleのポリシーページ</a>をご確認ください。</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">Cookieについて</h2>
          <p>当サイトでは、Google Analytics によるアクセス分析のためにCookieを使用しています。ブラウザの設定からCookieを無効にすることが可能ですが、一部機能が制限される場合があります。</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">Amazonアソシエイトについて</h2>
          <p>当サイトはAmazon.co.jpのアソシエイトとして、適格販売により収入を得ています。当サイト内のリンクを経由してAmazonで商品を購入された場合、当サイトに紹介料が支払われることがあります。購入者様のご負担が増えることはありません。</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">免責事項</h2>
          <p>当サイトに掲載している商品情報・価格・在庫状況は変動する場合があります。最新情報はAmazonの商品ページにてご確認ください。当サイトの情報をご利用いただいたことによって生じたいかなる損害についても、当サイトは責任を負いかねます。</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">プライバシーポリシーの変更</h2>
          <p>本ポリシーは予告なく変更する場合があります。変更後のポリシーは当ページへの掲載をもって効力を生じるものとします。</p>
        </section>

        <p className="text-xs text-gray-400">制定日：2026年3月</p>
      </div>
    </div>
  );
}
