import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { dreamsService } from '../services/firebase/dreams.service';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

const interestOptions = [
  'Photography 📸',
  'High-Altitude Trekking 🏔️',
  'Scuba Diving 🌊',
  'World Travel ✈️',
  'Culinary & Food 🍲',
  'Stargazing 🌌',
  'Road Trips 🚗',
  'Cultural Heritage 🏛️'
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, refreshProfile } = useAuth();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Photography 📸', 'High-Altitude Trekking 🏔️']);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleFinish = async () => {
    if (!userProfile?.id) return;
    setLoading(true);

    // Create initial seed dream based on selection
    await dreamsService.createDream(userProfile.id, {
      title: 'Photograph the Milky Way in Ladakh',
      description: 'First bucket list dream created during onboarding.',
      categoryName: 'Photography',
      estimatedBudget: 25000,
      currency: 'INR',
      locationName: 'Hanle, Ladakh, India',
      latitude: 32.7767,
      longitude: 78.9629,
      status: 'PLANNING'
    });

    await refreshProfile();
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-xl p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to DreamTrail</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Customize Your Experience</h1>
          <p className="text-xs text-gray-400">Select topics you are passionate about to personalize your AI suggestions.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {interestOptions.map((opt) => {
            const isSelected = selectedInterests.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleInterest(opt)}
                className={`p-3.5 rounded-2xl text-xs font-semibold transition-all flex items-center justify-between border ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 text-gray-400 border-slate-800 hover:text-white'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleFinish}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <span>Continue to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
