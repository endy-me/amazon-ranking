import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-black text-gray-800 mb-2">ページが見つかりません</h1>
      <p className="text-gray-500 text-sm mb-8">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
      >
        トップページへ戻る
      </Link>
    </div>
  );
}
