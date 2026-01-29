import { useState, useMemo } from 'react';
import { MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { usePlaces, useFilteredPlaces } from '../hooks/usePlaces';
import type { FilterState, Place, LocationTag } from '../types';
import FoodMap from '../components/map/FoodMap';
import FilterSidebar from '../components/map/FilterSidebar';
import PlaceCard from '../components/map/PlaceCard';
import { LoadingPage, LoadingCard } from '../components/ui/Loading';

type ViewMode = 'map' | 'list';
type LocationFilter = 'All' | LocationTag;

export default function Map() {
  const { places, loading, error } = usePlaces();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('All');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    asianCuisines: [],
    priceRanges: [],
    minRating: 0,
    searchQuery: '',
  });

  const locationFilteredPlaces = useMemo(() => {
    if (locationFilter === 'All') return places;
    return places.filter(place => place.location === locationFilter);
  }, [places, locationFilter]);

  const filteredPlaces = useFilteredPlaces(locationFilteredPlaces, filters);

  // Sort by dateReviewed (oldest first, most recent last)
  const sortedPlaces = useMemo(() => {
    return [...filteredPlaces].sort((a, b) => {
      const dateA = a.dateReviewed ? new Date(a.dateReviewed).getTime() : 0;
      const dateB = b.dateReviewed ? new Date(b.dateReviewed).getTime() : 0;
      return dateA - dateB; // Ascending order: oldest first, newest last
    });
  }, [filteredPlaces]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBFC]">
        <div className="text-center">
          <p className="text-[#4A4A4A] text-lg">{error}</p>
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
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Location Tabs + View Toggle */}
        <div className="bg-white border-b border-[#FFF5F7] px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-heading text-xl font-semibold text-[#4A4A4A]">
              {sortedPlaces.length} Food Spots
            </h1>
            {/* Location Tabs */}
            <div className="flex items-center gap-1 bg-[#FFF5F7] rounded-lg p-1">
              {(['All', 'DFW', 'Trip'] as LocationFilter[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocationFilter(loc)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    locationFilter === loc
                      ? 'bg-white text-[#F8A5B8] shadow-sm'
                      : 'text-[#4A4A4A] hover:text-[#F8A5B8]'
                  }`}
                >
                  {loc === 'Trip' ? 'Trips' : loc}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#FFF5F7] rounded-lg p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-[#F8A5B8] shadow-sm'
                  : 'text-[#4A4A4A] hover:text-[#F8A5B8]'
              }`}
            >
              <MapIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Map</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-[#F8A5B8] shadow-sm'
                  : 'text-[#4A4A4A] hover:text-[#F8A5B8]'
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
              places={sortedPlaces}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
            />
          ) : (
            <div className="h-full overflow-y-auto bg-[#FFFBFC] p-4 sm:p-6">
              {loading ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {[...Array(6)].map((_, i) => (
                    <LoadingCard key={i} />
                  ))}
                </div>
              ) : sortedPlaces.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#4A4A4A] text-lg">No spots found matching your filters</p>
                  <p className="text-[#4A4A4A]/70 mt-2">Try adjusting your search criteria</p>
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
