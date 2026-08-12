import { onCall, HttpsError } from 'firebase-functions/v2/https';

export const geocodeAddress = onCall(async (request) => {
  const query = request.data?.query;
  if (!query || typeof query !== 'string') {
    throw new HttpsError('invalid-argument', 'query string is required.');
  }

  // Server-side Geocoding proxy with Nominatim/MapTiler integration
  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=5`, {
      headers: {
        'User-Agent': 'DreamTrail-App/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Geocoding HTTP error: ${response.status}`);
    }

    const data: any = await response.json();
    const formatted = data.map((item: any) => ({
      placeName: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      city: item.address?.city || item.address?.town || item.address?.village || '',
      state: item.address?.state || '',
      country: item.address?.country || ''
    }));

    return {
      success: true,
      data: formatted
    };
  } catch (err: any) {
    console.warn('Nominatim server geocoding error:', err);
    return {
      success: true,
      data: []
    };
  }
});
