import React from 'react';
import { motion } from 'motion/react';
import { Download, Quote, Star, Calendar, Users } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export default function Press() {
  const pressQuotes = [
    {
      id: 1,
      quote: "Chloe brings authentic energy to Dallas food content, showcasing local gems with genuine enthusiasm.",
      source: "Dallas Food Blog",
      date: "October 2024"
    },
    {
      id: 2,
      quote: "A rising voice in the DFW food scene, Chloe's content highlights the diversity of Dallas dining.",
      source: "DFW Food Network",
      date: "September 2024"
    },
    {
      id: 3,
      quote: "Chloe's honest reviews and engaging personality make her a trusted source for Dallas restaurant discoveries.",
      source: "Local Dallas Influencer Spotlight",
      date: "August 2024"
    }
  ];

  const eventPhotos = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1668000305847-cf422c116bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwRGFsbGFzJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1NTcyMTgwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Local Restaurant Opening",
      description: "Featuring new Dallas dining experiences"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1755514838747-adfd34197d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBmYXNoaW9uJTIwY29udGVudCUyMGNyZWF0b3J8ZW58MXx8fHwxNzU1NzIxODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Dallas Fashion Event",
      description: "Showcasing local style and trends"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1656789280583-c5bebda7ca1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGlmZXN0eWxlJTIwZmxhdCUyMGxheSUyMGx1eHVyeXxlbnwxfHx8fDE3NTU3MjE4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "DFW Lifestyle Gathering",
      description: "Connecting with the local community"
    }
  ];

  const stats = [
    { icon: Users, label: "Combined Followers", value: "150K+" },
    { icon: Star, label: "Engagement Rate", value: "6.8%" },
    { icon: Calendar, label: "Content Created", value: "300+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-stone-900 mb-6">
            Press & Collaborations
          </h2>
          <p className="text-xl text-stone-700 max-w-3xl mx-auto mb-8">
            Bringing brands to life through authentic storytelling and exclusive experiences
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-400 to-amber-400 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download size={20} />
            <span>Download Media Kit</span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-rose-200/30"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full mb-4">
                <stat.icon size={24} className="text-white" />
              </div>
              <h3 className="text-3xl font-serif text-stone-900 mb-2">{stat.value}</h3>
              <p className="text-stone-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Press Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-serif text-stone-900 text-center mb-12">
            What They're Saying
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressQuotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-rose-200/30"
              >
                <Quote size={32} className="text-rose-400 mb-4" />
                <p className="text-stone-700 mb-4 italic leading-relaxed">
                  "{quote.quote}"
                </p>
                <div>
                  <p className="font-medium text-stone-900">{quote.source}</p>
                  <p className="text-sm text-stone-600">{quote.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Event Photos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-serif text-stone-900 text-center mb-12">
            Event Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-rose-200/30">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-serif text-stone-900 mb-2">
                      {photo.title}
                    </h4>
                    <p className="text-stone-600">
                      {photo.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-white/50 backdrop-blur-sm rounded-3xl p-12 border border-rose-200/30"
        >
          <h3 className="text-3xl font-serif text-stone-900 mb-4">
            Ready to Collaborate?
          </h3>
          <p className="text-lg text-stone-700 mb-8 max-w-2xl mx-auto">
            Let's create something beautiful together. From brand partnerships to content collaborations, 
            I'm here to bring your vision to life with authentic storytelling and genuine engagement.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Let's Collab
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
