# Chloe Eats DFW - Project Memory

## Last Updated: January 28, 2025

## Project Status: AI Enrichment Workflow Added

### GitHub Repository
- **URL:** https://github.com/coliny61/chloeyun
- **Remote:** git@github.com:coliny61/chloeyun.git (SSH)
- **Branch:** main
- **Status:** Up to date with origin/main

---

## Recent Changes (January 28, 2025)

### AI Content Enrichment Workflow
Added a backend workflow for Chloe to easily add new content without coding:

**How it works:**
1. Chloe adds a new place in Notion with basic info (name, location, rating, review, TikTok URL)
2. Sets Status to "Ready to Enrich"
3. Visits `/api/admin` (password protected)
4. Clicks "Enrich" button
5. AI automatically fetches: cover image, address, coordinates, phone, website, hours
6. Place is published automatically

**New API Routes:**
- `/api/admin` - Admin dashboard for triggering enrichment
- `/api/enrich` - Main enrichment endpoint

**New Files Created:**
- `/api/enrich.ts` - Main enrichment logic
- `/api/admin.ts` - Admin UI
- `/api/lib/google-places.ts` - Google Places API client
- `/api/lib/yelp.ts` - Yelp API client (fallback)
- `/api/lib/storage.ts` - Vercel Blob storage utilities
- `/api/lib/notion-server.ts` - Server-side Notion utilities

**New Environment Variables Required:**
- `NOTION_API_KEY` - Same as VITE version, for server-side
- `NOTION_DATABASE_ID` - Same as VITE version, for server-side
- `GOOGLE_PLACES_API_KEY` - Enable Places API in Google Cloud
- `YELP_API_KEY` - From Yelp Fusion developer portal
- `BLOB_READ_WRITE_TOKEN` - From Vercel Blob storage
- `ADMIN_SECRET` - Password for admin page

**Notion Database Fields Needed:**
- `Location` (text) - City/neighborhood for search
- `Status` (select) - "Draft", "Ready to Enrich", "Published"

### Previous: Coffee Tab Removal & Merge
- **Removed:** Coffee tab from navigation
- **Merged:** 6 coffee shops into `mockPlaces` with `cuisineType: 'Coffee'`
- **Added:** `dateReviewed` field to Place interface for sorting

---

## Current Content Inventory

### Food Spots (35 total - includes coffee shops)
Located in `/src/lib/mockData.ts` → `mockPlaces[]`

| ID | Name | Cuisine | Price | Rating | Date Reviewed |
|----|------|---------|-------|--------|---------------|
| 11 | Don Sarang KBBQ | Korean | $$$ | 4.8 | 2024-06-15 |
| 12 | Mamani | French | $$$$ | 4.0 | 2024-06-20 |
| 13 | Norman's Japanese Grill | Fusion | $$$$ | 4.2 | 2024-06-25 |
| 14 | Neko Yubu | Korean | $ | 4.9 | 2024-07-01 |
| 15 | NADC Burger | American | $$ | 4.5 | 2024-07-10 |
| 16 | Lucia | Italian | $$$$ | 3.9 | 2024-07-15 |
| 17 | Big Dash | Dessert | $ | 4.8 | 2024-07-20 |
| 18 | Tatsu Dallas | Japanese | $$$$ | 3.5 | 2024-07-25 |
| 19 | Pillar | American | $$$$ | 3.8 | 2024-08-01 |
| 20 | Written by the Seasons | American | $$$ | 4.5 | 2024-08-05 |
| 21 | Hampyong Cold Noodles | Korean | $$ | 4.0 | 2024-08-10 |
| 22 | Trades Delicatessen | American | $$ | 4.5 | 2024-08-15 |
| 23 | Spice Shawarma | Mediterranean | $ | 4.8 | 2024-08-20 |
| 24 | Childish Bakery | Korean | $ | 4.8 | 2024-08-25 |
| 25 | Samad Cafe | Mediterranean | $$ | 4.6 | 2024-09-01 |
| 26 | Haidilao Hot Pot | Chinese | $$ | 3.0 | 2024-09-05 |
| 27 | Evelyn | American | $$$$ | 3.8 | 2024-09-10 |
| 28 | Domodomo Omakase | Japanese | $$$$ | 4.0 | 2024-09-15 |
| 29 | Sandoitchi | Japanese | $$ | 4.2 | 2024-09-20 |
| 30 | Dior Cafe | Cafe | $$$$ | 2.8 | 2024-09-25 |
| 31 | Zodiac Restaurant | American | $$$ | 4.5 | 2024-10-01 |
| 32 | Casa Brasa | Fusion | $$$$ | 4.8 | 2024-10-05 |
| 33 | Prince St Pizza | Italian | $$ | 3.0 | 2024-10-10 |
| 34 | Burger Schmurger | American | $$ | 4.8 | 2024-10-15 |
| 35 | Standard Pour | Bar | $$ | 3.0 | 2024-10-20 |
| 36 | Skellig | Bar | $$ | 4.2 | 2024-10-25 |
| 37 | Vida Bowls | Cafe | $ | 4.9 | 2024-11-01 |
| 38 | Mikes Gemini | Bar | $ | 3.9 | 2024-11-05 |
| 39 | Honeybird | Korean | $$ | 4.5 | 2024-11-10 |
| 40 | Pax & Beneficia | Coffee | $ | 4.0 | 2024-11-15 |
| 41 | Flying Horse Cafe | Coffee | $ | 3.5 | 2024-11-20 |
| 42 | Khroma Coffee | Coffee | $ | 4.0 | 2024-11-25 |
| 43 | La Souq | Coffee | $ | 4.3 | 2024-12-01 |
| 44 | Chicha San Chen | Coffee | $ | 4.9 | 2024-12-05 |
| 45 | Hola Cafe | Coffee | $$ | 4.2 | 2024-12-10 |

