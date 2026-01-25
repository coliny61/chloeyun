import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Play, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6"
          >
            <motion.a
              href="https://www.instagram.com/chloe_eats_dfw/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Instagram size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium">Instagram</span>
            </motion.a>
            
            <motion.a
              href="https://www.tiktok.com/@chloe_eats_dfw"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Play size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium">TikTok</span>
            </motion.a>

            <motion.a
              href="https://linktr.ee/chloeyun"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <ExternalLink size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium">Linktree</span>
            </motion.a>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2"
          >
            <Mail size={16} className="text-gray-600" />
            <a 
              href="mailto:hello@chloeyun.com"
              className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
            >
              hello@chloeyun.com
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm">
              © {currentYear} Chloe Yun
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}