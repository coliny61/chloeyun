// Server-side Notion API utilities for enrichment workflow

import { Client } from '@notionhq/client';

function getNotionClient() {
  const auth = process.env.NOTION_API_KEY;
  if (!auth) {
    throw new Error('NOTION_API_KEY environment variable is not set');
  }
  return new Client({ auth }) as any;
}

function getDatabaseId(): string {
  const id = process.env.NOTION_DATABASE_ID;
  if (!id) {
    throw new Error('NOTION_DATABASE_ID environment variable is not set');
  }
  return id;
}

export interface NotionPlacePage {
  id: string;
  name: string;
  location: string;
  cuisineType: string;
  priceRange: string;
  rating: number;
  reviewContent: string;
  tikTokUrl?: string;
  instagramUrl?: string;
  status: string;
  // Fields that may already be filled
  address?: string;
  latitude?: number;
  longitude?: number;
  coverImage?: string;
  phone?: string;
  website?: string;
  hours?: string;
}

export async function fetchPageForEnrichment(pageId: string): Promise<NotionPlacePage | null> {
  const notion = getNotionClient();

  try {
    const page = await notion.pages.retrieve({ page_id: pageId }) as any;
    const props = page.properties;

    return {
      id: page.id,
      name: props.Name?.title?.[0]?.plain_text || '',
      location: props.Location?.rich_text?.[0]?.plain_text || '',
      cuisineType: props['Cuisine Type']?.select?.name || '',
      priceRange: props['Price Range']?.select?.name || '',
      rating: props.Rating?.number || 0,
      reviewContent: props['Review Content']?.rich_text?.map((t: any) => t.plain_text).join('') || '',
      tikTokUrl: props['TikTok URL']?.url || undefined,
      instagramUrl: props['Instagram URL']?.url || undefined,
      status: props.Status?.select?.name || 'Draft',
      address: props.Address?.rich_text?.[0]?.plain_text || undefined,
      latitude: props.Latitude?.number || undefined,
      longitude: props.Longitude?.number || undefined,
      coverImage: extractCoverImage(props['Cover Image']),
      phone: props.Phone?.phone_number || undefined,
      website: props.Website?.url || undefined,
      hours: props.Hours?.rich_text?.[0]?.plain_text || undefined,
    };
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
}

function extractCoverImage(coverProp: any): string | undefined {
  if (!coverProp) return undefined;

  if ('files' in coverProp && coverProp.files?.length > 0) {
    const file = coverProp.files[0];
    return file.file?.url || file.external?.url;
  }

  if ('url' in coverProp) {
    return coverProp.url;
  }

  return undefined;
}

export interface EnrichmentData {
  coverImage?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  hours?: string;
  status?: string;
}

export async function updatePageWithEnrichment(
  pageId: string,
  data: EnrichmentData
): Promise<boolean> {
  const notion = getNotionClient();

  try {
    const properties: Record<string, any> = {};

    if (data.coverImage) {
      properties['Cover Image'] = {
        files: [{
          type: 'external',
          name: 'Cover Image',
          external: { url: data.coverImage }
        }]
      };
    }

    if (data.address) {
      properties['Address'] = {
        rich_text: [{ type: 'text', text: { content: data.address } }]
      };
    }

    if (data.latitude !== undefined) {
      properties['Latitude'] = { number: data.latitude };
    }

    if (data.longitude !== undefined) {
      properties['Longitude'] = { number: data.longitude };
    }

    if (data.phone) {
      properties['Phone'] = { phone_number: data.phone };
    }

    if (data.website) {
      properties['Website'] = { url: data.website };
    }

    if (data.hours) {
      properties['Hours'] = {
        rich_text: [{ type: 'text', text: { content: data.hours } }]
      };
    }

    if (data.status) {
      properties['Status'] = { select: { name: data.status } };
    }

    await notion.pages.update({
      page_id: pageId,
      properties,
    });

    return true;
  } catch (error) {
    console.error('Error updating Notion page:', error);
    return false;
  }
}

export interface PendingPlace {
  id: string;
  name: string;
  location: string;
  status: string;
  hasCoverImage: boolean;
}

export async function fetchPendingEnrichment(): Promise<PendingPlace[]> {
  const notion = getNotionClient();
  const databaseId = getDatabaseId();

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Ready to Enrich',
        },
      },
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      const coverProp = props['Cover Image'];
      const hasCoverImage = coverProp &&
        (('files' in coverProp && coverProp.files?.length > 0) ||
         ('url' in coverProp && coverProp.url));

      return {
        id: page.id,
        name: props.Name?.title?.[0]?.plain_text || 'Unnamed',
        location: props.Location?.rich_text?.[0]?.plain_text || '',
        status: props.Status?.select?.name || 'Draft',
        hasCoverImage: !!hasCoverImage,
      };
    });
  } catch (error) {
    console.error('Error fetching pending places:', error);
    return [];
  }
}

export async function fetchAllPlacesForAdmin(): Promise<PendingPlace[]> {
  const notion = getNotionClient();
  const databaseId = getDatabaseId();

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
      page_size: 50,
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      const coverProp = props['Cover Image'];
      const hasCoverImage = coverProp &&
        (('files' in coverProp && coverProp.files?.length > 0) ||
         ('url' in coverProp && coverProp.url));

      return {
        id: page.id,
        name: props.Name?.title?.[0]?.plain_text || 'Unnamed',
        location: props.Location?.rich_text?.[0]?.plain_text || '',
        status: props.Status?.select?.name || 'Draft',
        hasCoverImage: !!hasCoverImage,
      };
    });
  } catch (error) {
    console.error('Error fetching all places:', error);
    return [];
  }
}
