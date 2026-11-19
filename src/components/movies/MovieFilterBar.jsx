import React from 'react';
import { Search, Filter, ArrowUpDown, X, Star, Globe } from 'lucide-react';

export default function MovieFilterBar({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  selectedLanguage,
  setSelectedLanguage,
  genres,
  sortBy,
  setSortBy,
  minRating,
  setMinRating,
  filteredCount,
  totalCount
}) {
  return (
    <div className="space-y-4 p-5 rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur-md">
      {/* Top row: Search, Language, Rating, and Sort dropdowns */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, director (Rajamouli, Nolan), or Telugu/English..."
            className="w-full pl-10 pr-10 py-2.5 bg-gray-950/80 border border-gray-700/80 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filters & Sorters */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-950/80 border border-gray-700/80 rounded-xl text-xs text-gray-300">
            <Globe size={13} className="text-emerald-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              aria-label="Filter by language"
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-gray-900 text-white">All Industries</option>
              <option value="Telugu" className="bg-gray-900 text-amber-400 font-bold">🇮🇳 Telugu (టాలీవుడ్)</option>
              <option value="English" className="bg-gray-900 text-white">🌍 English / Hollywood</option>
            </select>
          </div>

          {/* Min Rating Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-950/80 border border-gray-700/80 rounded-xl text-xs text-gray-300">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              aria-label="Filter by minimum rating"
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value={0} className="bg-gray-900 text-white">All Ratings</option>
              <option value={7.5} className="bg-gray-900 text-white">7.5+ Stars</option>
              <option value={8.0} className="bg-gray-900 text-white">8.0+ Stars</option>
              <option value={8.5} className="bg-gray-900 text-white">8.5+ Acclaimed</option>
              <option value={9.0} className="bg-gray-900 text-white">9.0+ Masterpiece</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-950/80 border border-gray-700/80 rounded-xl text-xs text-gray-300">
            <ArrowUpDown size={13} className="text-indigo-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort movies by"
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="rating_desc" className="bg-gray-900 text-white">Rating (High to Low)</option>
              <option value="rating_asc" className="bg-gray-900 text-white">Rating (Low to High)</option>
              <option value="votes_desc" className="bg-gray-900 text-white">Most Reviewed</option>
              <option value="year_desc" className="bg-gray-900 text-white">Newest Release</option>
              <option value="year_asc" className="bg-gray-900 text-white">Oldest Classic</option>
              <option value="title_asc" className="bg-gray-900 text-white">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Language Toggle Bar */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gray-400 font-semibold">Quick View:</span>
        <button
          onClick={() => setSelectedLanguage('All')}
          className={`px-3 py-1 rounded-lg font-medium transition-all ${
            selectedLanguage === 'All'
              ? 'bg-gray-700 text-white font-bold'
              : 'bg-gray-950/60 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          All Cinema
        </button>
        <button
          onClick={() => setSelectedLanguage('Telugu')}
          className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
            selectedLanguage === 'Telugu'
              ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
              : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
          }`}
        >
          🇮🇳 Telugu Cinema (టాలీవుడ్)
        </button>
        <button
          onClick={() => setSelectedLanguage('English')}
          className={`px-3 py-1 rounded-lg font-medium transition-all ${
            selectedLanguage === 'English'
              ? 'bg-indigo-600 text-white font-bold'
              : 'bg-gray-950/60 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          Hollywood & Global
        </button>
      </div>

      {/* Genre Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-gray-400 text-xs font-semibold mr-1 flex items-center gap-1">
          <Filter size={12} /> Genre:
        </span>
        {['All', ...genres].map((genre) => {
          const isActive = selectedGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20'
                  : 'bg-gray-950/60 text-gray-300 hover:text-white hover:bg-gray-800 border border-gray-800'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {/* Results counter and active state indicator */}
      <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-800/60">
        <span>
          Showing <strong className="text-white">{filteredCount}</strong> of <strong className="text-white">{totalCount}</strong> movies
        </span>
        {(searchQuery || selectedGenre !== 'All' || selectedLanguage !== 'All' || minRating > 0) && (
          <span className="text-amber-400/90 font-medium">Filters active</span>
        )}
      </div>
    </div>
  );
}
