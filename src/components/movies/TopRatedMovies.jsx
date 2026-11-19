import React, { useState } from 'react';
import { LayoutGrid, List, Trophy, Star, Clock, Users, ArrowUpRight } from 'lucide-react';
import MovieCard from './MovieCard';
import RatingBadge from '../common/RatingBadge';
import { formatVotes } from '../../utils/analyticsHelpers';

export default function TopRatedMovies({ movies, onSelectMovie, allMovies }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Map each movie to its overall ranking in allMovies (sorted by rating descending)
  const rankMap = new Map();
  const sortedAll = [...allMovies].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.votes - a.votes;
  });
  sortedAll.forEach((m, idx) => {
    rankMap.set(m.id, idx + 1);
  });

  return (
    <div className="space-y-4">
      {/* Header and View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Movie Catalog & Ratings</h3>
            <p className="text-xs text-gray-400">Ranked by IMDb-style audience and critical scores</p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-gray-900 border border-gray-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-black font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={14} /> Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-amber-500 text-black font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <List size={14} /> Table
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {movies.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-gray-900/40 border border-gray-800">
          <Star className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white">No movies match your criteria</h4>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, genre selection, or lowering the minimum rating filter.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              rank={rankMap.get(movie.id)}
              onSelect={onSelectMovie}
            />
          ))}
        </div>
      ) : (
        /* Table / List View */
        <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-md">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-950/80 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800 font-semibold">
              <tr>
                <th className="py-3.5 px-4 w-14 text-center">Rank</th>
                <th className="py-3.5 px-4">Movie</th>
                <th className="py-3.5 px-4">Year</th>
                <th className="py-3.5 px-4">Genres</th>
                <th className="py-3.5 px-4">Director</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4 text-right">Votes</th>
                <th className="py-3.5 px-4 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 text-xs">
              {movies.map((movie) => {
                const rank = rankMap.get(movie.id);
                return (
                  <tr
                    key={movie.id}
                    onClick={() => onSelectMovie(movie)}
                    className="hover:bg-gray-800/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 text-center font-bold text-amber-400">
                      #{rank}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-10 h-14 object-cover rounded-md border border-gray-800 bg-gray-950 shrink-0"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80";
                          }}
                        />
                        <div>
                          <p className="font-bold text-white group-hover:text-amber-400 transition-colors text-sm line-clamp-1">
                            {movie.title}
                          </p>
                          <span className="text-gray-500 text-[11px]">{movie.runtime}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-400">
                      {movie.releaseYear}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {movie.genres.map(g => (
                          <span key={g} className="px-2 py-0.5 rounded bg-gray-800 text-[11px] text-gray-300">
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-300">
                      {movie.director}
                    </td>
                    <td className="py-3.5 px-4">
                      <RatingBadge rating={movie.rating} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-gray-300">
                      {formatVotes(movie.votes)}
                    </td>
                    <td className="py-3.5 px-4 text-center text-gray-500 group-hover:text-amber-400">
                      <ArrowUpRight size={16} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
