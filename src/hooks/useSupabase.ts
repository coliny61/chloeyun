/**
 * Supabase data hooks for Events, Vlogs, Contacts, Settings, and About Photos.
 * Place hooks live in usePlaces.ts (with legacy field mapping).
 */
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  Event,
  VlogPost,
  Contact,
  SiteSetting,
  AboutPhoto,
  SocialStats,
  ContactFormData,
} from '../types';

// ============================================================
// Legacy field mappers
// ============================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(row: any): Event {
  return {
    ...row,
    title: row.name ?? '',
    tikTokUrl: row.tiktok_url ?? undefined,
    instagramUrl: row.instagram_url ?? undefined,
    date: row.event_date ?? row.created_at ?? '',
    thumbnail: row.cover_image_url ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapVlog(row: any): VlogPost {
  return {
    ...row,
    tikTokUrl: row.tiktok_url ?? undefined,
    instagramUrl: row.instagram_url ?? undefined,
    date: row.created_at ?? '',
    thumbnail: row.cover_image_url ?? undefined,
  };
}

// ============================================================
// Events
// ============================================================

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: false });
        if (err) throw err;
        setEvents((data ?? []).map(mapEvent));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { events, loading, error };
}

// ============================================================
// Vlogs
// ============================================================

export function useVlogs() {
  const [vlogs, setVlogs] = useState<VlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('vlogs')
          .select('*')
          .order('created_at', { ascending: false });
        if (err) throw err;
        setVlogs((data ?? []).map(mapVlog));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load vlogs');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { vlogs, loading, error };
}

// ============================================================
// Contacts
// ============================================================

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false });
        if (err) throw err;
        setContacts(data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contacts');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { contacts, loading, error };
}

export async function submitContact(data: ContactFormData) {
  const { error } = await supabase.from('contacts').insert({
    name: data.name,
    email: data.email,
    inquiry_type: data.inquiryType,
    message: data.message,
  });
  if (error) throw error;
}

// ============================================================
// Site Settings
// ============================================================

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('site_settings')
          .select('*');
        if (err) throw err;
        const map: Record<string, string> = {};
        (data as SiteSetting[])?.forEach((s) => {
          map[s.key] = s.value ?? '';
        });
        setSettings(map);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats: SocialStats = {
    tikTokFollowers: settings['tiktok_followers'] ?? '',
    tikTokLikes: settings['tiktok_likes'] ?? '',
    viewsThisYear: settings['total_views'] ?? '',
    instagramFollowers: settings['instagram_followers'] ?? '',
    totalReviews: 0,
    citiesCovered: 0,
  };

  return { settings, stats, loading };
}

// ============================================================
// About Photos
// ============================================================

export function useAboutPhotos() {
  const [photos, setPhotos] = useState<AboutPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('about_photos')
          .select('*')
          .order('sort_order', { ascending: true });
        if (err) throw err;
        setPhotos(data ?? []);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { photos, loading };
}
