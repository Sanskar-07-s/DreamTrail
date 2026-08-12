import { useState, useEffect, useCallback } from 'react';
import { dreamsService } from '../services/firebase/dreams.service';
import { Dream } from '../types';
import { useAuth } from './useAuth';

export function useDreams(categoryId?: string, statusFilter?: string) {
  const { userProfile, refreshProfile } = useAuth();
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDreams = useCallback(async () => {
    if (!userProfile?.id) {
      setDreams([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await dreamsService.getDreams(userProfile.id, categoryId, statusFilter);
      setDreams(data);
    } catch (err: any) {
      console.error('Failed to load dreams:', err);
      setError(err.message || 'Failed to load dreams');
    } finally {
      setLoading(false);
    }
  }, [userProfile?.id, categoryId, statusFilter]);

  useEffect(() => {
    fetchDreams();
  }, [fetchDreams]);

  const addDream = async (dreamData: Partial<Dream>): Promise<Dream | null> => {
    if (!userProfile?.id) return null;
    try {
      const created = await dreamsService.createDream(userProfile.id, dreamData);
      setDreams((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.message || 'Failed to create dream');
      return null;
    }
  };

  const updateDream = async (dreamId: string, updates: Partial<Dream>) => {
    if (!userProfile?.id) return;
    try {
      await dreamsService.updateDream(userProfile.id, dreamId, updates);
      setDreams((prev) => prev.map((d) => (d.id === dreamId ? { ...d, ...updates } : d)));
    } catch (err: any) {
      setError(err.message || 'Failed to update dream');
    }
  };

  const completeDream = async (dreamId: string) => {
    if (!userProfile?.id) return;
    try {
      const result = await dreamsService.completeDreamCallable(dreamId);
      await fetchDreams();
      await refreshProfile();
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to complete dream');
      throw err;
    }
  };

  const deleteDream = async (dreamId: string) => {
    if (!userProfile?.id) return;
    try {
      await dreamsService.softDeleteDream(userProfile.id, dreamId);
      setDreams((prev) => prev.filter((d) => d.id !== dreamId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete dream');
    }
  };

  return {
    dreams,
    loading,
    error,
    refreshDreams: fetchDreams,
    addDream,
    updateDream,
    completeDream,
    deleteDream
  };
}
