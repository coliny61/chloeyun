import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Clock, Camera, ExternalLink } from 'lucide-react';
import { Button } from './button';
import { ImageWithFallback } from './ImageWithFallback';
import PageHeader from './PageHeader';

export default function Events() {
  const [selectedType, setSelectedType] = useState('all');

  const eventTypes = [
    { key: 'all', name: 'All Events' },
    { key: 'popup', name: 'Pop-ups' },
    { key: 'launch', name: 'Restaurant Launches' },
    { key: 'festival', name: 'Food Festivals' },
    { key: 'collaboration', name: 'Brand Collabs' }
  ];

  const events = [
    {
      id: 1,
      title: 'Dallas Food & Wine Festival 2024',
      type: 'festival',
      date: 'March 15-17, 2024',
      location: 'Fair Park, Dallas',
      attendees: '5,000+',
      description: 'Three days of incredible food, wine tastings, and exclusive chef collaborations. I had the honor of being a featured food influencer and documenting the entire experience.',
      image: 'https://images.unsplash.com/photo-1687871433787-850099cc316f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWwlMjBkYWxsYXMlMjBvdXRkb29yfGVufDF8fHx8MTc1ODIxNTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      highlights: ['Celebrity Chef Meet & Greets', 'Wine Tastings', 'Live Cooking Demos'],
      myRole: 'Featured Food Influencer',
      contentCreated: ['Instagram Reels', 'TikTok Coverage', 'Story Highlights'],
      metrics: { views: '120K', engagement: '15%', reach: '85K' }
    },
    {
      id: 2,
      title: 'Meridian Turkish Kitchen Grand Opening',
      type: 'launch',
      date: 'February 22, 2024',
      location: 'Deep Ellum, Dallas',
      attendees: '300+',
      description: 'Exclusive preview of Dallas\'s newest Turkish restaurant featuring authentic flavors and modern presentation. Created comprehensive content showcasing their signature dishes.',
      image: 'https://images.unsplash.com/photo-1667689494772-cf6865dca8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwb3BlbmluZyUyMGV2ZW50fGVufDF8fHx8MTc1ODIxNTUxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      highlights: ['Menu Tasting', 'Chef Interview', 'Behind-the-Scenes'],
      myRole: 'Content Creator Partner',
      contentCreated: ['Restaurant Review', 'Menu Highlights', 'Atmosphere Coverage'],
      metrics: { views: '95K', engagement: '18%', reach: '67K' }
    },
    {
      id: 3,
      title: 'Local Coffee Roasters Pop-up',
      type: 'popup',
      date: 'January 28, 2024',
      location: 'Bishop Arts District',
      attendees: '150+',
      description: 'Intimate coffee tasting event featuring three local Dallas roasters. Perfect opportunity to highlight the city\'s growing coffee culture and artisan community.',
      image: 'https://images.unsplash.com/photo-1559712635-f196be14f14a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBwb3B1cCUyMG91dGRvb3IlMjBzZXR1cHxlbnwxfHx8fDE3NTgyMTU2NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      highlights: ['Coffee Tastings', 'Roaster Interviews', 'Latte Art Demos'],
      myRole: 'Event Documentarian',
      contentCreated: ['Coffee Culture Stories', 'Roaster Spotlights', 'Process Videos'],
      metrics: { views: '78K', engagement: '22%', reach: '52K' }
    },
    {
      id: 4,
      title: 'H-E-B Seasonal Campaign Launch',
      type: 'collaboration',
      date: 'December 10, 2023',
      location: 'Various H-E-B Locations',
      attendees: 'Brand Team',
      description: 'Multi-location brand partnership showcasing H-E-B\'s seasonal product line through authentic recipe creation and product styling.',
      image: 'https://images.unsplash.com/photo-1583922146273-68f11083858e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBicmFuZCUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzU4MjE1NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      highlights: ['Recipe Development', 'Product Styling', 'Store Tours'],
      myRole: 'Brand Ambassador',
      contentCreated: ['Recipe Videos', 'Product Reviews', 'Shopping Guides'],
      metrics: { views: '145K', engagement: '25%', reach: '98K' }
    }
  ];

  const filteredEvents = selectedType === 'all' 
    ? events 
    : events.filter(event => event.type === selectedType);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Events & Collaborations" 
        subtitle="Behind-the-scenes coverage of Dallas's most exciting food events and brand partnerships"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {eventTypes.map((type) => (
            <Button
              key={type.key}
              onClick={() => setSelectedType(type.key)}
              variant={selectedType === type.key ? "default" : "outline"}
              size="sm"
              className={`transition-all duration-300 ${
                selectedType === type.key
                  ? 'bg-[#FADADD] hover:bg-[#f9c5c9] text-black border-[#FADADD]'
                  : 'border-gray-200 text-gray-600 hover:border-[#FADADD] hover:text-black'
              }`}
            >
              {type.name}
            </Button>
          ))}
        </motion.div>

        {/* Events List */}
        <div className="space-y-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FADADD] text-black px-3 py-1 rounded-full text-sm font-medium">
                      {event.myRole}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-medium text-black group-hover:text-[#FADADD] transition-colors">
                      {event.title}
                    </h3>
                    <ExternalLink size={20} className="text-gray-400 group-hover:text-[#FADADD] transition-colors" />
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar size={16} className="mr-2 text-[#FADADD]" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin size={16} className="mr-2 text-[#FADADD]" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Users size={16} className="mr-2 text-[#FADADD]" />
                      {event.attendees}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Event Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content Created */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Content Created:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.contentCreated.map((content) => (
                        <span
                          key={content}
                          className="px-3 py-1 bg-[#FADADD]/20 text-gray-700 text-xs rounded-full"
                        >
                          {content}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-medium text-black">{event.metrics.views}</div>
                      <div className="text-xs text-gray-600">Total Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-black">{event.metrics.engagement}</div>
                      <div className="text-xs text-gray-600">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-black">{event.metrics.reach}</div>
                      <div className="text-xs text-gray-600">Reach</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 p-8 bg-gray-50 rounded-3xl"
        >
          <Camera size={32} className="mx-auto text-[#FADADD] mb-4" />
          <h3 className="text-2xl font-medium text-black mb-4">
            Planning an Event?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I'd love to document your food event, restaurant launch, or brand activation. 
            Let's create compelling content that captures the essence of your event.
          </p>
          <Button className="bg-[#FADADD] hover:bg-[#f9c5c9] text-black px-8 py-3 rounded-full">
            Discuss Your Event
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
