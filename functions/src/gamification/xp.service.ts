export interface LevelState {
  totalXP: number;
  level: number;
  currentLevelXP: number;
}

export function levelThreshold(level: number): number {
  return 100 * Math.pow(level, 2);
}

export function calculateXpGain(
  currentState: LevelState,
  earnedXP: number
): LevelState {
  let { totalXP, level, currentLevelXP } = currentState;
  
  totalXP += earnedXP;
  currentLevelXP += earnedXP;

  while (currentLevelXP >= levelThreshold(level)) {
    currentLevelXP -= levelThreshold(level);
    level += 1;
  }

  return {
    totalXP,
    level,
    currentLevelXP
  };
}

export function getXpForDreamCompletion(difficulty?: string, priority?: string): number {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 100;
    case 'medium':
      return 250;
    case 'hard':
      return 500;
    case 'major':
    case 'epic':
      return 1000;
    default:
      return 250;
  }
}
