import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import PageHeader from './PageHeader';

export default function About() {
  // Since this is now a standalone page, we can remove scroll functions
  // and use proper routing if needed later

  const mediaHighlights = [
    'Featured at Dallas Food & Wine Festival',
    'Collaborated with Choctaw Casinos',
    'Partnership with Local Coffee Collective',
    'Coverage at Deep Ellum Events'
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="About Me" 
        subtitle="Getting to know the person behind the content"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1740153204545-ac8320c44a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3QlMjBjbGVhbnxlbnwxfHx8fDE3NTgyMTQ1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Chloe Yun Professional Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Subtle accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FADADD] rounded-full -z-10 opacity-60"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  I'm Chloe, a Dallas-based content creator passionate about sharing authentic 
                  experiences from local restaurants, coffee shops, and cultural events across 
                  the DFW area.
                </p>
                
                <p>
                  My content focuses on helping local businesses connect with their communities 
                  through honest reviews and engaging storytelling. I believe every restaurant 
                  and café has a unique story worth sharing.
                </p>
                
                <p>
                  From intimate coffee dates to vibrant food festivals, I capture the moments 
                  that make Dallas's food scene so special. My goal is to create content that 
                  feels genuine and helps people discover their next favorite spot.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-xl font-medium text-black mb-4">Recent Highlights</h3>
              <div className="space-y-3">
                {mediaHighlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-[#FADADD] rounded-full mr-3"></div>
                    <span className="text-gray-600 text-sm">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-medium text-black mb-4">Connect With Me</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Food Content</span>
                  <a 
                    href="https://www.instagram.com/chloe_eats_dfw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-600 transition-colors font-medium"
                  >
                    @chloe_eats_dfw
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lifestyle</span>
                  <a 
                    href="https://www.instagram.com/chloe_yun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-600 transition-colors font-medium"
                  >
                    @chloe_yun
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">TikTok</span>
                  <a 
                    href="https://www.tiktok.com/@chloe_eats_dfw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-600 transition-colors font-medium"
                  >
                    @chloe_eats_dfw
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="mailto:hello@chloeyun.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-[#FADADD] hover:bg-[#f9c5c9] text-black px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Let's Collaborate
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}