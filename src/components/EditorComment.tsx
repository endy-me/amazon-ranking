interface EditorCommentProps {
  rating?: number;
  comment?: string;
  url?: string;
}

export function EditorComment({ rating, comment, url }: EditorCommentProps) {
  if (!comment) return null;

  const stars = rating ?? 0;

  return (
    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-xs font-bold text-amber-700">編集部おすすめ</span>
        <span className="text-amber-400 text-sm leading-none">
          {"★".repeat(stars)}{"☆".repeat(5 - stars)}
        </span>
      </div>
      <p className="text-xs text-amber-900 leading-relaxed">{comment}</p>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-1.5 text-xs text-amber-700 font-medium hover:underline"
        >
          📝 詳しく読む →
        </a>
      )}
    </div>
  );
}
