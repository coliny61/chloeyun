# Claude Code Implementation Prompts

> **How to use this:** Open Claude Code in the project directory. Send these prompts **one phase at a time**, in order. Wait for each phase to complete before starting the next. Each prompt is self-contained — just copy-paste it in.
>
> **Before starting:** Make sure Claude Code has read `CLAUDE.md` and `CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md`. It should pick up CLAUDE.md automatically, but you can say "read CLAUDE.md and CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md" as your first message if needed.

---

## Phase 1: Supabase Foundation

```
Set up Supabase as the database for this project. Read CLAUDE.md and CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md for the full schema.

Do the following:
1. Install @supabase/supabase-js
2. Create src/lib/supabase.ts with the Supabase client (using VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
3. Create a SQL migration file at supabase/migrations/001_initial_schema.sql that creates all 6 tables: places, events, vlogs, contacts, site_settings, about_photos — with all columns, types, defaults, and RLS policies as defined in the spec
4. Delete src/lib/mockData.ts
5. Delete src/lib/notion.ts
6. Delete api/lib/notion-server.ts
7. Delete api/sms-webhook.ts
8. Update src/types/index.ts to match the Supabase schema (keep CuisineType flexible — no hardcoded enum, just string type)
9. Create src/hooks/useSupabase.ts with hooks: usePlaces, usePlace, useFeaturedPlaces, useFilteredPlaces, useEvents, useVlogs, useContacts, useSiteSettings, useAboutPhotos — all fetching from Supabase
10. Make sure the build still passes (npm run build)

Don't touch any pages or components yet — just the data layer.
```

---

## Phase 2: Design System Update

```
Update the design system to the Rosé & Cream theme. Read CLAUDE.md for exact colors.

Do the following:
1. Update src/index.css @theme variables:
   - Primary/accent: #F8A5B8 (Baby Pink)
   - Secondary: #E8919F (Rosé)
   - Background: #FAF6F0 (Eggshell)
   - Card/surface: #FFF5F7 (Blush White)
   - Text: #2D2424 (Espresso)
2. Update index.html meta theme-color to #F8A5B8
3. Create the burger logo as an SVG component at src/components/ui/Logo.tsx — it should be a pink outline burger (minimalistic but detailed: sesame seed bun, wavy lettuce, cheese drip, patty, bottom bun). Export variants: LogoIcon (icon only), LogoFull (icon + "chloe eats" + "DFW" text), LogoBadge (circle badge for favicon)
4. Generate a favicon from the burger logo (public/favicon.svg)
5. Create src/components/LoadingScreen.tsx — full-screen branded loading with the burger logo, subtle animation, smooth fade-out transition
6. Create src/pages/NotFound.tsx — branded 404 page: "This spot's not on the menu", burger logo animation, links to Food Spots/Events/Vlog/Contact, "Take Me Home" button
7. Create src/pages/Error.tsx — branded 500 page: "Something went wrong", "Refresh Page" button
8. Update src/components/layout/Navigation.tsx — use LogoFull in nav, rename "Map" link to "Food Spots", update route to /food-spots
9. Update src/components/layout/Footer.tsx — add subtle admin link at bottom
10. Verify the build passes and the color theme is consistent across all existing components
```

---

## Phase 3: Core Pages Rewrite (Food Spots + Place Detail)

```
Rewrite the Food Spots page and Place Detail page to use Supabase and match the spec. Read CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md sections 4.4 and 4.5.

Do the following:
1. Rename src/pages/Map.tsx to src/pages/FoodSpots.tsx
2. Update App.tsx route from /map to /food-spots
3. Rewrite FoodSpots.tsx:
   - Default view: list (scrollable cards), with toggle to map view
   - Default sort: newest first (dateReviewed descending)
   - Add sort dropdown: Newest, Highest Rated, Alphabetical
   - Filter sidebar: dynamically generate cuisine filters FROM the data (query distinct cuisine types from Supabase). No hardcoded filter list.
   - Asian sub-filters when Asian data exists
   - Price range filter ($-$$$$), rating filter, text search
   - Clear all button
   - Mobile: filter sidebar becomes slide-over dialog
   - DFW content only
4. Rewrite PlaceDetail.tsx:
   - Fetch single place from Supabase by ID
   - Hero image, Chloe's review, cuisine/price/rating badges
   - TikTok embed: inline playable (NOT thumbnail that opens new tab). Lazy-loaded. Plays on tap.
   - Instagram embed: inline playable if URL exists. Lazy-loaded.
   - Details sidebar: address, hours, phone, website, share button, directions link
   - SEO: unique <title>, <meta description>, Restaurant schema JSON-LD
   - 404 page if place not found
5. Update TikTokEmbed.tsx to play inline (remove the redirect-to-TikTok behavior)
6. Update InstagramEmbed.tsx for lazy loading
7. Test cases to verify: SPOTS-01 through SPOTS-32 and PLACE-01 through PLACE-18
8. Build must pass
```

