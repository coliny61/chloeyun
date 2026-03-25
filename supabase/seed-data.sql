-- Seed data for initial batch import
-- Run this after 001_initial_schema.sql to populate with Chloe's existing content
-- This seeds the site_settings table with initial stats

-- Update site settings (these rows are created by the migration)
UPDATE site_settings SET value = '27000' WHERE key = 'tiktok_followers';
UPDATE site_settings SET value = '1600000' WHERE key = 'tiktok_likes';
UPDATE site_settings SET value = '2800000' WHERE key = 'total_views';
UPDATE site_settings SET value = '2900' WHERE key = 'instagram_followers';
UPDATE site_settings SET value = '' WHERE key = 'engagement_rate';

-- NOTE: Food spots, events, and vlogs should be imported via the Admin batch import tool
-- at /admin after the site is deployed. This ensures AI enrichment runs for each spot.
--
-- Batch import format (paste into Admin > Batch Import):
-- name | TikTok URL | cuisine | price | rating | review
--
-- Example:
-- Don Sarang KBBQ | https://www.tiktok.com/t/ZP8fqrVQh/ | Korean | $$$ | 4.8 | My favorite flat grill KBBQ in Dallas!
-- Mamani | https://www.tiktok.com/t/example/ | French | $$$$ | 4.9 | Best French restaurant in DFW
