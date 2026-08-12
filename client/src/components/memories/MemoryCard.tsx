import React from 'react';
import { Memory } from '../../types';
import { MapPin, Calendar, Star } from 'lucide-react';

interface Props {
  memory: Memory;
  onClick?: () => void;
}

export const MemoryCard: React.FC<Props> = ({ memory, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Media Image Banner */}
      <div className="h-44 w-full bg-slate-900 relative overflow-hidden">
        {memory.imageUrl ? (
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Photo Attached
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Rating Stars Overlay */}
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-full text-amber-400 text-xs flex items-center gap-1 border border-slate-800">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold">{memory.rating}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <div className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">
          {memory.dreamTitle || 'Personal Experience'}
        </div>

        <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
          {memory.title}
        </h3>

        {memory.description && (
          <p className="text-xs text-gray-400 line-clamp-2">{memory.description}</p>
        )}

        <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-slate-800/60">
          {memory.locationName ? (
            <div className="flex items-center gap-1 text-gray-300">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span className="truncate max-w-[120px]">{memory.locationName}</span>
            </div>
          ) : <span />}

          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-cyan-400" />
            <span>{memory.memoryDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
