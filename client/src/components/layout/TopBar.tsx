import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { XPBar } from '../gamification/XPBar';
import { StreakCard } from '../gamification/StreakCard';
import { User, LogOut, Search } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

export const TopBar: React.FC = () => {
  const { userProfile } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-surface/80 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search / Status */}
      <div className="flex items-center gap-3 w-1/3">
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dreams, places..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* Gamification Stats Header */}
      {userProfile && (
        <div className="flex items-center gap-4 max-w-md w-full justify-end">
          <div className="hidden sm:block w-48">
            <XPBar
              level={userProfile.level}
              currentLevelXP={userProfile.currentLevelXP}
              totalXP={userProfile.totalXP}
            />
          </div>

          <StreakCard
            currentStreak={userProfile.currentStreak}
            longestStreak={userProfile.longestStreak}
          />

          {/* User Profile Avatar / Logout */}
          <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-emerald-400">
              {userProfile.avatarUrl ? (
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                userProfile.name.charAt(0).toUpperCase()
              )}
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
