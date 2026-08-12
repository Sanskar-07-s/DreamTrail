import React from 'react';
import { Award } from 'lucide-react';
import { getLevelTitle } from '../../utils/xp';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, size = 'md' }) => {
  const title = getLevelTitle(level);
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base font-semibold'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-300 ${sizeClasses[size]}`}>
      <Award className="w-4 h-4 text-emerald-400" />
      <span>Lvl {level} • {title}</span>
    </div>
  );
};
