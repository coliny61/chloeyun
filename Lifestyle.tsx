import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, Calendar, Coffee, Utensils, Camera, Play } from 'lucide-react';
import { Button } from './button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import PageHeader from './PageHeader';

export default function Lifestyle() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', name: 'All Content' },
    { key: 'daily', name: 'Daily Life' },
    { key: 'travel', name: 'Dallas Exploring' },
    { key: 'cooking', name: 'Home Cooking' },
    { key: 'aesthetic', name: 'Aesthetic Moments' }
  ];

  const content = [
    {
      id: 1,
      title: 'Sunday Morning Routine',
      category: 'daily',
      type: 'video',
      description: 'Starting my Sunday with matcha lattes, journaling, and planning the week ahead. Sometimes the simplest moments make the best content.',
      image: 'https://images.unsplash.com/photo-1567370515955-fa2f0c5330e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JuaW5nJTIwcm91dGluZSUyMGNvZmZlZSUyMGpvdXJuYWwlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzU4MjE1NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Morning Routine', 'Self Care', 'Matcha'],
      platform: 'TikTok',
      views: '250K',
      engagement: '12%'
    },
    {
      id: 2,
      title: 'Hidden Gems in Bishop Arts',
      category: 'travel',
      type: 'carousel',
      description: 'Discovering the most photogenic spots in Dallas that locals actually go to. This neighborhood never fails to inspire my content.',
      image: 'https://images.unsplash.com/photo-1569239377517-849211b43233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWxsYXMlMjBza3lsaW5lJTIwY2l0eSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NTgyMTU1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Dallas', 'Local Spots', 'Photography'],
      platform: 'Instagram',
      views: '85K',
      engagement: '18%'
    },
    {
      id: 3,
      title: 'Recreating Restaurant Dishes at Home',
      category: 'cooking',
      type: 'video',
      description: 'Trying to recreate my favorite Dallas restaurant dishes in my tiny apartment kitchen. Some attempts were... more successful than others!',
      image: 'https://images.unsplash.com/photo-1671725501632-3980b640f420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwY29va2luZyUyMGtpdGNoZW4lMjBzZXR1cHxlbnwxfHx8fDE3NTgyMTU2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Cooking', 'Recipe', 'Home Chef'],
      platform: 'TikTok',
      views: '180K',
      engagement: '15%'
    },
    {
      id: 4,
      title: 'Aesthetic Flat Lay Breakfast',
      category: 'aesthetic',
      type: 'photo',
      description: 'When your breakfast looks too good not to photograph. Featuring homemade granola, fresh berries, and perfect natural lighting.',
      image: 'breakfast flat lay aesthetic',
      tags: ['Food Styling', 'Breakfast', 'Aesthetic'],
      platform: 'Instagram',
      views: '95K',
      engagement: '22%'
    },
    {
      id: 5,
      title: 'Get Ready With Me: Food Festival Edition',
      category: 'daily',
      type: 'video',
      description: 'Prepping for a day of food tasting and content creation. Outfit planning, camera gear setup, and setting intentions for the day.',
      image: 'getting ready outfit planning',
      tags: ['GRWM', 'Food Festival', 'Behind the Scenes'],
      platform: 'TikTok',
      views: '320K',
      engagement: '16%'
    },
    {
      id: 6,
      title: 'Dallas Sunset Picnic Vibes',
      category: 'travel',
      type: 'carousel',
      description: 'Found the perfect picnic spot with downtown Dallas views. Sometimes the best content happens when you\'re just enjoying the moment.',
      image: 'dallas skyline picnic sunset',
      tags: ['Dallas', 'Picnic', 'Sunset'],
      platform: 'Instagram',
      views: '110K',
      engagement: '20%'
    }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? content 
    : content.filter(item => item.category === selectedCategory);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play size={16} className="text-white" />;
      case 'carousel':
        return <Camera size={16} className="text-white" />;
      default:
        return <Camera size={16} className="text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Lifestyle Content" 
        subtitle="Sharing authentic moments, daily inspiration, and the beauty of everyday life in Dallas"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              variant={selectedCategory === category.key ? "default" : "outline"}
              size="sm"
              className={`transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-[#FADADD] hover:bg-[#f9c5c9] text-black border-[#FADADD]'
                  : 'border-gray-200 text-gray-600 hover:border-[#FADADD] hover:text-black'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1494790108755-2616c9ad1b21?w=400&h=400&fit=crop&crop=center`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Content Type Badge */}
                <div className="absolute top-3 left-3">
                  <div className="bg-black/70 backdrop-blur-sm p-2 rounded-full">
                    {getContentIcon(item.type)}
                  </div>
                </div>

                {/* Platform Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-[#FADADD] text-black px-2 py-1 rounded-full text-xs font-medium">
                    {item.platform}
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-medium text-black mb-2 group-hover:text-[#FADADD] transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <div className="text-sm font-medium text-black">{item.views}</div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-black">{item.engagement}</div>
                      <div className="text-xs text-gray-500">Engagement</div>
                    </div>
                  </div>
                  <Heart size={16} className="text-gray-400 group-hover:text-[#FADADD] transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inspiration Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-r from-[#FADADD]/10 to-gray-50 rounded-3xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-medium text-black mb-4">
              Behind the Content
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              My lifestyle content is all about finding beauty in everyday moments and sharing 
              authentic experiences that inspire others to explore, create, and connect.
            </p>
          </div>

          {/* Content Pillars */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Coffee size={24} className="mx-auto text-[#FADADD] mb-3" />
              <h4 className="font-medium text-black mb-2">Daily Rituals</h4>
              <p className="text-sm text-gray-600">Morning routines, self-care moments, and mindful living</p>
            </div>
            <div className="text-center">
              <MapPin size={24} className="mx-auto text-[#FADADD] mb-3" />
              <h4 className="font-medium text-black mb-2">Dallas Exploring</h4>
              <p className="text-sm text-gray-600">Hidden gems, local favorites, and city adventures</p>
            </div>
            <div className="text-center">
              <Utensils size={24} className="mx-auto text-[#FADADD] mb-3" />
              <h4 className="font-medium text-black mb-2">Home Cooking</h4>
              <p className="text-sm text-gray-600">Recipe experiments, cooking tips, and kitchen moments</p>
            </div>
            <div className="text-center">
              <Camera size={24} className="mx-auto text-[#FADADD] mb-3" />
              <h4 className="font-medium text-black mb-2">Aesthetic Moments</h4>
              <p className="text-sm text-gray-600">Beautiful compositions, styling tips, and visual inspiration</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 p-8 bg-gray-50 rounded-3xl"
        >
          <h3 className="text-2xl font-medium text-black mb-4">
            Let's Create Together
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Looking for authentic lifestyle content that resonates with your audience? 
            I'd love to collaborate on campaigns that feel natural and inspiring.
          </p>
          <Button className="bg-[#FADADD] hover:bg-[#f9c5c9] text-black px-8 py-3 rounded-full">
            Start a Collaboration
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
