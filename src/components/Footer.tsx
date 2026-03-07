export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center">
          <p className="text-lg font-black text-gray-800 mb-2">
            <span className="text-orange-500">Amazon</span> 売れ筋ランキング
          </p>
          <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
            当サイトはAmazonアソシエイト・プログラムの参加者です。
            当サイトが提供するリンクを経由してAmazonで商品を購入されると、
            当サイトに紹介料が支払われる場合があります。
          </p>
          <p className="text-xs text-gray-400 mt-4">
            掲載商品の価格・在庫は変動します。購入前にAmazonで最新情報をご確認ください。
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} Amazon売れ筋ランキング
          </p>
        </div>
      </div>
    </footer>
  );
}
