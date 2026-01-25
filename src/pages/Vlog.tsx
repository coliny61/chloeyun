import { useState, useMemo, useEffect, useRef } from 'react';
import { getMockVlogPosts } from '../lib/mockData';
import TikTokEmbed from '../components/embeds/TikTokEmbed';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Vlog() {
  const vlogs = getMockVlogPosts();
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const { ref: gridRef, isVisible: isGridVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Fixed filter categories
  const filterCategories = ['All', 'DFW', 'NYC', 'Travel'];

  // Filter vlogs by category
  const filteredVlogs = useMemo(() => {
    if (cityFilter === 'All') return vlogs;
    if (cityFilter === 'Travel') {
      // Travel includes everything except DFW and NYC
      return vlogs.filter(vlog => vlog.city && vlog.city !== 'DFW' && vlog.city !== 'NYC');
    }
    return vlogs.filter(vlog => vlog.city === cityFilter);
  }, [vlogs, cityFilter]);

  // Trigger re-animation when filter changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [cityFilter]);

  // Update indicator position when filter changes
  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(`[data-city="${cityFilter}"]`) as HTMLButtonElement;
      if (activeButton) {
        setIndicatorStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    }
  }, [cityFilter]);

  const handleFilterChange = (city: string) => {
    setCityFilter(city);
  };

  return (
    <div className="min-h-screen bg-[#FFFBFC] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`font-heading text-4xl sm:text-5xl font-bold text-[#4A4A4A] transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Vlog
          </h1>
          <p
            className={`mt-4 text-lg text-[#4A4A4A]/80 max-w-2xl mx-auto transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Behind the scenes, day-in-my-life content, travel adventures, and more personal moments.
          </p>
        </div>

        {/* City Filter Tabs with Animated Indicator */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          <div
            ref={tabsRef}
            className="relative flex items-center gap-1 bg-[#FFF5F7] rounded-lg p-1"
          >
            {/* Animated indicator */}
            <div
              className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-out"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
            />

            {filterCategories.map((category) => (
              <button
                key={category}
                data-city={category}
                onClick={() => handleFilterChange(category)}
                className={`relative z-10 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  cityFilter === category
                    ? 'text-[#F8A5B8]'
                    : 'text-[#4A4A4A] hover:text-[#F8A5B8]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Vlogs Grid */}
        <div ref={gridRef}>
          {filteredVlogs.length === 0 ? (
            <div
              className={`text-center py-16 transition-all duration-700 ${
                isGridVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="w-24 h-24 bg-[#FFF5F7] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#F8A5B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#4A4A4A] mb-2">No Vlogs Yet</h3>
              <p className="text-[#4A4A4A]/70">Check back soon for new vlog content!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" key={animationKey}>
              {filteredVlogs.map((vlog, index) => (
                <div
                  key={vlog.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                    isGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: prefersReducedMotion ? '0ms' : `${index * 100}ms`,
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {vlog.city && (
                        <span className="bg-[#F8A5B8]/10 text-[#F8A5B8] px-3 py-1 rounded-full text-xs font-medium">
                          {vlog.city}
                        </span>
                      )}
                      <span className="text-xs text-[#4A4A4A]/50">
                        {new Date(vlog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-[#4A4A4A] mb-2">
                      {vlog.title}
                    </h3>
                    {vlog.description && (
                      <p className="text-[#4A4A4A]/70 text-sm line-clamp-2">
                        {vlog.description}
                      </p>
                    )}
                  </div>
                  {vlog.tikTokUrl && (
                    <div className="border-t border-[#FFF5F7]">
                      <TikTokEmbed url={vlog.tikTokUrl} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
