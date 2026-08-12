import { useState, useEffect } from 'react';
import { mapStore, MapState } from '../store/mapStore';
import { MapStyleConfig } from '../config/mapStyles';

export function useMap() {
  const [mapState, setMapState] = useState<MapState>(mapStore.getState());

  useEffect(() => {
    const unsubscribe = mapStore.subscribe(() => {
      setMapState(mapStore.getState());
    });
    return unsubscribe;
  }, []);

  const setMapStyle = (style: MapStyleConfig) => {
    mapStore.setState({ selectedStyle: style });
  };

  const toggleLayer = (layer: 'showDreams' | 'showMemories' | 'showJourney' | 'showTripRoutes') => {
    mapStore.setState({ [layer]: !mapState[layer] });
  };

  const setSelectedDreamId = (id: string | null) => {
    mapStore.setState({ selectedDreamId: id });
  };

  const setCategoryFilter = (catId: string | null) => {
    mapStore.setState({ activeCategoryFilter: catId });
  };

  const setStatusFilter = (status: string | null) => {
    mapStore.setState({ activeStatusFilter: status });
  };

  return {
    mapState,
    setMapStyle,
    toggleLayer,
    setSelectedDreamId,
    setCategoryFilter,
    setStatusFilter
  };
}
