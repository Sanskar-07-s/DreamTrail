import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { Memory } from '../../types';

export const memoriesService = {
  async getMemories(userId: string): Promise<Memory[]> {
    const memRef = collection(db, `users/${userId}/memories`);
    const q = query(memRef, where('deletedAt', '==', null), orderBy('memoryDate', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Memory));
  },

  async uploadMemoryMedia(userId: string, memoryId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const storagePath = `users/${userId}/memories/${memoryId}/${Date.now()}.${fileExt}`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file, { contentType: file.type });
    return await getDownloadURL(storageRef);
  },

  async createMemory(userId: string, memoryData: Partial<Memory>, mediaFile?: File): Promise<Memory> {
    const memRef = collection(db, `users/${userId}/memories`);
    const newDoc = doc(memRef);
    
    let imageUrl = memoryData.imageUrl || '';
    
    if (mediaFile) {
      imageUrl = await this.uploadMemoryMedia(userId, newDoc.id, mediaFile);
    }

    const newMemory: Memory = {
      id: newDoc.id,
      userId,
      dreamId: memoryData.dreamId || '',
      dreamTitle: memoryData.dreamTitle || '',
      title: memoryData.title || 'Adventure Memory',
      description: memoryData.description || '',
      imageUrl,
      thumbnailUrl: imageUrl,
      locationName: memoryData.locationName || '',
      latitude: memoryData.latitude != null ? Number(memoryData.latitude) : undefined,
      longitude: memoryData.longitude != null ? Number(memoryData.longitude) : undefined,
      memoryDate: memoryData.memoryDate || new Date().toISOString().split('T')[0],
      rating: memoryData.rating || 5,
      visibility: memoryData.visibility || 'PRIVATE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null
    };

    await setDoc(newDoc, newMemory);
    return newMemory;
  },

  async softDeleteMemory(userId: string, memoryId: string): Promise<void> {
    const memRef = doc(db, `users/${userId}/memories/${memoryId}`);
    await updateDoc(memRef, {
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
};
