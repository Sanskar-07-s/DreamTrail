import React, { useState } from 'react';
import { useMemories } from '../hooks/useMemories';
import { useDreams } from '../hooks/useDreams';
import { MemoryCard } from '../components/memories/MemoryCard';
import { Camera, Plus, MapPin, Calendar, Star, Sparkles, Loader2, X } from 'lucide-react';

export const MemoriesPage: React.FC = () => {
  const { memories, loading, addMemory } = useMemories();
  const { dreams } = useDreams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDreamId, setSelectedDreamId] = useState('');
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [memoryDate, setMemoryDate] = useState(new Date().toISOString().split('T')[0]);
  const [rating, setRating] = useState(5);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleCreateMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setUploading(true);
    const selectedDream = dreams.find((d) => d.id === selectedDreamId);

    await addMemory(
      {
        title: title.trim(),
        description: description.trim(),
        dreamId: selectedDreamId,
        dreamTitle: selectedDream?.title || '',
        locationName: locationName.trim() || selectedDream?.locationName || '',
        latitude: latitude ?? selectedDream?.latitude,
        longitude: longitude ?? selectedDream?.longitude,
        memoryDate,
        rating
      },
      mediaFile || undefined
    );

    setUploading(false);
    setIsModalOpen(false);
    // Reset
    setTitle('');
    setDescription('');
    setMediaFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Camera className="w-6 h-6 text-cyan-400" />
            Adventure Journal & Memories
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Capture photos, stories, ratings, and location pins from your completed life experiences.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Memory (+25 XP)</span>
        </button>
      </div>

      {/* Memories Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : memories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {memories.map((mem) => (
            <MemoryCard key={mem.id} memory={mem} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No memories captured yet</h3>
            <p className="text-xs text-gray-400 mt-1">
              Complete a dream or log a past adventure to start your photo timeline.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Log First Memory</span>
          </button>
        </div>
      )}

      {/* Add Memory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 border border-slate-800 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-cyan-400" />
              Log Adventure Memory
            </h2>

            <form onSubmit={handleCreateMemory} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Memory Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Milky Way Night Shooting Session"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Associated Dream (Optional)</label>
                <select
                  value={selectedDreamId}
                  onChange={(e) => setSelectedDreamId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="">None (Standalone Memory)</option>
                  {dreams.map((d) => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Story / Experience Notes</label>
                <textarea
                  rows={3}
                  placeholder="What was the weather like? How did it feel to experience this?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              {/* Photo Media Upload */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Photo Upload (Firebase Storage)</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setMediaFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-gray-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Location Name</label>
                  <input
                    type="text"
                    placeholder="Hanle, Ladakh"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={memoryDate}
                    onChange={(e) => setMemoryDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Experience Rating (1 - 5 Stars)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1 ${rating >= star ? 'text-amber-400' : 'text-gray-600'}`}
                    >
                      <Star className={`w-5 h-5 ${rating >= star ? 'fill-amber-400' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{uploading ? 'Uploading Media...' : 'Save Memory (+25 XP)'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
