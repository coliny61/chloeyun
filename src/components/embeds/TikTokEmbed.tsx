import { useEffect, useRef, useState } from 'react';
import Loading from '../ui/Loading';

interface TikTokEmbedProps {
  url: string;
}

interface OEmbedData {
  title: string;
  author_name: string;
  thumbnail_url: string;
  html: string;
}

// Global script tracking
let scriptLoaded = false;
const scriptCallbacks: (() => void)[] = [];

function loadTikTokScript(callback: () => void) {
  if (scriptLoaded) {
    callback();
    return;
  }

  scriptCallbacks.push(callback);

  if (document.querySelector('script[src*="tiktok.com/embed.js"]')) {
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://www.tiktok.com/embed.js';
  script.async = true;
  script.onload = () => {
    scriptLoaded = true;
    scriptCallbacks.forEach(cb => cb());
    scriptCallbacks.length = 0;
  };
  script.onerror = () => {
    scriptCallbacks.forEach(cb => cb());
    scriptCallbacks.length = 0;
  };
  document.body.appendChild(script);
}

function reprocessEmbeds() {
  const win = window as unknown as { tiktokEmbed?: { lib?: { render?: (elements: NodeListOf<Element>) => void } } };
  if (win.tiktokEmbed?.lib?.render) {
    const embeds = document.querySelectorAll('.tiktok-embed:not([data-rendered])');
    if (embeds.length > 0) {
      win.tiktokEmbed.lib.render(embeds);
    }
  }
}

// Fetch with timeout helper
async function fetchWithTimeout(url: string, timeout = 5000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// Fetch oEmbed data - tries our API first, falls back to direct TikTok API
async function fetchOEmbedData(url: string): Promise<OEmbedData | null> {
  // Try our server-side API first (works in production and vercel dev)
  try {
    const response = await fetchWithTimeout(`/api/tiktok-oembed?url=${encodeURIComponent(url)}`, 5000);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // API not available, fall through to direct call
  }

  // Fallback: Call TikTok's oEmbed API directly (works in npm run dev)
  // TikTok allows CORS for their oEmbed endpoint
  try {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    const response = await fetchWithTimeout(oembedUrl, 8000);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Failed to fetch TikTok oEmbed:', err);
  }

  return null;
}

export default function TikTokEmbed({ url }: TikTokEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [embedData, setEmbedData] = useState<OEmbedData | null>(null);
  const [error, setError] = useState(false);
  const [isPlaying] = useState(false);
  const [embedReady, setEmbedReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch oEmbed data
  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const data = await fetchOEmbedData(url);
      if (data) {
        setEmbedData(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  // Load and render TikTok embed when user clicks play
  useEffect(() => {
    if (!isPlaying || !embedData?.html) return;

    loadTikTokScript(() => {
      setTimeout(() => {
        reprocessEmbeds();
        setEmbedReady(true);
      }, 300);
    });
  }, [isPlaying, embedData]);

  const handlePlay = () => {
    // Open TikTok in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!url) {
    return null;
  }

  // Loading state - consistent height with thumbnail state
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-xl aspect-[9/16] min-h-[400px] max-h-[500px] animate-shimmer">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-3 border-[#F8A5B8] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-[#4A4A4A]/60 text-sm">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state - consistent height, show link to TikTok
  if (error || !embedData) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#FFF5F7] to-[#FFE4E9] aspect-[9/16] min-h-[400px] max-h-[500px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
            <svg className="w-8 h-8 text-[#F8A5B8]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
          </div>
          <p className="text-[#4A4A4A]/70 text-sm mb-4 text-center">Watch on TikTok</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#F8A5B8] text-white rounded-full font-medium hover:bg-[#f78fa3] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Open TikTok
          </a>
        </div>
      </div>
    );
  }

  // Playing state - show TikTok embed
  if (isPlaying) {
    return (
      <div className="relative">
        {/* Show loading overlay until embed is ready */}
        {!embedReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black rounded-xl">
            <img
              src={embedData.thumbnail_url}
              alt={embedData.title}
              className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-50"
            />
            <div className="relative z-10">
              <Loading text="Loading video..." />
            </div>
          </div>
        )}

        {/* TikTok embed */}
        <div
          ref={containerRef}
          className="flex justify-center min-h-[500px]"
          dangerouslySetInnerHTML={{ __html: embedData.html }}
        />
      </div>
    );
  }

  // Thumbnail state - show cover photo with play button
  return (
    <div
      className="relative cursor-pointer group"
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
      aria-label={`Play TikTok video: ${embedData.title}`}
    >
      {/* Fixed height container for consistent grid alignment */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black aspect-[9/16] min-h-[400px] max-h-[500px]">
        {/* Thumbnail image with smart cropping */}
        <img
          src={embedData.thumbnail_url}
          alt={embedData.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay - improved for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

        {/* Play button - centered with improved styling */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white backdrop-blur-sm">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#fe2c55] ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* TikTok logo - top right */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
            <span className="text-white text-xs font-medium">TikTok</span>
          </div>
        </div>

        {/* Video info - bottom with improved layout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <p className="text-white font-semibold text-sm line-clamp-2 mb-1 drop-shadow-lg">
            {embedData.title}
          </p>
          <p className="text-white/80 text-xs drop-shadow-lg">
            @{embedData.author_name}
          </p>
        </div>
      </div>
    </div>
  );
}
