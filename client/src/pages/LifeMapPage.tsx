import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDreams } from '../hooks/useDreams';
import { useMemories } from '../hooks/useMemories';
import { useMap } from '../hooks/useMap';
import { LifeMap } from '../components/map/LifeMap';
import { MapSearch } from '../components/map/MapSearch';
import { MapStyleSwitcher } from '../components/map/MapStyleSwitcher';
import { MapControls } from '../components/map/MapControls';
import { MapPin, Sparkles } from 'lucide-react';

export const LifeMapPage: React.FC = () => {
  const navigate = useNavigate();
  const { dreams } = useDreams();
  const { memories } = useMemories();
  const { mapState, setMapStyle, toggleLayer } = useMap();
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number; zoom?: number } | null>(null);

  const handleSelectPlace = (place: any) => {
    setSelectedLocation({
      latitude: place.latitude,
      longitude: place.longitude,
      zoom: 12
    });
  };

  const handleSelectDream = (dreamId: string) => {
    navigate(`/dreams/${dreamId}`);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4 relative">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            Interactive Life Map
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Visualize your bucket list, completed experiences, and memories across the world.
          </p>
        </div>

        {/* Search Bar */}
        <MapSearch onSelectPlace={handleSelectPlace} />
      </div>

      {/* Map Container & Floating Controls Overlay */}
      <div className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Floating Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 z-30 pointer-events-none">
          <div className="pointer-events-auto">
            <MapControls
              showDreams={mapState.showDreams}
              showMemories={mapState.showMemories}
              showJourney={mapState.showJourney}
              onToggleLayer={toggleLayer}
            />
          </div>

          <div className="pointer-events-auto">
            <MapStyleSwitcher
              currentStyle={mapState.selectedStyle}
              onSelectStyle={setMapStyle}
            />
          </div>
        </div>

        {/* Life Map Canvas */}
        <LifeMap
          styleConfig={mapState.selectedStyle}
          dreams={dreams}
          memories={memories}
          showDreams={mapState.showDreams}
          showMemories={mapState.showMemories}
          showJourney={mapState.showJourney}
          onSelectDream={handleSelectDream}
          flyToLocation={selectedLocation}
        />
      </div>
    </div>
  );
};