---

## Phase 4: Events + Vlog Pages Rewrite

```
Rewrite Events and Vlog pages to use Supabase. Read CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md sections 4.6 and 4.7.

Events page:
1. Fetch events from Supabase, sorted newest first
2. Event cards with inline TikTok/Instagram embeds (lazy-loaded, play on tap)
3. No upcoming/past distinction — portfolio only
4. Responsive, with hover effects and staggered animations

Vlog page:
1. Fetch vlogs from Supabase, sorted newest first
2. Dynamic city filter tabs generated from data (query distinct city values)
3. "All" tab always first, always default selected
4. If Chloe adds a vlog tagged "Houston", a Houston tab appears automatically
5. Animated tab indicator when switching
6. Vlog cards with inline embeds

Both pages: empty states when no content exists. Build must pass.
Test cases: EVENTS-01 through EVENTS-10 and VLOG-01 through VLOG-13.
```

---

## Phase 5: Home Page, About Page, Contact Page

```
Rewrite Home, About, and Contact pages to use Supabase. Read CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md sections 4.2, 4.3, and 4.9.

Home page:
1. Hero with Chloe's photo, headline, animated stat counters (real data from site_settings table), CTA buttons (Find Food → /food-spots, Media Kit → /media-kit)
2. Social links (TikTok + Instagram) prominently in hero area
3. Featured Spots from Supabase (where is_featured = true), BentoGrid layout
4. Stats section with animated counters from Supabase site_settings
5. About preview linking to /about
6. Partnership CTA linking to /contact
7. Wave/curve SVG section dividers
8. Branded loading screen while data loads

About page:
1. Personality-forward bio
2. Photo gallery from about_photos table (Supabase)
3. "What I Do" cards
4. Stats from Supabase
5. CTA to /contact

Contact page:
1. Form: name, email, inquiry type dropdown (Partnership, Event Invite, General Question), message
2. Floating labels with real-time validation
3. Progress indicator
4. On submit: save to Supabase contacts table AND send email to chloe_yun@aol.com
5. Success/error states
6. Partnership benefits section

Build must pass. Test cases: HOME-01 through HOME-19, ABOUT-01 through ABOUT-09, CONTACT-01 through CONTACT-15.
```

---

## Phase 6: Media Kit Page

```
Build the Media Kit page. Read CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md section 4.8.

This is the most important page for the business — it's the sales pitch to get brands to work with Chloe. It needs to look polished and professional.

1. Live preview of the full media kit on the page:
   - Bio/about section
   - Social stats from Supabase site_settings (followers, engagement rate, avg views)
   - Audience demographics (DFW-focused, age range, food audience)
   - Content examples: pull best/featured spots, events, vlogs from Supabase
   - Past collaborations section (can be empty initially)
   - "Contact for Rates" CTA → /contact
2. Download PDF button that generates a PDF version of the media kit matching the live preview
3. Use the Rosé & Cream theme throughout — this page should feel premium
4. Fully responsive on mobile and desktop

Build must pass. Test cases: MEDIA-01 through MEDIA-13.
```

---

## Phase 7: Admin Area

```
Build the admin area. Read CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md section 5.

This is for Chloe (non-technical) to manage all content. Keep it simple.

1. Route: /admin — password-protected via simple password check (ADMIN_PASSWORD env var, validated server-side via /api/admin-auth endpoint)
2. Admin dashboard with navigation to separate forms:

3. Add Food Spot form:
   - Fields: restaurant name, rating (1-5 stars), review text, TikTok URL, Instagram URL (optional), cuisine type dropdown, price range dropdown
   - On submit: save to Supabase, then trigger AI enrichment (POST to /api/enrich)
   - Enrichment fetches from Google Places (Yelp fallback): address, coordinates, phone, hours, website, cover photo
   - Cover photo uploaded to Vercel Blob
   - Loading state during enrichment, error handling if enrichment fails (spot still saved)

4. Add Event form: name, description, date, TikTok URL, Instagram URL (optional)

5. Add Vlog form: title, TikTok URL, Instagram URL (optional), city/location tag (free text)

6. Edit/Delete for all three content types:
   - List view of all items with edit/delete buttons
   - Edit pre-fills the form
   - Delete requires confirmation

7. Batch Import:
   - Textarea to paste entries (one per line: name | TikTok URL | cuisine | price | rating | review)
   - Parse and process each with enrichment
   - Progress indicator (e.g., "3 of 15 complete")
   - Failed items flagged but don't block others

8. Media Kit Stats form:
   - Update: TikTok followers, TikTok likes, total views, engagement rate
   - Saves to site_settings table

9. About Photos management:
   - Upload new photos, reorder, delete existing
   - Auto-optimize on upload via Vercel Blob

10. Update /api/enrich.ts to work with Supabase instead of Notion

Build must pass. Test cases: ADMIN-01 through ADMIN-43.
```

