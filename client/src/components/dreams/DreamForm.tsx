import React, { useState } from 'react';
import { Dream, DreamStatus, Priority, Difficulty, Visibility } from '../../types';
import { MapPin, Sparkles } from 'lucide-react';

interface Props {
  initialValues?: Partial<Dream>;
  onSubmit: (values: Partial<Dream>) => void;
  submitLabel?: string;
  loading?: boolean;
}

export const DreamForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  submitLabel = 'Save Dream',
  loading = false
}) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [categoryName, setCategoryName] = useState(initialValues?.categoryName || 'Travel');
  const [status, setStatus] = useState<DreamStatus>(initialValues?.status || 'DREAM');
  const [priority, setPriority] = useState<Priority>(initialValues?.priority || 'MEDIUM');
  const [difficulty, setDifficulty] = useState<Difficulty>(initialValues?.difficulty || 'Medium');
  const [targetDate, setTargetDate] = useState(initialValues?.targetDate || '');
  const [estimatedBudget, setEstimatedBudget] = useState(initialValues?.estimatedBudget || 25000);
  const [currency, setCurrency] = useState(initialValues?.currency || 'INR');
  const [locationName, setLocationName] = useState(initialValues?.locationName || '');
  const [latitude, setLatitude] = useState<number | undefined>(initialValues?.latitude);
  const [longitude, setLongitude] = useState<number | undefined>(initialValues?.longitude);
  const [visibility, setVisibility] = useState<Visibility>(initialValues?.visibility || 'PRIVATE');
  const [isFavorite, setIsFavorite] = useState(initialValues?.isFavorite || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      categoryId: categoryName.toLowerCase(),
      categoryName,
      status,
      priority,
      difficulty,
      targetDate,
      estimatedBudget: Number(estimatedBudget),
      currency,
      locationName: locationName.trim(),
      latitude: latitude != null ? Number(latitude) : undefined,
      longitude: longitude != null ? Number(longitude) : undefined,
      visibility,
      isFavorite
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-card p-6 rounded-2xl border border-slate-800">
      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
          Dream Title *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Photograph the Milky Way in Ladakh"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
          Description / Why this dream matters
        </label>
        <textarea
          rows={3}
          placeholder="Describe your vision and what makes this experience special..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Category & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Category</label>
          <select
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Travel">Travel ✈️</option>
            <option value="Adventure">Adventure 🏔️</option>
            <option value="Nature">Nature 🌿</option>
            <option value="Photography">Photography 📸</option>
            <option value="Food">Food & Culinary 🍲</option>
            <option value="Skills">Skills & Learning 🎸</option>
            <option value="Personal Growth">Personal Growth 🌱</option>
            <option value="Fitness">Fitness & Sports 🏃</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as DreamStatus)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="DREAM">Dream ✨</option>
            <option value="PLANNING">Planning 🧭</option>
            <option value="IN_PROGRESS">In Progress ▶️</option>
            <option value="COMPLETED">Completed ✅</option>
            <option value="PAUSED">Paused ⏸️</option>
          </select>
        </div>
      </div>

      {/* Budget & Currency */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Estimated Budget</label>
          <input
            type="number"
            min="0"
            step="1000"
            value={estimatedBudget}
            onChange={(e) => setEstimatedBudget(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>
      </div>

      {/* Location Name & Coordinates */}
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          Location Name
        </label>
        <input
          type="text"
          placeholder="e.g. Hanle Dark Sky Reserve, Ladakh, India"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 mb-3"
        />

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-gray-400 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              placeholder="e.g. 32.7767"
              value={latitude ?? ''}
              onChange={(e) => setLatitude(e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              placeholder="e.g. 78.9629"
              value={longitude ?? ''}
              onChange={(e) => setLongitude(e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Target Date & Difficulty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Date</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Easy">Easy (100 XP)</option>
            <option value="Medium">Medium (250 XP)</option>
            <option value="Hard">Hard (500 XP)</option>
            <option value="Major">Major / Epic (1000 XP)</option>
          </select>
        </div>
      </div>

      {/* Visibility */}
      <div className="flex items-center justify-between pt-2">
        <label className="text-xs font-semibold text-gray-300">Visibility</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as Visibility)}
          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
        >
          <option value="PRIVATE">Private (Only Me)</option>
          <option value="FRIENDS">Friends Only</option>
          <option value="PUBLIC">Public</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? 'Saving...' : submitLabel}</span>
      </button>
    </form>
  );
};
