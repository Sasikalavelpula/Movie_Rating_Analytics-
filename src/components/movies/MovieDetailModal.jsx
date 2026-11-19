import React, { useEffect } from 'react';
import { X, Star, Calendar, Clock, DollarSign, Award, Users, Film } from 'lucide-react';
import RatingBadge from '../common/RatingBadge';
import RatingStars from '../common/RatingStars';
import { formatVotes } from '../../utils/analyticsHelpers';

export default function MovieDetailModal({ movie, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-2xl bg-gray-900 border border-gray-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white border border-white/10 backdrop-blur-md transition-all"
        >
          <X size={18} />
        </button>

        {/* Hero Banner with Poster */}
        <div className="relative h-60 sm:h-72 w-full bg-gray-950 overflow-hidden shrink-0">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          
          {/* Movie Title Banner */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <RatingBadge rating={movie.rating} size="lg" />
              <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-xs font-semibold text-gray-200 border border-white/10">
                {movie.rated || 'PG-13'}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                Metascore: {movie.metascore || 85}/100
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
              {movie.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Metadata quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-gray-800">
            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <Calendar size={16} className="text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-400">Release Year</p>
                <p className="font-semibold text-white">{movie.releaseYear}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <Clock size={16} className="text-indigo-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-400">Runtime</p>
                <p className="font-semibold text-white">{movie.runtime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <Users size={16} className="text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-400">Audience Votes</p>
                <p className="font-semibold text-white">{formatVotes(movie.votes)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <DollarSign size={16} className="text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-400">Box Office</p>
                <p className="font-semibold text-white">{movie.boxOffice || '$150M'}</p>
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <Film size={14} /> Synopsis & Overview
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed bg-gray-950/50 p-4 rounded-xl border border-gray-800/80">
              {movie.synopsis}
            </p>
          </div>

          {/* Director & Genres */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <p className="text-xs text-gray-400">Directed By</p>
              <p className="text-sm font-bold text-white mt-0.5">{movie.director}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1 sm:text-right">Genres</p>
              <div className="flex flex-wrap gap-1.5">
                {movie.genres.map(g => (
                  <span key={g} className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-200 border border-gray-700">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-950 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RatingStars rating={movie.rating} />
            <span className="text-xs text-gray-400 font-mono">({movie.rating} / 10)</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
