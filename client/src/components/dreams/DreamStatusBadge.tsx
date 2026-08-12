import React from 'react';
import { DreamStatus } from '../../types';
import { Sparkles, Compass, PlayCircle, CheckCircle2, PauseCircle } from 'lucide-react';

interface Props {
  status: DreamStatus;
}

export const DreamStatusBadge: React.FC<Props> = ({ status }) => {
  const configs: Record<DreamStatus, { label: string; icon: any; color: string }> = {
    DREAM: {
      label: 'Dream',
      icon: Sparkles,
      color: 'bg-purple-500/15 text-purple-300 border-purple-500/30'
    },
    PLANNING: {
      label: 'Planning',
      icon: Compass,
      color: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
    },
    IN_PROGRESS: {
      label: 'In Progress',
      icon: PlayCircle,
      color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
    },
    COMPLETED: {
      label: 'Completed',
      icon: CheckCircle2,
      color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
    },
    PAUSED: {
      label: 'Paused',
      icon: PauseCircle,
      color: 'bg-slate-500/15 text-slate-300 border-slate-500/30'
    }
  };

  const config = configs[status] || configs.DREAM;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </div>
  );
};
