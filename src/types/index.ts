export type LocationTag = 'DFW' | 'Trip';

export interface Place {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  cuisineType: CuisineType;
  priceRange: PriceRange;
  rating: number;
  coverImage: string;
  images?: string[];
  tikTokUrl?: string;
  instagramUrl?: string;
  reviewContent: string;
  featured: boolean;
  published: boolean;
  hours?: string;
  phone?: string;
  website?: string;
  createdAt?: string;
  location?: LocationTag;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  tikTokUrl?: string;
  instagramUrl?: string;
  date: string;
  thumbnail?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  tikTokUrl?: string;
  instagramUrl?: string;
  date: string;
  thumbnail?: string;
}

export interface TravelPost {
  id: string;
  title: string;
  location: string;
  description?: string;
  tikTokUrl?: string;
  instagramUrl?: string;
  date: string;
  thumbnail?: string;
}

export interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
  tikTokUrl?: string;
  instagramUrl?: string;
  rating: number;
  priceRange: PriceRange;
  coverImage: string;
  featured?: boolean;
  hours?: string;
  phone?: string;
  website?: string;
  location?: LocationTag;
}

export interface VlogPost {
  id: string;
  title: string;
  description?: string;
  tikTokUrl?: string;
  instagramUrl?: string;
  date: string;
  thumbnail?: string;
  city?: string;
}

export type CuisineType =
  | 'Korean'
  | 'Japanese'
  | 'Chinese'
  | 'Mexican'
  | 'Italian'
  | 'American'
  | 'Thai'
  | 'Vietnamese'
  | 'Indian'
  | 'Mediterranean'
  | 'French'
  | 'Fusion'
  | 'Dessert'
  | 'Cafe'
  | 'Coffee'
  | 'Bar'
  | 'Other';

// User-friendly filter categories that group related cuisines
export type FilterCategory =
  | 'Asian'
  | 'Latin'
  | 'European'
  | 'American'
  | 'Sweet Treats'
  | 'Coffee & Cafe'
  | 'Bars & Drinks'
  | 'Other';

// Mapping of filter categories to cuisine types
export const CATEGORY_TO_CUISINES: Record<FilterCategory, CuisineType[]> = {
  'Asian': ['Korean', 'Japanese', 'Chinese', 'Thai', 'Vietnamese', 'Indian'],
  'Latin': ['Mexican'],
  'European': ['Italian', 'French', 'Mediterranean'],
  'American': ['American'],
  'Sweet Treats': ['Dessert'],
  'Coffee & Cafe': ['Coffee', 'Cafe'],
  'Bars & Drinks': ['Bar'],
  'Other': ['Fusion', 'Other'],
};

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

// Asian sub-categories for drilling down
export type AsianCuisine = 'Korean' | 'Japanese' | 'Chinese' | 'Thai' | 'Vietnamese' | 'Indian';

export const ASIAN_CUISINES: { cuisine: AsianCuisine; label: string; icon: string }[] = [
  { cuisine: 'Korean', label: 'Korean', icon: '🇰🇷' },
  { cuisine: 'Japanese', label: 'Japanese', icon: '🇯🇵' },
  { cuisine: 'Chinese', label: 'Chinese', icon: '🇨🇳' },
  { cuisine: 'Thai', label: 'Thai', icon: '🇹🇭' },
  { cuisine: 'Vietnamese', label: 'Vietnamese', icon: '🇻🇳' },
  { cuisine: 'Indian', label: 'Indian', icon: '🇮🇳' },
];

export interface FilterState {
  categories: FilterCategory[];
  asianCuisines: AsianCuisine[]; // Sub-filter for Asian category
  priceRanges: PriceRange[];
  minRating: number;
  searchQuery: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  inquiryType: InquiryType;
  message: string;
}

export type InquiryType =
  | 'Brand Partnership'
  | 'Restaurant Feature'
  | 'Media Inquiry'
  | 'General Question'
  | 'Other';

export interface SocialStats {
  instagramFollowers: string;
  tikTokFollowers: string;
  tikTokLikes: string;
  viewsThisYear: string;
  totalReviews: number;
  citiesCovered: number;
}
