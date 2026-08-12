import React from 'react';

interface Props {
  progress: number; // 0 - 100
  showPercent?: boolean;
}

export const DreamProgress: React.FC<Props> = ({ progress, showPercent = true }) => {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1 font-medium">
        <span className="text-gray-400">Progress</span>
        {showPercent && <span className="text-emerald-400 font-mono">{percentage}%</span>}
      </div>
      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
