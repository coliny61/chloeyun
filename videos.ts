export interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  platform: 'tiktok' | 'instagram';
  category: 'food' | 'lifestyle' | 'events';
  views?: string;
  likes?: string;
  datePosted: string;
  location?: string;
  tags: string[];
  associatedBlog?: {
    title: string;
    preview: string;
    readTime: string;
  };
}

// TO ADD NEW VIDEOS: Simply add new objects to this array
export const featuredVideos: VideoContent[] = [
  {
    id: 'jade-johns-review',
    title: 'Jade & John\'s Vietnamese Kitchen Review',
    description: 'Trying the most authentic Vietnamese pho in Deep Ellum! This place has been on my list forever.',
    thumbnail: 'https://images.unsplash.com/photo-1631030576925-18b2ca443738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMGZvb2QlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzU4MjE1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'tiktok',
    category: 'food',
    views: '75.2K',
    likes: '3.1K',
    datePosted: 'March 15, 2024',
    location: 'Deep Ellum, Dallas',
    tags: ['Vietnamese', 'Pho', 'DeepEllum', 'FoodReview'],
    associatedBlog: {
      title: 'Why Jade & John\'s Has The Best Pho in Dallas',
      preview: 'After trying over 20 Vietnamese restaurants in Dallas, I finally found the perfect bowl of pho. Here\'s why Jade & John\'s stands out...',
      readTime: '3 min read'
    }
  },
  {
    id: 'matcha-latte-aesthetic',
    title: 'The Most Aesthetic Matcha Latte in Dallas',
    description: 'Found this hidden gem in Bishop Arts District! The matcha here is ceremonial grade and the vibes are immaculate.',
    thumbnail: 'https://images.unsplash.com/photo-1595574293319-d82aece466bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGNvZmZlZSUyMHNob3B8ZW58MXx8fHwxNzU4MjAyOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'instagram',
    category: 'lifestyle',
    views: '42.8K',
    likes: '2.9K',
    datePosted: 'March 10, 2024',
    location: 'Bishop Arts District',
    tags: ['Matcha', 'Coffee', 'Aesthetic', 'BishopArts'],
    associatedBlog: {
      title: 'Dallas Coffee Shop Guide: Where to Find the Best Matcha',
      preview: 'As a matcha enthusiast, I\'ve tried every coffee shop in Dallas. Here are my top 5 spots for the perfect matcha latte...',
      readTime: '5 min read'
    }
  },
  {
    id: 'brunch-society-weekend',
    title: 'Weekend Brunch Vibes at Brunch Society',
    description: 'The most Instagrammable avocado toast in Uptown! Plus bottomless mimosas because it\'s Saturday.',
    thumbnail: 'https://images.unsplash.com/photo-1719520670204-dbe1903a789f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBhdm9jYWRvJTIwdG9hc3QlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzU4MjE1NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'tiktok',
    category: 'food',
    views: '98.5K',
    likes: '4.2K',
    datePosted: 'March 8, 2024',
    location: 'Uptown Dallas',
    tags: ['Brunch', 'AvocadoToast', 'Mimosas', 'Weekend'],
    associatedBlog: {
      title: 'Ultimate Dallas Brunch Guide: 10 Spots You Need to Try',
      preview: 'Brunch is a lifestyle in Dallas, and I\'ve found the best spots for every occasion. From trendy avocado toast to classic eggs benedict...',
      readTime: '7 min read'
    }
  },
  {
    id: 'food-festival-coverage',
    title: 'Taste of Dallas Food Festival Highlights',
    description: 'Covering the biggest food festival in Dallas! So many amazing vendors and new dishes to try.',
    thumbnail: 'https://images.unsplash.com/photo-1687871433787-850099cc316f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWwlMjBkYWxsYXMlMjBvdXRkb29yfGVufDF8fHx8MTc1ODIxNTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'instagram',
    category: 'events',
    views: '156.3K',
    likes: '7.8K',
    datePosted: 'March 5, 2024',
    location: 'Fair Park, Dallas',
    tags: ['FoodFestival', 'TasteOfDallas', 'Events', 'FoodVendors']
  },
  {
    id: 'dallas-lifestyle',
    title: 'Day in My Life: Dallas Content Creator',
    description: 'Take a peek into my daily routine as a content creator in Dallas! From morning coffee to evening editing.',
    thumbnail: 'https://images.unsplash.com/photo-1569239377517-849211b43233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYWxsYXMlMjBza3lsaW5lJTIwY2l0eSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NTgyMTU1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'tiktok',
    category: 'lifestyle',
    views: '203.7K',
    likes: '12.5K',
    datePosted: 'March 1, 2024',
    location: 'Dallas, Texas',
    tags: ['DayInMyLife', 'ContentCreator', 'Dallas', 'Behind'],
    associatedBlog: {
      title: 'What It\'s Really Like Being a Content Creator in Dallas',
      preview: 'Everyone asks me about the reality of being a full-time content creator. Here\'s the honest truth about the ups and downs...',
      readTime: '6 min read'
    }
  }
];

// TEMPLATE FOR ADDING NEW VIDEOS:
/*
{
  id: 'unique-video-id',
  title: 'Your Video Title',
  description: 'Brief description of the video content',
  thumbnail: 'https://your-image-url.com/image.jpg', // Use Unsplash or your own images
  platform: 'tiktok' or 'instagram',
  category: 'food' or 'lifestyle' or 'events',
  views: '50.2K', // Optional
  likes: '2.1K', // Optional
  datePosted: 'Month DD, YYYY',
  location: 'Location Name', // Optional
  tags: ['Tag1', 'Tag2', 'Tag3'], // For filtering and search
  associatedBlog: { // Optional - only if you have a related blog post
    title: 'Blog Post Title',
    preview: 'Brief preview of the blog content...',
    readTime: 'X min read'
  }
}
*/