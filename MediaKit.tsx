import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Download,
  Mail,
  Instagram,
  Globe,
  Users,
  BarChart3,
  Heart,
  TrendingUp,
  Camera,
  Video,
  FileImage,
  Calendar,
  DollarSign,
  MapPin,
  Star,
  ExternalLink
} from 'lucide-react';
import { Button } from './button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import PageHeader from './PageHeader';

export default function MediaKit() {
  const [activeSection, setActiveSection] = useState('overview');
  const mediaKitRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    // In a real app, this would generate a PDF or trigger a download
    window.print();
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'audience', label: 'Audience', icon: BarChart3 },
    { id: 'services', label: 'Services', icon: Camera },
    { id: 'portfolio', label: 'Portfolio', icon: FileImage },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Media Kit" 
        subtitle="Partnership opportunities with a Dallas-based content creator"
      />

      {/* Sticky Navigation & Export */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Section Navigation */}
            <div className="flex items-center space-x-1 overflow-x-auto">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      activeSection === section.id
                        ? 'bg-[#FADADD] text-black'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{section.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Export Button */}
            <Button
              onClick={handleExport}
              className="bg-[#FADADD] hover:bg-[#f9c5c9] text-black px-6 py-2 rounded-full flex items-center space-x-2"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          </div>
        </div>
      </div>

      <div ref={mediaKitRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Overview Section */}
        <section id="overview" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-[#FADADD]/20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1619264437738-0c22e4d22f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwZm9vZCUyMGJsb2dnZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyMTU1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Chloe Yun"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-medium text-black mb-4">
              Chloe Yun
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Dallas-Based Food & Lifestyle Creator
            </p>
            <div className="inline-flex items-center space-x-2 bg-[#FADADD]/20 rounded-full px-4 py-2 text-sm text-black">
              <MapPin size={14} />
              <span>Dallas, Texas</span>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              { icon: Users, value: '17.6K+', label: 'Total Followers', color: 'bg-blue-50' },
              { icon: Heart, value: '5.2%', label: 'Avg Engagement', color: 'bg-red-50' },
              { icon: TrendingUp, value: '250K+', label: 'Monthly Reach', color: 'bg-green-50' },
              { icon: Star, value: '4.9/5', label: 'Brand Rating', color: 'bg-yellow-50' }
            ].map((stat, index) => (
              <div key={index} className={`${stat.color} rounded-2xl p-6 text-center`}>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={20} className="text-gray-600" />
                </div>
                <p className="text-2xl font-semibold text-black mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-50 rounded-3xl p-8 text-center"
          >
            <h2 className="text-2xl font-medium text-black mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              I create authentic content that showcases Dallas's vibrant food scene and lifestyle experiences. 
              From cozy coffee shops to exciting food events, I help businesses connect with their community 
              through genuine storytelling and high-quality visuals that drive real engagement and foot traffic.
            </p>
          </motion.div>
        </section>

        {/* Audience Section */}
        <section id="audience" className="py-16 border-t border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-medium text-black mb-8 text-center">Audience Demographics</h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Platform Breakdown */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-black">Platform Overview</h3>
                
                {[
                  { platform: 'TikTok', handle: '@chloe_eats_dfw', followers: '8.2K', engagement: '6.8%', color: 'bg-black' },
                  { platform: 'Instagram (Food)', handle: '@chloe_eats_dfw', followers: '4.3K', engagement: '4.2%', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
                  { platform: 'Instagram (Lifestyle)', handle: '@chloe_yun', followers: '5.1K', engagement: '4.8%', color: 'bg-gradient-to-br from-purple-500 to-pink-500' }
                ].map((platform, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${platform.color} rounded-full flex items-center justify-center`}>
                          {platform.platform.includes('TikTok') ? (
                            <Video size={20} className="text-white" />
                          ) : (
                            <Instagram size={20} className="text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-black">{platform.platform}</p>
                          <p className="text-sm text-gray-600">{platform.handle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-black text-xl">{platform.followers}</p>
                        <p className="text-sm text-gray-600">followers</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg Engagement:</span>
                      <span className="font-medium text-[#FADADD]">{platform.engagement}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Demographics */}
              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-medium text-black mb-6">Audience Insights</h3>
                  
                  {/* Gender */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900">Gender Split</span>
                    </div>
                    <div className="flex rounded-full overflow-hidden h-4 bg-gray-200">
                      <div className="bg-[#FADADD] h-full" style={{ width: '70%' }}></div>
                      <div className="bg-gray-400 h-full" style={{ width: '30%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Women 70%</span>
                      <span>Men 30%</span>
                    </div>
                  </div>

                  {/* Age Groups */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900">Age Distribution</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { range: '25-34', percentage: 45 },
                        { range: '18-24', percentage: 35 },
                        { range: '35-44', percentage: 20 }
                      ].map((age, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 w-12">{age.range}</span>
                          <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#FADADD] h-2 rounded-full" 
                              style={{ width: `${age.percentage * 2}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-8">{age.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location & Interests */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div>
                      <span className="font-medium text-gray-900">Location:</span>
                      <span className="text-gray-600 ml-2">85% Dallas-Fort Worth Metro</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Top Interests:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Food & Dining', 'Local Events', 'Coffee Culture', 'Lifestyle'].map((interest, index) => (
                          <span key={index} className="bg-[#FADADD]/20 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 border-t border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-medium text-black mb-8 text-center">Services & Investment</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { service: 'TikTok Video', price: '$250-400', description: 'Engaging short-form content with trending audio', icon: Video, deliverables: ['15-60s video', '3-5 takes', 'Same-day stories'] },
                { service: 'Instagram Reel', price: '$200-350', description: 'High-quality reels for maximum reach', icon: Camera, deliverables: ['15-30s reel', 'Professional editing', 'Caption included'] },
                { service: 'IG Story Series', price: '$100-175', description: 'Behind-the-scenes authentic content', icon: FileImage, deliverables: ['5-8 story frames', '24hr highlights', 'Polls/Q&As'] },
                { service: 'Static Post', price: '$125-200', description: 'Beautiful photography with engaging copy', icon: Camera, deliverables: ['Professional photos', 'Written caption', 'Story amplification'] },
                { service: 'Event Coverage', price: '$400-600', description: 'Comprehensive event documentation', icon: Calendar, deliverables: ['Live coverage', 'Photo gallery', 'Highlight reel'] },
                { service: 'Campaign Bundle', price: '$600-850', description: 'Multi-platform integrated campaign', icon: TrendingUp, deliverables: ['Cross-platform content', 'Analytics report', 'Usage rights'] }
              ].map((item, index) => (
                <motion.div
                  key={item.service}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#FADADD]/20 rounded-full flex items-center justify-center">
                      <item.icon size={20} className="text-[#FADADD]" />
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-black">{item.price}</p>
                      <p className="text-xs text-gray-500">Starting at</p>
                    </div>
                  </div>
                  <h3 className="font-medium text-black mb-2">{item.service}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div>
                    <p className="text-xs font-medium text-gray-900 mb-2">Includes:</p>
                    <ul className="space-y-1">
                      {item.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center">
                          <div className="w-1 h-1 bg-[#FADADD] rounded-full mr-2"></div>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Flexible Options */}
            <div className="bg-gradient-to-br from-[#FADADD]/20 to-[#FADADD]/5 rounded-3xl p-8 text-center border border-[#FADADD]/20">
              <div className="w-12 h-12 bg-[#FADADD]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign size={20} className="text-[#FADADD]" />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">Flexible Partnership Options</h3>
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                I work with local Dallas businesses to create custom packages that fit your budget and goals. 
                Options include meal trades, product collaborations, and long-term brand partnerships.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Meal Trades', 'Product Collaboration', 'Long-term Partnerships', 'Event Sponsorships'].map((option, index) => (
                  <span key={index} className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 border border-[#FADADD]/30">
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 border-t border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-medium text-black mb-8 text-center">Recent Collaborations</h2>
            
            {/* Featured Partnership */}
            <div className="bg-gradient-to-br from-[#FADADD]/20 to-[#FADADD]/5 rounded-3xl p-8 mb-12 border border-[#FADADD]/20">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-[#FADADD] text-black px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Featured Partnership
                  </div>
                  <h3 className="text-2xl font-medium text-black mb-4">Choctaw Casinos</h3>
                  <p className="text-gray-700 mb-6">
                    Multi-platform paid partnership featuring lifestyle content, event coverage, and dining experiences. 
                    Generated 50K+ impressions across TikTok and Instagram.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                      <p className="font-semibold text-black">50K+</p>
                      <p className="text-sm text-gray-600">Impressions</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black">2.1K</p>
                      <p className="text-sm text-gray-600">Engagements</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black">4.2%</p>
                      <p className="text-sm text-gray-600">CTR</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['TikTok Videos', 'Instagram Stories', 'Event Coverage', 'Dining Reviews'].map((deliverable, index) => (
                      <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-[#FADADD]/30">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMG5ldHdvcmtpbmclMjBzb2NpYWwlMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzU3NTYyNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Event coverage"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Other Collaborations */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Local Coffee Shops',
                  description: 'Regular partnerships highlighting Dallas coffee culture',
                  image: 'https://images.unsplash.com/photo-1595574293319-d82aece466bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGNvZmZlZSUyMHNob3B8ZW58MXx8fHwxNzU4MjAyOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  metric: '12 partnerships'
                },
                {
                  title: 'Dallas Restaurants',
                  description: 'Authentic dining reviews and experiences',
                  image: 'https://images.unsplash.com/photo-1631030576925-18b2ca443738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcmVzdGF1cmFudCUyMGZvb2QlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzU4MjE1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  metric: '25+ reviews'
                },
                {
                  title: 'Food Events',
                  description: 'Coverage of Dallas food festivals and markets',
                  image: 'https://images.unsplash.com/photo-1687871433787-850099cc316f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWwlMjBkYWxsYXMlMjBvdXRkb29yfGVufDF8fHx8MTc1ODIxNTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  metric: '8 events'
                },
                {
                  title: 'Lifestyle Brands',
                  description: 'Product features and brand storytelling',
                  image: 'https://images.unsplash.com/photo-1569239377517-849211b43233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWxsYXMlMjBza3lsaW5lJTIwY2l0eSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NTgyMTU1MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  metric: '5 campaigns'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-black">{item.title}</h4>
                      <span className="text-xs bg-[#FADADD]/20 text-[#FADADD] px-2 py-1 rounded-full">
                        {item.metric}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 border-t border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-medium text-black mb-8">Let's Create Together</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Ready to showcase your business to the Dallas community?
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'hello@chloeyun.com',
                  href: 'mailto:hello@chloeyun.com',
                  description: 'Best for partnerships'
                },
                {
                  icon: Instagram,
                  label: 'Instagram DM',
                  value: '@chloe_eats_dfw',
                  href: 'https://instagram.com/chloe_eats_dfw',
                  description: 'Quick questions'
                },
                {
                  icon: Globe,
                  label: 'Portfolio',
                  value: 'chloeyun.com',
                  href: 'https://chloeyun.com',
                  description: 'See more work'
                }
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : '_self'}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="block bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-[#FADADD] group"
                >
                  <div className="w-16 h-16 bg-[#FADADD]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FADADD]/30 transition-colors">
                    <contact.icon size={24} className="text-[#FADADD]" />
                  </div>
                  <h4 className="font-medium text-black mb-2 flex items-center justify-center">
                    {contact.label}
                    <ExternalLink size={14} className="ml-2 text-gray-400 group-hover:text-[#FADADD] transition-colors" />
                  </h4>
                  <p className="text-gray-900 mb-1 font-medium">{contact.value}</p>
                  <p className="text-sm text-gray-600">{contact.description}</p>
                </motion.a>
              ))}
            </div>

            <div className="bg-[#FADADD]/10 rounded-3xl p-8 border border-[#FADADD]/20">
              <h3 className="text-xl font-medium text-black mb-4">Response Time</h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                I typically respond to collaboration inquiries within 24-48 hours. 
                Let's discuss how we can authentically showcase your brand to the Dallas community!
              </p>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
