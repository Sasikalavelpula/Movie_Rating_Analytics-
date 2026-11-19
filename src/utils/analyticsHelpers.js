/**
 * Analytics calculation helpers for movie rating dashboard
 */

export function calculateKPIs(movies) {
  if (!movies || movies.length === 0) {
    return {
      totalMovies: 0,
      averageRating: 0,
      totalVotes: 0,
      topRatedMovie: null,
      topGenre: 'N/A',
      highestMetascore: null
    };
  }

  const totalMovies = movies.length;
  const totalVotes = movies.reduce((acc, m) => acc + (m.votes || 0), 0);
  const sumRatings = movies.reduce((acc, m) => acc + (m.rating || 0), 0);
  const averageRating = (sumRatings / totalMovies).toFixed(2);

  // Top rated movie (sorted by rating desc, then votes desc)
  const sortedByRating = [...movies].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.votes - a.votes;
  });
  const topRatedMovie = sortedByRating[0];

  // Highest metascore
  const sortedByMeta = [...movies].sort((a, b) => (b.metascore || 0) - (a.metascore || 0));
  const highestMetascore = sortedByMeta[0];

  // Top genre by average rating (with at least 2 movies)
  const genreMap = {};
  movies.forEach(movie => {
    movie.genres.forEach(g => {
      if (!genreMap[g]) {
        genreMap[g] = { count: 0, totalRating: 0 };
      }
      genreMap[g].count += 1;
      genreMap[g].totalRating += movie.rating;
    });
  });

  let topGenre = 'Drama';
  let bestAvg = 0;
  Object.keys(genreMap).forEach(genre => {
    const avg = genreMap[genre].totalRating / genreMap[genre].count;
    if (genreMap[genre].count >= 2 && avg > bestAvg) {
      bestAvg = avg;
      topGenre = genre;
    }
  });

  return {
    totalMovies,
    averageRating,
    totalVotes,
    topRatedMovie,
    topGenre,
    highestMetascore
  };
}

export function getRatingDistribution(movies) {
  const buckets = [
    { range: '7.5 - 7.9', min: 7.5, max: 7.99, count: 0, movies: [] },
    { range: '8.0 - 8.4', min: 8.0, max: 8.49, count: 0, movies: [] },
    { range: '8.5 - 8.7', min: 8.5, max: 8.79, count: 0, movies: [] },
    { range: '8.8 - 9.0', min: 8.8, max: 9.09, count: 0, movies: [] },
    { range: '9.1+',       min: 9.1, max: 10.0, count: 0, movies: [] },
  ];

  movies.forEach(movie => {
    const bucket = buckets.find(b => movie.rating >= b.min && movie.rating <= b.max);
    if (bucket) {
      bucket.count += 1;
      bucket.movies.push(movie.title);
    }
  });

  return buckets.map(b => ({
    bracket: b.range,
    count: b.count,
    tooltip: `${b.count} movies in ${b.range}`
  }));
}

export function getGenreRatings(movies) {
  const genreStats = {};

  movies.forEach(movie => {
    movie.genres.forEach(genre => {
      if (!genreStats[genre]) {
        genreStats[genre] = {
          genre,
          totalRating: 0,
          count: 0,
          totalVotes: 0
        };
      }
      genreStats[genre].totalRating += movie.rating;
      genreStats[genre].count += 1;
      genreStats[genre].totalVotes += movie.votes;
    });
  });

  return Object.values(genreStats)
    .filter(g => g.count >= 2)
    .map(g => ({
      genre: g.genre,
      avgRating: Number((g.totalRating / g.count).toFixed(2)),
      count: g.count,
      totalVotes: g.totalVotes
    }))
    .sort((a, b) => b.avgRating - a.avgRating);
}

export function getReleaseTimeline(movies) {
  // Group by era or decade
  const eraMap = {
    '1950s-70s': { era: '1950s-70s', count: 0, sumRating: 0, avgRating: 0 },
    '1990s':     { era: '1990s',     count: 0, sumRating: 0, avgRating: 0 },
    '2000s':     { era: '2000s',     count: 0, sumRating: 0, avgRating: 0 },
    '2010s':     { era: '2010s',     count: 0, sumRating: 0, avgRating: 0 },
    '2020s':     { era: '2020s',     count: 0, sumRating: 0, avgRating: 0 },
  };

  movies.forEach(movie => {
    let era = '2020s';
    if (movie.releaseYear < 1980) era = '1950s-70s';
    else if (movie.releaseYear < 2000) era = '1990s';
    else if (movie.releaseYear < 2010) era = '2000s';
    else if (movie.releaseYear < 2020) era = '2010s';

    if (eraMap[era]) {
      eraMap[era].count += 1;
      eraMap[era].sumRating += movie.rating;
    }
  });

  return Object.values(eraMap).map(e => ({
    era: e.era,
    movies: e.count,
    avgRating: e.count > 0 ? Number((e.sumRating / e.count).toFixed(2)) : 0
  }));
}

export function formatVotes(votes) {
  if (!votes) return '0';
  if (votes >= 1000000) {
    return (votes / 1000000).toFixed(1) + 'M';
  }
  if (votes >= 1000) {
    return (votes / 1000).toFixed(0) + 'K';
  }
  return votes.toString();
}
