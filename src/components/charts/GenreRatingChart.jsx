import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Film } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900/95 border border-gray-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-xs font-semibold text-gray-400 mb-1">Genre: <span className="text-indigo-400 font-bold">{data.genre}</span></p>
        <p className="text-sm font-bold text-white flex items-center justify-between gap-4">
          <span>Avg Rating:</span>
          <span className="text-amber-400 font-mono text-base">⭐ {data.avgRating}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1 flex items-center justify-between gap-4">
          <span>Sample Size:</span>
          <span className="text-gray-200">{data.count} movies</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function GenreRatingChart({ data }) {
  return (
    <div className="p-5 rounded-2xl bg-gray-900/70 border border-gray-800 backdrop-blur-md flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Film className="w-4 h-4 text-indigo-400" />
            Average Rating by Genre
          </h3>
          <p className="text-xs text-gray-400">Comparing quality benchmarks across genres</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
          Min. 2 Titles
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} />
            <XAxis
              type="number"
              domain={[8.0, 9.2]}
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
              tickCount={6}
            />
            <YAxis
              type="category"
              dataKey="genre"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={75}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
            <Bar dataKey="avgRating" fill="#6366F1" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? '#F59E0B' : index === 1 ? '#818CF8' : '#6366F1'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
