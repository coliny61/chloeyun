// Yelp Fusion API client (fallback for when Google Places doesn't find results)

export interface YelpBusiness {
  id: string;
  name: string;
  image_url: string;
  url: string;
  phone: string;
  display_phone: string;
  location: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip_code: string;
    display_address: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  photos?: string[];
  hours?: {
    open: {
      day: number;
      start: string;
      end: string;
    }[];
  }[];
}

const YELP_BASE_URL = 'https://api.yelp.com/v3';

function getApiKey(): string {
  const key = process.env.YELP_API_KEY;
  if (!key) {
    throw new Error('YELP_API_KEY environment variable is not set');
  }
  return key;
}

export async function searchBusiness(name: string, location: string): Promise<YelpBusiness | null> {
  const apiKey = getApiKey();
  const url = new URL(`${YELP_BASE_URL}/businesses/search`);
  url.searchParams.set('term', name);
  url.searchParams.set('location', location || 'Dallas, TX');
  url.searchParams.set('limit', '1');

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    console.error('Yelp search failed:', response.status);
    return null;
  }

  const data = await response.json();

  if (!data.businesses?.length) {
    return null;
  }

  return data.businesses[0] as YelpBusiness;
}

export async function getBusinessDetails(businessId: string): Promise<YelpBusiness | null> {
  const apiKey = getApiKey();
  const url = `${YELP_BASE_URL}/businesses/${businessId}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    console.error('Yelp details failed:', response.status);
    return null;
  }

  return response.json() as Promise<YelpBusiness>;
}

export async function downloadYelpImage(imageUrl: string): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error('Yelp image download failed:', response.status);
      return null;
    }
    return response.arrayBuffer();
  } catch (error) {
    console.error('Yelp image download error:', error);
    return null;
  }
}

export function formatYelpHours(hours?: YelpBusiness['hours']): string | undefined {
  if (!hours?.length || !hours[0].open?.length) {
    return undefined;
  }

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const openHours = hours[0].open;

  // Group by time range
  const grouped: Record<string, number[]> = {};
  for (const h of openHours) {
    const timeRange = `${formatTime(h.start)}-${formatTime(h.end)}`;
    if (!grouped[timeRange]) {
      grouped[timeRange] = [];
    }
    grouped[timeRange].push(h.day);
  }

  // Format output
  const parts: string[] = [];
  for (const [timeRange, days] of Object.entries(grouped)) {
    const sortedDays = days.sort((a, b) => a - b);
    const dayStr = sortedDays.length > 2
      ? `${dayNames[sortedDays[0]]}-${dayNames[sortedDays[sortedDays.length - 1]]}`
      : sortedDays.map(d => dayNames[d]).join(', ');
    parts.push(`${dayStr}: ${timeRange}`);
  }

  return parts.join('; ');
}

function formatTime(time: string): string {
  const hour = parseInt(time.slice(0, 2), 10);
  const minute = time.slice(2);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return minute === '00' ? `${displayHour}${period}` : `${displayHour}:${minute}${period}`;
}
