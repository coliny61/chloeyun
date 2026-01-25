import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { getMockCoffeeShops } from '../lib/mockData';
import type { CoffeeShop, LocationTag } from '../types';
import FoodMap from '../components/map/FoodMap';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';
import { MapPinIcon } from '@heroicons/react/24/outline';

type ViewMode = 'map' | 'list';
type LocationFilter = 'All' | LocationTag;

export default function CoffeeMap() {
  const coffeeShops = getMockCoffeeShops();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('All');

  const filteredShops = useMemo(() => {
    if (locationFilter === 'All') return coffeeShops;
    return coffeeShops.filter(shop => shop.location === locationFilter);
  }, [coffeeShops, locationFilter]);

  // Convert coffee shops to Place format for the map component
  const placesForMap = useMemo(() => {
    return filteredShops.map(shop => ({
      id: `coffee-${shop.id}`,
      name: shop.name,
      address: shop.address,
      latitude: shop.latitude,
      longitude: shop.longitude,
      cuisineType: 'Cafe' as const,
      priceRange: shop.priceRange,
      rating: shop.rating,
      coverImage: shop.coverImage,
      tikTokUrl: shop.tikTokUrl,
      reviewContent: shop.description || '',
      featured: shop.featured || false,
      published: true,
      location: shop.location,
    }));
  }, [filteredShops]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Location Tabs + View Toggle */}
        <div className="bg-white border-b border-[#FFF5F7] px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-heading text-xl font-semibold text-[#4A4A4A]">
              {filteredShops.length} Coffee Spots
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
          {filteredShops.length === 0 ? (
            <div className="h-full flex items-center justify-center bg-[#FFFBFC]">
              <div className="text-center py-12">
                <p className="text-[#4A4A4A] text-lg">No coffee spots yet. Check back soon!</p>
              </div>
            </div>
          ) : viewMode === 'map' ? (
            <FoodMap
              places={placesForMap}
              selectedPlace={selectedShop ? {
                ...placesForMap.find(p => p.id === `coffee-${selectedShop.id}`)!
              } : null}
              setSelectedPlace={(place) => {
                if (place) {
                  const shop = filteredShops.find(s => `coffee-${s.id}` === place.id);
                  setSelectedShop(shop || null);
                } else {
                  setSelectedShop(null);
                }
              }}
            />
          ) : (
            <div className="h-full overflow-y-auto bg-[#FFFBFC] p-4 sm:p-6">
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredShops.map((shop) => (
                  <Link key={shop.id} to={`/place/coffee-${shop.id}`} className="group">
                    <Card hover>
                      <CardImage
                        src={shop.coverImage}
                        alt={shop.name}
                        className="h-48"
                      />
                      <CardContent>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="group-hover:text-[#F8A5B8] transition-colors">
                            {shop.name}
                          </CardTitle>
                          <Badge variant="price">{shop.priceRange}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="cuisine">Cafe</Badge>
                          <Rating value={shop.rating} size="sm" />
                        </div>
                        <CardDescription className="flex items-center gap-1 mt-2">
                          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{shop.address}</span>
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
