import React from 'react';
import { computeLevelMetrics, getLevelTitle } from '../../utils/xp';
import { Zap } from 'lucide-react';

interface XPBarProps {
  level: number;
  currentLevelXP: number;
  totalXP: number;
  showText?: boolean;
}

export const XPBar: React.FC<XPBarProps> = ({ level, currentLevelXP, totalXP, showText = true }) => {
  const { threshold, progress, xpToNextLevel } = computeLevelMetrics(level, currentLevelXP);
  const title = getLevelTitle(level);

  return (
    <div className="w-full">
      {showText && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>Lvl {level} — {title}</span>
          </div>
          <div className="text-gray-400 font-mono">
            {currentLevelXP.toLocaleString()} / {threshold.toLocaleString()} XP ({xpToNextLevel.toLocaleString()} to Lvl {level + 1})
          </div>
        </div>
      )}

      {/* Progress Track */}
      <div className="h-2.5 w-full bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-slate-800/80 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          style={{ width: `${Math.max(3, progress)}%` }}
        />
      </div>
    </div>
  );
};
