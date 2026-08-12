import { useState, useEffect, useCallback } from 'react';
import { memoriesService } from '../services/firebase/memories.service';
import { Memory } from '../types';
import { useAuth } from './useAuth';

export function useMemories() {
  const { userProfile } = useAuth();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemories = useCallback(async () => {
    if (!userProfile?.id) {
      setMemories([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await memoriesService.getMemories(userProfile.id);
      setMemories(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load memories');
    } finally {
      setLoading(false);
    }
  }, [userProfile?.id]);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const addMemory = async (memoryData: Partial<Memory>, mediaFile?: File): Promise<Memory | null> => {
    if (!userProfile?.id) return null;
    try {
      const created = await memoriesService.createMemory(userProfile.id, memoryData, mediaFile);
      setMemories((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.message || 'Failed to save memory');
      return null;
    }
  };

  const deleteMemory = async (memoryId: string) => {
    if (!userProfile?.id) return;
    try {
      await memoriesService.softDeleteMemory(userProfile.id, memoryId);
      setMemories((prev) => prev.filter((m) => m.id !== memoryId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete memory');
    }
  };

  return {
    memories,
    loading,
    error,
    refreshMemories: fetchMemories,
    addMemory,
    deleteMemory
  };
}
