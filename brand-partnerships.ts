export interface BrandPartnership {
  id: string;
  name: string;
  category: string;
  description?: string;
  logo?: string;
  websiteUrl?: string;
  collaborationType: 'ongoing' | 'campaign' | 'event' | 'review';
  startDate: string;
  endDate?: string;
  metrics?: {
    impressions?: string;
    engagement?: string;
    reach?: string;
  };
  deliverables?: string[];
  featured?: boolean;
}

// TO ADD NEW BRAND PARTNERSHIPS: Simply add new objects to this array
export const brandPartnerships: BrandPartnership[] = [
  {
    id: 'choctaw-casinos',
    name: 'Choctaw Casinos',
    category: 'Entertainment',
    description: 'Multi-platform campaign featuring dining experiences, event coverage, and lifestyle content. Generated significant engagement across TikTok and Instagram platforms.',
    collaborationType: 'campaign',
    startDate: 'February 2024',
    endDate: 'March 2024',
    metrics: {
      impressions: '75K+',
      engagement: '4.8%',
      reach: '50K+'
    },
    deliverables: ['Event Coverage', 'TikTok Content', 'Instagram Stories', 'Dining Reviews'],
    featured: true
  },
  {
    id: 'kyoto-coffee',
    name: 'Kyoto Coffee Co.',
    category: 'Coffee Shop',
    collaborationType: 'review',
    startDate: 'February 2024'
  },
  {
    id: 'jade-johns',
    name: 'Jade & John\'s',
    category: 'Vietnamese Restaurant',
    collaborationType: 'review',
    startDate: 'March 2024'
  },
  {
    id: 'sweet-tooth-bakery',
    name: 'Sweet Tooth Bakery',
    category: 'French Pastry',
    collaborationType: 'review',
    startDate: 'March 2024'
  },
  {
    id: 'brunch-society',
    name: 'Brunch Society',
    category: 'Modern American',
    collaborationType: 'ongoing',
    startDate: 'January 2024'
  },
  {
    id: 'taj-chaat-house',
    name: 'Taj Chaat House',
    category: 'Indian Street Food',
    collaborationType: 'review',
    startDate: 'April 2024'
  },
  {
    id: 'addison-roasters',
    name: 'Addison Roasters',
    category: 'Specialty Coffee',
    collaborationType: 'review',
    startDate: 'March 2024'
  },
  {
    id: 'nonna-tata',
    name: 'Nonna Tata',
    category: 'Italian Restaurant',
    collaborationType: 'review',
    startDate: 'February 2024'
  },
  {
    id: 'mixto-restaurant',
    name: 'Mixto Restaurant',
    category: 'Mexican Cuisine',
    collaborationType: 'review',
    startDate: 'January 2024'
  },
  {
    id: 'bishop-arts-coffee',
    name: 'Bishop Arts Coffee',
    category: 'Local Roastery',
    collaborationType: 'ongoing',
    startDate: 'January 2024'
  },
  {
    id: 'deep-ellum-dining',
    name: 'Deep Ellum Dining',
    category: 'Food District',
    collaborationType: 'event',
    startDate: 'March 2024'
  },
  {
    id: 'dallas-food-events',
    name: 'Dallas Food Events',
    category: 'Event Coverage',
    collaborationType: 'ongoing',
    startDate: 'January 2024'
  }
];

// TEMPLATE FOR ADDING NEW BRAND PARTNERSHIPS:
/*
{
  id: 'unique-brand-id', // Use lowercase with hyphens
  name: 'Brand Name',
  category: 'Category Type', // Restaurant, Coffee Shop, Entertainment, etc.
  description: 'Optional detailed description of the partnership...', // Only for featured partnerships
  logo: 'https://your-logo-url.com/logo.jpg', // Optional
  websiteUrl: 'https://brandwebsite.com', // Optional
  collaborationType: 'ongoing' or 'campaign' or 'event' or 'review',
  startDate: 'Month YYYY',
  endDate: 'Month YYYY', // Only if partnership has ended
  metrics: { // Optional - only for significant partnerships
    impressions: 'XXK+',
    engagement: 'X.X%',
    reach: 'XXK+'
  },
  deliverables: ['Deliverable 1', 'Deliverable 2'], // Optional
  featured: true // Optional - set to true for homepage carousel highlight
}
*/