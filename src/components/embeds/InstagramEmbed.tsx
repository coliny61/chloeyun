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
  const containerRef = useRef<HTMLDivElement>(null);

  const postId = extractInstagramPostId(url);

  useEffect(() => {
    if (!postId) {
      setError(true);
      setLoading(false);
      return;
    }

    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      setLoading(false);
      // Process the embed after script loads
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
    script.onerror = () => {
      setError(true);
      setLoading(false);
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existingScript) {
      setLoading(false);
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    } else {
      document.body.appendChild(script);
    }

    return () => {
      // Don't remove script on unmount to prevent reload issues
    };
  }, [postId]);

  if (error || !postId) {
    return (
      <div className="bg-[#FFF9E6] rounded-xl p-8 text-center">
        <p className="text-[#6B5B5B]">Unable to load Instagram post</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF6B6B] hover:underline mt-2 inline-block"
        >
          View on Instagram
        </a>
      </div>
    );
  }

  // Normalize URL for embedding (ensure it ends without query params)
  const embedUrl = url.includes('?') ? url.split('?')[0] : url;

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FFF9E6] rounded-xl min-h-[400px]">
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
              className="text-[#FF6B6B] hover:underline"
            >
              View this post on Instagram
            </a>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
