import { httpsCallable } from 'firebase/functions';
import { functions } from '../../config/firebase';
import { AIPlan } from '../../types';

export const aiClientService = {
  async generateDreamIdeas(interests: string[], budget: number, location?: string) {
    const fn = httpsCallable(functions, 'generateDreamIdeas');
    const res = await fn({ interests, budget, location });
    const payload: any = res.data;
    return payload.data?.ideas || [];
  },

  async planDream(dreamTitle: string, location?: string, budget?: number): Promise<AIPlan> {
    const fn = httpsCallable(functions, 'planDream');
    const res = await fn({ dreamTitle, location, budget });
    const payload: any = res.data;
    return payload.data as AIPlan;
  }
};
