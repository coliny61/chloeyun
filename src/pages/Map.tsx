import { useState } from 'react';
import { MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { usePlaces, useFilteredPlaces } from '../hooks/usePlaces';
import type { FilterState, Place } from '../types';
import FoodMap from '../components/map/FoodMap';
import FilterSidebar from '../components/map/FilterSidebar';
import PlaceCard from '../components/map/PlaceCard';
import { LoadingPage, LoadingCard } from '../components/ui/Loading';

type ViewMode = 'map' | 'list';

export default function Map() {
  const { places, loading, error } = usePlaces();
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    cuisineTypes: [],
    priceRanges: [],
    minRating: 0,
    searchQuery: '',
  });

  const filteredPlaces = useFilteredPlaces(places, filters);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5]">
        <div className="text-center">
          <p className="text-[#6B5B5B] text-lg">{error}</p>
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
        resultsCount={filteredPlaces.length}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* View Toggle */}
        <div className="bg-white border-b border-[#FFF9E6] px-4 py-3 flex items-center justify-between">
          <h1 className="font-heading text-xl font-semibold text-[#6B5B5B]">
            {filteredPlaces.length} Food Spots
          </h1>
          <div className="flex items-center gap-2 bg-[#FFF9E6] rounded-lg p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-[#FF6B6B] shadow-sm'
                  : 'text-[#6B5B5B] hover:text-[#FF6B6B]'
              }`}
            >
              <MapIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Map</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-[#FF6B6B] shadow-sm'
                  : 'text-[#6B5B5B] hover:text-[#FF6B6B]'
              }`}
            >
              <ListBulletIcon className="w-5 h-5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>

        {/* Map or List View */}
        <div className="flex-1 relative">
          {viewMode === 'map' ? (
            <FoodMap
              places={filteredPlaces}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
            />
          ) : (
            <div className="h-full overflow-y-auto bg-[#FFFBF5] p-4 sm:p-6">
              {loading ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <LoadingCard key={i} />
                  ))}
                </div>
              ) : filteredPlaces.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#6B5B5B] text-lg">No spots found matching your filters</p>
                  <p className="text-[#6B5B5B]/70 mt-2">Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredPlaces.map((place) => (
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
