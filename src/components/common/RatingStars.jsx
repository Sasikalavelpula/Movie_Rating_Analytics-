import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating, max = 10, totalStars = 5 }) {
  // Normalize rating (e.g. 9.2 / 10 -> 4.6 / 5)
  const normalized = (rating / max) * totalStars;
  
  return (
    <div className="flex items-center gap-1" title={`${rating} / ${max}`}>
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        const isFull = normalized >= starValue;
        const isHalf = !isFull && normalized >= starValue - 0.5;

        return (
          <div key={i} className="relative inline-block text-amber-400">
            {isFull ? (
              <Star size={16} className="fill-amber-400 text-amber-400" />
            ) : isHalf ? (
              <div className="relative">
                <Star size={16} className="text-gray-600" />
                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                </div>
              </div>
            ) : (
              <Star size={16} className="text-gray-700" />
            )}
          </div>
        );
      })}
    </div>
  );
}
