import React from 'react';
import { Flame } from 'lucide-react';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ currentStreak, longestStreak }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
      <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
      <div className="text-xs font-semibold">
        <span>{currentStreak} Day Streak</span>
        {longestStreak > currentStreak && (
          <span className="text-amber-500/60 font-normal ml-1.5">(Best: {longestStreak})</span>
        )}
      </div>
    </div>
  );
};
