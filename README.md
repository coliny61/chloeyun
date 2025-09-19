# Content Management Guide for Chloe Yun Portfolio

This guide explains how to easily add and update your content without touching any code. All your content is stored in separate data files that you can edit.

## 📁 File Structure

- `/data/social-media.ts` - Your social media links and handles
- `/data/videos.ts` - Featured videos for the homepage
- `/data/food-reviews.ts` - All your restaurant and food reviews
- `/data/brand-partnerships.ts` - Your brand collaboration history
- `/data/events.ts` - Events you've covered
- `/data/lifestyle-content.ts` - Your lifestyle and behind-the-scenes content

## 🎬 Adding New Videos (`/data/videos.ts`)

When you create a new video, simply add a new entry to the `featuredVideos` array:

```javascript
{
  id: 'unique-video-id',
  title: 'Your Video Title',
  description: 'Brief description of the video content',
  thumbnail: 'https://your-image-url.com/image.jpg',
  platform: 'tiktok' or 'instagram',
  category: 'food' or 'lifestyle' or 'events',
  views: '50.2K',
  likes: '2.1K',
  datePosted: 'Month DD, YYYY',
  location: 'Location Name',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  associatedBlog: { // Optional
    title: 'Blog Post Title',
    preview: 'Brief preview...',
    readTime: 'X min read'
  }
}
```

## 🍴 Adding New Food Reviews (`/data/food-reviews.ts`)

To add a new restaurant review:

```javascript
{
  id: NEXT_AVAILABLE_NUMBER,
  title: "Restaurant Name",
  category: 'restaurants' or 'coffee' or 'desserts' or 'brunch',
  rating: 1 to 5,
  price: '$' or '$$' or '$$$' or '$$$$',
  priceValue: 1 or 2 or 3 or 4,
  location: 'Area, Dallas',
  cuisine: 'Vietnamese', // Vietnamese, Italian, American, etc.
  description: 'Your detailed review...',
  image: 'https://your-image-url.com/image.jpg',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  dateVisited: 'Month YYYY',
  dateValue: new Date('YYYY-MM-DD'),
  highlights: ['Feature 1', 'Feature 2', 'Feature 3'],
  mustTry: 'Specific dish recommendation',
  dietaryOptions: ['Vegetarian Options', 'Vegan Options'] // Optional
}
```

## 🤝 Adding New Brand Partnerships (`/data/brand-partnerships.ts`)

When you start a new collaboration:

```javascript
{
  id: 'unique-brand-id',
  name: 'Brand Name',
  category: 'Category Type',
  collaborationType: 'ongoing' or 'campaign' or 'event' or 'review',
  startDate: 'Month YYYY',
  endDate: 'Month YYYY', // Only if partnership has ended
  featured: true // Set to true for homepage carousel highlight
}
```

## 🎉 Adding New Events (`/data/events.ts`)

After covering an event:

```javascript
{
  id: 'unique-event-id',
  title: 'Event Name',
  type: 'food-festival' or 'restaurant-opening' or 'pop-up' or 'private-event' or 'networking',
  description: 'Detailed description...',
  date: 'Month YYYY',
  dateValue: new Date('YYYY-MM-DD'),
  location: 'Area, Dallas',
  image: 'https://your-image-url.com/image.jpg',
  highlights: ['Highlight 1', 'Highlight 2'],
  tags: ['Tag1', 'Tag2', 'Tag3'],
  coverage: {
    photos: NUMBER_OF_PHOTOS,
    videos: NUMBER_OF_VIDEOS,
    stories: NUMBER_OF_STORIES
  },
  featured: true // Optional - for homepage highlight
}
```

## 🌟 Adding Lifestyle Content (`/data/lifestyle-content.ts`)

For lifestyle and behind-the-scenes content:

```javascript
{
  id: 'unique-content-id',
  title: 'Content Title',
  category: 'day-in-life' or 'fashion' or 'beauty' or 'travel' or 'home' or 'fitness' or 'behind-scenes',
  description: 'Detailed description...',
  image: 'https://your-image-url.com/image.jpg',
  date: 'Month YYYY',
  dateValue: new Date('YYYY-MM-DD'),
  tags: ['Tag1', 'Tag2', 'Tag3'],
  location: 'Location Name', // Optional
  featured: true, // Optional
  associatedVideo: { // Optional
    platform: 'tiktok' or 'instagram',
    views: 'XXK',
    likes: 'XXK'
  }
}
```

## 🔗 Updating Social Media Links (`/data/social-media.ts`)

Update your social media links and handles in one place:

```javascript
export const socialMediaLinks = {
  personal: {
    instagram: 'https://www.instagram.com/chloe_yun/?hl=en',
    tiktok: 'http://www.tiktok.com/@chloe_yun',
    amazon: 'https://www.amazon.com/shop/chloeyun'
  },
  foodie: {
    instagram: 'https://www.instagram.com/chloe_eats_dfw/'
  }
};
```

## 💡 Tips for Success

1. **Use High-Quality Images**: Always use high-resolution images from Unsplash or your own photography
2. **Be Consistent**: Use consistent naming conventions and categories
3. **Update Regularly**: Keep your content fresh by adding new entries regularly
4. **Tag Thoughtfully**: Use relevant tags to help with filtering and search functionality
5. **Fill Optional Fields**: The more information you provide, the richer your portfolio becomes

## 🆘 Need Help?

If you need assistance:
1. Follow the templates exactly as shown
2. Make sure dates are in the correct format
3. Ensure all commas and brackets are properly placed
4. Test one addition at a time to ensure everything works

Your content will automatically appear on the website once you add it to these files!