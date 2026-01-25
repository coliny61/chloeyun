export interface EventCoverage {
  id: string;
  title: string;
  type: 'food-festival' | 'restaurant-opening' | 'pop-up' | 'private-event' | 'networking';
  description: string;
  date: string;
  dateValue: Date;
  location: string;
  venue?: string;
  image: string;
  highlights: string[];
  attendees?: string;
  organizer?: string;
  tags: string[];
  coverage: {
    photos: number;
    videos: number;
    stories: number;
  };
  featured?: boolean;
}

// TO ADD NEW EVENTS: Simply add new objects to this array
export const eventsCovered: EventCoverage[] = [
  {
    id: 'taste-of-dallas-2024',
    title: 'Taste of Dallas Food Festival',
    type: 'food-festival',
    description: 'The biggest food festival in Dallas featuring over 50 local restaurants and food vendors. Covered the entire event with a focus on must-try dishes and new vendors.',
    date: 'March 2024',
    dateValue: new Date('2024-03-15'),
    location: 'Fair Park, Dallas',
    venue: 'Fair Park',
    image: 'https://images.unsplash.com/photo-1687871433787-850099cc316f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWwlMjBkYWxsYXMlMjBvdXRkb29yfGVufDF8fHx8MTc1ODIxNTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: ['50+ Food Vendors', 'Live Music', 'New Restaurant Debuts', 'Chef Demonstrations'],
    attendees: '25,000+',
    organizer: 'Dallas Events',
    tags: ['FoodFestival', 'TasteOfDallas', 'FairPark', 'Community'],
    coverage: {
      photos: 45,
      videos: 8,
      stories: 15
    },
    featured: true
  },
  {
    id: 'deep-ellum-restaurant-week',
    title: 'Deep Ellum Restaurant Week',
    type: 'food-festival',
    description: 'A week-long celebration of Deep Ellum\'s diverse dining scene with special menus and exclusive dishes from local restaurants.',
    date: 'February 2024',
    dateValue: new Date('2024-02-20'),
    location: 'Deep Ellum, Dallas',
    image: 'https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMG5ldHdvcmtpbmclMjBzb2NpYWwlMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzU3NTYyNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: ['12 Participating Restaurants', 'Exclusive Menu Items', 'Chef Meet & Greets'],
    tags: ['RestaurantWeek', 'DeepEllum', 'SpecialMenus'],
    coverage: {
      photos: 30,
      videos: 5,
      stories: 12
    }
  },
  {
    id: 'jade-johns-grand-opening',
    title: 'Jade & John\'s Grand Opening',
    type: 'restaurant-opening',
    description: 'Exclusive coverage of the grand opening of Dallas\'s newest Vietnamese restaurant, featuring traditional dishes and modern atmosphere.',
    date: 'January 2024',
    dateValue: new Date('2024-01-25'),
    location: 'Deep Ellum, Dallas',
    venue: 'Jade & John\'s Asian Kitchen',
    image: 'https://images.unsplash.com/photo-1631030576925-18b2ca443738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMGZvb2QlMjBhZXN0aWN8ZW58MXx8fHwxNzU4MjE1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: ['First 100 Customers Free Pho', 'Chef Interview', 'Kitchen Tour', 'Signature Dishes Tasting'],
    organizer: 'Jade & John\'s Asian Kitchen',
    tags: ['GrandOpening', 'Vietnamese', 'DeepEllum', 'NewRestaurant'],
    coverage: {
      photos: 25,
      videos: 4,
      stories: 8
    }
  },
  {
    id: 'bishop-arts-coffee-crawl',
    title: 'Bishop Arts Coffee Crawl',
    type: 'pop-up',
    description: 'A community-organized coffee crawl through Bishop Arts District, visiting 6 different coffee shops in one afternoon.',
    date: 'March 2024',
    dateValue: new Date('2024-03-08'),
    location: 'Bishop Arts District, Dallas',
    image: 'https://images.unsplash.com/photo-1683965274732-664bc41cf49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYWVzdGhldGljJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NTgyMTU1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: ['6 Coffee Shops', 'Specialty Drinks', 'Local Community', 'Coffee Education'],
    attendees: '50+',
    tags: ['CoffeeCrawl', 'BishopArts', 'Community', 'LocalBusiness'],
    coverage: {
      photos: 35,
      videos: 6,
      stories: 10
    }
  },
  {
    id: 'dallas-food-blogger-meetup',
    title: 'Dallas Food Bloggers Networking Meetup',
    type: 'networking',
    description: 'Monthly networking event for Dallas food content creators, bloggers, and influencers to share tips and collaborate on projects.',
    date: 'February 2024',
    dateValue: new Date('2024-02-15'),
    location: 'Uptown Dallas',
    venue: 'The Commons at Klyde Warren Park',
    image: 'https://images.unsplash.com/photo-1569239377517-849211b43233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYWxsYXMlMjBza3lsaW5lJTIwY2l0eSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NTgyMTU1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: ['30+ Content Creators', 'Collaboration Opportunities', 'Industry Tips', 'Community Building'],
    attendees: '30+',
    organizer: 'Dallas Food Bloggers Network',
    tags: ['Networking', 'ContentCreators', 'FoodBloggers', 'Community'],
    coverage: {
      photos: 20,
      videos: 3,
      stories: 6
    }
  }
];

// TEMPLATE FOR ADDING NEW EVENTS:
/*
{
  id: 'unique-event-id', // Use lowercase with hyphens
  title: 'Event Name',
  type: 'food-festival' or 'restaurant-opening' or 'pop-up' or 'private-event' or 'networking',
  description: 'Detailed description of the event and your coverage...',
  date: 'Month YYYY',
  dateValue: new Date('YYYY-MM-DD'),
  location: 'Area, Dallas',
  venue: 'Specific Venue Name', // Optional
  image: 'https://your-image-url.com/image.jpg', // Use Unsplash or your own photos
  highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
  attendees: 'XXX+', // Optional
  organizer: 'Event Organizer Name', // Optional
  tags: ['Tag1', 'Tag2', 'Tag3'], // For filtering and search
  coverage: {
    photos: NUMBER_OF_PHOTOS,
    videos: NUMBER_OF_VIDEOS,
    stories: NUMBER_OF_STORIES
  },
  featured: true // Optional - set to true for homepage highlight
}
*/