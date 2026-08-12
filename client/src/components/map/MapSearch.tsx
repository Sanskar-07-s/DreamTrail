import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../config/firebase';

interface PlaceResult {
  placeName: string;
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

interface Props {
  onSelectPlace: (place: PlaceResult) => void;
}

export const MapSearch: React.FC<Props> = ({ onSelectPlace }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Cancel previous in-flight request via AbortController
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Set 300ms debounce
    debounceTimerRef.current = setTimeout(async () => {
      abortControllerRef.current = new AbortController();
      setLoading(true);

      try {
        // Perform server-side geocoding call
        const geocodeFn = httpsCallable(functions, 'geocodeAddress');
        const res = await geocodeFn({ query });
        const payload: any = res.data;

        if (payload?.data) {
          setResults(payload.data);
          setIsOpen(true);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.warn('Geocoding search failed:', err);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [query]);

  const handleSelect = (place: PlaceResult) => {
    onSelectPlace(place);
    setQuery(place.placeName);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm z-30">
      <div className="relative">
        <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="🔎 Search cities, mountains, beaches..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          className="w-full bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/60 shadow-xl"
        />
        {loading ? (
          <Loader2 className="w-4 h-4 text-emerald-400 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
        ) : query ? (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden py-1 max-h-64 overflow-y-auto">
          {results.map((place, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(place)}
              className="w-full text-left px-4 py-2.5 hover:bg-slate-800/80 transition-colors flex items-start gap-2.5 text-xs border-b border-slate-800/40 last:border-0"
            >
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-100 line-clamp-1">{place.placeName}</div>
                {(place.city || place.country) && (
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {[place.city, place.country].filter(Boolean).join(', ')}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
