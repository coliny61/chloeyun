export interface FoodReview {
  id: number;
  title: string;
  category: 'restaurants' | 'coffee' | 'desserts' | 'brunch';
  rating: number;
  price: '$' | '$$' | '$$$' | '$$$$';
  priceValue: number;
  location: string;
  cuisine: string;
  description: string;
  image: string;
  tags: string[];
  dateVisited: string;
  dateValue: Date;
  highlights: string[];
  mustTry: string;
  dietaryOptions: string[];
}

// TO ADD NEW FOOD REVIEWS: Simply add new objects to this array
export const foodReviews: FoodReview[] = [
  {
    id: 1,
    title: "Jade & John's Asian Kitchen",
    category: 'restaurants',
    rating: 5,
    price: '$$',
    priceValue: 2,
    location: 'Deep Ellum, Dallas',
    cuisine: 'Vietnamese',
    description: 'Authentic Vietnamese flavors meet modern Dallas dining. Their pho is absolutely incredible and the atmosphere is perfect for content creation.',
    image: 'https://images.unsplash.com/photo-1631030576925-18b2ca443738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMGZvb2QlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzU4MjE1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Vietnamese', 'Authentic', 'Photogenic', 'Date Night'],
    dateVisited: 'March 2024',
    dateValue: new Date('2024-03-15'),
    highlights: ['Signature Pho', 'Aesthetic Interior', 'Great Service'],
    mustTry: 'Pho Tai with rare beef',
    dietaryOptions: ['Vegetarian Options', 'Gluten-Free Options']
  },
  {
    id: 2,
    title: 'Kyoto Coffee Co.',
    category: 'coffee',
    rating: 5,
    price: '$',
    priceValue: 1,
    location: 'Bishop Arts District',
    cuisine: 'Japanese',
    description: 'The most Instagram-worthy coffee shop in Dallas! Their matcha lattes are perfection and the minimalist design is pure aesthetic goals.',
    image: 'https://images.unsplash.com/photo-1595574293319-d82aece466bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGNvZmZlZSUyMHNob3B8ZW58MXx8fHwxNzU4MjAyOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Matcha', 'Aesthetic', 'Japanese', 'WiFi Friendly'],
    dateVisited: 'February 2024',
    dateValue: new Date('2024-02-20'),
    highlights: ['Signature Matcha Latte', 'Minimalist Design', 'Natural Light'],
    mustTry: 'Ceremonial grade matcha latte',
    dietaryOptions: ['Vegan Options', 'Dairy-Free']
  },
  {
    id: 3,
    title: 'Sweet Tooth Bakery',
    category: 'desserts',
    rating: 4,
    price: '$$',
    priceValue: 2,
    location: 'Lower Greenville',
    cuisine: 'French',
    description: 'Artisan pastries that taste as good as they look. Their seasonal fruit tarts are absolutely divine and perfect for flat lay photography.',
    image: 'https://images.unsplash.com/photo-1634118520179-0c78b72df69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnklMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTgyMTU1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Artisan', 'Seasonal', 'Pastries', 'French'],
    dateVisited: 'March 2024',
    dateValue: new Date('2024-03-10'),
    highlights: ['Seasonal Tarts', 'Beautiful Presentation', 'Fresh Ingredients'],
    mustTry: 'Strawberry mille-feuille',
    dietaryOptions: ['Gluten-Free Options']
  },
  {
    id: 4,
    title: 'Brunch Society',
    category: 'brunch',
    rating: 5,
    price: '$$$',
    priceValue: 3,
    location: 'Uptown Dallas',
    cuisine: 'American',
    description: 'The ultimate brunch destination with the most photogenic avocado toast and bottomless mimosas. Weekend vibes at their finest!',
    image: 'https://images.unsplash.com/photo-1719520670204-dbe1903a789f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBhdm9jYWRvJTIwdG9hc3QlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzU4MjE1NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Brunch', 'Avocado Toast', 'Mimosas', 'Weekend'],
    dateVisited: 'January 2024',
    dateValue: new Date('2024-01-28'),
    highlights: ['Avocado Toast', 'Bottomless Mimosas', 'Weekend Vibes'],
    mustTry: 'Truffle avocado toast with poached egg',
    dietaryOptions: ['Vegetarian Options', 'Vegan Options']
  },
  {
    id: 5,
    title: 'Taj Chaat House',
    category: 'restaurants',
    rating: 5,
    price: '$$',
    priceValue: 2,
    location: 'Richardson, Dallas',
    cuisine: 'Indian',
    description: 'Incredible Indian street food with the most flavorful dal makhani in Dallas. Their chole bhature is a must-try for any food lover!',
    image: 'https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByZXN0YXVyYW50JTIwZGFsJTIwbWFraGFuaXxlbnwxfHx8fDE3NTgyMTU1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Indian', 'Street Food', 'Authentic', 'Family-Owned'],
    dateVisited: 'April 2024',
    dateValue: new Date('2024-04-05'),
    highlights: ['Dal Makhani', 'Chole Bhature', 'Family Recipes'],
    mustTry: 'Dal makhani with garlic naan',
    dietaryOptions: ['Vegetarian Options', 'Vegan Options']
  },
  {
    id: 6,
    title: 'Addison Coffee Roasters',
    category: 'coffee',
    rating: 4,
    price: '$$',
    priceValue: 2,
    location: 'Addison, Dallas',
    cuisine: 'American',
    description: 'Local roastery with amazing single-origin coffees. Their cortado is perfection and the space has great natural lighting for photos.',
    image: 'https://images.unsplash.com/photo-1683965274732-664bc41cf49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYWVzdGhldGljJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NTgyMTU1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Single Origin', 'Local Roastery', 'Cortado', 'Study Spot'],
    dateVisited: 'March 2024',
    dateValue: new Date('2024-03-08'),
    highlights: ['Ethiopian Beans', 'Pour Over', 'Minimalist Space'],
    mustTry: 'Ethiopian single-origin pour over',
    dietaryOptions: ['Dairy-Free', 'Vegan Options']
  },
  {
    id: 7,
    title: 'Nonna Tata',
    category: 'restaurants',
    rating: 4,
    price: '$$$',
    priceValue: 3,
    location: 'Deep Ellum, Dallas',
    cuisine: 'Italian',
    description: 'Authentic Italian flavors in the heart of Deep Ellum. Their handmade pasta is incredible and the tiramisu is to die for.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc1ODIxNTgxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Italian', 'Handmade Pasta', 'Romantic', 'Date Night'],
    dateVisited: 'February 2024',
    dateValue: new Date('2024-02-14'),
    highlights: ['Handmade Pasta', 'Tiramisu', 'Wine Selection'],
    mustTry: 'Cacio e pepe with truffle',
    dietaryOptions: ['Vegetarian Options']
  },
  {
    id: 8,
    title: 'Mixto Restaurant',
    category: 'restaurants',
    rating: 5,
    price: '$$',
    priceValue: 2,
    location: 'Oak Cliff, Dallas',
    cuisine: 'Mexican',
    description: 'Elevated Mexican cuisine with a modern twist. Their mole is complex and rich, and the atmosphere is perfect for a special dinner.',
    image: 'https://images.unsplash.com/photo-1625938145312-e8915128e734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMG1vbGV8ZW58MXx8fHwxNzU4MjE1ODIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Mexican', 'Elevated', 'Mole', 'Cocktails'],
    dateVisited: 'January 2024',
    dateValue: new Date('2024-01-15'),
    highlights: ['Mole Negro', 'Craft Cocktails', 'Modern Atmosphere'],
    mustTry: 'Mole negro with duck',
    dietaryOptions: ['Vegetarian Options', 'Gluten-Free Options']
  }
];

// TEMPLATE FOR ADDING NEW FOOD REVIEWS:
/*
{
  id: NEXT_AVAILABLE_NUMBER,
  title: "Restaurant Name",
  category: 'restaurants' or 'coffee' or 'desserts' or 'brunch',
  rating: 1 to 5,
  price: '$' or '$$' or '$$$' or '$$$$',
  priceValue: 1 or 2 or 3 or 4, // Corresponds to price symbols
  location: 'Area, Dallas',
  cuisine: 'Cuisine Type', // Vietnamese, Italian, American, etc.
  description: 'Your detailed review and description...',
  image: 'https://your-image-url.com/image.jpg', // Use Unsplash or your own photos
  tags: ['Tag1', 'Tag2', 'Tag3'], // For filtering
  dateVisited: 'Month YYYY',
  dateValue: new Date('YYYY-MM-DD'),
  highlights: ['Feature 1', 'Feature 2', 'Feature 3'],
  mustTry: 'Specific dish recommendation',
  dietaryOptions: ['Vegetarian Options', 'Vegan Options', 'Gluten-Free Options', 'Dairy-Free'] // Optional
}
*/