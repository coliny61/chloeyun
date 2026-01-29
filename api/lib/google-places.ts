// Google Places API client for restaurant data enrichment

export interface PlaceSearchResult {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: { photo_reference: string; height: number; width: number }[];
}

export interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
  opening_hours?: {
    weekday_text: string[];
  };
  photos?: { photo_reference: string; height: number; width: number }[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

function getApiKey(): string {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    throw new Error('GOOGLE_PLACES_API_KEY environment variable is not set');
  }
  return key;
}

export async function searchPlace(query: string): Promise<PlaceSearchResult | null> {
  const apiKey = getApiKey();
  const url = new URL(`${GOOGLE_PLACES_BASE_URL}/textsearch/json`);
  url.searchParams.set('query', query);
  url.searchParams.set('key', apiKey);
  // Bias towards Dallas-Fort Worth area
  url.searchParams.set('location', '32.7767,-96.7970');
  url.searchParams.set('radius', '50000'); // 50km radius

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== 'OK' || !data.results?.length) {
    console.error('Google Places search failed:', data.status, data.error_message);
    return null;
  }

  return data.results[0] as PlaceSearchResult;
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  const apiKey = getApiKey();
  const url = new URL(`${GOOGLE_PLACES_BASE_URL}/details/json`);
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'place_id,name,formatted_address,formatted_phone_number,website,opening_hours,photos,geometry');
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== 'OK' || !data.result) {
    console.error('Google Places details failed:', data.status, data.error_message);
    return null;
  }

  return data.result as PlaceDetails;
}

export async function getPlacePhoto(photoReference: string, maxWidth: number = 1200): Promise<ArrayBuffer | null> {
  const apiKey = getApiKey();
  const url = new URL(`${GOOGLE_PLACES_BASE_URL}/photo`);
  url.searchParams.set('photoreference', photoReference);
  url.searchParams.set('maxwidth', maxWidth.toString());
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());

  if (!response.ok) {
    console.error('Google Places photo failed:', response.status);
    return null;
  }

  return response.arrayBuffer();
}
