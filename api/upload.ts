// Image upload endpoint — accepts multipart form data, stores in Vercel Blob

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

function getContentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const types: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
  };
  return types[ext || ''] || 'image/jpeg';
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
    // Read raw body
    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', resolve);
      req.on('error', reject);
    });
    const body = Buffer.concat(chunks);

    // Parse filename from query or header
    const filename = (req.query.filename as string) || `upload-${Date.now()}.jpg`;
    const folder = (req.query.folder as string) || 'uploads';
    const path = `${folder}/${filename}`;

    const blob = await put(path, body, {
      access: 'public',
      contentType: getContentType(filename),
    });

    res.status(200).json({ url: blob.url });
  } catch (error) {
    res.status(500).json({
      error: 'Upload failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
