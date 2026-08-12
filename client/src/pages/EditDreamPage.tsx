import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dreamsService } from '../services/firebase/dreams.service';
import { useAuth } from '../hooks/useAuth';
import { Dream } from '../types';
import { DreamForm } from '../components/dreams/DreamForm';
import { ArrowLeft, Edit } from 'lucide-react';

export const EditDreamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [dream, setDream] = useState<Dream | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async (values: any) => {
    if (!userProfile?.id || !id) return;
    setSaving(true);
    await dreamsService.updateDream(userProfile.id, id, values);
    setSaving(false);
    navigate(`/dreams/${id}`);
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Loading dream...</div>;
  }

  if (!dream) {
    return <div className="p-8 text-center text-gray-400">Dream not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel</span>
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Edit className="w-6 h-6 text-emerald-400" />
          Edit Dream
        </h1>
      </div>

      <DreamForm
        initialValues={dream}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        loading={saving}
      />
    </div>
  );
};
