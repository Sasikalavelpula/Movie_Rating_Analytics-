import React from 'react';
import { Film, Heart, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800 bg-[#0B0F19]/80 py-10 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-white">CineMetrics Dashboard</span>
          <span className="text-gray-600">|</span>
          <span className="text-xs text-gray-500">React & Tailwind CSS Analytics</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-500">
          <span>Data derived from Top Ranked Cinema Datasets</span>
          <span className="inline-flex items-center gap-1 text-gray-400">
            Powered by Vite & Recharts
          </span>
        </div>
      </div>
    </footer>
  );
}
