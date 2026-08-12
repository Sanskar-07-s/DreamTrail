import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../../config/firebase';
import { Dream } from '../../types';

export interface PaginatedResult<T> {
  items: T[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
}

export const dreamsService = {
  async getDreams(userId: string, categoryId?: string, statusFilter?: string): Promise<Dream[]> {
    const dreamsRef = collection(db, `users/${userId}/dreams`);
    let q = query(dreamsRef, where('deletedAt', '==', null), orderBy('createdAt', 'desc'));

    if (categoryId) {
      q = query(dreamsRef, where('deletedAt', '==', null), where('categoryId', '==', categoryId));
    } else if (statusFilter) {
      q = query(dreamsRef, where('deletedAt', '==', null), where('status', '==', statusFilter));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Dream));
  },

  async getDreamsPaginated(
    userId: string,
    pageSize = 12,
    lastDocumentSnapshot?: DocumentSnapshot | null
  ): Promise<PaginatedResult<Dream>> {
    const dreamsRef = collection(db, `users/${userId}/dreams`);
    let q = query(
      dreamsRef,
      where('deletedAt', '==', null),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    if (lastDocumentSnapshot) {
      q = query(
        dreamsRef,
        where('deletedAt', '==', null),
        orderBy('createdAt', 'desc'),
        startAfter(lastDocumentSnapshot),
        limit(pageSize)
      );
    }

    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Dream));
    const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

    return {
      items,
      lastDoc,
      hasMore: snapshot.docs.length === pageSize
    };
  },

  async getDreamById(userId: string, dreamId: string): Promise<Dream | null> {
    const dreamRef = doc(db, `users/${userId}/dreams/${dreamId}`);
    const snap = await getDoc(dreamRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Dream;
  },

  async createDream(userId: string, dreamData: Partial<Dream>): Promise<Dream> {
    const dreamsRef = collection(db, `users/${userId}/dreams`);
    const newDocRef = doc(dreamsRef);
    
    const newDream: Dream = {
      id: newDocRef.id,
      userId,
      title: dreamData.title || 'Untitled Dream',
      description: dreamData.description || '',
      categoryId: dreamData.categoryId || 'travel',
      categoryName: dreamData.categoryName || 'Travel',
      status: dreamData.status || 'DREAM',
      priority: dreamData.priority || 'MEDIUM',
      difficulty: dreamData.difficulty || 'Medium',
      targetDate: dreamData.targetDate || '',
      estimatedBudget: Number(dreamData.estimatedBudget) || 0,
      actualBudget: Number(dreamData.actualBudget) || 0,
      currency: dreamData.currency || 'INR',
      locationName: dreamData.locationName || '',
      city: dreamData.city || '',
      state: dreamData.state || '',
      country: dreamData.country || '',
      latitude: dreamData.latitude != null ? Number(dreamData.latitude) : undefined,
      longitude: dreamData.longitude != null ? Number(dreamData.longitude) : undefined,
      isFavorite: Boolean(dreamData.isFavorite),
      visibility: dreamData.visibility || 'PRIVATE',
      progress: dreamData.progress || 0,
      milestones: dreamData.milestones || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null
    };

    await setDoc(newDocRef, newDream);
    return newDream;
  },

  async updateDream(userId: string, dreamId: string, updates: Partial<Dream>): Promise<void> {
    const dreamRef = doc(db, `users/${userId}/dreams/${dreamId}`);
    await updateDoc(dreamRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  },

  async softDeleteDream(userId: string, dreamId: string): Promise<void> {
    const dreamRef = doc(db, `users/${userId}/dreams/${dreamId}`);
    await updateDoc(dreamRef, {
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  },

  async completeDreamCallable(dreamId: string): Promise<any> {
    const completeFn = httpsCallable(functions, 'completeDream');
    const response = await completeFn({ dreamId });
    return response.data;
  }
};
