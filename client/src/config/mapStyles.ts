export interface MapStyleConfig {
  id: string;
  name: string;
  category: string;
  url: string;
  previewImage?: string;
  description: string;
}

export const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY || 'get_your_maptiler_key';

export const MAP_STYLES: Record<string, MapStyleConfig> = {
  streets: {
    id: 'streets',
    name: 'Streets v4',
    category: 'General',
    url: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`,
    description: 'Clean, modern basemap for general exploration & cities'
  },
  outdoor: {
    id: 'outdoor',
    name: 'Outdoor v4',
    category: 'Adventure',
    url: `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${MAPTILER_API_KEY}`,
    description: 'High-contrast terrain for hiking, trekking, and nature trips'
  },
  satellite: {
    id: 'satellite',
    name: 'Satellite Hybrid',
    category: 'Aerial',
    url: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_API_KEY}`,
    description: 'High-resolution satellite photography with road overlays'
  },
  satellitePlain: {
    id: 'satellitePlain',
    name: 'Satellite Plain',
    category: 'Aerial',
    url: `https://api.maptiler.com/maps/satellite/style.json?key=${MAPTILER_API_KEY}`,
    description: 'Pure satellite imagery without label overlays'
  },
  topo: {
    id: 'topo',
    name: 'Topo v4',
    category: 'Terrain',
    url: `https://api.maptiler.com/maps/topo-v2/style.json?key=${MAPTILER_API_KEY}`,
    description: 'Topographic contour lines and elevation shading'
  },
  aquarelle: {
    id: 'aquarelle',
    name: 'Aquarelle',
    category: 'Artistic',
    url: `https://api.maptiler.com/maps/ocean/style.json?key=${MAPTILER_API_KEY}`,
    description: 'Artistic ocean & coastal watercolor styling'
  }
};

export const DEFAULT_MAP_STYLE = MAP_STYLES.streets;
