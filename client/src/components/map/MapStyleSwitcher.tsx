import React, { useState } from 'react';
import { MAP_STYLES, MapStyleConfig } from '../../config/mapStyles';
import { Layers } from 'lucide-react';

interface Props {
  currentStyle: MapStyleConfig;
  onSelectStyle: (style: MapStyleConfig) => void;
}

export const MapStyleSwitcher: React.FC<Props> = ({ currentStyle, onSelectStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs font-semibold text-gray-200 hover:text-white shadow-xl transition-all hover:border-emerald-500/50"
      >
        <Layers className="w-4 h-4 text-emerald-400" />
        <span>Style: {currentStyle.name}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-2 shadow-2xl space-y-1">
          <div className="text-[10px] uppercase font-bold text-gray-400 px-2 py-1 tracking-wider">
            Select Map Style
          </div>
          {Object.values(MAP_STYLES).map((style) => (
            <button
              key={style.id}
              onClick={() => {
                onSelectStyle(style);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                currentStyle.id === style.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                  : 'text-gray-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div>
                <div>{style.name}</div>
                <div className="text-[10px] text-gray-400 font-normal">{style.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
