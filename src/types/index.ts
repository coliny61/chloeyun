// ============================================================
// Supabase row types — matches 001_initial_schema.sql
// Field names use snake_case to match Supabase columns.
// Legacy camelCase aliases are included for backward compatibility
// with existing components (will be removed in later phases).
// ============================================================

export interface Place {
  id: string;
  name: string;
  cuisine_type: string | null;
  filter_category: string | null;
  price_range: string | null;
  rating: number;
  review: string | null;
  tiktok_url: string | null;
  instagram_url: string | null;
  address: string;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  hours: Record<string, string> | string | null;
  website: string | null;
  cover_image_url: string | null;
  date_reviewed: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;

  // Legacy aliases — used by existing components, remove in later phases
  cuisineType: string;
  priceRange: string;
  coverImage: string;
  reviewContent: string;
  featured: boolean;
  published: boolean;
  tikTokUrl?: string;
  instagramUrl?: string;
  dateReviewed?: string;
  location?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string | null;
  event_date: string | null;
  tiktok_url: string | null;
  instagram_url: string | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;

  // Legacy aliases
  title: string;
  tikTokUrl?: string;
  instagramUrl?: string;
  date: string;
  thumbnail?: string;
}

export interface VlogPost {
  id: string;
  title: string;
  tiktok_url: string | null;
  instagram_url: string | null;
  city: string | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;

  // Legacy aliases
  tikTokUrl?: string;
  instagramUrl?: string;
  description?: string;
  date: string;
  thumbnail?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  inquiry_type: string | null;
  message: string;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string | null;
  updated_at: string;
}

export interface AboutPhoto {
  id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
}

// ============================================================
// Filter types — used by Food Spots page
// ============================================================

export type LocationTag = 'DFW' | 'Trip';

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

// Legacy filter category types — used by existing FilterSidebar
export type FilterCategory =
  | 'Asian'
  | 'Latin'
  | 'European'
  | 'American'
  | 'Sweet Treats'
  | 'Coffee & Cafe'
  | 'Bars & Drinks'
  | 'Other';

export type CuisineType = string;

export type AsianCuisine = 'Korean' | 'Japanese' | 'Chinese' | 'Thai' | 'Vietnamese' | 'Indian';

export const ASIAN_CUISINES: { cuisine: AsianCuisine; label: string; icon: string }[] = [
  { cuisine: 'Korean', label: 'Korean', icon: '🇰🇷' },
  { cuisine: 'Japanese', label: 'Japanese', icon: '🇯🇵' },
  { cuisine: 'Chinese', label: 'Chinese', icon: '🇨🇳' },
  { cuisine: 'Thai', label: 'Thai', icon: '🇹🇭' },
  { cuisine: 'Vietnamese', label: 'Vietnamese', icon: '🇻🇳' },
  { cuisine: 'Indian', label: 'Indian', icon: '🇮🇳' },
];

export const CATEGORY_TO_CUISINES: Record<FilterCategory, string[]> = {
  'Asian': ['Korean', 'Japanese', 'Chinese', 'Thai', 'Vietnamese', 'Indian'],
  'Latin': ['Mexican'],
  'European': ['Italian', 'French', 'Mediterranean'],
  'American': ['American'],
  'Sweet Treats': ['Dessert'],
  'Coffee & Cafe': ['Coffee', 'Cafe'],
  'Bars & Drinks': ['Bar'],
  'Other': ['Fusion', 'Other'],
};

export interface FilterState {
  categories: FilterCategory[];
  asianCuisines: AsianCuisine[];
  priceRanges: PriceRange[];
  minRating: number;
  searchQuery: string;
}

// ============================================================
// Contact form
// ============================================================

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  inquiryType: string;
  message: string;
}

export type InquiryType =
  | 'Brand Partnership'
  | 'Restaurant Feature'
  | 'Media Inquiry'
  | 'General Question'
  | 'Other';

// ============================================================
// Social stats (derived from site_settings)
// ============================================================

export interface SocialStats {
  instagramFollowers: string;
  tikTokFollowers: string;
  tikTokLikes: string;
  viewsThisYear: string;
  totalReviews: number;
  citiesCovered: number;
}
