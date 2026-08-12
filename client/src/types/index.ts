export type DreamStatus = 'DREAM' | 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Major';
export type Visibility = 'PRIVATE' | 'FRIENDS' | 'PUBLIC';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  totalXP: number;
  level: number;
  currentLevelXP: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: string;
  onboardingCompleted: boolean;
  defaultCurrency: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  order: number;
  completedAt?: string;
}

export interface Dream {
  id: string;
  userId: string;
  title: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  status: DreamStatus;
  priority: Priority;
  difficulty: Difficulty;
  targetDate?: string;
  estimatedBudget: number;
  actualBudget: number;
  currency: string;
  locationName?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  geohash?: string;
  isFavorite: boolean;
  visibility: Visibility;
  progress: number;
  milestones?: Milestone[];
  coverImageUrl?: string;
  completedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface Memory {
  id: string;
  userId: string;
  dreamId: string;
  dreamTitle?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  storagePath?: string;
  locationName?: string;
  latitude?: number;
  longitude?: number;
  geohash?: string;
  memoryDate: string;
  rating: number; // 1-5
  visibility: Visibility;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface AIPlanItineraryDay {
  day: number;
  title: string;
  activities: string[];
  tips?: string;
}

export interface AIPlan {
  id: string;
  userId: string;
  dreamId?: string;
  dreamTitle: string;
  overview: string;
  bestTime: string;
  duration: string;
  estimatedBudget: number;
  currency: string;
  transportation: string[];
  accommodation: string[];
  dailyItinerary: AIPlanItineraryDay[];
  checklist: string[];
  preparation: string[];
  safety: string[];
  nearbyExperiences: string[];
  createdAt?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirementType: string;
  requirementValue: number;
  bonusXP: number;
  unlockedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  friendName: string;
  friendAvatar?: string;
  friendLevel: number;
  status: 'PENDING' | 'ACCEPTED' | 'BLOCKED';
  createdAt?: string;
}

export interface ExploreExperience {
  id: string;
  title: string;
  category: string;
  description: string;
  locationName: string;
  latitude: number;
  longitude: number;
  estimatedBudget: number;
  currency: string;
  difficulty: Difficulty;
  imageUrl?: string;
  savesCount: number;
}
