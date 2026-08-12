import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 text-center">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 max-w-sm">
        <Compass className="w-12 h-12 text-emerald-400 animate-spin-slow mx-auto" />
        <h1 className="text-2xl font-extrabold text-white">Page Off The Map</h1>
        <p className="text-xs text-gray-400">The destination you are looking for does not exist on your life trail.</p>
        <NavLink
          to="/dashboard"
          className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
        >
          Return to Dashboard
        </NavLink>
      </div>
    </div>
  );
};
