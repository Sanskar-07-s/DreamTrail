import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDreams } from '../hooks/useDreams';
import { Globe, MapPin, Plus, Sparkles, Compass } from 'lucide-react';

const exploreSeedExperiences = [
  {
    id: 'exp_1',
    title: 'Photograph the Milky Way in Hanle',
    category: 'Photography',
    locationName: 'Hanle, Ladakh, India',
    latitude: 32.7767,
    longitude: 78.9629,
    estimatedBudget: 25000,
    currency: 'INR',
    description: 'Experience one of the highest dark-sky sanctuaries in the world with pristine night sky clarity.'
  },
  {
    id: 'exp_2',
    title: 'Scuba Diving in Havelock Coral Reefs',
    category: 'Adventure',
    locationName: 'Andaman & Nicobar Islands, India',
    latitude: 11.9841,
    longitude: 92.9976,
    estimatedBudget: 35000,
    currency: 'INR',
    description: 'Explore vibrant marine biodiversity and clear ocean waters with certified dive instructors.'
  },
  {
    id: 'exp_3',
    title: 'Cherry Blossom Season in Kyoto',
    category: 'Travel',
    locationName: 'Kyoto, Japan',
    latitude: 35.0116,
    longitude: 135.7681,
    estimatedBudget: 150000,
    currency: 'INR',
    description: 'Walk through historical bamboo groves and ancient temples beneath blooming pink sakura trees.'
  },
  {
    id: 'exp_4',
    title: 'Northern Lights Camping Expedition',
    category: 'Nature',
    locationName: 'Abisko, Sweden',
    latitude: 68.3495,
    longitude: 18.8312,
    estimatedBudget: 180000,
    currency: 'INR',
    description: 'Sleep in thermal dome tents under dancing green auroras in the Arctic Circle.'
  }
];

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const { addDream } = useDreams();
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const handleAddExperience = async (exp: any) => {
    const created = await addDream({
      title: exp.title,
      description: exp.description,
      categoryName: exp.category,
      locationName: exp.locationName,
      latitude: exp.latitude,
      longitude: exp.longitude,
      estimatedBudget: exp.estimatedBudget,
      currency: exp.currency,
      status: 'PLANNING'
    });

    if (created) {
      navigate(`/dreams/${created.id}`);
    }
  };

  const filtered = selectedCategory === 'ALL'
    ? exploreSeedExperiences
    : exploreSeedExperiences.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Globe className="w-7 h-7 text-cyan-400" />
          Explore & Discover Experiences
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Curated bucket-list adventures across the globe. Save any experience directly into your personal dream list.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 text-xs">
        {['ALL', 'Photography', 'Adventure', 'Travel', 'Nature'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((exp) => (
          <div key={exp.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                {exp.category}
              </span>
              <h3 className="text-lg font-bold text-white">{exp.title}</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{exp.locationName}</span>
              </p>
              <p className="text-xs text-gray-300 leading-relaxed">{exp.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <span className="font-mono text-emerald-400 font-bold">
                {exp.currency} {exp.estimatedBudget.toLocaleString()}
              </span>
              <button
                onClick={() => handleAddExperience(exp)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-bold flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to My Dreams</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
