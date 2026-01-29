import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Place } from '../../types';
import PlaceCard from './PlaceCard';

interface FoodMapProps {
  places: Place[];
  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
}

// Dallas-Fort Worth center coordinates
const defaultCenter: [number, number] = [32.7767, -96.7970];

// Custom marker icon
const createMarkerIcon = (isSelected: boolean) => {
  const color = isSelected ? '#E8899C' : '#F8A5B8';
  const svgIcon = `
    <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C8.954 0 0 8.954 0 20c0 14.667 20 28 20 28s20-13.333 20-28c0-11.046-8.954-20-20-20z" fill="${color}"/>
      <circle cx="20" cy="18" r="8" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker',
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48],
  });
};

// Component to fit bounds when places change
function FitBounds({ places }: { places: Place[] }) {
  const map = useMap();

  useEffect(() => {
    if (places.length > 0) {
      const bounds = L.latLngBounds(
        places.map(place => [place.latitude, place.longitude] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [places, map]);

  return null;
}

// Component to handle selected place
function SelectedPlaceHandler({ selectedPlace }: { selectedPlace: Place | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      map.panTo([selectedPlace.latitude, selectedPlace.longitude]);
    }
  }, [selectedPlace, map]);

  return null;
}

export default function FoodMap({ places, selectedPlace, setSelectedPlace }: FoodMapProps) {
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

  // Open popup when place is selected
  useEffect(() => {
    if (selectedPlace && markerRefs.current[selectedPlace.id]) {
      markerRefs.current[selectedPlace.id]?.openPopup();
    }
  }, [selectedPlace]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={11}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds places={places} />
      <SelectedPlaceHandler selectedPlace={selectedPlace} />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={createMarkerIcon(selectedPlace?.id === place.id)}
          ref={(ref) => {
            markerRefs.current[place.id] = ref;
          }}
          eventHandlers={{
            click: () => setSelectedPlace(place),
          }}
        >
          <Popup>
            <PlaceCard place={place} compact />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
