// Dynamic sitemap generator — queries Supabase for all content

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const SITE = 'https://chloeeatsdfw.com';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: number;
}

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const entries: SitemapEntry[] = [
    { loc: '/', changefreq: 'weekly', priority: 1.0, lastmod: today },
    { loc: '/food-spots', changefreq: 'weekly', priority: 0.9, lastmod: today },
    { loc: '/events', changefreq: 'weekly', priority: 0.7, lastmod: today },
    { loc: '/vlog', changefreq: 'weekly', priority: 0.7, lastmod: today },
    { loc: '/about', changefreq: 'monthly', priority: 0.6, lastmod: today },
    { loc: '/media-kit', changefreq: 'monthly', priority: 0.8, lastmod: today },
    { loc: '/contact', changefreq: 'monthly', priority: 0.5, lastmod: today },
  ];

  // Fetch dynamic content from Supabase
  const [places, events, vlogs] = await Promise.all([
    supabase.from('places').select('id, updated_at').order('updated_at', { ascending: false }),
    supabase.from('events').select('id, updated_at').order('updated_at', { ascending: false }),
    supabase.from('vlogs').select('id, updated_at').order('updated_at', { ascending: false }),
  ]);

  if (places.data) {
    for (const place of places.data) {
      entries.push({
        loc: `/place/${place.id}`,
        lastmod: place.updated_at?.split('T')[0] || today,
        changefreq: 'weekly',
        priority: 0.8,
      });
    }
  }

  if (events.data) {
    for (const event of events.data) {
      entries.push({
        loc: `/events#${event.id}`,
        lastmod: event.updated_at?.split('T')[0] || today,
        changefreq: 'monthly',
        priority: 0.6,
      });
    }
  }

  if (vlogs.data) {
    for (const vlog of vlogs.data) {
      entries.push({
        loc: `/vlog#${vlog.id}`,
        lastmod: vlog.updated_at?.split('T')[0] || today,
        changefreq: 'monthly',
        priority: 0.6,
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE}${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}
