import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: 'dreamtrail-prod.firebaseapp.com',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'dreamtrail-prod',
  storageBucket: 'dreamtrail-prod.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:demo'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const demoUserId = 'demo_user_explorer_01';

async function seedData() {
  console.log('🌱 Pre-seeding DreamTrail Demo Explorer Data...');

  // 1. Seed Demo User Profile
  const userRef = doc(db, `users/${demoUserId}`);
  await setDoc(userRef, {
    id: demoUserId,
    name: 'Alex Explorer',
    email: 'alex.explorer@dreamtrail.app',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bio: 'Wanderer & Milky Way photographer exploring high-altitude trails & coastal reefs.',
    totalXP: 1450,
    level: 4,
    currentLevelXP: 250,
    currentStreak: 5,
    longestStreak: 12,
    onboardingCompleted: true,
    defaultCurrency: 'INR',
    createdAt: new Date('2026-01-01').toISOString(),
    updatedAt: new Date().toISOString()
  });

  // 2. Seed Demo Dreams
  const dreams = [
    {
      id: 'dream_himalayas',
      userId: demoUserId,
      title: 'Trek to Roopkund Glacial Lake',
      description: 'High-altitude Himalayan trek through lush meadows (Ali Bugyal) and snow paths.',
      categoryId: 'adventure',
      categoryName: 'Adventure',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      difficulty: 'Hard',
      targetDate: '2026-10-15',
      estimatedBudget: 28000,
      actualBudget: 0,
      currency: 'INR',
      locationName: 'Uttarakhand, Himalayas, India',
      latitude: 30.2642,
      longitude: 79.7314,
      isFavorite: true,
      visibility: 'PUBLIC',
      progress: 60,
      milestones: [
        { id: 'm1', title: 'Cardiovascular fitness routine (10km runs)', completed: true, order: 1 },
        { id: 'm2', title: 'Purchase high-altitude trek boots & thermals', completed: true, order: 2 },
        { id: 'm3', title: 'Obtain forest department permits', completed: false, order: 3 }
      ],
      createdAt: new Date('2026-02-10').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'dream_hanle',
      userId: demoUserId,
      title: 'Photograph Milky Way in Hanle',
      description: 'Capture deep sky photography at the Hanle Dark Sky Reserve in Ladakh.',
      categoryId: 'photography',
      categoryName: 'Photography',
      status: 'COMPLETED',
      priority: 'CRITICAL',
      difficulty: 'Medium',
      targetDate: '2026-06-20',
      estimatedBudget: 35000,
      actualBudget: 32000,
      currency: 'INR',
      locationName: 'Hanle Dark Sky Reserve, Ladakh, India',
      latitude: 32.7767,
      longitude: 78.9629,
      isFavorite: true,
      visibility: 'PUBLIC',
      progress: 100,
      completedAt: new Date('2026-06-22').toISOString(),
      createdAt: new Date('2026-01-15').toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'dream_andaman',
      userId: demoUserId,
      title: 'Scuba Diving Certification in Havelock',
      description: 'Complete PADI Open Water diver certification amidst Andaman coral reefs.',
      categoryId: 'adventure',
      categoryName: 'Adventure',
      status: 'PLANNING',
      priority: 'MEDIUM',
      difficulty: 'Medium',
      targetDate: '2026-11-25',
      estimatedBudget: 42000,
      actualBudget: 0,
      currency: 'INR',
      locationName: 'Havelock Island, Andaman, India',
      latitude: 11.9841,
      longitude: 92.9976,
      isFavorite: false,
      visibility: 'PUBLIC',
      progress: 25,
      createdAt: new Date('2026-03-01').toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  for (const d of dreams) {
    const dRef = doc(db, `users/${demoUserId}/dreams/${d.id}`);
    await setDoc(dRef, d);
  }

  // 3. Seed Demo Memories
  const memories = [
    {
      id: 'mem_hanle_night',
      userId: demoUserId,
      dreamId: 'dream_hanle',
      dreamTitle: 'Photograph Milky Way in Hanle',
      title: 'Milky Way Core Over Indian Astronomical Observatory',
      description: 'Temperatures dropped to -4°C, but the night sky was crystal clear with zero light pollution.',
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80',
      locationName: 'Hanle Observatory, Ladakh',
      latitude: 32.7767,
      longitude: 78.9629,
      memoryDate: '2026-06-22',
      rating: 5,
      visibility: 'PUBLIC',
      createdAt: new Date('2026-06-23').toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  for (const m of memories) {
    const mRef = doc(db, `users/${demoUserId}/memories/${m.id}`);
    await setDoc(mRef, m);
  }

  console.log('✅ DreamTrail Seed Complete!');
}

seedData().catch(console.error);
