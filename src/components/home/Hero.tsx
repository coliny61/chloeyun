import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { useCounter } from '../../hooks/useCounter';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function AnimatedStat({ value, suffix, label, delay }: AnimatedStatProps) {
  const [shouldStart, setShouldStart] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldStart(true);
      return;
    }
    const timer = setTimeout(() => setShouldStart(true), 800 + delay);
    return () => clearTimeout(timer);
  }, [delay, prefersReducedMotion]);

  const { value: animatedValue } = useCounter({
    end: value,
    duration: 1500,
    suffix,
    shouldStart,
  });

  return (
    <div>
      <p className="text-2xl font-bold text-[#F8A5B8]">{animatedValue}</p>
      <p className="text-sm text-[#2D2424]/70">{label}</p>
    </div>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true);
      return;
    }
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F7] via-[#FAF6F0] to-[#FDD5DD]/30" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F8A5B8' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated decorative blobs - parallax effect */}
      <div
        className={`absolute -top-20 -right-20 w-96 h-96 bg-[#F8A5B8]/10 rounded-full blur-3xl transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
        style={{ animationDelay: '0.2s' }}
      />
      <div
        className={`absolute top-1/2 -left-32 w-72 h-72 bg-[#FDD5DD]/30 rounded-full blur-3xl animate-float transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
        style={{ animationDelay: '0.4s' }}
      />
      <div
        className={`absolute bottom-20 right-1/4 w-48 h-48 bg-[#F8A5B8]/15 rounded-full blur-2xl animate-float transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ animationDelay: '1.5s' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Animated heading */}
            <h1
              className={`font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2424] leading-tight transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Your Next Favorite
              <span className="block gradient-text-animated">DFW Food Spot</span>
            </h1>

            {/* Animated description */}
            <p
              className={`mt-6 text-lg sm:text-xl text-[#2D2424]/80 max-w-lg mx-auto lg:mx-0 transition-all duration-700 delay-150 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              I'm Chloe — a Dallas-Fort Worth food content creator helping you find the best
              hidden gems, viral eats, and must-try restaurants across the Metroplex.
            </p>

            {/* Animated buttons */}
            <div
              className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <Link to="/food-spots">
                <Button size="lg" className="group">
                  <span>Explore the Food Map</span>
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link to="/media-kit">
                <Button variant="outline" size="lg">
                  Media Kit
                </Button>
              </Link>
            </div>

            {/* Social links */}
            <div
              className={`mt-6 flex items-center gap-4 justify-center lg:justify-start transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <a
                href="https://www.tiktok.com/@chloe_yun"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                aria-label="Follow on TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
                TikTok
              </a>
              <a
                href="https://www.instagram.com/chloe_eats_dfw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                aria-label="Follow on Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            </div>

            {/* Animated social proof */}
            <div
              className={`mt-12 flex items-center gap-8 justify-center lg:justify-start transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <AnimatedStat value={27} suffix="K+" label="TikTok Followers" delay={0} />
              <div className="w-px h-12 bg-[#2D2424]/20" />
              <AnimatedStat value={1.6} suffix="M+" label="TikTok Likes" delay={150} />
              <div className="w-px h-12 bg-[#2D2424]/20" />
              <AnimatedStat value={2.8} suffix="M+" label="Views in 2025" delay={300} />
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative z-10">
              <img
                src="/images/chloe/pizza-happiness.jpg"
                alt="Chloe with pizza - happiness"
                className="rounded-3xl shadow-2xl w-full object-cover object-top aspect-[4/5] hover:shadow-3xl transition-shadow duration-500"
              />

              {/* Floating card with animation */}
              <div
                className={`absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-[200px] animate-float transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8A5B8] to-[#E8899C] flex items-center justify-center text-white text-lg font-semibold shadow-md">
                    C
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D2424] text-sm">Chloe's Pick</p>
                    <p className="text-xs text-[#2D2424]/70">Updated Daily</p>
                  </div>
                </div>
              </div>

              {/* Additional floating badge */}
              <div
                className={`absolute -top-4 -right-4 bg-white rounded-full shadow-lg p-3 animate-float transition-all duration-700 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{ transitionDelay: '1000ms', animationDelay: '0.5s' }}
              >
                <span className="text-2xl">🍜</span>
              </div>
            </div>

            {/* Decorative blobs behind image */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#F8A5B8]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#FDD5DD]/40 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
