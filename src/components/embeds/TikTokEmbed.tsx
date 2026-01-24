import { useEffect, useRef, useState } from 'react';
import { extractTikTokVideoId } from '../../lib/utils';
import Loading from '../ui/Loading';

interface TikTokEmbedProps {
  url: string;
}

export default function TikTokEmbed({ url }: TikTokEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const videoId = extractTikTokVideoId(url);

  useEffect(() => {
    if (!videoId) {
      setError(true);
      setLoading(false);
      return;
    }

    // Load TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = () => {
      setLoading(false);
    };
    script.onerror = () => {
      setError(true);
      setLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [videoId]);

  if (error || !videoId) {
    return (
      <div className="bg-[#FFF9E6] rounded-xl p-8 text-center">
        <p className="text-[#6B5B5B]">Unable to load TikTok video</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF6B6B] hover:underline mt-2 inline-block"
        >
          Watch on TikTok
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FFF9E6] rounded-xl">
          <Loading text="Loading TikTok..." />
        </div>
      )}
      <div ref={containerRef} className="flex justify-center">
        <blockquote
          className="tiktok-embed"
          cite={url}
          data-video-id={videoId}
          style={{ maxWidth: '605px', minWidth: '325px' }}
        >
          <section>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={url}
              className="text-[#FF6B6B] hover:underline"
            >
              Watch on TikTok
            </a>
          </section>
        </blockquote>
      </div>
    </div>
  );
}
