import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sparkles, MapPin, PlusCircle, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-xl border-t border-slate-800/80 px-4 flex items-center justify-around z-30 shadow-2xl">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            isActive ? 'text-emerald-400' : 'text-gray-400'
          }`
        }
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/dreams"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            isActive ? 'text-emerald-400' : 'text-gray-400'
          }`
        }
      >
        <Sparkles className="w-5 h-5" />
        <span>Dreams</span>
      </NavLink>

      <NavLink
        to="/dreams/new"
        className="flex items-center justify-center -mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/30 border-2 border-slate-900"
      >
        <PlusCircle className="w-6 h-6" />
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            isActive ? 'text-emerald-400' : 'text-gray-400'
          }`
        }
      >
        <MapPin className="w-5 h-5" />
        <span>Map</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            isActive ? 'text-emerald-400' : 'text-gray-400'
          }`
        }
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </NavLink>
    </div>
  );
};
