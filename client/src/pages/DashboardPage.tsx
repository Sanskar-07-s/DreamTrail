import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDreams } from '../hooks/useDreams';
import { useMemories } from '../hooks/useMemories';
import { DreamCard } from '../components/dreams/DreamCard';
import { MemoryCard } from '../components/memories/MemoryCard';
import { Sparkles, Compass, MapPin, Bot, PlusCircle, Camera, CheckCircle2, Trophy, Flame } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { userProfile } = useAuth();
  const { dreams, completeDream } = useDreams();
  const { memories } = useMemories();

  const totalDreams = dreams.length;
  const completedCount = dreams.filter((d) => d.status === 'COMPLETED').length;
  const inProgressDreams = dreams.filter((d) => d.status === 'IN_PROGRESS' || d.status === 'PLANNING');
  const currentMission = inProgressDreams[0] || dreams[0];
  const recentMemories = memories.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Life Operating System</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome Back, {userProfile?.name || 'Explorer'} 👋
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed">
            Your life is a collection of experiences. DreamTrail helps you plan, track, and turn them into reality.
          </p>

          {/* Quick Action Grid */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <NavLink
              to="/dreams/new"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Dream</span>
            </NavLink>

            <NavLink
              to="/ai-planner"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span>Plan My Dream</span>
            </NavLink>

            <NavLink
              to="/map"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Life Map</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-gray-400 font-medium">Total Dreams</div>
          <div className="text-2xl font-extrabold text-white mt-1 font-mono">{totalDreams}</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-gray-400 font-medium">Completed</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">{completedCount}</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-gray-400 font-medium">Adventure Level</div>
          <div className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">Lvl {userProfile?.level || 1}</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-gray-400 font-medium">Active Streak</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1 font-mono flex items-center gap-1">
            <Flame className="w-5 h-5 fill-amber-400 text-amber-400 inline" />
            {userProfile?.currentStreak || 1}d
          </div>
        </div>
      </div>

      {/* Main Grid: Current Mission & Recent Dreams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Current Mission & Active Dreams */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Mission Widget */}
          {currentMission ? (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> Current Mission
                </span>
                <NavLink to={`/dreams/${currentMission.id}`} className="text-xs text-cyan-400 hover:underline">
                  View Details →
                </NavLink>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{currentMission.title}</h3>
                {currentMission.locationName && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentMission.locationName}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <div className="text-gray-300">
                  Target: <span className="font-semibold text-white">{currentMission.targetDate || 'Flexible'}</span>
                </div>
                <div className="font-mono text-emerald-400 font-bold">
                  {currentMission.currency} {currentMission.estimatedBudget?.toLocaleString()}
                </div>
              </div>
            </div>
          ) : null}

          {/* Active Dreams Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Active Bucket List Dreams
              </h2>
              <NavLink to="/dreams" className="text-xs text-emerald-400 hover:underline">
                View All ({dreams.length}) →
              </NavLink>
            </div>

            {dreams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dreams.slice(0, 4).map((dream) => (
                  <DreamCard key={dream.id} dream={dream} onComplete={completeDream} />
                ))}
              </div>
            ) : (
              <div className="glass-panel p-6 rounded-2xl text-center text-xs text-gray-400">
                No active dreams found. Add your first dream to populate your dashboard!
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Recent Memories & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Memories Widget */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                Recent Memories
              </h3>
              <NavLink to="/memories" className="text-xs text-cyan-400 hover:underline">
                Timeline →
              </NavLink>
            </div>

            {recentMemories.length > 0 ? (
              <div className="space-y-3">
                {recentMemories.map((mem) => (
                  <MemoryCard key={mem.id} memory={mem} />
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-900/60 rounded-2xl text-center text-xs text-gray-400 border border-slate-800">
                No memories logged yet. Complete a dream to post photos!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
