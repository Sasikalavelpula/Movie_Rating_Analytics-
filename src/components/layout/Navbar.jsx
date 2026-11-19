import React from 'react';
import { Film, BarChart3, Star, Sparkles, RefreshCw } from 'lucide-react';

export default function Navbar({ onResetFilters, totalMovies }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-[#0B0F19]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
                  Cine<span className="text-amber-400">Metrics</span>
                </h1>
                <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Analytics Hub
                </span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">Movie Ratings & Critical Insights</p>
            </div>
          </div>

          {/* Quick Actions / Status */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-xs text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Dataset Live: <strong className="text-white">{totalMovies}</strong> Titles</span>
            </div>

            <button
              onClick={onResetFilters}
              title="Reset all search & filters"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-medium border border-gray-700/60 transition-colors"
            >
              <RefreshCw size={13} />
              <span className="hidden sm:inline">Reset Filters</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
