import React from 'react';
import { Star } from 'lucide-react';

export default function RatingBadge({ rating, size = 'md', showStar = true }) {
  const getBadgeStyle = (score) => {
    if (score >= 9.0) return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    if (score >= 8.6) return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base font-bold px-3 py-1.5 gap-2',
    xl: 'text-xl font-extrabold px-4 py-2 gap-2'
  };

  const starSizes = {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-lg border backdrop-blur-md ${getBadgeStyle(rating)} ${sizeClasses[size] || sizeClasses.md}`}>
      {showStar && <Star size={starSizes[size] || 14} className="fill-current" />}
      <span>{Number(rating).toFixed(1)}</span>
    </span>
  );
}
