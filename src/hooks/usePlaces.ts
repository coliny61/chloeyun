/**
 * Legacy hook file — wraps useSupabase hooks and maps Supabase snake_case
 * fields to camelCase aliases for backward compatibility with existing components.
 * Will be removed when components are rewritten in later phases.
 */
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import type { Place, FilterState, CuisineType, PriceRange, FilterCategory } from '../types';
import { CATEGORY_TO_CUISINES } from '../types';

/** Map a Supabase row to the Place interface with legacy aliases */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPlace(row: any): Place {
  return {
    ...row,
    // Legacy aliases
    cuisineType: row.cuisine_type ?? 'Other',
    priceRange: row.price_range ?? '$$',
    coverImage: row.cover_image_url ?? '',
    reviewContent: row.review ?? '',
    featured: row.is_featured ?? false,
    published: true,
    tikTokUrl: row.tiktok_url ?? undefined,
    instagramUrl: row.instagram_url ?? undefined,
    dateReviewed: row.date_reviewed ?? undefined,
    location: 'DFW',
    address: row.address ?? '',
    rating: row.rating ?? 0,
  };
}

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('places')
          .select('*')
          .order('date_reviewed', { ascending: false });
        if (err) throw err;
        setPlaces((data ?? []).map(mapPlace));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load places');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { places, loading, error };
}

export function usePlace(id: string | undefined) {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('places')
          .select('*')
          .eq('id', id)
          .single();
        if (err) throw err;
        setPlace(mapPlace(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Place not found');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return { place, loading, error };
}

export function useFeaturedPlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('places')
          .select('*')
          .eq('is_featured', true)
          .order('date_reviewed', { ascending: false });
        if (err) throw err;
        setPlaces((data ?? []).map(mapPlace));
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { places, loading };
}

export function useFilteredPlaces(places: Place[], filters: FilterState) {
  return useMemo(() => {
    let selectedCuisines: CuisineType[] = filters.categories.flatMap(
      category => CATEGORY_TO_CUISINES[category]
    );

    if (filters.categories.includes('Asian') && filters.asianCuisines.length > 0) {
      const asianCuisineSet = new Set(CATEGORY_TO_CUISINES['Asian']);
      selectedCuisines = selectedCuisines.filter(c => !asianCuisineSet.has(c));
      selectedCuisines = [...selectedCuisines, ...filters.asianCuisines];
    }

    return places.filter(place => {
      if (selectedCuisines.length > 0 && !selectedCuisines.includes(place.cuisineType)) {
        return false;
      }
      if (filters.priceRanges.length > 0 && !filters.priceRanges.includes(place.priceRange as PriceRange)) {
        return false;
      }
      if (place.rating < filters.minRating) {
        return false;
      }
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

// Icon map for known filter categories
const CATEGORY_ICONS: Record<string, string> = {
  'Asian': '🍜',
  'Latin': '🌮',
  'European': '🍝',
  'American': '🍔',
  'Sweet Treats': '🍰',
  'Coffee & Cafe': '☕',
  'Bars & Drinks': '🍸',
  'Other': '🍽️',
};

// Icon map for known Asian sub-cuisines
const ASIAN_CUISINE_ICONS: Record<string, string> = {
  'Korean': '🇰🇷',
  'Japanese': '🇯🇵',
  'Chinese': '🇨🇳',
  'Thai': '🇹🇭',
  'Vietnamese': '🇻🇳',
  'Indian': '🇮🇳',
};

/**
 * Derive filter categories and Asian sub-cuisines dynamically from data.
 * Only shows categories/cuisines that actually exist in the places array.
 */
export function useDynamicFilters(places: Place[]) {
  return useMemo(() => {
    const categorySet = new Set<string>();
    const cuisineSet = new Set<string>();

    places.forEach((place) => {
      if (place.cuisineType) cuisineSet.add(place.cuisineType);
      // Use filter_category if set, otherwise reverse-lookup from CATEGORY_TO_CUISINES
      if (place.filter_category) {
        categorySet.add(place.filter_category);
      } else if (place.cuisineType) {
        let found = false;
        for (const [cat, cuisines] of Object.entries(CATEGORY_TO_CUISINES)) {
          if (cuisines.includes(place.cuisineType)) {
            categorySet.add(cat);
            found = true;
            break;
          }
        }
        if (!found) categorySet.add('Other');
      }
    });

    // Build filter categories from what exists in data
    const filterCategories: { category: FilterCategory; label: string; icon: string }[] = [];
    // Show known categories in a stable order, then any new ones
    const knownOrder: FilterCategory[] = ['Asian', 'Latin', 'European', 'American', 'Sweet Treats', 'Coffee & Cafe', 'Bars & Drinks', 'Other'];
    for (const cat of knownOrder) {
      if (categorySet.has(cat)) {
        filterCategories.push({
          category: cat,
          label: cat,
          icon: CATEGORY_ICONS[cat] || '🍽️',
        });
      }
    }
    // Any categories not in knownOrder
    for (const cat of categorySet) {
      if (!knownOrder.includes(cat as FilterCategory)) {
        filterCategories.push({
          category: cat as FilterCategory,
          label: cat,
          icon: CATEGORY_ICONS[cat] || '🍽️',
        });
      }
    }

    // Build Asian sub-cuisines from data
    const asianCuisines = CATEGORY_TO_CUISINES['Asian'] || [];
    const activeAsianCuisines: { cuisine: string; label: string; icon: string }[] = [];
    for (const cuisine of asianCuisines) {
      if (cuisineSet.has(cuisine)) {
        activeAsianCuisines.push({
          cuisine,
          label: cuisine,
          icon: ASIAN_CUISINE_ICONS[cuisine] || '🍜',
        });
      }
    }
    // Also include any cuisine in the data that maps to Asian but isn't in the known list
    cuisineSet.forEach((c) => {
      if (!asianCuisines.includes(c) && !activeAsianCuisines.find((a) => a.cuisine === c)) {
        // Check if this cuisine's place has filter_category 'Asian'
        const hasAsianPlace = places.some((p) => p.cuisineType === c && p.filter_category === 'Asian');
        if (hasAsianPlace) {
          activeAsianCuisines.push({ cuisine: c, label: c, icon: '🍜' });
        }
      }
    });

    return { filterCategories, asianCuisines: activeAsianCuisines };
  }, [places]);
}

export const PRICE_RANGES: PriceRange[] = ['$', '$$', '$$$', '$$$$'];
