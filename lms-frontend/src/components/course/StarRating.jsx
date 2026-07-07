import { Star, StarHalf } from "lucide-react";

export default function StarRating({ rating, size = 14, showCount, count }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const total = 5;

  return (
    <span className="inline-flex items-center gap-1">
      <span className="font-mono font-semibold text-highlight-dark text-sm">{rating.toFixed(1)}</span>
      <span className="flex items-center text-highlight">
        {Array.from({ length: total }).map((_, i) => {
          if (i < full) return <Star key={i} size={size} fill="currentColor" strokeWidth={0} />;
          if (i === full && hasHalf) return <StarHalf key={i} size={size} fill="currentColor" strokeWidth={0} />;
          return <Star key={i} size={size} className="text-ink/15" fill="currentColor" strokeWidth={0} />;
        })}
      </span>
      {showCount && <span className="text-inkSoft text-xs">({count.toLocaleString()})</span>}
    </span>
  );
}
