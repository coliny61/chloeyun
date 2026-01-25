import { Fragment } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import type { FilterState, FilterCategory, PriceRange, AsianCuisine } from '../../types';
import { ASIAN_CUISINES } from '../../types';
import { FILTER_CATEGORIES, PRICE_RANGES } from '../../hooks/usePlaces';
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
  const handleCategoryToggle = (category: FilterCategory) => {
    setFilters(prev => {
      const isRemoving = prev.categories.includes(category);
      return {
        ...prev,
        categories: isRemoving
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category],
        // Clear Asian sub-filters if Asian category is being removed
        asianCuisines: category === 'Asian' && isRemoving ? [] : prev.asianCuisines,
      };
    });
  };

  const handleAsianCuisineToggle = (cuisine: AsianCuisine) => {
    setFilters(prev => ({
      ...prev,
      asianCuisines: prev.asianCuisines.includes(cuisine)
        ? prev.asianCuisines.filter(c => c !== cuisine)
        : [...prev.asianCuisines, cuisine],
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
      categories: [],
      asianCuisines: [],
      priceRanges: [],
      minRating: 0,
      searchQuery: '',
    });
  };

  const isAsianSelected = filters.categories.includes('Asian');

  const hasActiveFilters = filters.categories.length > 0 ||
    filters.asianCuisines.length > 0 ||
    filters.priceRanges.length > 0 ||
    filters.minRating > 0 ||
    filters.searchQuery;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
          Search
        </label>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
          placeholder="Search by name or location..."
          className="w-full px-4 py-2 border border-[#FFF5F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8A5B8] focus:border-transparent bg-white"
        />
      </div>

      {/* Category - Clean Grid Layout */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full text-left">
              <span className="text-sm font-medium text-[#4A4A4A]">What are you craving?</span>
              <ChevronDownIcon className={`w-5 h-5 text-[#4A4A4A] transition-transform ${open ? 'rotate-180' : ''}`} />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {FILTER_CATEGORIES.map(({ category, label, icon }) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      filters.categories.includes(category)
                        ? 'bg-[#F8A5B8] text-white shadow-md'
                        : 'bg-[#FFF5F7] text-[#4A4A4A] hover:bg-[#FDD5DD] hover:shadow-sm'
                    }`}
                  >
                    <span className="text-base">{icon}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Asian Sub-filters - shown when Asian is selected */}
              {isAsianSelected && (
                <div className="pl-2 border-l-2 border-[#F8A5B8]/30 space-y-2 animate-slide-up-fade">
                  <p className="text-xs font-medium text-[#4A4A4A]/70 uppercase tracking-wide">
                    Narrow down Asian
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ASIAN_CUISINES.map(({ cuisine, label, icon }) => (
                      <button
                        key={cuisine}
                        onClick={() => handleAsianCuisineToggle(cuisine)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          filters.asianCuisines.includes(cuisine)
                            ? 'bg-[#F8A5B8] text-white shadow-sm'
                            : 'bg-[#FFF5F7] text-[#4A4A4A] hover:bg-[#FDD5DD]'
                        }`}
                      >
                        <span>{icon}</span>
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                  {filters.asianCuisines.length > 0 && (
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, asianCuisines: [] }))}
                      className="text-xs text-[#F8A5B8] hover:underline"
                    >
                      Show all Asian
                    </button>
                  )}
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Price Range */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full text-left">
              <span className="text-sm font-medium text-[#4A4A4A]">Price Range</span>
              <ChevronDownIcon className={`w-5 h-5 text-[#4A4A4A] transition-transform ${open ? 'rotate-180' : ''}`} />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-3">
              <div className="flex gap-2">
                {PRICE_RANGES.map((price) => (
                  <button
                    key={price}
                    onClick={() => handlePriceToggle(price)}
                    className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      filters.priceRanges.includes(price)
                        ? 'bg-[#F8A5B8] text-white shadow-md'
                        : 'bg-[#FFF5F7] text-[#4A4A4A] hover:bg-[#FDD5DD]'
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
              <span className="text-sm font-medium text-[#4A4A4A]">Minimum Rating</span>
              <ChevronDownIcon className={`w-5 h-5 text-[#4A4A4A] transition-transform ${open ? 'rotate-180' : ''}`} />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-3">
              <div className="flex gap-2">
                {[0, 3, 3.5, 4, 4.5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(rating)}
                    className={`flex-1 px-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      filters.minRating === rating
                        ? 'bg-[#F8A5B8] text-white shadow-md'
                        : 'bg-[#FFF5F7] text-[#4A4A4A] hover:bg-[#FDD5DD]'
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
      <div className="pt-4 border-t border-[#FFF5F7]">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#4A4A4A]">
            <span className="font-semibold">{resultsCount}</span> spots found
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#F8A5B8] hover:underline font-medium"
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
      <div className="hidden lg:block w-80 bg-white border-r border-[#FFF5F7] p-6 overflow-y-auto">
        <h2 className="font-heading text-xl font-semibold text-[#4A4A4A] mb-6">
          Find Your Spot
        </h2>
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#F8A5B8] text-white p-4 rounded-full shadow-lg hover:bg-[#E8899C] transition-colors"
      >
        <FunnelIcon className="w-6 h-6" />
        {hasActiveFilters && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E8899C] rounded-full text-xs flex items-center justify-center">
            {filters.categories.length + filters.asianCuisines.length + filters.priceRanges.length + (filters.minRating > 0 ? 1 : 0)}
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
                      <div className="flex items-center justify-between px-6 py-4 border-b border-[#FFF5F7]">
                        <Dialog.Title className="font-heading text-xl font-semibold text-[#4A4A4A]">
                          Find Your Spot
                        </Dialog.Title>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="p-2 rounded-lg text-[#4A4A4A] hover:bg-[#FFF5F7]"
                        >
                          <XMarkIcon className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="flex-1 px-6 py-6 overflow-y-auto">
                        <FilterContent />
                      </div>
                      <div className="px-6 py-4 border-t border-[#FFF5F7]">
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
