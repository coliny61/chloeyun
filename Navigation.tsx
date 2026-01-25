import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Play, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', key: 'home' },
    { name: 'About', key: 'about' },
    { 
      name: 'Portfolio', 
      key: 'portfolio',
      submenu: [
        { name: 'Food Reviews', key: 'food-reviews' },
        { name: 'Events', key: 'events' },
        { name: 'Lifestyle', key: 'lifestyle' }
      ]
    },
    { name: 'Media Kit', key: 'mediakit' },
    { name: 'Contact', key: 'contact' }
  ];

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          currentPage === 'home' && !isScrolled
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              <span className={`text-2xl lg:text-3xl font-normal tracking-tight transition-colors ${
                currentPage === 'home' && !isScrolled ? 'text-black' : 'text-black'
              }`}>
                Chloe Yun
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                item.submenu ? (
                  <div key={item.key} className="relative group">
                    <motion.button
                      whileHover={{ y: -1 }}
                      onClick={() => handleNavClick(item.key)}
                      className={`relative py-2 text-sm font-normal transition-colors duration-200 ${
                        currentPage === item.key || item.submenu.some(sub => currentPage === sub.key)
                          ? 'text-black'
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {item.name}
                      {(currentPage === item.key || item.submenu.some(sub => currentPage === sub.key)) && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FADADD]"
                        />
                      )}
                    </motion.button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.key}
                          onClick={() => handleNavClick(subItem.key)}
                          className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                            currentPage === subItem.key ? 'text-black bg-[#FADADD]/10' : 'text-gray-600'
                          }`}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.button
                    key={item.key}
                    whileHover={{ y: -1 }}
                    onClick={() => handleNavClick(item.key)}
                    className={`relative py-2 text-sm font-normal transition-colors duration-200 ${
                      currentPage === item.key
                        ? 'text-black'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {item.name}
                    {currentPage === item.key && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FADADD]"
                      />
                    )}
                  </motion.button>
                )
              ))}
              
              {/* Search Icon */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                <Search size={18} />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 bg-white/95 backdrop-blur-md"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <input
                  type="text"
                  placeholder="Search restaurants, reviews, brands..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FADADD] focus:border-transparent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black/20" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl"
            >
              <div className="flex flex-col p-6 pt-20">
                {navItems.map((item, index) => (
                  <div key={item.key}>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.key)}
                      className={`w-full text-left py-4 px-2 text-lg transition-colors border-b border-gray-100 ${
                        currentPage === item.key || (item.submenu && item.submenu.some(sub => currentPage === sub.key))
                          ? 'text-black font-medium'
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {item.name}
                    </motion.button>
                    
                    {/* Mobile Submenu */}
                    {item.submenu && (
                      <div className="ml-4 border-b border-gray-100">
                        {item.submenu.map((subItem, subIndex) => (
                          <motion.button
                            key={subItem.key}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (subIndex * 0.05) + 0.1 }}
                            onClick={() => handleNavClick(subItem.key)}
                            className={`w-full text-left py-3 px-2 text-base transition-colors ${
                              currentPage === subItem.key
                                ? 'text-black font-medium'
                                : 'text-gray-500 hover:text-black'
                            }`}
                          >
                            {subItem.name}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-gray-100">
                  <a
                    href="https://www.instagram.com/chloe_eats_dfw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@chloe_eats_dfw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <Play size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}