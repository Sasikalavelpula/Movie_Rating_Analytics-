import React from 'react';
import { Star, Clock, Users, Award, Eye } from 'lucide-react';
import RatingBadge from '../common/RatingBadge';
import RatingStars from '../common/RatingStars';
import { formatVotes } from '../../utils/analyticsHelpers';

export default function MovieCard({ movie, rank, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(movie)}
      className="group relative flex flex-col rounded-2xl bg-gray-900/80 border border-gray-800/80 overflow-hidden hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)] transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-gray-950">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80";
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

        {/* Rank Badge */}
        {rank && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-xs font-black text-amber-400 flex items-center gap-1 shadow-md">
            <span>#{rank}</span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 shadow-lg">
          <RatingBadge rating={movie.rating} size="sm" />
        </div>

        {/* Hover Inspect Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center gap-1.5 shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
            <Eye size={14} /> Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Release Year, Certificate, and Language */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1 flex-wrap">
            <span className="font-semibold text-gray-300">{movie.releaseYear}</span>
            <span>•</span>
            <span className="px-1.5 py-0.5 rounded bg-gray-800 text-[11px] text-gray-300 border border-gray-700 font-mono">
              {movie.rated || 'PG-13'}
            </span>
            {movie.language === 'Telugu' && (
              <>
                <span>•</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-[11px] text-amber-400 border border-amber-500/30 font-semibold">
                  🇮🇳 Telugu
                </span>
              </>
            )}
            <span>•</span>
            <span className="flex items-center gap-1 text-[11px]">
              <Clock size={11} className="text-gray-500" />
              {movie.runtime}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {movie.title}
          </h4>

          {/* Director */}
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
            Dir. <span className="text-gray-300">{movie.director}</span>
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {movie.genres.map(genre => (
              <span
                key={genre}
                className="text-[11px] px-2 py-0.5 rounded-md bg-gray-800/80 text-gray-300 border border-gray-700/60 font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info: Rating Stars & Votes */}
        <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
          <RatingStars rating={movie.rating} />
          <div className="flex items-center gap-1 text-gray-300 font-medium">
            <Users size={12} className="text-amber-400" />
            <span>{formatVotes(movie.votes)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
