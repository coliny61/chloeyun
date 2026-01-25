import { useState, useEffect } from 'react';
import { getMockEvents } from '../lib/mockData';
import TikTokEmbed from '../components/embeds/TikTokEmbed';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Events() {
  const events = getMockEvents();
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();

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

  // Trigger re-animation when events change
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [events.length]);

  return (
    <div className="min-h-screen bg-[#FFFBFC] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`font-heading text-4xl sm:text-5xl font-bold text-[#4A4A4A] transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Events & Collabs
          </h1>
          <p
            className={`mt-4 text-lg text-[#4A4A4A]/80 max-w-2xl mx-auto transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Beyond food! Check out my adventures at pop-ups, brand collabs, museums, and fun experiences around DFW.
          </p>
        </div>

        {/* Events Grid */}
        <div ref={gridRef}>
          {events.length === 0 ? (
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
              <h3 className="font-heading text-xl font-semibold text-[#4A4A4A] mb-2">No Events Yet</h3>
              <p className="text-[#4A4A4A]/70">Check back soon for exciting events and collaborations!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" key={animationKey}>
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                    isGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: prefersReducedMotion ? '0ms' : `${index * 100}ms`,
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#F8A5B8]/10 text-[#F8A5B8] px-3 py-1 rounded-full text-xs font-medium">
                        Event
                      </span>
                      <span className="text-xs text-[#4A4A4A]/50">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-[#4A4A4A] mb-2">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-[#4A4A4A]/70 text-sm line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                  {event.tikTokUrl && (
                    <div className="border-t border-[#FFF5F7]">
                      <TikTokEmbed url={event.tikTokUrl} />
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
