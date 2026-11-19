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
import { BarChart3 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 border border-gray-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-xs font-semibold text-gray-400 mb-1">Rating Bracket: <span className="text-amber-400 font-bold">{label}</span></p>
        <p className="text-sm font-bold text-white flex items-center gap-2">
          <span>Movies:</span>
          <span className="text-amber-400 text-base">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function RatingDistributionChart({ data }) {
  const colors = ['#6366F1', '#818CF8', '#A78BFA', '#F59E0B', '#FBBF24'];

  return (
    <div className="p-5 rounded-2xl bg-gray-900/70 border border-gray-800 backdrop-blur-md flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            Rating Distribution
          </h3>
          <p className="text-xs text-gray-400">Frequency of titles across score brackets</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
          Score: 8.4 - 10.0
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis
              dataKey="bracket"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
