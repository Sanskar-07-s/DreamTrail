import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LevelBadge } from '../components/gamification/LevelBadge';
import { StreakCard } from '../components/gamification/StreakCard';
import { User, Mail, DollarSign, Calendar, ShieldCheck } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <User className="w-7 h-7 text-emerald-400" />
          Explorer Profile
        </h1>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-emerald-500/40 flex items-center justify-center text-2xl font-bold text-emerald-400">
            {userProfile.avatarUrl ? (
              <img src={userProfile.avatarUrl} alt={userProfile.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              userProfile.name.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">{userProfile.name}</h2>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{userProfile.email}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <LevelBadge level={userProfile.level} size="lg" />
          <StreakCard currentStreak={userProfile.currentStreak} longestStreak={userProfile.longestStreak} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-800">
          <div>
            <span className="text-gray-400 block mb-1">Default Currency</span>
            <span className="font-bold text-white font-mono flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {userProfile.defaultCurrency || 'INR'}
            </span>
          </div>

          <div>
            <span className="text-gray-400 block mb-1">Member Since</span>
            <span className="font-bold text-white flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'Today'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
