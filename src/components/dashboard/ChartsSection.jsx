import React from 'react';
import RatingDistributionChart from '../charts/RatingDistributionChart';
import GenreRatingChart from '../charts/GenreRatingChart';
import ReleaseTrendChart from '../charts/ReleaseTrendChart';

export default function ChartsSection({
  distributionData,
  genreData,
  timelineData
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* 1. Rating Distribution Chart */}
      <div className="lg:col-span-1">
        <RatingDistributionChart data={distributionData} />
      </div>

      {/* 2. Genre Comparison Chart */}
      <div className="lg:col-span-1">
        <GenreRatingChart data={genreData} />
      </div>

      {/* 3. Release Era Trends Chart */}
      <div className="lg:col-span-1">
        <ReleaseTrendChart data={timelineData} />
      </div>
    </div>
  );
}
