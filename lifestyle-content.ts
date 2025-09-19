export interface LifestyleContent {
  id: string;
  title: string;
  category: 'day-in-life' | 'fashion' | 'beauty' | 'travel' | 'home' | 'fitness' | 'behind-scenes';
  description: string;
  image: string;
  date: string;
  dateValue: Date;
  tags: string[];
  location?: string;
  featured?: boolean;
  associatedVideo?: {
    platform: 'tiktok' | 'instagram';
    views?: string;
    likes?: string;
  };
}

// TO ADD NEW LIFESTYLE CONTENT: Simply add new objects to this array
export const lifestyleContent: LifestyleContent[] = [
  {
    id: 'dallas-content-creator-day',
    title: 'Day in My Life: Dallas Content Creator',
    category: 'day-in-life',
    description: 'Take a peek into my daily routine as a content creator in Dallas! From morning coffee runs to evening editing sessions, plus my favorite spots around the city.',
    image: 'https://images.unsplash.com/photo-1569239377517-849211b43233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYWxsYXMlMjBza3lsaW5lJTIwY2l0eSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NTgyMTU1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'March 2024',
    dateValue: new Date('2024-03-01'),
    tags: ['DayInMyLife', 'ContentCreator', 'Dallas', 'Routine'],
    location: 'Dallas, Texas',
    featured: true,
    associatedVideo: {
      platform: 'tiktok',
      views: '203.7K',
      likes: '12.5K'
    }
  },
  {
    id: 'morning-coffee-routine',
    title: 'My Perfect Morning Coffee Routine',
    category: 'day-in-life',
    description: 'How I start every morning with the perfect cup of coffee. Featuring my favorite Dallas coffee shops and my at-home brewing setup.',
    image: 'https://images.unsplash.com/photo-1595574293319-d82aece466bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGNvZmZlZSUyMHNob3B8ZW58MXx8fHwxNzU4MjAyOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'February 2024',
    dateValue: new Date('2024-02-28'),
    tags: ['Coffee', 'MorningRoutine', 'Lifestyle', 'Self-Care'],
    location: 'Dallas, Texas',
    associatedVideo: {
      platform: 'instagram',
      views: '45.2K',
      likes: '3.1K'
    }
  },
  {
    id: 'content-creation-setup',
    title: 'Behind the Scenes: My Content Creation Setup',
    category: 'behind-scenes',
    description: 'Ever wondered how I create my content? Here\'s a look at my camera gear, editing setup, and favorite photography spots around Dallas.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBzZXR1cCUyMGNvbnRlbnQlMjBjcmVhdG9yfGVufDF8fHx8MTc1ODIxNjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'February 2024',
    dateValue: new Date('2024-02-20'),
    tags: ['BehindTheScenes', 'ContentCreation', 'Photography', 'Equipment'],
    location: 'Dallas, Texas',
    featured: true
  },
  {
    id: 'dallas-spring-fashion',
    title: 'Dallas Spring Fashion: What I\'m Wearing This Season',
    category: 'fashion',
    description: 'Spring fashion trends that work perfectly for Dallas weather. Featuring lightweight pieces, versatile accessories, and my favorite local boutiques.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmYXNoaW9uJTIwb3V0Zml0fGVufDF8fHx8MTc1ODIxNjI1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'March 2024',
    dateValue: new Date('2024-03-05'),
    tags: ['SpringFashion', 'Dallas', 'Style', 'LocalBoutiques'],
    location: 'Bishop Arts District, Dallas'
  },
  {
    id: 'weekend-skincare-routine',
    title: 'My Weekend Self-Care Skincare Routine',
    category: 'beauty',
    description: 'How I unwind on weekends with a relaxing skincare routine. Featuring my favorite products and tips for healthy, glowing skin.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHJvdXRpbmUlMjBzZWxmJTIwY2FyZXxlbnwxfHx8fDE3NTgyMTYyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'February 2024',
    dateValue: new Date('2024-02-25'),
    tags: ['Skincare', 'SelfCare', 'Weekend', 'Beauty'],
    associatedVideo: {
      platform: 'instagram',
      views: '38.5K',
      likes: '2.8K'
    }
  },
  {
    id: 'klyde-warren-park-workout',
    title: 'Outdoor Workout at Klyde Warren Park',
    category: 'fitness',
    description: 'My favorite outdoor workout routine in the heart of Dallas. Klyde Warren Park offers the perfect backdrop for staying active in the city.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd29ya291dCUyMHBhcmt8ZW58MXx8fHwxNzU4MjE2MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'March 2024',
    dateValue: new Date('2024-03-10'),
    tags: ['Fitness', 'OutdoorWorkout', 'KlydeWarrenPark', 'Dallas'],
    location: 'Klyde Warren Park, Dallas'
  },
  {
    id: 'apartment-spring-refresh',
    title: 'Spring Apartment Refresh: Dallas Living',
    category: 'home',
    description: 'Refreshing my Dallas apartment for spring with new plants, decor, and organization tips. Creating a space that inspires creativity and productivity.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBkZWNvciUyMHNwcmluZ3xlbnwxfHx8fDE3NTgyMTYyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'March 2024',
    dateValue: new Date('2024-03-12'),
    tags: ['HomeDecor', 'Spring', 'ApartmentLiving', 'Dallas'],
    location: 'Dallas, Texas'
  },
  {
    id: 'ft-worth-day-trip',
    title: 'Day Trip to Fort Worth: Exploring the Cultural District',
    category: 'travel',
    description: 'A perfect day trip from Dallas to Fort Worth\'s Cultural District. Museums, local eats, and hidden gems just 30 minutes away.',
    image: 'https://images.unsplash.com/photo-1464822759844-d150baec93d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcmNoaXRlY3R1cmUlMjBjdWx0dXJhbHxlbnwxfHx8fDE3NTgyMTYyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'February 2024',
    dateValue: new Date('2024-02-18'),
    tags: ['Travel', 'FortWorth', 'DayTrip', 'Museums'],
    location: 'Fort Worth, Texas'
  }
];

// TEMPLATE FOR ADDING NEW LIFESTYLE CONTENT:
/*
{
  id: 'unique-content-id', // Use lowercase with hyphens
  title: 'Content Title',
  category: 'day-in-life' or 'fashion' or 'beauty' or 'travel' or 'home' or 'fitness' or 'behind-scenes',
  description: 'Detailed description of the lifestyle content...',
  image: 'https://your-image-url.com/image.jpg', // Use Unsplash or your own photos
  date: 'Month YYYY',
  dateValue: new Date('YYYY-MM-DD'),
  tags: ['Tag1', 'Tag2', 'Tag3'], // For filtering and search
  location: 'Location Name', // Optional
  featured: true, // Optional - set to true for homepage highlight
  associatedVideo: { // Optional - only if there's a related video
    platform: 'tiktok' or 'instagram',
    views: 'XXK', // Optional
    likes: 'XXK' // Optional
  }
}
*/