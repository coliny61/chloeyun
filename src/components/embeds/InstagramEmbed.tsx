import { useEffect, useRef, useState } from 'react';
import { extractInstagramPostId } from '../../lib/utils';
import Loading from '../ui/Loading';

interface InstagramEmbedProps {
  url: string;
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const postId = extractInstagramPostId(url);

  // Lazy loading: only load embed when scrolled into view
  useEffect(() => {
    if (!postId || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [postId]);

  // Load Instagram embed script only when visible
  useEffect(() => {
    if (!isVisible || !postId) return;

    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existingScript) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      setLoading(false);
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
    script.onerror = () => {
      setError(true);
      setLoading(false);
    };
    document.body.appendChild(script);
  }, [isVisible, postId]);

  if (error || !postId) {
    return (
      <div className="bg-[#FFF5F7] rounded-xl p-8 text-center">
        <p className="text-[#2D2424]">Unable to load Instagram post</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F8A5B8] hover:underline mt-2 inline-block"
        >
          View on Instagram
        </a>
      </div>
    );
  }

  // Placeholder before lazy load
  if (!isVisible) {
    return (
      <div
        ref={sentinelRef}
        className="bg-[#FFF5F7] rounded-xl min-h-[400px] flex items-center justify-center"
      >
        <div className="text-[#F8A5B8]/40 text-sm">Loading...</div>
      </div>
    );
  }

  const embedUrl = url.includes('?') ? url.split('?')[0] : url;

  return (
    <div className="relative" ref={sentinelRef}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FFF5F7] rounded-xl min-h-[400px]">
          <Loading text="Loading Instagram..." />
        </div>
      )}
      <div ref={containerRef} className="flex justify-center">
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={embedUrl}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: '0',
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '540px',
            minWidth: '326px',
            padding: '0',
            width: '99.375%',
          }}
        >
          <div style={{ padding: '16px' }}>
            <a
              href={embedUrl}
              style={{
                background: '#FFFFFF',
                lineHeight: '0',
                padding: '0 0',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%',
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F8A5B8] hover:underline"
            >
              View this post on Instagram
            </a>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
