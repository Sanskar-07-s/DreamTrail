export function levelThreshold(level: number): number {
  return 100 * Math.pow(Math.max(1, level), 2);
}

export function computeLevelMetrics(level: number, currentLevelXP: number) {
  const safeLevel = Math.max(1, level);
  const threshold = levelThreshold(safeLevel);
  const progress = Math.min(100, Math.max(0, (currentLevelXP / threshold) * 100));
  const xpToNextLevel = Math.max(0, threshold - currentLevelXP);

  return {
    threshold,
    progress,
    xpToNextLevel
  };
}

export function getLevelTitle(level: number): string {
  if (level >= 50) return 'Legend ⭐';
  if (level >= 30) return 'Master Adventurer 🌌';
  if (level >= 20) return 'Wanderer 🌎';
  if (level >= 10) return 'Adventurer 🏔️';
  if (level >= 5) return 'Explorer 🧭';
  return 'Dreamer 🌱';
}
