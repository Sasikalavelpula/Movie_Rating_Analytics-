import React, { useState, useMemo } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StatsOverview from './components/dashboard/StatsOverview';
import ChartsSection from './components/dashboard/ChartsSection';
import MovieFilterBar from './components/movies/MovieFilterBar';
import TopRatedMovies from './components/movies/TopRatedMovies';
import MovieDetailModal from './components/movies/MovieDetailModal';

import { MOCK_MOVIES } from './data/mockMovies';
import {
  calculateKPIs,
  getRatingDistribution,
  getGenreRatings,
  getReleaseTimeline
} from './utils/analyticsHelpers';

import { Sparkles, Film } from 'lucide-react';

export default function App() {
  const [movies] = useState(MOCK_MOVIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating_desc');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Derive unique genres
  const allGenres = useMemo(() => {
    const set = new Set();
    movies.forEach(m => m.genres.forEach(g => set.add(g)));
    return Array.from(set).sort();
  }, [movies]);

  // Overall dataset KPIs and analytics charts
  const kpis = useMemo(() => calculateKPIs(movies), [movies]);
  const distributionData = useMemo(() => getRatingDistribution(movies), [movies]);
  const genreData = useMemo(() => getGenreRatings(movies), [movies]);
  const timelineData = useMemo(() => getReleaseTimeline(movies), [movies]);

  // Filter and sort movies for display
  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        // Search query (matches title, director, genre, language, synopsis, and keyword variations)
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          movie.title.toLowerCase().includes(query) ||
          movie.director.toLowerCase().includes(query) ||
          (movie.language && movie.language.toLowerCase().includes(query)) ||
          (query === 'tollywood' && movie.language === 'Telugu') ||
          (query === 'hollywood' && movie.language === 'English') ||
          movie.synopsis.toLowerCase().includes(query) ||
          movie.genres.some(g => g.toLowerCase().includes(query));

        // Language filter
        const matchesLanguage =
          selectedLanguage === 'All' || movie.language === selectedLanguage;

        // Genre filter
        const matchesGenre =
          selectedGenre === 'All' || movie.genres.includes(selectedGenre);

        // Rating filter
        const matchesRating = movie.rating >= minRating;

        return matchesSearch && matchesLanguage && matchesGenre && matchesRating;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating_desc':
            return b.rating - a.rating || b.votes - a.votes;
          case 'rating_asc':
            return a.rating - b.rating;
          case 'votes_desc':
            return b.votes - a.votes;
          case 'year_desc':
            return b.releaseYear - a.releaseYear;
          case 'year_asc':
            return a.releaseYear - b.releaseYear;
          case 'title_asc':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [movies, searchQuery, selectedLanguage, selectedGenre, minRating, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedLanguage('All');
    setMinRating(0);
    setSortBy('rating_desc');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-gray-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <Navbar onResetFilters={handleResetFilters} totalMovies={movies.length} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-900/90 to-amber-950/30 border border-gray-800 p-6 sm:p-8 backdrop-blur-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
              <Sparkles size={14} />
              <span>Tollywood & Global Cinema Analytics</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Movie Rating <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Analytics</span> & Insights
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Explore critical ratings, audience voting distributions, genre benchmarks, and historical trends for top Telugu classics, Tollywood blockbusters, and global masterpieces.
            </p>
          </div>

          {/* Decorative ambient background blur */}
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-40 bottom-0 -mb-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* 1. Key Performance Indicators Overview */}
        <section aria-label="Key Performance Indicators">
          <StatsOverview kpis={kpis} />
        </section>

        {/* 2. Charts & Analytical Visualizations */}
        <section aria-label="Analytical Visualizations">
          <ChartsSection
            distributionData={distributionData}
            genreData={genreData}
            timelineData={timelineData}
          />
        </section>

        {/* 3. Filter & Search Controls */}
        <section aria-label="Movie Catalog Filters">
          <MovieFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            genres={allGenres}
            sortBy={sortBy}
            setSortBy={setSortBy}
            minRating={minRating}
            setMinRating={setMinRating}
            filteredCount={filteredMovies.length}
            totalCount={movies.length}
          />
        </section>

        {/* 4. Top Rated Movies Showcase */}
        <section aria-label="Top Rated Movies List">
          <TopRatedMovies
            movies={filteredMovies}
            allMovies={movies}
            onSelectMovie={setSelectedMovie}
          />
        </section>

      </main>

      {/* Modal Dialog for movie details */}
      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
