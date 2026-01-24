import { Client } from '@notionhq/client';
import type { Place, CuisineType, PriceRange } from '../types';

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

interface NotionPageProperties {
  Name: { title: { plain_text: string }[] };
  Address: { rich_text: { plain_text: string }[] };
  Latitude: { number: number };
  Longitude: { number: number };
  'Cuisine Type': { select: { name: string } };
  'Price Range': { select: { name: string } };
  Rating: { number: number };
  'Cover Image': { files: { file?: { url: string }; external?: { url: string } }[] } | { url: string };
  'TikTok URL': { url: string };
  'Instagram URL': { url: string };
  'Review Content': { rich_text: { plain_text: string }[] };
  Featured: { checkbox: boolean };
  Published: { checkbox: boolean };
  Hours?: { rich_text: { plain_text: string }[] };
  Phone?: { phone_number: string };
  Website?: { url: string };
}

interface NotionPage {
  id: string;
  properties: NotionPageProperties;
  created_time: string;
}

interface QueryDatabaseResponse {
  results: NotionPage[];
}

function parseNotionPage(page: NotionPage): Place {
  const props = page.properties;

  let coverImage = '/placeholder-food.jpg';
  const coverProp = props['Cover Image'];
  if (coverProp && 'files' in coverProp && coverProp.files?.length > 0) {
    const file = coverProp.files[0];
    coverImage = file.file?.url || file.external?.url || coverImage;
  } else if (coverProp && 'url' in coverProp) {
    coverImage = coverProp.url;
  }

  return {
    id: page.id,
    name: props.Name?.title?.[0]?.plain_text || 'Unnamed Place',
    address: props.Address?.rich_text?.[0]?.plain_text || '',
    latitude: props.Latitude?.number || 0,
    longitude: props.Longitude?.number || 0,
    cuisineType: (props['Cuisine Type']?.select?.name as CuisineType) || 'Other',
    priceRange: (props['Price Range']?.select?.name as PriceRange) || '$$',
    rating: props.Rating?.number || 0,
    coverImage,
    tikTokUrl: props['TikTok URL']?.url || undefined,
    instagramUrl: props['Instagram URL']?.url || undefined,
    reviewContent: props['Review Content']?.rich_text?.map(t => t.plain_text).join('') || '',
    featured: props.Featured?.checkbox || false,
    published: props.Published?.checkbox || false,
    hours: props.Hours?.rich_text?.[0]?.plain_text,
    phone: props.Phone?.phone_number,
    website: props.Website?.url,
    createdAt: page.created_time,
  };
}

export async function fetchPlaces(): Promise<Place[]> {
  if (!databaseId || !import.meta.env.VITE_NOTION_API_KEY) {
    console.warn('Notion API credentials not configured, using mock data');
    return [];
  }

  try {
    const response = await notion.request({
      path: `databases/${databaseId}/query`,
      method: 'post',
      body: {
        filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: 'Featured',
            direction: 'descending',
          },
          {
            timestamp: 'created_time',
            direction: 'descending',
          },
        ],
      },
    }) as QueryDatabaseResponse;

    return response.results.map((page: NotionPage) => parseNotionPage(page));
  } catch (error) {
    console.error('Error fetching from Notion:', error);
    return [];
  }
}

export async function fetchPlaceById(id: string): Promise<Place | null> {
  if (!import.meta.env.VITE_NOTION_API_KEY) {
    console.warn('Notion API credentials not configured');
    return null;
  }

  try {
    const page = await notion.pages.retrieve({ page_id: id });
    return parseNotionPage(page as unknown as NotionPage);
  } catch (error) {
    console.error('Error fetching place from Notion:', error);
    return null;
  }
}

export async function fetchFeaturedPlaces(): Promise<Place[]> {
  if (!databaseId || !import.meta.env.VITE_NOTION_API_KEY) {
    return [];
  }

  try {
    const response = await notion.request({
      path: `databases/${databaseId}/query`,
      method: 'post',
      body: {
        filter: {
          and: [
            {
              property: 'Published',
              checkbox: { equals: true },
            },
            {
              property: 'Featured',
              checkbox: { equals: true },
            },
          ],
        },
        page_size: 6,
      },
    }) as QueryDatabaseResponse;

    return response.results.map((page: NotionPage) => parseNotionPage(page));
  } catch (error) {
    console.error('Error fetching featured places:', error);
    return [];
  }
}
