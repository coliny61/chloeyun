import { Fragment } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import type { FilterState, CuisineType, PriceRange } from '../../types';
import { CUISINE_TYPES, PRICE_RANGES } from '../../hooks/usePlaces';
import Button from '../ui/Button';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  resultsCount: number;
}

export default function FilterSidebar({
  filters,
  setFilters,
  isOpen,
  setIsOpen,
  resultsCount,
}: FilterSidebarProps) {
  const handleCuisineToggle = (cuisine: CuisineType) => {
    setFilters(prev => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter(c => c !== cuisine)
        : [...prev.cuisineTypes, cuisine],
    }));
  };

  const handlePriceToggle = (price: PriceRange) => {
    setFilters(prev => ({
      ...prev,
      priceRanges: prev.priceRanges.includes(price)
        ? prev.priceRanges.filter(p => p !== price)
        : [...prev.priceRanges, price],
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, minRating: rating }));
  };

  const clearFilters = () => {
    setFilters({
      cuisineTypes: [],
      priceRanges: [],
      minRating: 0,
      searchQuery: '',
    });
  };

  const hasActiveFilters = filters.cuisineTypes.length > 0 ||
    filters.priceRanges.length > 0 ||
    filters.minRating > 0 ||
    filters.searchQuery;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-[#6B5B5B] mb-2">
          Search
        </label>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
          placeholder="Search by name or location..."
          className="w-full px-4 py-2 border border-[#FFF9E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent bg-white"
        />
      </div>

      {/* Cuisine Type */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full text-left">
              <span className="text-sm font-medium text-[#6B5B5B]">Cuisine Type</span>
              <ChevronDownIcon className={`w-5 h-5 text-[#6B5B5B] transition-transform ${open ? 'rotate-180' : ''}`} />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-3">
              <div className="flex flex-wrap gap-2">
                {CUISINE_TYPES.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => handleCuisineToggle(cuisine)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      filters.cuisineTypes.includes(cuisine)
                        ? 'bg-[#FF6B6B] text-white'
                        : 'bg-[#FFF9E6] text-[#6B5B5B] hover:bg-[#FFEAA7]'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Price Range */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full text-left">
              <span className="text-sm font-medium text-[#6B5B5B]">Price Range</span>
              <ChevronDownIcon className={`w-5 h-5 text-[#6B5B5B] transition-transform ${open ? 'rotate-180' : ''}`} />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-3">
              <div className="flex gap-2">
                {PRICE_RANGES.map((price) => (
                  <button
                    key={price}
                    onClick={() => handlePriceToggle(price)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.priceRanges.includes(price)
                        ? 'bg-[#FF6B6B] text-white'
                        : 'bg-[#FFF9E6] text-[#6B5B5B] hover:bg-[#FFEAA7]'
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Min Rating */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full text-left">
              <span className="text-sm font-medium text-[#6B5B5B]">Minimum Rating</span>
              <ChevronDownIcon className={`w-5 h-5 text-[#6B5B5B] transition-transform ${open ? 'rotate-180' : ''}`} />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-3">
              <div className="flex gap-2">
                {[0, 3, 3.5, 4, 4.5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(rating)}
                    className={`flex-1 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.minRating === rating
                        ? 'bg-[#FF6B6B] text-white'
                        : 'bg-[#FFF9E6] text-[#6B5B5B] hover:bg-[#FFEAA7]'
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Results count & clear */}
      <div className="pt-4 border-t border-[#FFF9E6]">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#6B5B5B]">
            <span className="font-semibold">{resultsCount}</span> spots found
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#FF6B6B] hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-[#FFF9E6] p-6 overflow-y-auto">
        <h2 className="font-heading text-xl font-semibold text-[#6B5B5B] mb-6">
          Filter Spots
        </h2>
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#FF6B6B] text-white p-4 rounded-full shadow-lg hover:bg-[#E07A5F] transition-colors"
      >
        <FunnelIcon className="w-6 h-6" />
        {hasActiveFilters && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E07A5F] rounded-full text-xs flex items-center justify-center">
            {filters.cuisineTypes.length + filters.priceRanges.length + (filters.minRating > 0 ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Mobile Slide-over */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="flex items-center justify-between px-6 py-4 border-b border-[#FFF9E6]">
                        <Dialog.Title className="font-heading text-xl font-semibold text-[#6B5B5B]">
                          Filter Spots
                        </Dialog.Title>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="p-2 rounded-lg text-[#6B5B5B] hover:bg-[#FFF9E6]"
                        >
                          <XMarkIcon className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="flex-1 px-6 py-6 overflow-y-auto">
                        <FilterContent />
                      </div>
                      <div className="px-6 py-4 border-t border-[#FFF9E6]">
                        <Button onClick={() => setIsOpen(false)} className="w-full">
                          Show {resultsCount} Results
                        </Button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
