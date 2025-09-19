import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Play, ExternalLink, Filter } from 'lucide-react';
import { Button } from './button';
import { ImageWithFallback } from './ImageWithFallback';
import PageHeader from './PageHeader';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmbed, setSelectedEmbed] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'restaurant', label: 'Restaurant' },
    { key: 'coffee', label: 'Coffee' },
    { key: 'events', label: 'Events' },
    { key: 'lifestyle', label: 'Lifestyle' }
  ];

  const featuredContent = [
    {
      id: 1,
      type: 'instagram',
      category: 'coffee',
      title: 'Local Coffee Shop Feature',
      description: 'Highlighting the cozy atmosphere and specialty drinks at Deep Ellum favorites',
      thumbnail: 'https://images.unsplash.com/photo-1605116188583-80343cdf3b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwbGF0dGUlMjBhcnR8ZW58MXx8fHwxNzU4MjE0NTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      type: 'tiktok',
      category: 'restaurant',
      title: 'Dallas Food Tour',
      description: 'Quick tour of must-try spots in Dallas with honest reviews and recommendations',
      thumbnail: 'https://images.unsplash.com/photo-1660380775592-5647075c8ea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpc2hlcyUyMHBsYXRpbmd8ZW58MXx8fHwxNzU4MjE0NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      type: 'instagram',
      category: 'restaurant',
      title: 'Weekend Brunch Spot',
      description: 'Showcasing the best brunch in DFW with detailed food photography',
      thumbnail: 'https://images.unsplash.com/photo-1749027182065-c4157e7c0c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBhdm9jYWRvJTIwdG9hc3R8ZW58MXx8fHwxNzU4MTU4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      type: 'tiktok',
      category: 'restaurant',
      title: 'Hidden Gem Discovery',
      description: 'Finding the best tacos in Oak Cliff - authentic spot locals actually go to',
      thumbnail: 'https://images.unsplash.com/photo-1707603571504-86c1ea50903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc1ODEzMzY3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 5,
      type: 'instagram',
      category: 'coffee',
      title: 'Local Bakery Partnership',
      description: 'Collaboration with family-owned bakery highlighting their signature pastries',
      thumbnail: 'https://images.unsplash.com/photo-1733754348873-feeb45df3bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBiYWtlcnklMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzU4MTc3OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 6,
      type: 'tiktok',
      category: 'coffee',
      title: 'Coffee Shop Review',
      description: 'Honest review of new coffee spot with taste test and atmosphere breakdown',
      thumbnail: 'https://images.unsplash.com/photo-1605116188583-80343cdf3b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwbGF0dGUlMjBhcnR8ZW58MXx8fHwxNzU4MjE0NTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? featuredContent 
    : featuredContent.filter(item => item.category === selectedCategory);

  const closeEmbed = () => {
    setSelectedEmbed(null);
  };

  const openEmbed = (id: string) => {
    setSelectedEmbed(id);
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Portfolio" 
        subtitle="Authentic reviews and collaborations showcasing Dallas's best food experiences"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Filter size={16} />
              <span>Filter by:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-[#FADADD] text-black'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer"
              onClick={() => openEmbed(item.id.toString())}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                {/* Thumbnail */}
                <div className="aspect-square overflow-hidden relative">
                  <ImageWithFallback
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.type === 'instagram' ? (
                        <Instagram size={20} className="text-black" />
                      ) : (
                        <Play size={20} className="text-black" />
                      )}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-black">
                      {item.type === 'instagram' ? 'IG' : 'TikTok'}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-medium text-black mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Embed Modal */}
        {selectedEmbed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeEmbed}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-black">View Content</h3>
                <button
                  onClick={closeEmbed}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors text-lg"
                >
                  ×
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="text-gray-600 mb-4">
                  <Instagram size={40} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-sm">This would show the actual social media embed</p>
                  <p className="text-xs mt-2 text-gray-500">Click below to view on platform</p>
                </div>
                <Button
                  asChild
                  className="bg-[#FADADD] hover:bg-[#f9c5c9] text-black"
                >
                  <a 
                    href="https://instagram.com/chloe_eats_dfw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Instagram size={16} />
                    View on Instagram
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-medium text-black mb-4">
              Follow for More Reviews
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Join me as I explore Dallas's food scene and discover new favorites together
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="bg-[#FADADD] hover:bg-[#f9c5c9] text-black"
              >
                <a 
                  href="https://instagram.com/chloe_eats_dfw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Instagram size={16} />
                  @chloe_eats_dfw
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gray-200 hover:bg-gray-50"
              >
                <a 
                  href="https://tiktok.com/@chloe_eats_dfw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Play size={16} />
                  TikTok
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
