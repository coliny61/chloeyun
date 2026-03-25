import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LogoFull } from '../ui/Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Food Spots', path: '/food-spots' },
  { name: 'Events', path: '/events' },
  { name: 'Vlog', path: '/vlog' },
  { name: 'About', path: '/about' },
  { name: 'Media Kit', path: '/media-kit' },
  { name: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" aria-label="Chloe Eats DFW — Home">
            <LogoFull />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[#F8A5B8]'
                    : 'text-[#2D2424] hover:text-[#F8A5B8]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/food-spots"
              className="bg-[#F8A5B8] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#E8919F] transition-colors"
            >
              Find Food
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#2D2424] hover:bg-[#FFF5F7]"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#FFF5F7]" role="menu">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#FFF5F7] text-[#F8A5B8]'
                      : 'text-[#2D2424] hover:bg-[#FFF5F7]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/food-spots"
                onClick={() => setIsOpen(false)}
                className="mx-4 mt-2 bg-[#F8A5B8] text-white px-5 py-3 rounded-full text-center font-medium hover:bg-[#E8919F] transition-colors"
              >
                Find Food
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
