import { Dream, Memory } from '../types';

export function dreamsToGeoJSON(dreams: Dream[]): any {
  const validDreams = dreams.filter(
    (d) => d.latitude != null && d.longitude != null && !d.deletedAt
  );

  return {
    type: 'FeatureCollection',
    features: validDreams.map((dream) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [dream.longitude!, dream.latitude!]
      },
      properties: {
        id: dream.id,
        title: dream.title,
        status: dream.status,
        categoryId: dream.categoryId,
        categoryName: dream.categoryName || 'Adventure',
        priority: dream.priority,
        estimatedBudget: dream.estimatedBudget,
        currency: dream.currency,
        progress: dream.progress,
        locationName: dream.locationName || 'Unknown Location'
      }
    }))
  };
}

export function memoriesToGeoJSON(memories: Memory[]): any {
  const validMemories = memories.filter(
    (m) => m.latitude != null && m.longitude != null && !m.deletedAt
  );

  return {
    type: 'FeatureCollection',
    features: validMemories.map((mem) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [mem.longitude!, mem.latitude!]
      },
      properties: {
        id: mem.id,
        title: mem.title,
        dreamId: mem.dreamId,
        memoryDate: mem.memoryDate,
        rating: mem.rating,
        imageUrl: mem.imageUrl,
        locationName: mem.locationName
      }
    }))
  };
}

export function buildLifeJourneyLineString(dreams: Dream[]): any {
  const completedDreams = dreams
    .filter((d) => d.status === 'COMPLETED' && d.latitude != null && d.longitude != null && !d.deletedAt)
    .sort((a, b) => new Date(a.completedAt || a.createdAt || 0).getTime() - new Date(b.completedAt || b.createdAt || 0).getTime());

  if (completedDreams.length < 2) {
    return {
      type: 'FeatureCollection',
      features: []
    };
  }

  const coordinates = completedDreams.map((d) => [d.longitude!, d.latitude!]);

  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates
        },
        properties: {
          name: 'Chronological Life Journey',
          completedCount: completedDreams.length
        }
      }
    ]
  };
}
