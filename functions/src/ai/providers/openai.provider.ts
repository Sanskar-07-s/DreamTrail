import { MockAIProvider, DreamIdea, StructuredAIPlan } from './mock.provider';

export class OpenAIProvider {
  private mockProvider = new MockAIProvider();

  private getApiKey(): string {
    return process.env.OPENAI_API_KEY || '';
  }

  async generateIdeas(interests: string[], budget: number, location?: string): Promise<{ ideas: DreamIdea[] }> {
    const apiKey = this.getApiKey();
    if (!apiKey || apiKey.startsWith('sk-demo')) {
      return this.mockProvider.generateIdeas(interests, budget, location);
    }

    try {
      const prompt = `You are DreamTrail AI, an adventure experience architect.
Generate 3 distinct, thrilling bucket-list dream ideas based on:
- Interests: ${interests.join(', ')}
- Budget: ₹${budget}
- Preferred Location/Region: ${location || 'Global/India'}

Return ONLY valid JSON matching this schema:
{
  "ideas": [
    {
      "title": "string",
      "category": "string",
      "reason": "string",
      "difficulty": "Easy" | "Medium" | "Hard" | "Major",
      "estimatedBudget": number,
      "bestTime": "string",
      "suggestedLocations": ["string"]
    }
  ]
}`;

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.7
        })
      });

      if (!res.ok) {
        console.warn(`OpenAI API error (${res.status}), falling back to mock provider.`);
        return this.mockProvider.generateIdeas(interests, budget, location);
      }

      const payload: any = await res.json();
      const content = payload.choices?.[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (err) {
      console.warn('OpenAI request failed, using fallback:', err);
    }

    return this.mockProvider.generateIdeas(interests, budget, location);
  }

  async planDream(dreamTitle: string, location?: string, budget?: number): Promise<StructuredAIPlan> {
    const apiKey = this.getApiKey();
    if (!apiKey || apiKey.startsWith('sk-demo')) {
      return this.mockProvider.planDream(dreamTitle, location, budget);
    }

    try {
      const prompt = `You are DreamTrail AI, an expert geospatial trip planner and adventure guide.
Create a step-by-step master plan for the dream: "${dreamTitle}"
- Location: ${location || 'Optimal global location'}
- Budget: ₹${budget || 35000}

Return ONLY valid JSON matching this schema:
{
  "overview": "string",
  "bestTime": "string",
  "duration": "string",
  "estimatedBudget": number,
  "currency": "INR",
  "transportation": ["string"],
  "accommodation": ["string"],
  "dailyItinerary": [
    {
      "day": number,
      "title": "string",
      "activities": ["string"],
      "tips": "string"
    }
  ],
  "checklist": ["string"],
  "preparation": ["string"],
  "safety": ["string"],
  "nearbyExperiences": ["string"]
}`;

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.7
        })
      });

      if (!res.ok) {
        console.warn(`OpenAI API error (${res.status}), falling back to mock provider.`);
        return this.mockProvider.planDream(dreamTitle, location, budget);
      }

      const payload: any = await res.json();
      const content = payload.choices?.[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (err) {
      console.warn('OpenAI plan request failed, using fallback:', err);
    }

    return this.mockProvider.planDream(dreamTitle, location, budget);
  }
}
