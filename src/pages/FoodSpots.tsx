import { useState, useMemo } from 'react';
import { MapIcon, ListBulletIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePlaces, useFilteredPlaces, useDynamicFilters } from '../hooks/usePlaces';
import type { FilterState, Place } from '../types';
import FoodMap from '../components/map/FoodMap';
import FilterSidebar from '../components/map/FilterSidebar';
import PlaceCard from '../components/map/PlaceCard';
import { LoadingPage } from '../components/ui/Loading';
import { usePageMeta } from '../hooks/usePageMeta';

type ViewMode = 'map' | 'list';
type SortOption = 'newest' | 'highest-rated' | 'alphabetical';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'highest-rated', label: 'Highest Rated' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

export default function FoodSpots() {
  usePageMeta(
    'Food Spots | Chloe Eats DFW',
    'Browse and discover the best restaurants in Dallas-Fort Worth. Filter by cuisine, price, and rating. Interactive map and list views.'
  );
  const { places, loading, error } = usePlaces();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    asianCuisines: [],
    priceRanges: [],
    minRating: 0,
    searchQuery: '',
  });

  const { filterCategories, asianCuisines: dynamicAsianCuisines } = useDynamicFilters(places);
  const filteredPlaces = useFilteredPlaces(places, filters);

  const sortedPlaces = useMemo(() => {
    const sorted = [...filteredPlaces];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => {
          const dateA = a.dateReviewed ? new Date(a.dateReviewed).getTime() : 0;
          const dateB = b.dateReviewed ? new Date(b.dateReviewed).getTime() : 0;
          return dateB - dateA;
        });
      case 'highest-rated':
        return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }, [filteredPlaces, sortBy]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]">
        <div className="text-center">
          <p className="text-[#2D2424] text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        isOpen={filterOpen}
        setIsOpen={setFilterOpen}
        resultsCount={sortedPlaces.length}
        filterCategories={filterCategories}
        asianCuisines={dynamicAsianCuisines}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header: count + sort + view toggle */}
        <div className="bg-white border-b border-[#FFF5F7] px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-heading text-xl font-semibold text-[#2D2424]">
              {sortedPlaces.length} Food Spot{sortedPlaces.length !== 1 ? 's' : ''}
            </h1>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[#FFF5F7] text-[#2D2424] text-sm font-medium pl-3 pr-8 py-1.5 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F8A5B8]"
                aria-label="Sort food spots"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="w-4 h-4 text-[#2D2424]/60 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-[#FFF5F7] rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-[#F8A5B8] shadow-sm'
                  : 'text-[#2D2424] hover:text-[#F8A5B8]'
              }`}
              aria-label="List view"
            >
              <ListBulletIcon className="w-5 h-5" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-[#F8A5B8] shadow-sm'
                  : 'text-[#2D2424] hover:text-[#F8A5B8]'
              }`}
              aria-label="Map view"
            >
              <MapIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Map</span>
            </button>
          </div>
        </div>

        {/* Map or List View */}
        <div className="flex-1 relative">
          {viewMode === 'map' ? (
            <FoodMap
              places={sortedPlaces}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
            />
          ) : (
            <div className="h-full overflow-y-auto bg-[#FAF6F0] p-4 sm:p-6">
              {sortedPlaces.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#FFF5F7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-[#F8A5B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-[#2D2424] text-lg font-medium">No spots match your filters</p>
                  <p className="text-[#2D2424]/60 mt-2">Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-4">
                  {sortedPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
