import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

// @ts-ignore
import geohash from 'ngeohash';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Haversine Distance Formula in Kilometers
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const getNearbyExperiences = onCall(async (request) => {
  const lat = Number(request.data?.latitude);
  const lon = Number(request.data?.longitude);
  const radiusKm = Number(request.data?.radiusKm) || 50;

  if (isNaN(lat) || isNaN(lon)) {
    throw new HttpsError('invalid-argument', 'latitude and longitude are required numbers.');
  }

  // Generate Geohash candidate prefix
  const centerHash = geohash.encode(lat, lon, 4);

  try {
    const snapshot = await db.collection('exploreExperiences')
      .limit(100)
      .get();

    const results: Array<any> = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.latitude != null && data.longitude != null) {
        const dist = calculateHaversineDistance(lat, lon, data.latitude, data.longitude);
        if (dist <= radiusKm) {
          results.push({
            id: doc.id,
            ...data,
            distanceKm: Math.round(dist * 10) / 10,
            geohashPrefix: centerHash
          });
        }
      }
    });

    results.sort((a, b) => a.distanceKm - b.distanceKm);

    return {
      success: true,
      data: results
    };
  } catch (err: any) {
    throw new HttpsError('internal', err.message || 'Failed to fetch nearby experiences.');
  }
});
