import { DEFAULT_MAP_STYLE, MapStyleConfig } from '../config/mapStyles';

export interface MapState {
  selectedStyle: MapStyleConfig;
  showDreams: boolean;
  showMemories: boolean;
  showJourney: boolean;
  showTripRoutes: boolean;
  selectedDreamId: string | null;
  activeCategoryFilter: string | null;
  activeStatusFilter: string | null;
  viewport: {
    zoom: number;
    center: [number, number]; // [lng, lat]
  };
}

let mapState: MapState = {
  selectedStyle: DEFAULT_MAP_STYLE,
  showDreams: true,
  showMemories: true,
  showJourney: true,
  showTripRoutes: false,
  selectedDreamId: null,
  activeCategoryFilter: null,
  activeStatusFilter: null,
  viewport: {
    zoom: 3,
    center: [78.9629, 20.5937] // Default centered over India / South Asia
  }
};

let listeners: Array<() => void> = [];

export const mapStore = {
  getState: () => mapState,
  setState: (partial: Partial<MapState>) => {
    mapState = { ...mapState, ...partial };
    listeners.forEach((l) => l());
  },
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
};
