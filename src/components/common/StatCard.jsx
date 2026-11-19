import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'indigo' }) {
  const colorThemes = {
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/15 text-amber-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
    },
    indigo: {
      border: 'border-indigo-500/20 hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/15 text-indigo-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]'
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]'
    },
    purple: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/15 text-purple-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]'
    }
  };

  const theme = colorThemes[color] || colorThemes.indigo;

  return (
    <div className={`group relative p-5 rounded-2xl bg-gray-900/80 backdrop-blur-md border ${theme.border} transition-all duration-300 ${theme.glow}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{value}</h3>
            {trend && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {trend}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-400 mt-1 line-clamp-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${theme.iconBg} flex items-center justify-center shrink-0`}>
          {Icon && <Icon size={24} />}
        </div>
      </div>
    </div>
  );
}
