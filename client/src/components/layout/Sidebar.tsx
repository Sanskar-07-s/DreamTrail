import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  Home,
  Sparkles,
  MapPin,
  Bot,
  Camera,
  Trophy,
  BarChart3,
  Globe,
  Users,
  Settings,
  PlusCircle
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/dreams', label: 'My Dreams', icon: Sparkles },
  { path: '/map', label: 'Life Map', icon: MapPin },
  { path: '/ai-planner', label: 'AI Planner', icon: Bot },
  { path: '/memories', label: 'Memories', icon: Camera },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
  { path: '/statistics', label: 'Statistics', icon: BarChart3 },
  { path: '/explore', label: 'Explore', icon: Globe },
  { path: '/friends', label: 'Friends', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/80 bg-surface/90 backdrop-blur-xl h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800/60">
        <NavLink to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-violet-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              DreamTrail
            </h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Life OS</p>
          </div>
        </NavLink>
      </div>

      {/* Quick Action Button */}
      <div className="px-4 py-4">
        <NavLink
          to="/dreams/new"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Dream</span>
        </NavLink>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Quote */}
      <div className="p-4 border-t border-slate-800/60 text-xs text-gray-400">
        <p className="italic font-light text-gray-400/80">"Turn dreams into experiences."</p>
      </div>
    </aside>
  );
};
