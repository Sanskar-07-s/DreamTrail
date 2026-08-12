import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDQxbMCk0VorKUm-FpUb4QZJIkFPpJr9xk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dreamtrail-bbe96.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dreamtrail-bbe96",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dreamtrail-bbe96.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "493599864992",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:493599864992:web:b30f3e0f413b3ca561b1c5",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-Q1418LTDLQ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Initialize Firebase Analytics if supported
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  }).catch(() => {});
}

// Connect to Local Firebase Emulators if explicitly enabled
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  console.log('⚡ Connecting to Firebase Emulator Suite...');
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export default app;
