import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Sparkles, MapPin, Bot, Camera, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-gray-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-violet-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
            DreamTrail
          </span>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            Get Started Free
          </NavLink>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Life Adventure Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-none">
          Turn <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">dreams</span> into experiences.
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          Plan the places you want to go, the things you want to experience, and the memories you want to create. Powered by interactive life mapping, AI trip planning, & gamification.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <NavLink
            to="/register"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 hover:from-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>

          <NavLink
            to="/explore"
            className="px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm border border-slate-800 transition-all"
          >
            Explore Public Experiences
          </NavLink>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 text-left">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <MapPin className="w-8 h-8 text-emerald-400" />
            <h3 className="font-bold text-lg text-white">Interactive Life Map</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              MapLibre GL JS + MapTiler vector basemaps with custom pins, clustering, and chronological Life Journey connections.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <Bot className="w-8 h-8 text-cyan-400" />
            <h3 className="font-bold text-lg text-white">AI Trip Planner</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Provider-agnostic LLM planner generating daily itineraries, equipment checklists, and budget breakdowns.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <Camera className="w-8 h-8 text-pink-400" />
            <h3 className="font-bold text-lg text-white">Adventure Journal</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Capture photo memories backed by Firebase Storage with geographic coordinates and ratings.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <Trophy className="w-8 h-8 text-amber-400" />
            <h3 className="font-bold text-lg text-white">Gamified Progression</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Earn XP, level up your rank, maintain streaks, and unlock achievement badges.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-slate-800/80 text-center text-xs text-gray-400">
        <p>© 2026 DreamTrail OS. All rights reserved.</p>
      </footer>
    </div>
  );
};
