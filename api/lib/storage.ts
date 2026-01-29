// Vercel Blob storage utilities for image uploads

import { put } from '@vercel/blob';

export function generateFilename(placeName: string): string {
  // Create a URL-safe slug from the place name
  const slug = placeName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);

  // Add timestamp to ensure uniqueness
  const timestamp = Date.now();

  return `places/${slug}-${timestamp}.jpg`;
}

export async function uploadImage(
  imageBuffer: ArrayBuffer,
  filename: string
): Promise<string> {
  const blob = await put(filename, imageBuffer, {
    access: 'public',
    contentType: 'image/jpeg',
  });

  return blob.url;
}

export async function uploadImageFromUrl(
  imageUrl: string,
  filename: string
): Promise<string | null> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error('Failed to fetch image from URL:', response.status);
      return null;
    }

    const buffer = await response.arrayBuffer();
    return uploadImage(buffer, filename);
  } catch (error) {
    console.error('Error uploading image from URL:', error);
    return null;
  }
}
