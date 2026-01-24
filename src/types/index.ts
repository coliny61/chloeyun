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
  | 'Other';

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export interface FilterState {
  cuisineTypes: CuisineType[];
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
  totalReviews: number;
  citiesCovered: number;
}
