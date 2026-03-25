import { useState, useMemo, useEffect, useRef } from 'react';
import { useVlogs } from '../hooks/useSupabase';
import TikTokEmbed from '../components/embeds/TikTokEmbed';
import InstagramEmbed from '../components/embeds/InstagramEmbed';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Vlog() {
  usePageMeta(
    'Vlog | Chloe Eats DFW',
    'Behind the scenes, travel adventures, day-in-my-life content, and personal moments from Chloe Yun.'
  );
  const { vlogs, loading } = useVlogs();
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true);
      return;
    }
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Dynamic city tabs — generated from data
  const cityTabs = useMemo(() => {
    const cities = new Set<string>();
    vlogs.forEach((vlog) => {
      if (vlog.city) cities.add(vlog.city);
    });
    return ['All', ...Array.from(cities).sort()];
  }, [vlogs]);

  // Filter vlogs by selected city
  const filteredVlogs = useMemo(() => {
    if (cityFilter === 'All') return vlogs;
    return vlogs.filter((vlog) => vlog.city === cityFilter);
  }, [vlogs, cityFilter]);

  // Reset filter if selected city no longer exists in data
  useEffect(() => {
    if (cityFilter !== 'All' && !cityTabs.includes(cityFilter)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCityFilter('All');
    }
  }, [cityTabs, cityFilter]);

  // Trigger re-animation when filter changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimationKey((prev) => prev + 1);
  }, [cityFilter]);

  // Update animated tab indicator position
  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(
        `[data-city="${cityFilter}"]`
      ) as HTMLButtonElement;
      if (activeButton) {
        setIndicatorStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    }
  }, [cityFilter, cityTabs]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`font-heading text-4xl sm:text-5xl font-bold text-[#2D2424] transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Vlog
          </h1>
          <p
            className={`mt-4 text-lg text-[#2D2424]/70 max-w-2xl mx-auto transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Behind the scenes, day-in-my-life content, travel adventures, and more personal moments.
          </p>
        </div>

        {/* Dynamic City Filter Tabs */}
        {cityTabs.length > 1 && (
          <div
            className={`flex justify-center mb-8 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            <div
              ref={tabsRef}
              className="relative flex items-center gap-1 bg-[#FFF5F7] rounded-lg p-1 overflow-x-auto"
            >
              {/* Animated indicator */}
              <div
                className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />

              {cityTabs.map((city) => (
                <button
                  key={city}
                  data-city={city}
                  onClick={() => setCityFilter(city)}
                  className={`relative z-10 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    cityFilter === city
                      ? 'text-[#F8A5B8]'
                      : 'text-[#2D2424] hover:text-[#F8A5B8]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Vlogs Grid */}
        <div ref={gridRef}>
          {!loading && filteredVlogs.length === 0 ? (
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
              <h3 className="font-heading text-xl font-semibold text-[#2D2424] mb-2">
                {cityFilter === 'All' ? 'No Vlogs Yet' : `No ${cityFilter} vlogs yet`}
              </h3>
              <p className="text-[#2D2424]/60">Check back soon for new vlog content!</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8" key={animationKey}>
              {filteredVlogs.map((vlog, index) => (
                <div
                  key={vlog.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full max-w-sm ${
                    isGridVisible && !prefersReducedMotion
                      ? 'animate-slide-up-fade'
                      : prefersReducedMotion
                      ? ''
                      : 'opacity-0'
                  }`}
                  style={
                    !prefersReducedMotion
                      ? { animationDelay: `${index * 100}ms`, animationFillMode: 'both' }
                      : undefined
                  }
                >
                  {/* TikTok embed — inline, lazy-loaded */}
                  {vlog.tikTokUrl && (
                    <div className="flex-shrink-0">
                      <TikTokEmbed url={vlog.tikTokUrl} />
                    </div>
                  )}
                  {/* Instagram embed fallback */}
                  {!vlog.tikTokUrl && vlog.instagramUrl && (
                    <div className="flex-shrink-0">
                      <InstagramEmbed url={vlog.instagramUrl} />
                    </div>
                  )}
                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    {vlog.city && (
                      <div className="mb-3">
                        <span className="bg-[#F8A5B8]/10 text-[#F8A5B8] px-3 py-1 rounded-full text-xs font-medium">
                          {vlog.city}
                        </span>
                      </div>
                    )}
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#2D2424] mb-2 line-clamp-2">
                      {vlog.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
