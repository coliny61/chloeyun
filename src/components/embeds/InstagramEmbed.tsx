import { useEffect, useRef, useState } from 'react';
import { extractInstagramPostId } from '../../lib/utils';

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

function InstagramFallbackCard({ url, postId }: { url: string; postId: string }) {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = `https://www.instagram.com/p/${postId}/media/?size=l`;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#FFF5F7] to-[#FFE4E9] aspect-[9/16] min-h-[400px] max-h-[500px]">
      {!imgError && (
        <img
          src={thumbnailUrl}
          alt="Instagram post"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
          <svg className="w-8 h-8 text-[#F8A5B8]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </div>
        <p className="text-[#2D2424]/70 text-sm mb-4 text-center drop-shadow-sm">
          {imgError ? 'View on Instagram' : 'Tap to view on Instagram'}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#F8A5B8] text-white rounded-full font-medium hover:bg-[#E8919F] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          View on Instagram
        </a>
      </div>
    </div>
  );
}

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);
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

    const tryProcess = () => {
      setLoading(false);
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existingScript) {
      tryProcess();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = tryProcess;
      script.onerror = () => {
        setError(true);
        setLoading(false);
      };
      document.body.appendChild(script);
    }
  }, [isVisible, postId]);

  // 5-second timeout: if embed.js hasn't processed the blockquote into an iframe, show fallback
  useEffect(() => {
    if (loading || error || embedFailed || !isVisible || !postId) return;

    const timeout = setTimeout(() => {
      if (!containerRef.current) return;
      const iframe = containerRef.current.querySelector('iframe');
      if (!iframe) {
        setEmbedFailed(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [loading, error, embedFailed, isVisible, postId]);

  if (!postId) {
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

  if (error || embedFailed) {
    return <InstagramFallbackCard url={url} postId={postId} />;
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
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-3 border-[#F8A5B8] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-[#2D2424]/60 text-sm">Loading Instagram...</p>
          </div>
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