### Events (12 total)
Located in `/src/lib/mockData.ts` → `mockEvents[]`

1. Balloon Museum
2. The Eye Joule - Movie Night on the Lawn
3. Chelsea Corner Halloween Movie Night
4. Boogies Preview Event
5. Hendy's on Henderson Preview Event
6. Yayoi Kusama Museum
7. Harwood District Cinco de Mayo
8. Live on the Lawn at The Village
9. Movie Night at Griggs Park
10. Komodo x Lalaland Event
11. Schiaparelli Luncheon
12. Galentine's at My Apartment

### Vlogs (13 total)
Located in `/src/lib/mockData.ts` → `mockVlogPosts[]`

| ID | Title | City |
|----|-------|------|
| 1 | Chloe's 30th Birthday | DFW |
| 2 | New York Trip | NYC |
| 3 | New York Trip Part 2 | NYC |
| 4 | Dominican Republic Trip | Dominican Republic |
| 5 | San Diego Trip | San Diego |
| 6 | New York Trip Part 3 | NYC |
| 7 | Dallas Vlog | DFW |
| 8 | Sunday Funday Vlog | DFW |
| 9 | Day Off Vlog | DFW |
| 10 | Fort Worth Day | DFW |
| 11 | Brother's Birthday Cake Vlog | DFW |
| 12 | Tulum Travel Vlog | Tulum |
| 13 | NYC Vlog | NYC |

---

## Technical Architecture

### Navigation Tabs
- Home, Food, Events, Vlog, About, Media Kit, Contact
- (Coffee tab removed - coffee shops now in Food)

### UX/UI Features (Premium Overhaul)
- **Animation Hooks:** useReducedMotion, useScrollAnimation, useCounter, useStaggeredAnimation
- **Components:** BentoGrid, FloatingInput, SectionDivider, Card (with variants)
- **CSS:** 15+ keyframe animations in `/src/index.css`

### Filter System
8 intuitive categories mapping to cuisine types:
- Asian (with sub-filters: Korean, Japanese, Chinese, Thai, Vietnamese, Indian)
- Latin, European, American, Sweet Treats, Coffee & Cafe, Bars & Drinks, Other

### Sorting
- Default: By `dateReviewed` (oldest first, newest last)
- Places without dates appear first

### Key Files
- `/src/lib/mockData.ts` - All content data (food spots, events, vlogs)
- `/src/types/index.ts` - TypeScript types and category mappings
- `/src/hooks/usePlaces.ts` - Filter logic
- `/src/components/map/FilterSidebar.tsx` - Filter UI
- `/src/pages/Map.tsx` - Food spots page with sorting
- `/src/components/layout/Navigation.tsx` - Site navigation

### API Files (Enrichment Workflow)
- `/api/enrich.ts` - Main enrichment endpoint
- `/api/admin.ts` - Admin dashboard UI
- `/api/lib/google-places.ts` - Google Places API client
- `/api/lib/yelp.ts` - Yelp Fusion API client
- `/api/lib/storage.ts` - Vercel Blob utilities
- `/api/lib/notion-server.ts` - Server-side Notion utilities

---

## Git Workflow

### To Push Changes
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

### Recent Commits
- `a2a2c03` - Merge coffee shops into food spots and remove coffee tab
- `ac48aae` - Update project memory with current content inventory
- `52132a6` - Merge remote changes with local premium UX/UI overhaul
- `8e125d6` - Add new content: events, vlogs, food spots, and coffee shops

---

---

## 🚨 TABLED / REMIND ME LATER

### SMS AI Chatbot (Text-to-Upload) - NOT SET UP YET

**Status:** Code is ready, needs account setup

Chloe can text a phone number to add content to her website.

**Chloe's phone:** `+12146209319` (already configured)

**To finish setup:**
1. Create Twilio account → https://www.twilio.com/try-twilio
2. Buy a phone number (~$1/month)
3. Create Anthropic account → https://console.anthropic.com/
4. Get API key (starts with `sk-ant-...`)
5. Add to Vercel env variables:
   - `ANTHROPIC_API_KEY`
   - `ALLOWED_PHONE_NUMBERS=+12146209319`
6. In Twilio, set webhook to: `https://chloeyun.vercel.app/api/sms-webhook`

**API Route:** `/api/sms-webhook` (already created)

---

## TODO / Next Steps

### Setup Required for Enrichment Workflow
- [ ] Enable Google Places API in Google Cloud Console (same project as Maps)
- [ ] Create Yelp Fusion API account and get API key
- [ ] Create Vercel Blob store and get token
- [ ] Add environment variables to Vercel dashboard
- [ ] Add "Location" and "Status" fields to Notion database
- [ ] Test enrichment workflow with a sample place

### Existing TODOs
- [ ] Test animation performance on mobile
- [ ] Verify reduced-motion accessibility
- [ ] Consider code-splitting for bundle optimization
