// TikTok oEmbed API endpoint - resolves shortened URLs and gets embed data

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface TikTokOEmbedResponse {
  version: string;
  type: string;
  title: string;
  author_url: string;
  author_name: string;
  width: string;
  height: string;
  html: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  provider_url: string;
  provider_name: string;
}

interface CachedEmbed {
  data: TikTokOEmbedResponse;
  timestamp: number;
}

// Simple in-memory cache (resets on cold start, but helps during warm instances)
const cache = new Map<string, CachedEmbed>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const url = req.query.url as string;

  if (!url) {
    res.status(400).json({ error: 'url parameter is required' });
    return;
  }

  // Validate it's a TikTok URL
  if (!url.includes('tiktok.com')) {
    res.status(400).json({ error: 'Invalid TikTok URL' });
    return;
  }

  // Check cache
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    res.setHeader('X-Cache', 'HIT');
    res.status(200).json(cached.data);
    return;
  }

  try {
    // First, resolve shortened URLs by following redirects
    let resolvedUrl = url;
    if (url.includes('/t/')) {
      const resolveResponse = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
      });
      resolvedUrl = resolveResponse.url;
    }

    // Call TikTok's oEmbed API
    const oembedUrl = new URL('https://www.tiktok.com/oembed');
    oembedUrl.searchParams.set('url', resolvedUrl);

    const response = await fetch(oembedUrl.toString());

    if (!response.ok) {
      console.error('TikTok oEmbed failed:', response.status);
      res.status(response.status).json({
        error: 'TikTok oEmbed request failed',
        status: response.status
      });
      return;
    }

    const data = await response.json() as TikTokOEmbedResponse;

    // Cache the result
    cache.set(url, { data, timestamp: Date.now() });

    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).json(data);
  } catch (error) {
    console.error('TikTok oEmbed error:', error);
    res.status(500).json({
      error: 'Failed to fetch TikTok embed data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
