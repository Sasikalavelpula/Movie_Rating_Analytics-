import React from 'react';
import { Film, Star, Users, Trophy, Clapperboard, Award } from 'lucide-react';
import StatCard from '../common/StatCard';
import { formatVotes } from '../../utils/analyticsHelpers';

export default function StatsOverview({ kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Movies */}
      <StatCard
        title="Total Movies"
        value={kpis.totalMovies}
        subtitle="Cataloged iconic titles"
        icon={Film}
        color="indigo"
      />

      {/* 2. Average Rating */}
      <StatCard
        title="Average Rating"
        value={`⭐ ${kpis.averageRating}`}
        subtitle="Mean score out of 10.0"
        trend="High Quality"
        icon={Star}
        color="amber"
      />

      {/* 3. Total Votes */}
      <StatCard
        title="Total Votes"
        value={formatVotes(kpis.totalVotes)}
        subtitle="IMDb community audience votes"
        icon={Users}
        color="emerald"
      />

      {/* 4. Top Rated Movie */}
      <StatCard
        title="Top Rated Movie"
        value={kpis.topRatedMovie ? `${kpis.topRatedMovie.rating}` : 'N/A'}
        subtitle={kpis.topRatedMovie ? kpis.topRatedMovie.title : ''}
        icon={Trophy}
        color="purple"
      />
    </div>
  );
}
