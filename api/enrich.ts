// Main enrichment endpoint - fetches restaurant data and updates Notion

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { searchPlace, getPlaceDetails, getPlacePhoto } from './lib/google-places.js';
import { searchBusiness, getBusinessDetails, downloadYelpImage, formatYelpHours } from './lib/yelp.js';
import { uploadImage, generateFilename } from './lib/storage.js';
import {
  fetchPageForEnrichment,
  updatePageWithEnrichment,
  type EnrichmentData,
} from './lib/notion-server.js';

interface EnrichRequest {
  pageId: string;
  forceRefresh?: boolean;
}

interface EnrichResult {
  success: boolean;
  pageId: string;
  placeName: string;
  source: 'google' | 'yelp' | 'none';
  enrichedFields: string[];
  errors: string[];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Verify admin secret (optional security)
  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret && req.headers['x-admin-secret'] !== adminSecret) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const { pageId, forceRefresh } = req.body as EnrichRequest;

    if (!pageId) {
      res.status(400).json({ error: 'pageId is required' });
      return;
    }

    const result = await enrichPlace(pageId, forceRefresh);
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    console.error('Enrichment error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function enrichPlace(pageId: string, forceRefresh = false): Promise<EnrichResult> {
  const result: EnrichResult = {
    success: false,
    pageId,
    placeName: '',
    source: 'none',
    enrichedFields: [],
    errors: [],
  };

  // 1. Fetch the Notion page
  const page = await fetchPageForEnrichment(pageId);
  if (!page) {
    result.errors.push('Failed to fetch Notion page');
    return result;
  }

  result.placeName = page.name;

  // Skip if already has cover image (unless force refresh)
  if (page.coverImage && !forceRefresh) {
    result.errors.push('Page already has a cover image. Use forceRefresh to override.');
    return result;
  }

  // 2. Build search query
  const searchQuery = buildSearchQuery(page.name, page.location);

  // 3. Try Google Places first
  const enrichmentData = await tryGooglePlaces(searchQuery, page.name);

  if (enrichmentData) {
    result.source = 'google';
  } else {
    // 4. Fall back to Yelp
    const yelpData = await tryYelp(page.name, page.location);
    if (yelpData) {
      Object.assign(enrichmentData || {}, yelpData);
      result.source = 'yelp';
    }
  }

  if (!enrichmentData || Object.keys(enrichmentData).length === 0) {
    result.errors.push('Could not find restaurant data from Google Places or Yelp');
    return result;
  }

  // 5. Update Notion with enriched data
  enrichmentData.status = 'Published';

  const updateSuccess = await updatePageWithEnrichment(pageId, enrichmentData);

  if (!updateSuccess) {
    result.errors.push('Failed to update Notion page');
    return result;
  }

  // Track which fields were enriched
  result.enrichedFields = Object.keys(enrichmentData).filter(
    (key) => enrichmentData[key as keyof EnrichmentData] !== undefined
  );
  result.success = true;

  return result;
}

function buildSearchQuery(name: string, location: string): string {
  // Add "Dallas" or "DFW" if no location specified
  if (!location) {
    return `${name} Dallas TX`;
  }

  // Check if location already includes Dallas/DFW
  const locationLower = location.toLowerCase();
  if (locationLower.includes('dallas') || locationLower.includes('dfw') || locationLower.includes('fort worth')) {
    return `${name} ${location}`;
  }

  return `${name} ${location} Dallas TX`;
}

async function tryGooglePlaces(
  searchQuery: string,
  placeName: string
): Promise<EnrichmentData | null> {
  try {
    // Search for the place
    const searchResult = await searchPlace(searchQuery);
    if (!searchResult) {
      console.log('Google Places: No results for', searchQuery);
      return null;
    }

    // Get detailed info
    const details = await getPlaceDetails(searchResult.place_id);
    if (!details) {
      console.log('Google Places: Could not get details for', searchResult.place_id);
      return null;
    }

    const enrichmentData: EnrichmentData = {
      address: details.formatted_address,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      phone: details.formatted_phone_number,
      website: details.website,
      hours: details.opening_hours?.weekday_text?.join('; '),
    };

    // Download and upload cover photo
    if (details.photos?.length) {
      const photoBuffer = await getPlacePhoto(details.photos[0].photo_reference);
      if (photoBuffer) {
        const filename = generateFilename(placeName);
        const imageUrl = await uploadImage(photoBuffer, filename);
        enrichmentData.coverImage = imageUrl;
      }
    }

    return enrichmentData;
  } catch (error) {
    console.error('Google Places error:', error);
    return null;
  }
}

async function tryYelp(
  name: string,
  location: string
): Promise<EnrichmentData | null> {
  try {
    // Search for the business
    const searchResult = await searchBusiness(name, location || 'Dallas, TX');
    if (!searchResult) {
      console.log('Yelp: No results for', name);
      return null;
    }

    // Get detailed info
    const details = await getBusinessDetails(searchResult.id);
    if (!details) {
      console.log('Yelp: Could not get details for', searchResult.id);
      // Use search result data
      const enrichmentData: EnrichmentData = {
        address: searchResult.location.display_address.join(', '),
        latitude: searchResult.coordinates.latitude,
        longitude: searchResult.coordinates.longitude,
        phone: searchResult.display_phone,
      };

      // Download cover image
      if (searchResult.image_url) {
        const imageBuffer = await downloadYelpImage(searchResult.image_url);
        if (imageBuffer) {
          const filename = generateFilename(name);
          const imageUrl = await uploadImage(imageBuffer, filename);
          enrichmentData.coverImage = imageUrl;
        }
      }

      return enrichmentData;
    }

    const enrichmentData: EnrichmentData = {
      address: details.location.display_address.join(', '),
      latitude: details.coordinates.latitude,
      longitude: details.coordinates.longitude,
      phone: details.display_phone,
      hours: formatYelpHours(details.hours),
    };

    // Download cover image (prefer photos array if available)
    const imageUrl = details.photos?.[0] || details.image_url;
    if (imageUrl) {
      const imageBuffer = await downloadYelpImage(imageUrl);
      if (imageBuffer) {
        const filename = generateFilename(name);
        const uploadedUrl = await uploadImage(imageBuffer, filename);
        enrichmentData.coverImage = uploadedUrl;
      }
    }

    return enrichmentData;
  } catch (error) {
    console.error('Yelp error:', error);
    return null;
  }
}
