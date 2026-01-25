import { useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import type { Place } from '../../types';
import PlaceCard from './PlaceCard';
import Loading from '../ui/Loading';

interface FoodMapProps {
  places: Place[];
  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 40.7580,
  lng: -73.9855,
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#d4e4f0' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [{ color: '#f5f5f5' }],
    },
  ],
};

export default function FoodMap({ places, selectedPlace, setSelectedPlace }: FoodMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    id: 'google-map-script',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // Fit bounds to show all markers
    if (places.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        bounds.extend({ lat: place.latitude, lng: place.longitude });
      });
      map.fitBounds(bounds);

      // Don't zoom in too much
      const listener = google.maps.event.addListener(map, 'idle', () => {
        const currentZoom = map.getZoom();
        if (currentZoom && currentZoom > 15) {
          map.setZoom(15);
        }
        google.maps.event.removeListener(listener);
      });
    }
  }, [places]);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: place.latitude, lng: place.longitude });
    }
  };

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-[#FFF5F7]">
        <div className="text-center p-8">
          <p className="text-[#4A4A4A] mb-2">Unable to load map</p>
          <p className="text-sm text-[#4A4A4A]/70">
            Please check your Google Maps API key configuration
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-[#FFF5F7]">
        <Loading text="Loading map..." />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
      onClick={() => setSelectedPlace(null)}
    >
      {places.map((place) => (
        <MarkerF
          key={place.id}
          position={{ lat: place.latitude, lng: place.longitude }}
          onClick={() => handleMarkerClick(place)}
          icon={{
            url: `data:image/svg+xml,${encodeURIComponent(`
              <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C8.954 0 0 8.954 0 20c0 14.667 20 28 20 28s20-13.333 20-28c0-11.046-8.954-20-20-20z" fill="${selectedPlace?.id === place.id ? '#E8899C' : '#F8A5B8'}"/>
                <circle cx="20" cy="18" r="8" fill="white"/>
                <text x="20" y="22" font-family="Arial" font-size="10" font-weight="bold" fill="#F8A5B8" text-anchor="middle">${place.priceRange.length}</text>
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(40, 48),
            anchor: new google.maps.Point(20, 48),
          }}
        />
      ))}

      {selectedPlace && (
        <InfoWindowF
          position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
          onCloseClick={() => setSelectedPlace(null)}
          options={{
            pixelOffset: new google.maps.Size(0, -48),
          }}
        >
          <PlaceCard place={selectedPlace} compact />
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}
