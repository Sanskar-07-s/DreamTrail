import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDreams } from '../hooks/useDreams';
import { DreamForm } from '../components/dreams/DreamForm';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const CreateDreamPage: React.FC = () => {
  const navigate = useNavigate();
  const { addDream } = useDreams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const created = await addDream(values);
    setLoading(false);
    if (created) {
      navigate(`/dreams/${created.id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dreams</span>
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          Create New Dream
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Turn your wish into a trackable experience on your interactive Life Map.
        </p>
      </div>

      <DreamForm onSubmit={handleSubmit} submitLabel="Create Dream (+10 XP)" loading={loading} />
    </div>
  );
};
