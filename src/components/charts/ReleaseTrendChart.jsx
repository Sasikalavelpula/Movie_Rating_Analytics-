import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900/95 border border-gray-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-xs font-semibold text-gray-400 mb-1">Decade: <span className="text-amber-400 font-bold">{label}</span></p>
        <p className="text-sm font-bold text-white flex items-center justify-between gap-4">
          <span>Average Score:</span>
          <span className="text-amber-400 font-mono text-base">⭐ {data.avgRating}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1 flex items-center justify-between gap-4">
          <span>Movies Represented:</span>
          <span className="text-indigo-400 font-semibold">{data.movies} titles</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ReleaseTrendChart({ data }) {
  return (
    <div className="p-5 rounded-2xl bg-gray-900/70 border border-gray-800 backdrop-blur-md flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Rating Trends Across Eras
          </h3>
          <p className="text-xs text-gray-400">Historical performance across movie release periods</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
          1970s - 2020s
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis
              dataKey="era"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis
              domain={[8.0, 9.4]}
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickCount={5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="avgRating"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#ratingGradient)"
              dot={{ fill: '#10B981', r: 4, strokeWidth: 2, stroke: '#0B0F19' }}
              activeDot={{ r: 6, fill: '#34D399', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
