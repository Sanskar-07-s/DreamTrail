import { z } from 'zod';
import { MockAIProvider, DreamIdea, StructuredAIPlan } from './providers/mock.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { getAiProvider } from '../config/secrets';

export const DreamIdeaSchema = z.object({
  title: z.string(),
  category: z.string(),
  reason: z.string(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Major']),
  estimatedBudget: z.number(),
  bestTime: z.string(),
  suggestedLocations: z.array(z.string())
});

export const DreamIdeasResponseSchema = z.object({
  ideas: z.array(DreamIdeaSchema)
});

export const AIPlanSchema = z.object({
  overview: z.string(),
  bestTime: z.string(),
  duration: z.string(),
  estimatedBudget: z.number(),
  currency: z.string(),
  transportation: z.array(z.string()),
  accommodation: z.array(z.string()),
  dailyItinerary: z.array(z.object({
    day: z.number(),
    title: z.string(),
    activities: z.array(z.string()),
    tips: z.string().optional().default('')
  })),
  checklist: z.array(z.string()),
  preparation: z.array(z.string()),
  safety: z.array(z.string()),
  nearbyExperiences: z.array(z.string())
});

export class AIService {
  private mockProvider = new MockAIProvider();
  private openAiProvider = new OpenAIProvider();

  async generateIdeas(interests: string[], budget: number, location?: string): Promise<{ ideas: DreamIdea[] }> {
    const providerType = getAiProvider();
    
    let rawResult;
    if (providerType === 'openai') {
      rawResult = await this.openAiProvider.generateIdeas(interests, budget, location);
    } else {
      rawResult = await this.mockProvider.generateIdeas(interests, budget, location);
    }
    
    // Zod Validation
    const validated = DreamIdeasResponseSchema.safeParse(rawResult);
    if (!validated.success) {
      console.warn('AI Output failed Zod validation, falling back to mock provider:', validated.error);
      return this.mockProvider.generateIdeas(interests, budget, location);
    }
    
    return validated.data as { ideas: DreamIdea[] };
  }

  async planDream(dreamTitle: string, location?: string, budget?: number): Promise<StructuredAIPlan> {
    const providerType = getAiProvider();

    let rawPlan;
    if (providerType === 'openai') {
      rawPlan = await this.openAiProvider.planDream(dreamTitle, location, budget);
    } else {
      rawPlan = await this.mockProvider.planDream(dreamTitle, location, budget);
    }
    
    // Zod Validation
    const validated = AIPlanSchema.safeParse(rawPlan);
    if (!validated.success) {
      console.warn('AI Plan failed Zod validation, falling back to clean mock plan:', validated.error);
      return this.mockProvider.planDream(dreamTitle, location, budget);
    }
    
    return validated.data as StructuredAIPlan;
  }
}

export const aiService = new AIService();
