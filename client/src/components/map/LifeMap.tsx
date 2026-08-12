import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { Dream, Memory } from '../../types';
import { MapStyleConfig } from '../../config/mapStyles';
import { dreamsToGeoJSON, memoriesToGeoJSON, buildLifeJourneyLineString } from '../../utils/map';

interface Props {
  styleConfig: MapStyleConfig;
  dreams: Dream[];
  memories: Memory[];
  showDreams: boolean;
  showMemories: boolean;
  showJourney: boolean;
  onSelectDream?: (dreamId: string) => void;
  flyToLocation?: { latitude: number; longitude: number; zoom?: number } | null;
}

export const LifeMap: React.FC<Props> = ({
  styleConfig,
  dreams,
  memories,
  showDreams,
  showMemories,
  showJourney,
  onSelectDream,
  flyToLocation
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: styleConfig.url,
      center: [78.9629, 20.5937],
      zoom: 3.5,
      pitch: 15
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');
    mapRef.current = map;

    map.on('load', () => {
      setupMapLayers(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle Style Change
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(styleConfig.url);
    mapRef.current.once('style.load', () => {
      setupMapLayers(mapRef.current!);
    });
  }, [styleConfig.id]);

  // Handle FlyTo
  useEffect(() => {
    if (!mapRef.current || !flyToLocation) return;
    mapRef.current.flyTo({
      center: [flyToLocation.longitude, flyToLocation.latitude],
      zoom: flyToLocation.zoom || 11,
      speed: 1.4,
      curve: 1.2
    });
  }, [flyToLocation]);

  // Update Data & Layers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // Update Dreams Source
    const dreamSource = map.getSource('dreams-source') as maplibregl.GeoJSONSource;
    if (dreamSource) {
      dreamSource.setData(showDreams ? dreamsToGeoJSON(dreams) : { type: 'FeatureCollection', features: [] });
    }

    // Update Memories Source
    const memorySource = map.getSource('memories-source') as maplibregl.GeoJSONSource;
    if (memorySource) {
      memorySource.setData(showMemories ? memoriesToGeoJSON(memories) : { type: 'FeatureCollection', features: [] });
    }

    // Update Journey LineString Source
    const journeySource = map.getSource('journey-source') as maplibregl.GeoJSONSource;
    if (journeySource) {
      journeySource.setData(showJourney ? buildLifeJourneyLineString(dreams) : { type: 'FeatureCollection', features: [] });
    }
  }, [dreams, memories, showDreams, showMemories, showJourney]);

  const setupMapLayers = (map: maplibregl.Map) => {
    // 1. Life Journey LineString Layer
    if (!map.getSource('journey-source')) {
      map.addSource('journey-source', {
        type: 'geojson',
        data: showJourney ? buildLifeJourneyLineString(dreams) : { type: 'FeatureCollection', features: [] }
      });

      map.addLayer({
        id: 'journey-line',
        type: 'line',
        source: 'journey-source',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#10B981',
          'line-width': 3,
          'line-dasharray': [2, 2],
          'line-opacity': 0.85
        }
      });
    }

    // 2. Dreams Source with Clustering
    if (!map.getSource('dreams-source')) {
      map.addSource('dreams-source', {
        type: 'geojson',
        data: showDreams ? dreamsToGeoJSON(dreams) : { type: 'FeatureCollection', features: [] },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });

      // Cluster Circles
      map.addLayer({
        id: 'dream-clusters',
        type: 'circle',
        source: 'dreams-source',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#10B981',
            5,
            '#06B6D4',
            15,
            '#8B5CF6'
          ],
          'circle-radius': ['step', ['get', 'point_count'], 18, 5, 24, 15, 30],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#FFFFFF'
        }
      });

      // Cluster Count Text
      map.addLayer({
        id: 'dream-cluster-count',
        type: 'symbol',
        source: 'dreams-source',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
        paint: {
          'text-color': '#FFFFFF'
        }
      });

      // Unclustered Dream Pins
      map.addLayer({
        id: 'dream-unclustered',
        type: 'circle',
        source: 'dreams-source',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': [
            'match',
            ['get', 'status'],
            'COMPLETED', '#10B981',
            'IN_PROGRESS', '#06B6D4',
            'PLANNING', '#F59E0B',
            '#8B5CF6' // Default / Dream
          ],
          'circle-radius': 8,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#FFFFFF'
        }
      });
    }

    // 3. Memories Source
    if (!map.getSource('memories-source')) {
      map.addSource('memories-source', {
        type: 'geojson',
        data: showMemories ? memoriesToGeoJSON(memories) : { type: 'FeatureCollection', features: [] }
      });

      map.addLayer({
        id: 'memories-pins',
        type: 'circle',
        source: 'memories-source',
        paint: {
          'circle-color': '#EC4899', // Pink / Magenta for camera memories
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#FFFFFF'
        }
      });
    }

    // Click Handlers
    map.on('click', 'dream-unclustered', (e) => {
      if (!e.features || !e.features[0]) return;
      const feature = e.features[0];
      const props = feature.properties as any;
      const coords = (feature.geometry as any).coordinates.slice();

      if (popupRef.current) popupRef.current.remove();

      const popupNode = document.createElement('div');
      popupNode.className = 'text-xs space-y-2';
      popupNode.innerHTML = `
        <div className="font-extrabold text-sm text-white">${props.title}</div>
        <div className="text-emerald-400 font-medium">📍 ${props.locationName}</div>
        <div className="flex items-center gap-2 text-gray-300">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">${props.status}</span>
          <span>${props.currency} ${Number(props.estimatedBudget).toLocaleString()}</span>
        </div>
      `;

      if (onSelectDream && props.id) {
        const btn = document.createElement('button');
        btn.className = 'w-full mt-2 py-1 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors';
        btn.innerText = 'View Dream Details';
        btn.onclick = () => onSelectDream(props.id);
        popupNode.appendChild(btn);
      }

      popupRef.current = new maplibregl.Popup({ closeButton: true })
        .setLngLat(coords)
        .setDOMContent(popupNode)
        .addTo(map);
    });

    map.on('click', 'dream-clusters', async (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['dream-clusters'] });
      if (!features || !features[0]) return;
      const clusterId = features[0].properties.cluster_id;
      const source = map.getSource('dreams-source') as maplibregl.GeoJSONSource;
      try {
        const zoom = await source.getClusterExpansionZoom(clusterId);
        map.easeTo({
          center: (features[0].geometry as any).coordinates,
          zoom: zoom || 8
        });
      } catch (err) {
        console.warn('Cluster zoom error:', err);
      }
    });

    map.on('mouseenter', 'dream-unclustered', () => { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', 'dream-unclustered', () => { map.getCanvas().style.cursor = ''; });
    map.on('mouseenter', 'dream-clusters', () => { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', 'dream-clusters', () => { map.getCanvas().style.cursor = ''; });
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
