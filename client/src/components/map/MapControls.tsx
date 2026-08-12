import React from 'react';
import { Sparkles, Camera, Route } from 'lucide-react';

interface Props {
  showDreams: boolean;
  showMemories: boolean;
  showJourney: boolean;
  onToggleLayer: (layer: 'showDreams' | 'showMemories' | 'showJourney' | 'showTripRoutes') => void;
}

export const MapControls: React.FC<Props> = ({
  showDreams,
  showMemories,
  showJourney,
  onToggleLayer
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl z-30">
      <button
        onClick={() => onToggleLayer('showDreams')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
          showDreams
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Dreams</span>
      </button>

      <button
        onClick={() => onToggleLayer('showMemories')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
          showMemories
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Camera className="w-3.5 h-3.5" />
        <span>Memories</span>
      </button>

      <button
        onClick={() => onToggleLayer('showJourney')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
          showJourney
            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Route className="w-3.5 h-3.5" />
        <span>Life Journey</span>
      </button>
    </div>
  );
};
