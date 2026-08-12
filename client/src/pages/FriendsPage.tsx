import React from 'react';
import { Users, UserPlus, ShieldCheck, Heart } from 'lucide-react';

export const FriendsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Users className="w-7 h-7 text-emerald-400" />
          Friends & Social Adventure Circle
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Connect with friends to explore public life maps, share completed experiences, and react to memories.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Strict Firebase Security Rules enforce privacy: Private dreams remain hidden from other users.</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Aarav Sharma</span>
              <span className="text-emerald-400 font-mono text-[10px]">Lvl 12 Explorer</span>
            </div>
            <p className="text-xs text-gray-400">Recently completed: Scuba Diving in Lakshadweep</p>
            <div className="flex gap-2 pt-2">
              <button className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-400 fill-red-400" /> React ❤️
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Priya Patel</span>
              <span className="text-emerald-400 font-mono text-[10px]">Lvl 8 Adventurer</span>
            </div>
            <p className="text-xs text-gray-400">Recently completed: Northern Lights in Norway</p>
            <div className="flex gap-2 pt-2">
              <button className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-400 fill-red-400" /> React 🔥
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