---

## Phase 8: SEO + Performance + Accessibility

```
Implement SEO, performance optimization, and accessibility. Read CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md sections 7, 8, and 9.

SEO:
1. Every page has unique <title> and <meta description> (use react-helmet-async or equivalent)
2. Open Graph + Twitter Card meta tags on all pages
3. Place Detail pages: Restaurant schema JSON-LD (name, address, rating, cuisine, priceRange)
4. Generate sitemap.xml (list all public routes + all place detail pages)
5. Add robots.txt
6. All images have alt text
7. Proper heading hierarchy (single H1 per page)

Performance:
1. TikTok/Instagram embeds lazy-load with Intersection Observer
2. No autoplay on any embed — user must tap play
3. All images use lazy loading
4. Branded loading screen transitions smoothly
5. No layout shift when embeds load (use placeholder with correct aspect ratio)

Accessibility:
1. Full keyboard navigation: Tab through all interactive elements, Enter to activate, Escape to close modals/menus
2. ARIA labels on: nav, hamburger menu, filter sidebar, sort dropdown, all form inputs, map markers
3. Focus indicators visible on all focusable elements
4. Color contrast meets WCAG AA (4.5:1 for body text)
5. prefers-reduced-motion disables ALL animations, counters show final values immediately
6. Screen reader friendly: logical heading order, descriptive link text, form error announcements

Analytics:
1. Add Google Analytics (VITE_GA_MEASUREMENT_ID)
2. Track page views on route change
3. Custom events: "Download Media Kit PDF", "Contact Form Submit", "Social Link Click"

Build must pass. Test cases: SEO-01 through SEO-11, PERF-01 through PERF-10, A11Y-01 through A11Y-12, ANALYTICS-01 through ANALYTICS-03.
```

---

## Phase 9: Final Polish + Deploy

```
Final polish and deployment. Read CHLOE_EATS_DFW_PRODUCT_SPEC_AND_TEST_CASES.md section 13 migration checklist.

1. Review every page on mobile viewport (375px width) — fix any layout issues
2. Review every page on desktop (1440px) — fix any spacing/alignment issues
3. Test all forms (admin add spot, add event, add vlog, contact form, batch import)
4. Test filter sidebar on mobile (slide-over dialog)
5. Test map view with markers and popups
6. Test inline TikTok/Instagram embeds play correctly
7. Test branded loading screen and error pages
8. Run npm run build — zero errors, zero warnings
9. Run a Lighthouse audit on the built site — target 80+ on all scores
10. Verify all environment variables are documented
11. Commit everything, push to main, deploy to Vercel
12. Verify chloeeatsdfw.com loads correctly in production
```

---

## Phase 10: Data Migration (Batch Import)

```
Use the batch import tool to migrate all existing content from the old mock data into Supabase.

The content inventory is in CLAUDE_MEMORY.md:
- 35 food spots with names, cuisines, prices, ratings, dates, TikTok URLs
- 12 events with names and TikTok URLs
- 13 vlogs with titles, cities, and TikTok URLs

For each food spot, the AI enrichment should run to pull address, coordinates, hours, phone, website, and cover photo.

Also seed the site_settings table with initial stats:
- tiktok_followers: 27000
- tiktok_likes: 1600000
- total_views: 2800000

And set the initial featured spots (is_featured = true) on a few of the highest-rated places.
```

---

## Troubleshooting Tips

- **If build fails after deleting mock data:** Check all imports — any file importing from `mockData.ts` or `notion.ts` needs to be updated to use the new Supabase hooks.
- **If Supabase returns empty:** Make sure RLS policies allow public read access on places, events, vlogs, site_settings, about_photos tables.
- **If embeds don't load:** TikTok and Instagram have CORS restrictions. TikTok oEmbed may need the server-side proxy at `/api/tiktok-oembed`.
- **If enrichment fails:** Check Google Places API key is valid and has Places API enabled. Check Yelp API key. Enrichment failure should NOT block saving the spot.
- **If admin password doesn't work:** Make sure ADMIN_PASSWORD is set in Vercel environment variables, not just .env.local.
