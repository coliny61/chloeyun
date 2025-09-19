import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Clock, ExternalLink, Search, Utensils, Coffee, Cake, Hash, DollarSign, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import PageHeader from './PageHeader';
import { foodReviews } from '../data/food-reviews';

export default function FoodReviews() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { key: 'all', name: 'All', icon: Hash },
    { key: 'restaurants', name: 'Restaurants', icon: Utensils },
    { key: 'coffee', name: 'Coffee', icon: Coffee },
    { key: 'desserts', name: 'Desserts', icon: Cake },
    { key: 'brunch', name: 'Brunch', icon: Utensils }
  ];

  const cuisineTypes = [
    'All Cuisines', 'Vietnamese', 'Japanese', 'French', 'American', 'Indian', 
    'Italian', 'Mexican', 'Thai', 'Korean', 'Mediterranean', 'Chinese'
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '$', label: '$ - Under $15' },
    { value: '$$', label: '$$ - $15-30' },
    { value: '$$$', label: '$$$ - $30-50' },
    { value: '$$$$', label: '$$$$ - $50+' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating-high', label: 'Highest Rated' },
    { value: 'rating-low', label: 'Lowest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  // Use reviews from the centralized data file
  const reviews = foodReviews;

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      const matchesCategory = selectedCategory === 'all' || review.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRating = selectedRating === 'all' || review.rating >= parseInt(selectedRating);
      const matchesPrice = selectedPrice === 'all' || review.price === selectedPrice;
      const matchesCuisine = selectedCuisine === 'all' || selectedCuisine === 'All Cuisines' || review.cuisine === selectedCuisine;
      
      return matchesCategory && matchesSearch && matchesRating && matchesPrice && matchesCuisine;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.dateValue.getTime() - a.dateValue.getTime();
        case 'oldest':
          return a.dateValue.getTime() - b.dateValue.getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'price-low':
          return a.priceValue - b.priceValue;
        case 'price-high':
          return b.priceValue - a.priceValue;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, selectedRating, selectedPrice, selectedCuisine, sortBy]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedRating('all');
    setSelectedPrice('all');
    setSelectedCuisine('all');
    setSortBy('newest');
  };

  const activeFilterCount = [
    selectedCategory !== 'all',
    searchTerm !== '',
    selectedRating !== 'all',
    selectedPrice !== 'all',
    selectedCuisine !== 'all' && selectedCuisine !== 'All Cuisines',
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Food Reviews" 
        subtitle="Discovering Dallas's best dining experiences, one bite at a time"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search restaurants, cuisines, locations, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-xl border-gray-200 focus:border-[#FADADD] focus:ring-[#FADADD]/20 bg-gray-50"
            />
          </div>

          {/* Quick Category Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm text-gray-600 mr-2">Categories:</span>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  variant="ghost"
                  size="sm"
                  className={`transition-all duration-300 rounded-full px-4 py-2 ${
                    selectedCategory === category.key
                      ? 'bg-[#FADADD] hover:bg-[#f9c5c9] text-black'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#FADADD] hover:text-black hover:bg-[#FADADD]/10'
                  }`}
                >
                  <IconComponent size={14} className="mr-1.5" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-600 hover:text-black"
            >
              <SlidersHorizontal size={16} />
              <span>Advanced Filters</span>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="bg-[#FADADD] text-black">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            {activeFilterCount > 0 && (
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-500 hover:text-black"
              >
                <X size={14} />
                <span>Clear All</span>
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200"
            >
              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Rating</label>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars Only</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cuisine Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Cuisine Type</label>
                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Cuisines" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineTypes.map((cuisine) => (
                      <SelectItem key={cuisine} value={cuisine}>
                        {cuisine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Newest First" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredAndSortedReviews.length} of {reviews.length} reviews
              </p>
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="bg-[#FADADD]/20 text-gray-700">
                      {categories.find(c => c.key === selectedCategory)?.name}
                    </Badge>
                  )}
                  {selectedRating !== 'all' && (
                    <Badge variant="secondary" className="bg-[#FADADD]/20 text-gray-700">
                      {selectedRating}+ Stars
                    </Badge>
                  )}
                  {selectedPrice !== 'all' && (
                    <Badge variant="secondary" className="bg-[#FADADD]/20 text-gray-700">
                      {selectedPrice}
                    </Badge>
                  )}
                  {selectedCuisine !== 'all' && selectedCuisine !== 'All Cuisines' && (
                    <Badge variant="secondary" className="bg-[#FADADD]/20 text-gray-700">
                      {selectedCuisine}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredAndSortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={review.image}
                  alt={review.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs ml-1 font-medium">{review.rating}.0</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center">
                    <DollarSign size={10} className="mr-0.5" />
                    {review.price}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-black group-hover:text-[#FADADD] transition-colors mb-1">
                      {review.title}
                    </h3>
                    <p className="text-sm text-gray-500">{review.cuisine} • {review.category}</p>
                  </div>
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-[#FADADD] transition-colors mt-1 flex-shrink-0" />
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin size={14} className="mr-1 flex-shrink-0" />
                  <span className="truncate">{review.location}</span>
                  <span className="mx-2">•</span>
                  <Clock size={14} className="mr-1 flex-shrink-0" />
                  <span>{review.dateVisited}</span>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  {review.description}
                </p>

                {/* Must Try */}
                <div className="mb-4 p-3 bg-[#FADADD]/10 rounded-lg border-l-3 border-[#FADADD]">
                  <p className="text-xs text-gray-600 mb-1">Must Try:</p>
                  <p className="text-sm font-medium text-gray-800">{review.mustTry}</p>
                </div>

                {/* Dietary Options */}
                {review.dietaryOptions && review.dietaryOptions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-2">Dietary Options:</p>
                    <div className="flex flex-wrap gap-1">
                      {review.dietaryOptions.map((option, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {review.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-[#FADADD]/20 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                  {review.tags.length > 4 && (
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                      +{review.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Highlights:</h4>
                  <ul className="space-y-1">
                    {review.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-[#FADADD] rounded-full mr-2 flex-shrink-0"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedReviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={clearAllFilters}
              className="bg-[#FADADD] hover:bg-[#f9c5c9] text-black px-6 py-2 rounded-full"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 p-8 bg-gradient-to-br from-[#FADADD]/20 to-[#FADADD]/5 rounded-3xl border border-[#FADADD]/20"
        >
          <div className="w-12 h-12 mx-auto mb-4 bg-[#FADADD]/30 rounded-full flex items-center justify-center">
            <Utensils size={20} className="text-[#FADADD]" />
          </div>
          <h3 className="text-xl font-medium text-black mb-3">
            Want me to review your restaurant?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I'm always looking for new Dallas dining experiences to share with my community. 
            Let's collaborate to showcase your culinary creations!
          </p>
          <Button className="bg-[#FADADD] hover:bg-[#f9c5c9] text-black px-8 py-3 rounded-full transition-all hover:scale-105">
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </div>
  );
}