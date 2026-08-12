import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dream } from '../../types';
import { DreamStatusBadge } from './DreamStatusBadge';
import { DreamProgress } from './DreamProgress';
import { MapPin, Calendar, CheckCircle2, ChevronRight, Heart } from 'lucide-react';

interface Props {
  dream: Dream;
  onComplete?: (id: string) => void;
}

export const DreamCard: React.FC<Props> = ({ dream, onComplete }) => {
  return (
    <div className="group glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col justify-between relative overflow-hidden">
      {/* Favorite badge */}
      {dream.isFavorite && (
        <div className="absolute top-4 right-4 text-red-400">
          <Heart className="w-4 h-4 fill-red-400" />
        </div>
      )}

      <div>
        {/* Status & Category */}
        <div className="flex items-center gap-2 mb-3">
          <DreamStatusBadge status={dream.status} />
          <span className="text-[11px] font-medium text-gray-400 bg-slate-800/60 px-2 py-0.5 rounded-md">
            {dream.categoryName || 'Adventure'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 line-clamp-1">
          {dream.title}
        </h3>

        {/* Description */}
        {dream.description && (
          <p className="text-xs text-gray-400 line-clamp-2 mb-4">
            {dream.description}
          </p>
        )}

        {/* Meta Info: Location & Target Date */}
        <div className="space-y-1.5 text-xs text-gray-400 mb-4">
          {dream.locationName && (
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{dream.locationName}</span>
            </div>
          )}
          {dream.targetDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Target: {dream.targetDate}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Progress */}
        <div className="mb-4">
          <DreamProgress progress={dream.progress} />
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
          <div className="font-semibold text-emerald-400 font-mono">
            {dream.currency} {dream.estimatedBudget ? dream.estimatedBudget.toLocaleString() : '0'}
          </div>

          <div className="flex items-center gap-2">
            {dream.status !== 'COMPLETED' && onComplete && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onComplete(dream.id);
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-semibold transition-colors flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Complete</span>
              </button>
            )}

            <NavLink
              to={`/dreams/${dream.id}`}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
