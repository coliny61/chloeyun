import { useState, useEffect } from 'react';
import { useEvents } from '../hooks/useSupabase';
import TikTokEmbed from '../components/embeds/TikTokEmbed';
import InstagramEmbed from '../components/embeds/InstagramEmbed';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Events() {
  usePageMeta(
    'Events & Collabs | Chloe Eats DFW',
    'Food festivals, pop-ups, brand collaborations, and fun experiences covered by Chloe in Dallas-Fort Worth.'
  );
  const { events, loading } = useEvents();
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`font-heading text-4xl sm:text-5xl font-bold text-[#2D2424] transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Events & Collabs
          </h1>
          <p
            className={`mt-4 text-lg text-[#2D2424]/70 max-w-2xl mx-auto transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Food festivals, pop-ups, brand collabs, and fun experiences around DFW.
          </p>
        </div>

        {/* Events Grid */}
        <div ref={gridRef}>
          {!loading && events.length === 0 ? (
            <div
              className={`text-center py-16 transition-all duration-700 ${
                isGridVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="w-24 h-24 bg-[#FFF5F7] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#F8A5B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#2D2424] mb-2">No Events Yet</h3>
              <p className="text-[#2D2424]/60">Check back soon for exciting events and collaborations!</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {events.map((event, index) => (
                <div
                  key={event.id}
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
                  {event.tikTokUrl && (
                    <div className="flex-shrink-0">
                      <TikTokEmbed url={event.tikTokUrl} />
                    </div>
                  )}
                  {/* Instagram embed — inline, lazy-loaded */}
                  {!event.tikTokUrl && event.instagramUrl && (
                    <div className="flex-shrink-0">
                      <InstagramEmbed url={event.instagramUrl} />
                    </div>
                  )}
                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#F8A5B8]/10 text-[#F8A5B8] px-3 py-1 rounded-full text-xs font-medium">
                        Event
                      </span>
                      {event.event_date && (
                        <span className="text-[#2D2424]/50 text-xs">
                          {new Date(event.event_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#2D2424] mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-[#2D2424]/60 text-sm line-clamp-2 mt-auto">
                        {event.description}
                      </p>
                    )}
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
