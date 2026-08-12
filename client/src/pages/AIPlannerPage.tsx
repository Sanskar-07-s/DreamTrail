import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { aiClientService } from '../services/firebase/ai.service';
import { useDreams } from '../hooks/useDreams';
import { AIPlan } from '../types';
import { Bot, Sparkles, Calendar, DollarSign, ShieldAlert, CheckSquare, Plus, Loader2, Compass } from 'lucide-react';

export const AIPlannerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addDream } = useDreams();

  const [dreamTitle, setDreamTitle] = useState(searchParams.get('dream') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [budget, setBudget] = useState<number>(35000);
  const [interests, setInterests] = useState<string>('Photography, Trekking, Nature');

  const [aiPlan, setAiPlan] = useState<AIPlan | null>(null);
  const [suggestedIdeas, setSuggestedIdeas] = useState<any[]>([]);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [saving, setSaving] = useState(false);

  // Automatically plan if query params passed
  useEffect(() => {
    if (searchParams.get('dream')) {
      handlePlanDream();
    }
  }, []);

  const handlePlanDream = async (titleToPlan?: string) => {
    const targetTitle = titleToPlan || dreamTitle;
    if (!targetTitle.trim()) return;

    try {
      setLoadingPlan(true);
      const plan = await aiClientService.planDream(targetTitle.trim(), location, budget);
      setAiPlan(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlan(false);
    }
  };

  const handleGenerateIdeas = async () => {
    try {
      setLoadingIdeas(true);
      const interestList = interests.split(',').map((s) => s.trim()).filter(Boolean);
      const ideas = await aiClientService.generateDreamIdeas(interestList, budget, location);
      setSuggestedIdeas(ideas);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIdeas(false);
    }
  };

  const handleSaveToDream = async (ideaTitle?: string) => {
    try {
      setSaving(true);
      const titleToSave = ideaTitle || aiPlan?.dreamTitle || dreamTitle;
      const created = await addDream({
        title: titleToSave,
        description: aiPlan?.overview || 'Created via DreamTrail AI Planner',
        estimatedBudget: aiPlan?.estimatedBudget || budget,
        locationName: location,
        status: 'PLANNING',
        milestones: aiPlan?.checklist ? aiPlan.checklist.map((item, idx) => ({
          id: String(idx),
          title: item,
          completed: false,
          order: idx + 1
        })) : []
      });

      setSaving(false);
      if (created) {
        navigate(`/dreams/${created.id}`);
      }
    } catch (err) {
      setSaving(false);
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Bot className="w-7 h-7 text-emerald-400" />
          AI Dream Planner & Idea Generator
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Turn vague ideas into structured itineraries, daily checklists, budget breakdowns, and safety guidelines.
        </p>
      </div>

      {/* Input Section */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              What is your dream or trip idea?
            </label>
            <input
              type="text"
              placeholder="e.g. Scuba Diving in Havelock Island"
              value={dreamTitle}
              onChange={(e) => setDreamTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Destination / Location (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Andaman & Nicobar, India"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Estimated Budget (₹)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Interests / Themes</label>
            <input
              type="text"
              placeholder="e.g. Photography, Nature, Stargazing"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => handlePlanDream()}
            disabled={loadingPlan || !dreamTitle.trim()}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loadingPlan ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Plan My Dream</span>
          </button>

          <button
            onClick={handleGenerateIdeas}
            disabled={loadingIdeas}
            className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loadingIdeas ? <Loader2 className="w-4 h-4 animate-spin" /> : <Compass className="w-4 h-4" />}
            <span>Generate Dream Ideas</span>
          </button>
        </div>
      </div>

      {/* Suggested Ideas Carousel/List */}
      {suggestedIdeas.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            AI Recommended Ideas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestedIdeas.map((idea, idx) => (
              <div key={idx} className="glass-card p-4 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {idea.category}
                  </span>
                  <h3 className="font-bold text-sm text-white mt-1.5">{idea.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{idea.reason}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-semibold">₹{idea.estimatedBudget?.toLocaleString()}</span>
                  <button
                    onClick={() => {
                      setDreamTitle(idea.title);
                      handlePlanDream(idea.title);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-bold"
                  >
                    Plan This →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Plan Render Results */}
      {aiPlan && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">AI Generated Plan</span>
              <h2 className="text-2xl font-extrabold text-white mt-0.5">{aiPlan.dreamTitle}</h2>
            </div>

            <button
              onClick={() => handleSaveToDream()}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save to My Dreams'}</span>
            </button>
          </div>

          {/* Overview */}
          <p className="text-sm text-gray-300 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            {aiPlan.overview}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium">
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-gray-400 block mb-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Best Time
              </span>
              <span className="text-white font-semibold">{aiPlan.bestTime}</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-gray-400 block mb-0.5 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-400" /> Duration
              </span>
              <span className="text-white font-semibold">{aiPlan.duration}</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-gray-400 block mb-0.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Budget Estimate
              </span>
              <span className="text-emerald-400 font-bold font-mono">
                {aiPlan.currency} {aiPlan.estimatedBudget?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Daily Itinerary */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Step-by-Step Itinerary
            </h3>
            <div className="space-y-3">
              {aiPlan.dailyItinerary.map((item) => (
                <div key={item.day} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">Day {item.day}</span>
                    <span>{item.title}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 pt-1">
                    {item.activities.map((act, idx) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                  {item.tips && (
                    <p className="text-[11px] text-amber-400/90 italic pt-1">💡 Tip: {item.tips}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Checklist & Safety */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-cyan-400" /> Equipment & Prep Checklist
              </h3>
              <ul className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-gray-300">
                {aiPlan.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> Safety & Guidance
              </h3>
              <ul className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-gray-300">
                {aiPlan.safety.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
