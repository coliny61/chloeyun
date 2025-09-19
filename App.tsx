import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from "./Navigation";
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import FoodReviews from './components/FoodReviews';
import Events from './components/Events';
import Lifestyle from './components/Lifestyle';
import MediaKit from './components/MediaKit';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Handle page changes
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle navigation from hero page
  const handleHeroNavigation = (page: string) => {
    setCurrentPage(page);
  };

  // Render current page content
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onNavigate={handleHeroNavigation} />;
      case 'about':
        return <About />;
      case 'portfolio':
        return <Portfolio />;
      case 'food-reviews':
        return <FoodReviews />;
      case 'events':
        return <Events />;
      case 'lifestyle':
        return <Lifestyle />;
      case 'mediakit':
        return <MediaKit />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero onNavigate={handleHeroNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Navigation */}
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Page Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>

      {/* Footer - Only show on non-home pages */}
      {currentPage !== 'home' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
