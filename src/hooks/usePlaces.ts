import { useState, useEffect, useMemo } from 'react';
import type { Place, FilterState, CuisineType, PriceRange } from '../types';
import { fetchPlaces, fetchPlaceById, fetchFeaturedPlaces } from '../lib/notion';
import { mockPlaces, getMockPlaceById, getMockFeaturedPlaces } from '../lib/mockData';

const USE_MOCK_DATA = !import.meta.env.VITE_NOTION_API_KEY;

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlaces() {
      try {
        setLoading(true);
        if (USE_MOCK_DATA) {
          // Simulate network delay for mock data
          await new Promise(resolve => setTimeout(resolve, 500));
          setPlaces(mockPlaces);
        } else {
          const data = await fetchPlaces();
          setPlaces(data.length > 0 ? data : mockPlaces);
        }
      } catch (err) {
        setError('Failed to load places');
        setPlaces(mockPlaces);
      } finally {
        setLoading(false);
      }
    }
    loadPlaces();
  }, []);

  return { places, loading, error };
}

export function usePlace(id: string | undefined) {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlace() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        if (USE_MOCK_DATA) {
          await new Promise(resolve => setTimeout(resolve, 300));
          const mockPlace = getMockPlaceById(id);
          setPlace(mockPlace || null);
          if (!mockPlace) setError('Place not found');
        } else {
          const data = await fetchPlaceById(id);
          if (data) {
            setPlace(data);
          } else {
            const mockPlace = getMockPlaceById(id);
            setPlace(mockPlace || null);
            if (!mockPlace) setError('Place not found');
          }
        }
      } catch (err) {
        setError('Failed to load place');
        const mockPlace = getMockPlaceById(id);
        setPlace(mockPlace || null);
      } finally {
        setLoading(false);
      }
    }
    loadPlace();
  }, [id]);

  return { place, loading, error };
}

export function useFeaturedPlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        if (USE_MOCK_DATA) {
          await new Promise(resolve => setTimeout(resolve, 400));
          setPlaces(getMockFeaturedPlaces());
        } else {
          const data = await fetchFeaturedPlaces();
          setPlaces(data.length > 0 ? data : getMockFeaturedPlaces());
        }
      } catch {
        setPlaces(getMockFeaturedPlaces());
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return { places, loading };
}

export function useFilteredPlaces(places: Place[], filters: FilterState) {
  return useMemo(() => {
    return places.filter(place => {
      // Filter by cuisine type
      if (filters.cuisineTypes.length > 0 && !filters.cuisineTypes.includes(place.cuisineType)) {
        return false;
      }

      // Filter by price range
      if (filters.priceRanges.length > 0 && !filters.priceRanges.includes(place.priceRange)) {
        return false;
      }

      // Filter by minimum rating
      if (place.rating < filters.minRating) {
        return false;
      }

      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = place.name.toLowerCase().includes(query);
        const matchesAddress = place.address.toLowerCase().includes(query);
        const matchesCuisine = place.cuisineType.toLowerCase().includes(query);
        if (!matchesName && !matchesAddress && !matchesCuisine) {
          return false;
        }
      }

      return true;
    });
  }, [places, filters]);
}

export const CUISINE_TYPES: CuisineType[] = [
  'Korean',
  'Japanese',
  'Chinese',
  'Mexican',
  'Italian',
  'American',
  'Thai',
  'Vietnamese',
  'Indian',
  'Mediterranean',
  'French',
  'Fusion',
  'Dessert',
  'Cafe',
  'Other',
];

export const PRICE_RANGES: PriceRange[] = ['$', '$$', '$$$', '$$$$'];
