import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Instagram, Play, Mail, MapPin, ExternalLink, Clock } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import PageHeader from './PageHeader';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    message: '',
    budget: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Let's Collaborate" 
        subtitle="Ready to create authentic content that connects with the Dallas community?"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Want to book Chloe for a collaboration, event, or campaign? I work with 
                restaurants, coffee shops, and local businesses to create authentic content 
                that connects with the Dallas community.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-5 bg-gray-50 rounded-2xl"
              >
                <div className="w-12 h-12 bg-[#FADADD] rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-black" />
                </div>
                <div>
                  <p className="font-medium text-black">Email</p>
                  <a 
                    href="mailto:hello@chloeyun.com"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    hello@chloeyun.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-5 bg-gray-50 rounded-2xl"
              >
                <div className="w-12 h-12 bg-[#FADADD] rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-black" />
                </div>
                <div>
                  <p className="font-medium text-black">Location</p>
                  <p className="text-gray-600">Dallas-Fort Worth, TX</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-5 bg-gray-50 rounded-2xl"
              >
                <div className="w-12 h-12 bg-[#FADADD] rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-black" />
                </div>
                <div>
                  <p className="font-medium text-black">Response Time</p>
                  <p className="text-gray-600">Within 24-48 hours</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-medium text-black mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.instagram.com/chloe_eats_dfw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <Instagram size={20} className="text-white" />
                </motion.a>
                
                <motion.a
                  href="https://www.tiktok.com/@chloe_eats_dfw"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <Play size={20} className="text-white" />
                </motion.a>

                <motion.a
                  href="https://linktr.ee/chloeyun"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <ExternalLink size={20} className="text-white" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 p-8 lg:p-10 rounded-3xl"
          >
            <h3 className="text-2xl font-medium text-black mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your name"
                    required
                    className="bg-white border-gray-200 focus:ring-[#FADADD] focus:border-[#FADADD] rounded-xl h-12"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <Input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Restaurant, café, brand"
                    required
                    className="bg-white border-gray-200 focus:ring-[#FADADD] focus:border-[#FADADD] rounded-xl h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-white border-gray-200 focus:ring-[#FADADD] focus:border-[#FADADD] rounded-xl h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <Select onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger className="bg-white border-gray-200 focus:ring-[#FADADD] focus:border-[#FADADD] rounded-xl h-12">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gift-card">Gift Card / Trade</SelectItem>
                    <SelectItem value="under-500">Under $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="1000-plus">$1,000+</SelectItem>
                    <SelectItem value="discuss">Let's Discuss</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message / Request Type
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell me about your business, what type of collaboration you're interested in, timeline, and any specific ideas you have in mind..."
                  rows={5}
                  required
                  className="bg-white border-gray-200 focus:ring-[#FADADD] focus:border-[#FADADD] rounded-xl resize-none"
                />
              </div>

              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-[#FADADD] hover:bg-[#f9c5c9] text-black rounded-xl py-4 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Send size={18} />
                    <span className="font-medium">Send Message</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-100 rounded-xl py-4 flex items-center justify-center space-x-2"
                  >
                    <a href="mailto:hello@chloeyun.com">
                      <Mail size={18} />
                      <span className="font-medium">Email Directly</span>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </form>

            <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                All inquiries are treated with confidentiality. I'll get back to you 
                within 24-48 hours to discuss your collaboration ideas.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
