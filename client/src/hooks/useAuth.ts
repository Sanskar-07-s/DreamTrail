import { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserProfile } from '../types';
import { authStore } from '../store/authStore';

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(authStore.getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Fetch or create user profile doc in Firestore
        const userRef = doc(db, `users/${fbUser.uid}`);
        const snap = await getDoc(userRef);
        
        if (snap.exists()) {
          const profile = { id: snap.id, ...snap.data() } as UserProfile;
          setUserProfile(profile);
          authStore.setUser(profile);
        } else {
          // Initialize new user profile doc
          const newProfile: UserProfile = {
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Dreamer',
            email: fbUser.email || '',
            avatarUrl: fbUser.photoURL || undefined,
            totalXP: 0,
            level: 1,
            currentLevelXP: 0,
            currentStreak: 1,
            longestStreak: 1,
            onboardingCompleted: false,
            defaultCurrency: 'INR',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          await setDoc(userRef, newProfile);
          setUserProfile(newProfile);
          authStore.setUser(newProfile);
        }
      } else {
        setUserProfile(null);
        authStore.setUser(null);
      }
      setLoading(false);
    });

    const unsubscribeStore = authStore.subscribe(() => {
      setUserProfile(authStore.getUser());
    });

    return () => {
      unsubscribeAuth();
      unsubscribeStore();
    };
  }, []);

  const refreshProfile = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, `users/${auth.currentUser.uid}`);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const profile = { id: snap.id, ...snap.data() } as UserProfile;
        setUserProfile(profile);
        authStore.setUser(profile);
      }
    }
  };

  return {
    firebaseUser,
    userProfile,
    isAuthenticated: !!firebaseUser,
    loading,
    refreshProfile
  };
}
