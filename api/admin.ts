// Admin API — CRUD operations for places, events, vlogs, settings, photos
// All operations require ADMIN_PASSWORD header

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

function checkAuth(req: VercelRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return req.headers['x-admin-password'] === adminPassword;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { action, table, data, id } = req.body as {
    action: 'create' | 'update' | 'delete' | 'list';
    table: 'places' | 'events' | 'vlogs' | 'site_settings' | 'about_photos';
    data?: Record<string, unknown>;
    id?: string;
  };

  try {
    switch (action) {
      case 'list': {
        const orderCol = table === 'site_settings' ? 'updated_at' : 'created_at';
        const { data: rows, error } = await supabase
          .from(table)
          .select('*')
          .order(orderCol, { ascending: false });
        if (error) throw error;
        res.status(200).json({ data: rows });
        break;
      }
      case 'create': {
        if (!data) { res.status(400).json({ error: 'data required' }); return; }
        const { data: row, error } = await supabase
          .from(table)
          .insert(data)
          .select()
          .single();
        if (error) throw error;
        res.status(201).json({ data: row });
        break;
      }
      case 'update': {
        if (!id || !data) { res.status(400).json({ error: 'id and data required' }); return; }
        const keyColumn = table === 'site_settings' ? 'key' : 'id';
        const { data: row, error } = await supabase
          .from(table)
          .update(data)
          .eq(keyColumn, id)
          .select()
          .single();
        if (error) throw error;
        res.status(200).json({ data: row });
        break;
      }
      case 'delete': {
        if (!id) { res.status(400).json({ error: 'id required' }); return; }
        const deleteColumn = table === 'site_settings' ? 'key' : 'id';
        const { error } = await supabase
          .from(table)
          .delete()
          .eq(deleteColumn, id);
        if (error) throw error;
        res.status(200).json({ success: true });
        break;
      }
      default:
        res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Operation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
