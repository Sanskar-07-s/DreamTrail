import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { assertAuthenticated } from '../utils/auth';
import { calculateXpGain, getXpForDreamCompletion } from '../gamification/xp.service';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

export const completeDream = onCall(async (request) => {
  const userId = assertAuthenticated(request);
  const dreamId = request.data?.dreamId;

  if (!dreamId || typeof dreamId !== 'string') {
    throw new HttpsError('invalid-argument', 'dreamId is required.');
  }

  const dreamRef = db.doc(`users/${userId}/dreams/${dreamId}`);
  const ledgerRef = db.doc(`users/${userId}/xpTransactions/DREAM_COMPLETION_${dreamId}`);
  const userRef = db.doc(`users/${userId}`);

  const result = await db.runTransaction(async (tx) => {
    // Execute ALL reads first
    const dreamSnap = await tx.get(dreamRef);
    const ledgerSnap = await tx.get(ledgerRef);
    const userSnap = await tx.get(userRef);

    if (!dreamSnap.exists) {
      throw new HttpsError('not-found', `Dream ${dreamId} not found.`);
    }

    const dreamData = dreamSnap.data()!;

    // Verify ownership
    if (dreamData.userId && dreamData.userId !== userId) {
      throw new HttpsError('permission-denied', 'You do not own this dream.');
    }

    // Check if already completed or ledger exists (Concurrency & Idempotency protection)
    if (dreamData.status === 'COMPLETED' || ledgerSnap.exists) {
      return {
        alreadyCompleted: true,
        dream: dreamData,
        message: 'Dream was already completed.'
      };
    }

    // Calculate XP reward
    const xpEarned = getXpForDreamCompletion(dreamData.difficulty, dreamData.priority);
    const userData = userSnap.data() || {};
    
    const currentState = {
      totalXP: userData.totalXP || 0,
      level: userData.level || 1,
      currentLevelXP: userData.currentLevelXP || 0
    };

    const newState = calculateXpGain(currentState, xpEarned);

    const now = admin.firestore.FieldValue.serverTimestamp();

    // 1. Create XP Ledger Entry with deterministic ID
    tx.set(ledgerRef, {
      id: `DREAM_COMPLETION_${dreamId}`,
      userId,
      amount: xpEarned,
      reason: 'DREAM_COMPLETION',
      referenceType: 'DREAM_COMPLETION',
      referenceId: dreamId,
      createdAt: now
    });

    // 2. Update Dream Status
    tx.update(dreamRef, {
      status: 'COMPLETED',
      progress: 100,
      completedAt: now,
      updatedAt: now
    });

    // 3. Update User Gamification State
    tx.update(userRef, {
      totalXP: newState.totalXP,
      level: newState.level,
      currentLevelXP: newState.currentLevelXP,
      updatedAt: now
    });

    return {
      alreadyCompleted: false,
      xpEarned,
      newState,
      dreamId
    };
  });

  return {
    success: true,
    data: result
  };
});
