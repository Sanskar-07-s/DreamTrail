import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { assertAuthenticated } from '../utils/auth';
import { aiService } from './ai.service';

export const generateDreamIdeas = onCall(async (request) => {
  assertAuthenticated(request);

  const interests = request.data?.interests || ['Travel', 'Adventure'];
  const budget = Number(request.data?.budget) || 50000;
  const location = request.data?.location || '';

  try {
    const result = await aiService.generateIdeas(interests, budget, location);
    return {
      success: true,
      data: result
    };
  } catch (err: any) {
    throw new HttpsError('internal', err.message || 'Failed to generate dream ideas.');
  }
});

export const planDream = onCall(async (request) => {
  assertAuthenticated(request);

  const dreamTitle = request.data?.dreamTitle;
  const location = request.data?.location;
  const budget = request.data?.budget ? Number(request.data.budget) : undefined;

  if (!dreamTitle || typeof dreamTitle !== 'string') {
    throw new HttpsError('invalid-argument', 'dreamTitle string is required.');
  }

  try {
    const plan = await aiService.planDream(dreamTitle, location, budget);
    return {
      success: true,
      data: plan
    };
  } catch (err: any) {
    throw new HttpsError('internal', err.message || 'Failed to generate AI plan.');
  }
});
