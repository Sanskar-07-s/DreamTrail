import React, { useState } from 'react';
import { Milestone } from '../../types';
import { CheckSquare, Square, Plus, Trash2 } from 'lucide-react';

interface Props {
  milestones: Milestone[];
  onChange?: (updated: Milestone[]) => void;
  readOnly?: boolean;
}

export const MilestoneList: React.FC<Props> = ({ milestones, onChange, readOnly = false }) => {
  const [newTitle, setNewTitle] = useState('');

  const toggleMilestone = (id: string) => {
    if (readOnly || !onChange) return;
    const updated = milestones.map((m) =>
      m.id === id ? { ...m, completed: !m.completed, completedAt: !m.completed ? new Date().toISOString() : undefined } : m
    );
    onChange(updated);
  };

  const addMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !onChange) return;
    const newItem: Milestone = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      completed: false,
      order: milestones.length + 1
    };
    onChange([...milestones, newItem]);
    setNewTitle('');
  };

  const removeMilestone = (id: string) => {
    if (!onChange) return;
    onChange(milestones.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm font-semibold text-gray-300">
        <span>Milestones ({milestones.filter((m) => m.completed).length} / {milestones.length})</span>
      </div>

      <div className="space-y-2">
        {milestones.map((m) => (
          <div
            key={m.id}
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              m.completed
                ? 'bg-emerald-500/10 border-emerald-500/20 text-gray-300'
                : 'bg-slate-900/60 border-slate-800 text-gray-200'
            }`}
          >
            <div
              className={`flex items-center gap-3 cursor-pointer flex-1 ${readOnly ? 'cursor-default' : ''}`}
              onClick={() => toggleMilestone(m.id)}
            >
              {m.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-gray-500 shrink-0" />
              )}
              <span className={`text-sm ${m.completed ? 'line-through text-gray-400' : 'font-medium'}`}>
                {m.title}
              </span>
            </div>

            {!readOnly && onChange && (
              <button
                type="button"
                onClick={() => removeMilestone(m.id)}
                className="text-gray-500 hover:text-red-400 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {milestones.length === 0 && (
          <p className="text-xs text-gray-400 italic">No milestones added yet.</p>
        )}
      </div>

      {!readOnly && onChange && (
        <form onSubmit={addMilestone} className="flex gap-2 pt-1">
          <input
            type="text"
            placeholder="Add milestone step..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </form>
      )}
    </div>
  );
};
