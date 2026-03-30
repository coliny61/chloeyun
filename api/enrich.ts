// Enrichment endpoint — fetches restaurant data from Google Places / Yelp
// and updates the Supabase places table

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { searchPlace, getPlaceDetails, getPlacePhoto } from './lib/google-places.js';
import { searchBusiness, getBusinessDetails, downloadYelpImage, formatYelpHours } from './lib/yelp.js';
import { uploadImage, generateFilename } from './lib/storage.js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

interface EnrichRequest {
  placeId: string; // Supabase place UUID
  forceRefresh?: boolean;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword && req.headers['x-admin-password'] !== adminPassword) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const { placeId, forceRefresh } = req.body as EnrichRequest;

    if (!placeId) {
      res.status(400).json({ error: 'placeId is required' });
      return;
    }

    // Fetch the place from Supabase
    const { data: place, error: fetchErr } = await supabase
      .from('places')
      .select('*')
      .eq('id', placeId)
      .single();

    if (fetchErr || !place) {
      res.status(404).json({ error: 'Place not found' });
      return;
    }

    // Skip if already enriched (unless force refresh)
    if (place.cover_image_url && !forceRefresh) {
      res.status(200).json({ success: true, message: 'Already enriched', placeId });
      return;
    }

    const searchQuery = `${place.name} Dallas TX`;
    const updates: Record<string, unknown> = {};
    let source = 'none';

    // Try Google Places first
    try {
      const searchResult = await searchPlace(searchQuery);
      if (searchResult) {
        const details = await getPlaceDetails(searchResult.place_id);
        if (details) {
          source = 'google';
          if (details.formatted_address) updates.address = details.formatted_address;
          if (details.geometry) {
            updates.latitude = details.geometry.location.lat;
            updates.longitude = details.geometry.location.lng;
          }
          if (details.formatted_phone_number) updates.phone = details.formatted_phone_number;
          if (details.website) updates.website = details.website;
          if (details.opening_hours?.weekday_text) {
            updates.hours = details.opening_hours.weekday_text.join('; ');
          }

          // Upload cover photo
          if (details.photos?.length) {
            try {
              const photoBuffer = await getPlacePhoto(details.photos[0].photo_reference);
              if (photoBuffer) {
                const filename = generateFilename(place.name);
                const imageUrl = await uploadImage(photoBuffer, filename);
                updates.cover_image_url = imageUrl;
              }
            } catch (photoErr) {
              console.error('Google photo upload failed:', photoErr);
              updates._photo_error = `google: ${photoErr instanceof Error ? photoErr.message : String(photoErr)}`;
            }
          }
        }
      }
    } catch { /* Google Places failed, try Yelp */ }

    // Fallback to Yelp if Google didn't work
    if (source === 'none') {
      try {
        const searchResult = await searchBusiness(place.name, 'Dallas, TX');
        if (searchResult) {
          source = 'yelp';
          updates.address = searchResult.location.display_address.join(', ');
          updates.latitude = searchResult.coordinates.latitude;
          updates.longitude = searchResult.coordinates.longitude;
          if (searchResult.display_phone) updates.phone = searchResult.display_phone;

          const details = await getBusinessDetails(searchResult.id);
          if (details) {
            if (details.hours) updates.hours = formatYelpHours(details.hours);
            const imageUrl = details.photos?.[0] || details.image_url;
            if (imageUrl) {
              try {
                const imageBuffer = await downloadYelpImage(imageUrl);
                if (imageBuffer) {
                  const filename = generateFilename(place.name);
                  const uploadedUrl = await uploadImage(imageBuffer, filename);
                  updates.cover_image_url = uploadedUrl;
                } else {
                  updates._photo_error = `yelp: download returned null for ${imageUrl}`;
                }
              } catch (photoErr) {
                updates._photo_error = `yelp: ${photoErr instanceof Error ? photoErr.message : String(photoErr)}`;
              }
            } else {
              updates._photo_error = 'yelp: no image URL in business details';
            }
          }
        }
      } catch { /* Yelp failed too */ }
    }

    if (Object.keys(updates).length === 0) {
      res.status(200).json({ success: false, message: 'No enrichment data found', placeId, source });
      return;
    }

    // Only fill fields that are currently empty (don't overwrite manual edits)
    // unless forceRefresh is true
    if (!forceRefresh) {
      for (const key of Object.keys(updates)) {
        if (place[key] !== null && place[key] !== '' && place[key] !== undefined) {
          delete updates[key];
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      res.status(200).json({ success: true, message: 'All fields already populated', placeId, source });
      return;
    }

    // Extract diagnostic before DB update
    const photoError = updates._photo_error as string | undefined;
    delete updates._photo_error;

    // Update place in Supabase
    const { error: updateErr } = await supabase
      .from('places')
      .update(updates)
      .eq('id', placeId);

    if (updateErr) {
      res.status(500).json({ error: 'Failed to update place', details: updateErr.message });
      return;
    }

    res.status(200).json({
      success: true,
      placeId,
      source,
      enrichedFields: Object.keys(updates),
      ...(photoError && { photoError }),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
