import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { XPBar } from '../components/gamification/XPBar';
import { LevelBadge } from '../components/gamification/LevelBadge';
import { StreakCard } from '../components/gamification/StreakCard';
import { Trophy, Award, Lock, CheckCircle2, Zap } from 'lucide-react';

const systemAchievements = [
  { id: 'first_dream', name: 'First Step', description: 'Create your very first bucket list dream', icon: '🌱', bonusXP: 50, requirement: '1 Dream' },
  { id: 'dream_chaser_10', name: 'Dream Chaser', description: 'Complete 10 bucket-list dreams', icon: '🏃', bonusXP: 250, requirement: '10 Dreams Completed' },
  { id: 'explorer_5', name: 'Explorer', description: 'Complete dreams in 5 unique geographic locations', icon: '🧭', bonusXP: 300, requirement: '5 Locations' },
  { id: 'wanderer_10', name: 'Wanderer', description: 'Visit and complete experiences across 10 cities', icon: '🌆', bonusXP: 500, requirement: '10 Cities' },
  { id: 'world_traveler_5', name: 'World Traveler', description: 'Complete dreams in 5 different countries', icon: '🌎', bonusXP: 1000, requirement: '5 Countries' },
  { id: 'memory_keeper_25', name: 'Memory Keeper', description: 'Journal and capture 25 adventure memories with photos', icon: '📸', bonusXP: 400, requirement: '25 Memories' },
  { id: 'adventurer_5', name: 'Adventurer', description: 'Complete 5 high-intensity adventure experiences', icon: '🏔️', bonusXP: 500, requirement: '5 Adventure Dreams' },
  { id: 'consistent_7', name: 'Consistent Explorer', description: 'Maintain an active 7-day experience streak', icon: '🔥', bonusXP: 350, requirement: '7 Day Streak' },
];

export const AchievementsPage: React.FC = () => {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Trophy className="w-7 h-7 text-amber-400" />
          Achievements & Gamification
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Earn XP, level up your life adventure rank, maintain active streaks, and unlock achievement badges.
        </p>
      </div>

      {/* Gamification Summary Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <LevelBadge level={userProfile.level} size="lg" />
            <div className="text-xs text-gray-400">
              Total Lifetime XP: <span className="text-emerald-400 font-bold font-mono">{userProfile.totalXP.toLocaleString()} XP</span>
            </div>
          </div>

          <StreakCard currentStreak={userProfile.currentStreak} longestStreak={userProfile.longestStreak} />
        </div>

        <div>
          <XPBar
            level={userProfile.level}
            currentLevelXP={userProfile.currentLevelXP}
            totalXP={userProfile.totalXP}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          Achievement Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {systemAchievements.map((ach) => {
            // Unlocked check demo simulation
            const isUnlocked = userProfile.level >= 2 || ach.id === 'first_dream';

            return (
              <div
                key={ach.id}
                className={`glass-card p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-slate-800 opacity-60'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                  {ach.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-white truncate">{ach.name}</h3>
                    {isUnlocked ? (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{ach.description}</p>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-400">{ach.requirement}</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-amber-400" /> +{ach.bonusXP} XP
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
