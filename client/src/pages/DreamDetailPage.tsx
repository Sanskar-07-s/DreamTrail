import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { dreamsService } from '../services/firebase/dreams.service';
import { useAuth } from '../hooks/useAuth';
import { Dream, Milestone } from '../types';
import { DreamStatusBadge } from '../components/dreams/DreamStatusBadge';
import { DreamProgress } from '../components/dreams/DreamProgress';
import { MilestoneList } from '../components/dreams/MilestoneList';
import { MapPin, Calendar, CheckCircle2, Edit, ArrowLeft, Bot, Camera, Sparkles, Heart } from 'lucide-react';

export const DreamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProfile, refreshProfile } = useAuth();
  const [dream, setDream] = useState<Dream | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    const fetchDream = async () => {
      if (!userProfile?.id || !id) return;
      setLoading(true);
      const d = await dreamsService.getDreamById(userProfile.id, id);
      setDream(d);
      setLoading(false);
    };
    fetchDream();
  }, [userProfile?.id, id]);

  const handleMilestoneChange = async (updatedMilestones: Milestone[]) => {
    if (!dream || !userProfile?.id) return;
    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const total = updatedMilestones.length;
    const newProgress = total > 0 ? Math.round((completedCount / total) * 100) : dream.progress;

    setDream((prev) => (prev ? { ...prev, milestones: updatedMilestones, progress: newProgress } : null));
    await dreamsService.updateDream(userProfile.id, dream.id, {
      milestones: updatedMilestones,
      progress: newProgress
    });
  };

  const handleComplete = async () => {
    if (!dream || !userProfile?.id) return;
    try {
      setCompleting(true);
      await dreamsService.completeDreamCallable(dream.id);
      await refreshProfile();
      const updated = await dreamsService.getDreamById(userProfile.id, dream.id);
      setDream(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-emerald-400">
        <Sparkles className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!dream) {
    return (
      <div className="glass-panel p-8 text-center rounded-2xl">
        <h2 className="text-lg font-bold text-white">Dream not found</h2>
        <NavLink to="/dreams" className="text-xs text-emerald-400 mt-2 block">
          Return to Dreams
        </NavLink>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/dreams')}
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dreams</span>
        </button>

        <div className="flex items-center gap-2">
          <NavLink
            to={`/dreams/${dream.id}/edit`}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit</span>
          </NavLink>

          {dream.status !== 'COMPLETED' && (
            <button
              onClick={handleComplete}
              disabled={completing}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{completing ? 'Completing...' : 'Mark Completed'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DreamStatusBadge status={dream.status} />
              <span className="text-xs font-medium text-gray-400 bg-slate-800/80 px-2.5 py-0.5 rounded-md">
                {dream.categoryName || 'Adventure'}
              </span>
              {dream.isFavorite && <Heart className="w-4 h-4 text-red-400 fill-red-400" />}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{dream.title}</h1>

            {dream.locationName && (
              <p className="text-sm text-emerald-400 flex items-center gap-1.5 mt-2">
                <MapPin className="w-4 h-4" />
                <span>{dream.locationName}</span>
              </p>
            )}
          </div>

          <div className="text-right bg-slate-900/80 p-3 rounded-2xl border border-slate-800 font-mono text-xs">
            <div className="text-gray-400">Estimated Budget</div>
            <div className="text-lg font-bold text-emerald-400">
              {dream.currency} {dream.estimatedBudget?.toLocaleString()}
            </div>
          </div>
        </div>

        {dream.description && (
          <p className="text-sm text-gray-300 leading-relaxed bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
            {dream.description}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div>
            <span className="text-gray-400 block mb-0.5">Target Date</span>
            <span className="font-semibold text-white flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {dream.targetDate || 'Not Set'}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block mb-0.5">Difficulty</span>
            <span className="font-semibold text-white">{dream.difficulty || 'Medium'}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-0.5">Priority</span>
            <span className="font-semibold text-white">{dream.priority || 'MEDIUM'}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-0.5">Visibility</span>
            <span className="font-semibold text-white">{dream.visibility}</span>
          </div>
        </div>

        <div>
          <DreamProgress progress={dream.progress} />
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NavLink
          to={`/ai-planner?dream=${encodeURIComponent(dream.title)}&location=${encodeURIComponent(dream.locationName || '')}`}
          className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300">Generate AI Plan</h3>
            <p className="text-xs text-gray-400">Create an itinerary, checklist, & budget breakdown.</p>
          </div>
        </NavLink>

        <NavLink
          to={`/memories/new?dreamId=${dream.id}`}
          className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300">Capture Memory</h3>
            <p className="text-xs text-gray-400">Attach photos, rating, and stories to this dream.</p>
          </div>
        </NavLink>
      </div>

      {/* Milestones Section */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800">
        <MilestoneList
          milestones={dream.milestones || []}
          onChange={handleMilestoneChange}
        />
      </div>
    </div>
  );
};
