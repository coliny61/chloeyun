# Chloe Eats DFW — Claude Code Project Guide

## What This Project Is

A fully public website (no auth) for Chloe, a DFW food influencer. It's her content hub and partnership magnet — all TikTok/Instagram content lives here, organized and browsable. The #1 business goal is getting restaurants, events, and brands to pay Chloe for content.

**Domain:** chloeeatsdfw.com
**GitHub:** github.com/coliny61/chloeyun (main branch)
**Deployment:** Vercel

---

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS 4 with custom @theme variables
- **Routing:** React Router v7
- **Database:** Supabase (PostgreSQL) — NO mock data, everything live
- **Map:** Leaflet + OpenStreetMap (free, no API key)
- **API:** Vercel serverless functions (`/api/` directory)
- **Enrichment:** Google Places API → Yelp Fusion API fallback
- **Image Storage:** Vercel Blob (auto-optimized on upload)
- **Analytics:** Google Analytics

---

## Design System

### Color Theme — Rosé & Cream
| Token | Hex | Usage |
|-------|-----|-------|
| Baby Pink | `#F8A5B8` | Primary / CTAs / accent |
| Rosé | `#E8919F` | Secondary / gradients |
| Eggshell | `#FAF6F0` | Page backgrounds |
| Blush White | `#FFF5F7` | Card backgrounds / subtle tints |
| Espresso | `#2D2424` | Primary text / dark elements |

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Logo
- Pink outline burger icon (minimalistic but detailed — sesame seed bun, lettuce, cheese drip, patty layers)
- Horizontal lockup for nav: burger icon + "chloe eats" + "DFW" sublabel
- Circle badge version for favicon/social avatar

### Animations
- Playful and animated (fade-ins, slide-ups, floating blobs, shimmer, glow-pulse, gradient-flow, bounce-in)
- ALL animations MUST respect `prefers-reduced-motion` — this is a priority
- Use existing animation hooks: `useReducedMotion`, `useScrollAnimation`, `useCounter`, `useStaggeredAnimation`

---

## Architecture

### Pages & Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Hero, Featured Spots, Stats, About preview, Partnership CTA |
| `/about` | About | Personality-forward bio, photo gallery, "What I Do", stats |
| `/food-spots` | Food Spots | DFW restaurants only. List default + map toggle. Dynamic filters, sort dropdown |
| `/place/:id` | Place Detail | Hero image, review, inline TikTok/Instagram embeds, details sidebar |
| `/events` | Events | Portfolio of events Chloe covered. Cards with embeds |
| `/vlog` | Vlog | Travel, recaps, non-DFW content. Dynamic city tabs from data |
| `/media-kit` | Media Kit | Live preview + downloadable PDF. Stats from Supabase |
| `/contact` | Contact | Form with inquiry type dropdown. Saves to Supabase + emails chloe_yun@aol.com |
| `/admin` | Admin | Password-protected. Separate forms for spots/events/vlogs. Edit/delete. Batch import |

### Content Types
1. **Food Spots** — DFW restaurants only. Chloe provides: name, rating, review, TikTok/Instagram links, cuisine, price. AI enriches: address, coordinates, hours, phone, website, cover photo.
2. **Events** — Portfolio only (no upcoming/past). Name, description, date, TikTok/Instagram links.
3. **Vlogs** — Catch-all for non-food-spot content (travel, recaps, out-of-town reviews). Title, TikTok/Instagram link, city tag.

### Database (Supabase)
Tables: `places`, `events`, `vlogs`, `contacts`, `site_settings`, `about_photos`
See `CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md` for full schema.

### Key Patterns
- **Dynamic filters**: Cuisine filters on Food Spots are generated from data — if a new cuisine type appears in Supabase, its filter shows automatically. No hardcoded filter lists.
- **Dynamic tabs**: Vlog city tabs are generated from data — if Chloe adds a "Houston" vlog, a Houston tab appears automatically.
- **Inline embeds**: TikTok/Instagram play INLINE on the site (not thumbnails that open new tabs). User taps play to start. Embeds are lazy-loaded.
- **AI enrichment**: On food spot submission, automatically fetch address/coords/hours/phone/website/photo from Google Places (Yelp fallback).
- **No mock data**: Zero mock data anywhere. Everything from Supabase. `mockData.ts` should be deleted.

---

## File Structure (Current → Target)

### Keep & Modify
```
src/App.tsx                    — Update routes (rename /map to /food-spots, add /admin)
src/types/index.ts             — Update types for Supabase schema
src/hooks/                     — Keep animation hooks, rewrite data hooks for Supabase
src/pages/                     — Rewrite all pages to use Supabase data
src/components/layout/         — Update nav links, add admin link to footer
src/components/map/            — Keep Leaflet map, update for Supabase data
src/components/embeds/         — Rewrite for inline playback (not redirect)
src/components/ui/             — Keep all UI components
src/index.css                  — Update theme colors to Rosé & Cream
api/                           — Rewrite for Supabase (remove Notion code)
```

### Delete
```
src/lib/mockData.ts            — All mock data (replace with Supabase)
src/lib/notion.ts              — Notion client (replace with Supabase)
api/lib/notion-server.ts       — Server-side Notion (replace with Supabase)
api/sms-webhook.ts             — Twilio SMS webhook (not needed)
```

### Create New
```
src/lib/supabase.ts            — Supabase client initialization
src/hooks/useSupabase.ts       — Supabase data fetching hooks
src/pages/Admin.tsx            — Admin area (password-protected)
src/components/admin/          — Admin forms (AddSpot, AddEvent, AddVlog, BatchImport, etc.)
src/pages/NotFound.tsx         — Branded 404 page
src/pages/Error.tsx            — Branded 500 page
src/components/LoadingScreen.tsx — Branded loading screen with burger logo
```

---

## Critical Rules

1. **No mock data** — Everything from Supabase. Delete mockData.ts.
2. **Accessibility is priority** — WCAG 2.1 AA. Keyboard nav, ARIA labels, contrast, reduced motion.
3. **Mobile-first** — Design for phone first, then desktop. Most traffic comes from TikTok/Instagram links on mobile.
4. **SEO matters** — Unique meta tags per page, Restaurant schema on Place Detail, sitemap.xml, robots.txt.
5. **Embeds lazy-load** — TikTok/Instagram embeds only load when scrolled into view. Play on tap only.
6. **Images auto-optimized** — Uploaded via Vercel Blob with optimization.
7. **Admin is simple** — Chloe is non-technical. Forms must be dead simple. AI does the heavy lifting.

---

## Environment Variables

```
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Enrichment APIs
GOOGLE_PLACES_API_KEY=
YELP_API_KEY=

# Storage
BLOB_READ_WRITE_TOKEN=

# Admin
ADMIN_PASSWORD=

# Email (contact form)
EMAIL_SERVICE_API_KEY=

# Analytics
VITE_GA_MEASUREMENT_ID=
```

---

## Content Inventory (for Batch Import)

Current mock data has 35 food spots, 12 events, 13 vlogs. This data needs to be migrated to Supabase via the batch import tool. See `CLAUDE_MEMORY.md` for the full content inventory with IDs, names, cuisines, ratings, and dates.

---

## Full Spec & Test Cases

See `CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md` for:
- 148 test cases covering every page, feature, and flow
- Complete Supabase schema (6 tables)
- 30-step migration checklist
- SEO, performance, and accessibility requirements
