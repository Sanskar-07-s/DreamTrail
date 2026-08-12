import { defineSecret } from 'firebase-functions/params';

export const openAiApiKeySecret = defineSecret('OPENAI_API_KEY');
export const geminiApiKeySecret = defineSecret('GEMINI_API_KEY');

export function getAiProvider(): 'mock' | 'gemini' | 'openai' {
  const provider = process.env.AI_PROVIDER || 'mock';
  if (provider === 'gemini' || provider === 'openai') {
    return provider;
  }
  return 'mock';
}
