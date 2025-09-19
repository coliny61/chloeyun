import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Play, Instagram, ArrowRight, MessageCircle, Heart, Share, Bookmark, Coffee, MapPin, ExternalLink, Clock, User } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Button } from './button';
import { featuredVideos } from '../data/videos';
import { brandPartnerships } from '../data/brand-partnerships';
import { socialMediaLinks } from '../data/social-media';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const goToMediaKit = () => {
    onNavigate('mediakit');
  };

  const goToAbout = () => {
    onNavigate('about');
  };

  const goToFoodReviews = () => {
    onNavigate('food-reviews');
  };

  // Custom Texas Icon with Heart (SVG)
  const TexasHeartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#FADADD]">
      <path d="M12 21s-8-4.5-8-11.8A5 5 0 0 1 12 4a5 5 0 0 1 8 5.2c0 7.3-8 11.8-8 11.8z" />
      <path d="M12 7.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5S12 8.33 12 7.5z" />
    </svg>
  );

  // Helper function to convert date to time ago
  function getTimeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }

  // Use the first 2 featured videos from the data file
  const tiktokContent = featuredVideos.slice(0, 2).map(video => ({
    id: video.id,
    title: video.title,
    username: video.platform === 'instagram' ? '@chloe_yun' : '@chloe_yun',
    views: video.views || '0',
    likes: video.likes || '0',
    comments: Math.floor(parseInt(video.views?.replace('K', '000') || '0') * 0.05).toString(),
    shares: Math.floor(parseInt(video.views?.replace('K', '000') || '0') * 0.03).toString(),
    bookmarks: Math.floor(parseInt(video.views?.replace('K', '000') || '0') * 0.02).toString(),
    timeAgo: getTimeAgo(video.datePosted),
    image: video.thumbnail,
    description: video.description,
    platform: video.platform,
    blogContent: video.associatedBlog ? {
      title: video.associatedBlog.title,
      excerpt: video.associatedBlog.preview,
      fullReview: video.associatedBlog.preview,
      tags: video.tags,
      rating: 5,
      location: video.location || 'Dallas, Texas'
    } : {
      title: video.title,
      excerpt: video.description,
      fullReview: video.description,
      tags: video.tags,
      rating: 5,
      location: video.location || 'Dallas, Texas'
    }
  }));

  const oldTiktokContent = [
    {
      id: 'tiktok-1',
      title: "Dallas's Most Viral Pho Spot",
      username: '@chloe_eats_dfw',
      views: '387K',
      likes: '12.3K',
      comments: '387',
      shares: '892',
      timeAgo: '2 days ago',
      image: 'https://images.unsplash.com/photo-1631030576925-18b2ca443738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMGZvb2QlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzU4MjE1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      embedUrl: 'https://www.tiktok.com/@chloe_eats_dfw/video/7234567890123456789',
      description: 'Jade & John\'s in Deep Ellum has been all over my FYP. Finally tried it and WOW... the broth is incredible! 🍜',
      blogContent: {
        title: "Why Jade & John's is Dallas's Best Kept Vietnamese Secret",
        excerpt: "After seeing this place blow up on TikTok, I had to see what the hype was about. Located in the heart of Deep Ellum, this family-owned Vietnamese restaurant is serving up some of the most authentic pho I've had outside of Vietnam.",
        fullReview: "The moment you walk into Jade & John's, you're hit with the most incredible aroma of star anise and beef broth that's been simmering for hours. The owner, Mrs. Nguyen, greeted me with the warmest smile and immediately knew I was there because of TikTok. The pho tai arrives in a massive bowl with paper-thin slices of rare beef that cook perfectly in the piping hot broth. The herbs are fresh, the noodles have the perfect chew, and the broth... don't get me started on the broth. It's rich, complex, and clearly made with love and tradition.",
        tags: ['Vietnamese', 'Deep Ellum', 'Authentic', 'Family-Owned', 'Pho'],
        rating: 5,
        location: 'Deep Ellum, Dallas'
      }
    },
    {
      id: 'instagram-1',
      title: "Morning Ritual in Bishop Arts",
      username: '@chloe_eats_dfw',
      views: '126K',
      likes: '3.2K',
      comments: '126',
      bookmarks: '284',
      timeAgo: '4 days ago',
      image: 'https://images.unsplash.com/photo-1683965274732-664bc41cf49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYWVzdGhldGljJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NTgyMTU1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      embedUrl: 'https://www.instagram.com/reel/Abc123XYZ456/',
      description: 'Starting my day with the most aesthetic matcha latte at my favorite local spot ✨ The natural light here is *chef\'s kiss*',
      platform: 'instagram',
      blogContent: {
        title: "5 Hidden Coffee Gems in Bishop Arts District",
        excerpt: "Bishop Arts has become Dallas's coffee mecca, but beyond the obvious spots are hidden gems serving exceptional coffee in Instagram-worthy spaces.",
        fullReview: "Kyoto Coffee Co. isn't just another trendy coffee shop – it's a carefully curated experience that transports you to a serene Japanese café. The ceremonial grade matcha is whisked to perfection, creating the most beautiful emerald foam that's almost too pretty to drink. The minimalist interior with its natural wood elements and abundant plants creates the perfect backdrop for both work and content creation. Owner Kenji sources his beans directly from small farms in Japan and personally trains each barista in traditional preparation methods.",
        tags: ['Coffee', 'Bishop Arts', 'Matcha', 'Japanese', 'Minimalist'],
        rating: 5,
        location: 'Bishop Arts District, Dallas'
      }
    }
  ];

  const playVideo = (videoId: string) => {
    setActiveVideoId(videoId);
  };

  const closeVideo = () => {
    setActiveVideoId(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border border-gray-100">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1619264437738-0c22e4d22f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwZm9vZCUyMGJsb2dnZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyMTU1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Chloe Yun"
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-light text-black mb-4 tracking-tight">
            Chloe Yun
          </h1>
          
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            Food & lifestyle creator sharing authentic Dallas experiences
          </p>
          
          <div className="flex items-center justify-center space-x-2 mb-8 text-gray-500">
            <TexasHeartIcon />
            <span className="text-sm">Dallas, Texas</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goToMediaKit}
            className="inline-flex items-center px-8 py-3 bg-[#FADADD] hover:bg-[#f9c5c9] text-black rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Coffee size={16} className="mr-2" />
            Work with me
          </motion.button>
        </motion.div>

        {/* Featured Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-black mb-2">Latest Content</h2>
            <p className="text-gray-600 text-sm">Fresh from my social feeds</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {tiktokContent.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Video Preview */}
                <div className="relative">
                  <div className="aspect-[9/16] max-h-96 relative overflow-hidden bg-black">
                    <ImageWithFallback
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Play Overlay */}
                    <div 
                      className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer group"
                      onClick={() => playVideo(content.id)}
                    >
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={24} className="text-black ml-1" />
                      </div>
                    </div>

                    {/* Platform Badge */}
                    <div className="absolute top-4 left-4">
                      {content.platform === 'instagram' ? (
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
                          <Instagram size={14} className="mr-1.5" />
                          Instagram
                        </div>
                      ) : (
                        <div className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
                          <div className="w-3 h-3 bg-white rounded-sm mr-1.5 flex items-center justify-center">
                            <span className="text-black text-[8px] font-bold">T</span>
                          </div>
                          TikTok
                        </div>
                      )}
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-3 text-white">
                      <div className="flex flex-col items-center">
                        <Heart size={20} className="mb-1" />
                        <span className="text-xs font-medium">{content.likes}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <MessageCircle size={20} className="mb-1" />
                        <span className="text-xs font-medium">{content.comments}</span>
                      </div>
                      {content.platform === 'instagram' ? (
                        <div className="flex flex-col items-center">
                          <Bookmark size={20} className="mb-1" />
                          <span className="text-xs font-medium">{content.bookmarks}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Share size={20} className="mb-1" />
                          <span className="text-xs font-medium">{content.shares}</span>
                        </div>
                      )}
                    </div>

                    {/* Views */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                        {content.views} views
                      </div>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#FADADD] flex items-center justify-center">
                          <User size={14} className="text-black" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black">{content.username}</p>
                          <p className="text-xs text-gray-500">{content.timeAgo}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-black"
                        onClick={() => playVideo(content.id)}
                      >
                        <ExternalLink size={16} />
                      </Button>
                    </div>

                    <h3 className="font-medium text-black mb-2">{content.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {content.description}
                    </p>

                    {/* Blog Preview */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-[#FADADD]/20 rounded-full flex items-center justify-center">
                          <Clock size={12} className="text-[#FADADD]" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Full Review Available</span>
                      </div>
                      <h4 className="font-medium text-black text-sm mb-2">{content.blogContent.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">
                        {content.blogContent.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(content.blogContent.rating)].map((_, i) => (
                              <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full mr-0.5"></div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{content.blogContent.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {content.blogContent.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-[#FADADD]/20 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={goToFoodReviews}
                        className="flex-1 bg-[#FADADD] hover:bg-[#f9c5c9] text-black rounded-full"
                        size="sm"
                      >
                        Read Full Review
                        <ArrowRight size={14} className="ml-1" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-4 rounded-full border-gray-200 hover:bg-gray-50"
                        onClick={() => playVideo(content.id)}
                      >
                        <ExternalLink size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand Partners Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20 py-12 border-t border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-xl font-light text-black mb-2">Trusted by Dallas Brands</h2>
            <p className="text-gray-600 text-sm">
              Collaborating with local businesses across the city
            </p>
          </div>

          {/* Brands Carousel */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [0, -1600, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex space-x-8 w-max"
            >
              {[
                { name: 'Choctaw Casinos', category: 'Entertainment' },
                { name: 'Kyoto Coffee Co.', category: 'Coffee Shop' },
                { name: 'Jade & John\'s', category: 'Vietnamese Restaurant' },
                { name: 'Sweet Tooth Bakery', category: 'French Pastry' },
                { name: 'Brunch Society', category: 'Modern American' },
                { name: 'Taj Chaat House', category: 'Indian Street Food' },
                { name: 'Addison Roasters', category: 'Specialty Coffee' },
                { name: 'Nonna Tata', category: 'Italian Restaurant' },
                { name: 'Mixto Restaurant', category: 'Mexican Cuisine' },
                { name: 'Bishop Arts Coffee', category: 'Local Roastery' },
                { name: 'Deep Ellum Dining', category: 'Food District' },
                { name: 'Dallas Food Events', category: 'Event Coverage' },
              ].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-[200px]"
                >
                  <div className="text-center">
                    <h4 className="font-medium text-black text-sm mb-1">{brand.name}</h4>
                    <p className="text-xs text-gray-600">{brand.category}</p>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { name: 'Choctaw Casinos', category: 'Entertainment' },
                { name: 'Kyoto Coffee Co.', category: 'Coffee Shop' },
                { name: 'Jade & John\'s', category: 'Vietnamese Restaurant' },
                { name: 'Sweet Tooth Bakery', category: 'French Pastry' },
                { name: 'Brunch Society', category: 'Modern American' },
                { name: 'Taj Chaat House', category: 'Indian Street Food' },
                { name: 'Addison Roasters', category: 'Specialty Coffee' },
                { name: 'Nonna Tata', category: 'Italian Restaurant' },
                { name: 'Mixto Restaurant', category: 'Mexican Cuisine' },
                { name: 'Bishop Arts Coffee', category: 'Local Roastery' },
                { name: 'Deep Ellum Dining', category: 'Food District' },
                { name: 'Dallas Food Events', category: 'Event Coverage' },
              ].map((brand, index) => (
                <div
                  key={`${brand.name}-duplicate-${index}`}
                  className="flex-shrink-0 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-[200px]"
                >
                  <div className="text-center">
                    <h4 className="font-medium text-black text-sm mb-1">{brand.name}</h4>
                    <p className="text-xs text-gray-600">{brand.category}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Partnership CTA */}
          <div className="text-center mt-8">
            <Button
              onClick={goToMediaKit}
              variant="ghost"
              className="text-gray-600 hover:text-black transition-colors"
            >
              View all partnerships
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
        </motion.div>

        {/* About Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16 py-16 border-t border-gray-100"
        >
          <h2 className="text-2xl font-light text-black mb-6">About</h2>
          <p className="text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
            I create authentic content showcasing Dallas's vibrant food scene and lifestyle experiences. 
            From neighborhood coffee shops to emerging restaurants, I help connect communities through 
            genuine storytelling and thoughtful recommendations.
          </p>
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-light text-black">17.6K+</div>
              <div className="text-sm text-gray-500">Total Reach</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-light text-black">5.2%</div>
              <div className="text-sm text-gray-500">Engagement</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-light text-black">Dallas</div>
              <div className="text-sm text-gray-500">Based</div>
            </div>
          </div>
          <motion.button
            whileHover={{ y: -2 }}
            onClick={goToAbout}
            className="inline-flex items-center px-6 py-3 text-black hover:text-gray-600 transition-colors border border-gray-200 hover:border-gray-300 rounded-full"
          >
            <span className="mr-2">Learn more</span>
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-16"
        >
          <a
            href="https://www.instagram.com/chloe_eats_dfw/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-black transition-colors"
          >
            <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-sm"></div>
            <span>@chloe_eats_dfw</span>
          </a>
          <div className="w-px h-4 bg-gray-300"></div>
          <a
            href="https://www.tiktok.com/@chloe_eats_dfw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-black transition-colors"
          >
            <div className="w-4 h-4 bg-black rounded-sm"></div>
            <span>@chloe_eats_dfw</span>
          </a>
          <div className="w-px h-4 bg-gray-300"></div>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-black transition-colors"
          >
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span>Linktree</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={goToAbout}
          className="flex flex-col items-center mx-auto text-gray-400 hover:text-black transition-colors"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </div>

      {/* Video Modal/Overlay */}
      {activeVideoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-sm w-full bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ×
            </button>

            {/* Video Content */}
            <div className="aspect-[9/16] bg-gray-900 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <Play size={48} className="mx-auto mb-4 opacity-60" />
                <p className="text-sm opacity-80 mb-2">Video would play here</p>
                <p className="text-xs opacity-60">
                  In a real implementation, this would embed the actual TikTok/Instagram video
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
