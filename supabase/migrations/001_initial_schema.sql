-- Chloe Eats DFW — Initial Schema
-- 6 tables: places, events, vlogs, contacts, site_settings, about_photos

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. places
-- ============================================================
create table places (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  cuisine_type  text,                          -- e.g. "Korean", "Mexican"
  filter_category text,                        -- e.g. "Asian", "Latin" — for filter grouping
  price_range   text check (price_range in ('$', '$$', '$$$', '$$$$')),
  rating        numeric(2,1) check (rating >= 1 and rating <= 5),
  review        text,                          -- Chloe's review
  tiktok_url    text,
  instagram_url text,
  address       text,                          -- from enrichment
  city          text default 'Dallas',
  latitude      numeric(10,7),
  longitude     numeric(10,7),
  phone         text,
  hours         jsonb,                         -- from enrichment
  website       text,
  cover_image_url text,                        -- Vercel Blob URL
  date_reviewed timestamptz default now(),
  is_featured   boolean default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- 2. events
-- ============================================================
create table events (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  description     text,
  event_date      date,
  tiktok_url      text,
  instagram_url   text,
  cover_image_url text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ============================================================
-- 3. vlogs
-- ============================================================
create table vlogs (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  tiktok_url      text,
  instagram_url   text,
  city            text,                        -- drives dynamic tabs
  cover_image_url text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ============================================================
-- 4. contacts
-- ============================================================
create table contacts (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  email         text not null,
  inquiry_type  text,                          -- Partnership, Event Invite, General Question
  message       text not null,
  created_at    timestamptz default now()
);

-- ============================================================
-- 5. site_settings (key-value store)
-- ============================================================
create table site_settings (
  key         text primary key,
  value       text,
  updated_at  timestamptz default now()
);

-- ============================================================
-- 6. about_photos
-- ============================================================
create table about_photos (
  id            uuid primary key default uuid_generate_v4(),
  image_url     text not null,
  sort_order    integer default 0,
  created_at    timestamptz default now()
);

-- ============================================================
-- Row Level Security — public read, authenticated write
-- ============================================================

-- Enable RLS on all tables
alter table places enable row level security;
alter table events enable row level security;
alter table vlogs enable row level security;
alter table contacts enable row level security;
alter table site_settings enable row level security;
alter table about_photos enable row level security;

-- Public read access for content tables
create policy "Public read places"    on places       for select using (true);
create policy "Public read events"    on events       for select using (true);
create policy "Public read vlogs"     on vlogs        for select using (true);
create policy "Public read settings"  on site_settings for select using (true);
create policy "Public read photos"    on about_photos for select using (true);

-- Public insert for contacts (anyone can submit the contact form)
create policy "Public insert contacts" on contacts for insert with check (true);

-- Service role (admin) can do everything — these use the service_role key
create policy "Service role full access places"    on places       for all using (auth.role() = 'service_role');
create policy "Service role full access events"    on events       for all using (auth.role() = 'service_role');
create policy "Service role full access vlogs"     on vlogs        for all using (auth.role() = 'service_role');
create policy "Service role full access contacts"  on contacts     for all using (auth.role() = 'service_role');
create policy "Service role full access settings"  on site_settings for all using (auth.role() = 'service_role');
create policy "Service role full access photos"    on about_photos for all using (auth.role() = 'service_role');

-- ============================================================
-- Updated_at trigger
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger places_updated_at    before update on places       for each row execute function update_updated_at();
create trigger events_updated_at    before update on events       for each row execute function update_updated_at();
create trigger vlogs_updated_at     before update on vlogs        for each row execute function update_updated_at();
create trigger settings_updated_at  before update on site_settings for each row execute function update_updated_at();

-- ============================================================
-- Seed initial site_settings
-- ============================================================
insert into site_settings (key, value) values
  ('tiktok_followers', '27000'),
  ('tiktok_likes', '1600000'),
  ('total_views', '2800000'),
  ('engagement_rate', ''),
  ('instagram_followers', '');
