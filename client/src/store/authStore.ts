import { UserProfile } from '../types';

let currentUser: UserProfile | null = null;
let listeners: Array<() => void> = [];

export const authStore = {
  getUser: () => currentUser,
  setUser: (user: UserProfile | null) => {
    currentUser = user;
    listeners.forEach((l) => l());
  },
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
};
