import { useEffect, useRef, useState } from 'react';
import Loading from '../ui/Loading';

interface TikTokEmbedProps {
  url: string;
}

// Global flag to track if script is loading/loaded
let scriptLoading = false;
let scriptLoaded = false;
const callbacks: (() => void)[] = [];

function loadTikTokScript(callback: () => void) {
  if (scriptLoaded) {
    callback();
    return;
  }

  callbacks.push(callback);

  if (scriptLoading) {
    return;
  }

  scriptLoading = true;

  const script = document.createElement('script');
  script.src = 'https://www.tiktok.com/embed.js';
  script.async = true;
  script.onload = () => {
    scriptLoaded = true;
    scriptLoading = false;
    callbacks.forEach(cb => cb());
    callbacks.length = 0;
  };
  script.onerror = () => {
    scriptLoading = false;
    callbacks.forEach(cb => cb());
    callbacks.length = 0;
  };
  document.body.appendChild(script);
}

function reprocessEmbeds() {
  // TikTok's embed.js exposes this on window
  if ((window as unknown as { tiktokEmbed?: { lib?: { render?: (elements: NodeListOf<Element>) => void } } }).tiktokEmbed?.lib?.render) {
    const embeds = document.querySelectorAll('.tiktok-embed:not([data-rendered])');
    if (embeds.length > 0) {
      (window as unknown as { tiktokEmbed: { lib: { render: (elements: NodeListOf<Element>) => void } } }).tiktokEmbed.lib.render(embeds);
    }
  }
}

export default function TikTokEmbed({ url }: TikTokEmbedProps) {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const processedRef = useRef(false);

  useEffect(() => {
    if (!url || processedRef.current) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      loadTikTokScript(() => {
        // Give time for initial processing
        setTimeout(() => {
          reprocessEmbeds();
          processedRef.current = true;
          setLoading(false);
        }, 500);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [url]);

  if (!url) {
    return null;
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FFF5F7] rounded-xl min-h-[400px] z-10">
          <Loading text="Loading TikTok..." />
        </div>
      )}
      <div ref={containerRef} className="flex justify-center min-h-[400px]">
        <blockquote
          className="tiktok-embed"
          cite={url}
          data-video-id=""
          style={{ maxWidth: '605px', minWidth: '325px' }}
        >
          <section>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={url}
              className="text-[#F8A5B8] hover:underline"
            >
              Watch on TikTok
            </a>
          </section>
        </blockquote>
      </div>
    </div>
  );
}
