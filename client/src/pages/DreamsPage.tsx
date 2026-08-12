import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDreams } from '../hooks/useDreams';
import { DreamCard } from '../components/dreams/DreamCard';
import { Sparkles, Plus, Filter, Compass } from 'lucide-react';

export const DreamsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const { dreams, loading, completeDream } = useDreams(selectedCategory, selectedStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            My Bucket List & Dreams
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Track, plan, and complete your life experiences.
          </p>
        </div>

        <NavLink
          to="/dreams/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dream</span>
        </NavLink>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-gray-300">Filter By Status:</span>
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'DREAM', 'PLANNING', 'IN_PROGRESS', 'COMPLETED'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st === 'ALL' ? undefined : st)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  (st === 'ALL' && !selectedStatus) || selectedStatus === st
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-gray-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="text-gray-400 font-mono">
          Showing {dreams.length} dream{dreams.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Dreams Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : dreams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dreams.map((dream) => (
            <DreamCard key={dream.id} dream={dream} onComplete={completeDream} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No dreams found</h3>
            <p className="text-xs text-gray-400 mt-1">
              Your next adventure starts here. Add your very first dream to begin building your life map.
            </p>
          </div>
          <NavLink
            to="/dreams/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Dream</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};
