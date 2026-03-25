# Chloe Eats DFW — Product Spec & Test Cases

> **Purpose**: This document is the source of truth for building Chloe Eats DFW. Take this to Claude Code and implement each section. Every feature, page, flow, and interaction is defined below with acceptance criteria and test cases.

---

## 1. Product Overview

### 1.1 What It Is
A fully public website (no authentication, no user accounts) serving as Chloe's content hub and partnership magnet. All content Chloe posts on TikTok/Instagram also lives here — organized, browsable, and searchable in ways social feeds can't do.

### 1.2 Primary Goals
1. **Increase partnerships**: Get restaurants, events, and brands to want to work with Chloe and pay her for content
2. **Drive social follows**: Funnel site visitors to Chloe's TikTok and Instagram
3. **Food discovery**: Help DFW locals discover great food through Chloe's reviews
4. **Establish authority**: Position Chloe as the go-to DFW food influencer

### 1.3 Target Audience
- DFW locals looking for food recommendations
- Restaurant owners / event organizers / brand managers evaluating partnerships
- Anyone — fully public, no sign-up required

### 1.4 Domain
- **chloeeatsdfw.com**

---

## 2. Tech Stack

### 2.1 Frontend
- React 19 + TypeScript + Vite
- Tailwind CSS 4 with custom @theme variables
- React Router v7
- Leaflet + OpenStreetMap (interactive map)

### 2.2 Backend / Data
- **Supabase** (PostgreSQL) — replaces Notion + mock data. Zero mock data in production.
- Vercel serverless functions for API routes
- Google Places API + Yelp Fusion API (fallback) for enrichment
- Vercel Blob for image storage + auto-optimization

### 2.3 Deployment
- Vercel
- Domain: chloeeatsdfw.com

### 2.4 Analytics
- Google Analytics — traffic sources, page views per spot, demographics (feeds media kit data)

---

## 3. Design System

### 3.1 Color Theme — Rosé & Cream
| Token | Hex | Usage |
|-------|-----|-------|
| Baby Pink | #F8A5B8 | Primary / CTAs / accent |
| Rosé | #E8919F | Secondary / gradients |
| Eggshell | #FAF6F0 | Page background |
| Blush White | #FFF5F7 | Card backgrounds / subtle tints |
| Espresso | #2D2424 | Primary text / dark elements |

### 3.2 Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### 3.3 Logo
- Pink outline burger icon (minimalistic, detailed enough to be instantly recognizable as food — sesame seed bun, lettuce, cheese drip, patty layers)
- Horizontal lockup version for nav bar (burger icon + "chloe eats" wordmark + "DFW" sublabel)
- Circle badge version for favicon / social avatar

### 3.4 Animations & Motion
- Playful and animated — the site should pop and feel differentiated
- Fade-ins, slide-ups, floating elements, shimmer, glow-pulse, gradient-flow, bounce-in
- All animations respect `prefers-reduced-motion` (accessibility priority)
- Staggered animations for list items

### 3.5 Branded Loading Screen
- Full-screen loading state with Chloe Eats DFW burger logo
- Shown while initial data loads from Supabase
- Smooth transition out when content is ready

### 3.6 Branded Error Pages
- **404**: "This spot's not on the menu" — with burger logo animation, links to Food Spots / Events / Vlog / Contact, "Take Me Home" CTA
- **500**: "Something went wrong" — with playful burger illustration, "Refresh Page" CTA, link to Home and Contact

---

## 4. Pages & Features

---

### 4.1 Navigation

**Structure**: Fixed top nav bar with horizontal lockup logo + 7 links + CTA button

**Links**: Home, About, Food Spots, Events, Vlog, Media Kit, Contact

**CTA Button**: "Find Food" → links to Food Spots page

**Mobile**: Hamburger menu, mobile-first responsive design

**Social links**: Visible in footer AND one other prominent location (hero area or sticky element)

#### Test Cases — Navigation
```
NAV-01: Navigation bar is fixed at top and stays visible on scroll
NAV-02: All 7 nav links + CTA button are visible on desktop
NAV-03: Clicking each nav link routes to the correct page
NAV-04: "Find Food" CTA button routes to /food-spots
NAV-05: Hamburger menu appears on mobile viewport (<768px)
NAV-06: Hamburger menu opens/closes correctly
NAV-07: All nav links are accessible in mobile hamburger menu
NAV-08: Active page is visually indicated in the nav
NAV-09: Logo in nav links to home page
NAV-10: Navigation is keyboard-accessible (Tab, Enter, Escape to close mobile menu)
NAV-11: Nav has appropriate ARIA labels and roles
```

---

### 4.2 Home Page (`/`)

**Sections (in order)**:
1. **Hero** — Animated hero with Chloe's photo, headline, animated stat counters (followers, likes, views), CTA buttons ("Find Food" + "Media Kit"), decorative animated blobs
2. **Featured Spots** — BentoGrid layout with featured food spots pulled from Supabase (most recent or manually selected)
3. **Stats** — Animated number counters on pink gradient background (pulled from Supabase, updated periodically by Chloe)
4. **About Preview** — Short bio with link to full About page
5. **Partnership CTA** — Call-to-action section for brands/restaurants to work with Chloe, links to Contact page
6. **Section dividers** — Wave/curve SVG dividers between sections

**Social links**: Prominently displayed in hero area (TikTok + Instagram)

#### Test Cases — Home Page
```
HOME-01: Hero section renders with Chloe's photo, headline, and CTA buttons
HOME-02: Animated stat counters count up from 0 to real values on scroll into view
HOME-03: Stat counters use easeOutExpo easing and requestAnimationFrame
HOME-04: Stat counters respect prefers-reduced-motion (show final value immediately)
HOME-05: "Find Food" CTA routes to /food-spots
HOME-06: "Media Kit" CTA routes to /media-kit
HOME-07: Featured Spots section loads real data from Supabase (no mock data)
HOME-08: Featured Spots displays in BentoGrid layout with varied sizes
HOME-09: Clicking a featured spot navigates to its detail page (/place/:id)
HOME-10: Stats section renders real follower/like/view counts from Supabase
HOME-11: About preview section links to /about
HOME-12: Partnership CTA links to /contact
HOME-13: Social links (TikTok, Instagram) are visible in hero area
HOME-14: Social links open correct profiles in new tab
HOME-15: Section dividers (wave/curve) render between sections
HOME-16: Scroll animations (fade-in, slide-up) trigger on scroll into view
HOME-17: Decorative blobs animate (floating effect)
HOME-18: Page is fully responsive — all sections stack correctly on mobile
HOME-19: All images are optimized and lazy-loaded
```

---

### 4.3 About Page (`/about`)

**Purpose**: Personality-forward — this is about Chloe, not a portfolio (everything else serves as portfolio)

**Sections**:
1. Bio / personal story
2. Photo gallery — mix of personal photos and food photos (initially uploaded by Colin, updatable by Chloe via admin form)
3. "What I Do" cards
4. Stats section
5. CTA to Contact page

#### Test Cases — About Page
```
ABOUT-01: Bio section renders with Chloe's story text
ABOUT-02: Photo gallery displays mix of personal and food photos
ABOUT-03: Photos are loaded from Supabase (updatable via admin)
ABOUT-04: Photo gallery is responsive (grid adjusts for mobile)
ABOUT-05: "What I Do" cards render with icons and descriptions
ABOUT-06: Stats section shows real numbers from Supabase
ABOUT-07: CTA links to /contact
ABOUT-08: All photos are optimized and lazy-loaded
ABOUT-09: Page has scroll animations
```

---

### 4.4 Food Spots Page (`/food-spots`)

**Scope**: DFW restaurants ONLY. Non-DFW restaurant reviews go under Vlogs.

**Default view**: List view (scrollable cards)

**Toggle**: List view ↔ Map view

**Default sort**: Newest first (by date reviewed)

**Sort dropdown**: Newest first, Highest rated, Alphabetical

**Filters (sidebar on desktop, slide-over on mobile)**:
- **Cuisine categories** — dynamically generated from data (if Chloe adds a "Mediterranean" spot, a Mediterranean filter automatically appears)
- **Asian sub-filters** — Korean, Japanese, Chinese, Thai, Vietnamese, etc. (appear when Asian filter data exists)
- **Price range** — $, $$, $$$, $$$$
- **Rating** — star-based filter
- **Search** — text search by name
- **Clear all** button

**Map view**:
- Leaflet + OpenStreetMap centered on Dallas (32.7767, -96.7970)
- Custom SVG markers for each spot
- Clicking a marker shows a popup card with spot info
- FitBounds to show all visible markers

#### Test Cases — Food Spots Page
```
SPOTS-01: Page loads with list view as default
SPOTS-02: All food spots are fetched from Supabase (no mock data)
SPOTS-03: Only DFW spots are displayed (no non-DFW content)
SPOTS-04: Default sort is newest first (by dateReviewed descending)
SPOTS-05: Sort dropdown is visible and functional
SPOTS-06: Sorting by "Highest rated" reorders list correctly
SPOTS-07: Sorting by "Alphabetical" reorders list A-Z
SPOTS-08: List/Map toggle button switches between views
SPOTS-09: Map view renders Leaflet map centered on Dallas
SPOTS-10: Map shows custom SVG markers for each spot
SPOTS-11: Clicking a map marker shows a popup card
SPOTS-12: Popup card shows spot name, cuisine, rating, price, image
SPOTS-13: Clicking popup card navigates to /place/:id
SPOTS-14: Map FitBounds adjusts to show all visible markers
SPOTS-15: Filter sidebar is visible on desktop
SPOTS-16: Filter sidebar is a slide-over dialog on mobile
SPOTS-17: Cuisine category filters are dynamically generated from data
SPOTS-18: If a new cuisine type is added to Supabase, its filter appears automatically
SPOTS-19: Asian sub-filters appear when Asian cuisine data exists
SPOTS-20: Price range filter ($, $$, $$$, $$$$) works correctly
SPOTS-21: Rating filter works correctly
SPOTS-22: Search by name filters results in real-time
SPOTS-23: Multiple filters can be applied simultaneously
SPOTS-24: "Clear all" button resets all filters
SPOTS-25: Filtered results update both list and map views
SPOTS-26: Empty state shown when no spots match filters ("No spots match your filters")
SPOTS-27: Each spot card shows: image, name, cuisine badge, price badge, rating stars, short review preview
SPOTS-28: Clicking a spot card navigates to /place/:id
SPOTS-29: Spot cards have hover effects
SPOTS-30: Staggered animation on spot cards when they load
SPOTS-31: Page is fully responsive on mobile
SPOTS-32: Images are lazy-loaded and optimized
```

---

### 4.5 Place Detail Page (`/place/:id`)

**Layout**:
1. Hero image (from AI enrichment / Google Places / Yelp)
2. Chloe's review text
3. TikTok embed (inline playable — plays on tap, lazy-loaded)
4. Instagram embed (inline playable, if available — lazy-loaded)
5. Details sidebar:
   - Address
   - Hours
   - Phone
   - Website link
   - Share button
   - Get Directions link (opens Google Maps)
6. Cuisine/price/rating badges

**Embeds**: TikTok and Instagram embeds play INLINE on the site. User taps play to start video. Embeds are lazy-loaded for performance.

#### Test Cases — Place Detail
```
PLACE-01: Page loads correct place data based on :id URL param
PLACE-02: 404 branded error page shown if place ID doesn't exist
PLACE-03: Hero image renders (from enrichment data)
PLACE-04: Chloe's review text is displayed
PLACE-05: TikTok embed renders and is playable inline
PLACE-06: TikTok embed lazy-loads (only loads when scrolled into view)
PLACE-07: TikTok embed plays on user tap/click (not autoplay)
PLACE-08: Instagram embed renders and is playable inline (if Instagram URL exists)
PLACE-09: Instagram embed lazy-loads
PLACE-10: Details sidebar shows address, hours, phone, website
PLACE-11: Website link opens in new tab
PLACE-12: "Get Directions" link opens Google Maps with correct address
PLACE-13: Share button copies link or opens share sheet
PLACE-14: Cuisine, price, and rating badges are displayed
PLACE-15: Page has proper SEO meta tags (unique title, description)
PLACE-16: Page has structured data (Restaurant schema markup)
PLACE-17: Page is fully responsive on mobile (sidebar stacks below content)
PLACE-18: Back navigation works correctly
```

---

### 4.6 Events Page (`/events`)

**Purpose**: Portfolio of events Chloe has covered (food festivals, pop-ups, restaurant openings, etc.). No upcoming/past distinction — purely portfolio.

**Layout**: Event cards with TikTok/Instagram embeds

**Data**: Loaded from Supabase via same admin form flow as food spots

#### Test Cases — Events
```
EVENTS-01: Page loads all events from Supabase
EVENTS-02: Each event card shows: title, description, date, TikTok/Instagram embed
EVENTS-03: TikTok/Instagram embeds are inline playable
EVENTS-04: Embeds play on user tap (not autoplay)
EVENTS-05: Embeds are lazy-loaded
EVENTS-06: Cards have hover effects and animations
EVENTS-07: No upcoming/past distinction — all events shown as portfolio
EVENTS-08: Events are sorted newest first
EVENTS-09: Page is fully responsive on mobile
EVENTS-10: Empty state shown if no events exist
```

---

### 4.7 Vlog Page (`/vlog`)

**Purpose**: Catch-all for non-food-spot, non-event content — travel vlogs, day-in-my-life, recaps, out-of-town restaurant reviews, lifestyle, etc.

**Filter tabs**: Dynamically generated from city/location tags in the data. If Chloe adds content tagged "Houston", a Houston tab automatically appears. "All" tab always shows first.

**Layout**: Vlog cards with TikTok/Instagram embeds

#### Test Cases — Vlog
```
VLOG-01: Page loads all vlogs from Supabase
VLOG-02: "All" tab is shown first and selected by default
VLOG-03: City filter tabs are dynamically generated from vlog location data
VLOG-04: If a new city tag is added (e.g., "Houston"), a tab automatically appears
VLOG-05: Clicking a city tab filters vlogs to only that city
VLOG-06: Tab indicator animates when switching tabs
VLOG-07: Each vlog card shows: title, TikTok/Instagram embed, city/location tag
VLOG-08: TikTok/Instagram embeds are inline playable
VLOG-09: Embeds play on user tap (not autoplay)
VLOG-10: Embeds are lazy-loaded
VLOG-11: Vlogs are sorted newest first
VLOG-12: Page is fully responsive on mobile
VLOG-13: Empty state shown if no vlogs exist or if a city tab has no content
```

---

### 4.8 Media Kit Page (`/media-kit`)

**Purpose**: The sales pitch. Makes restaurants, event organizers, and brand managers think "I need to get Chloe in here." Must be polished and professional.

**Content**:
1. Bio / about section
2. Social stats — followers, engagement rate, avg views (updated periodically by Chloe via admin form, stored in Supabase)
3. Audience demographics — DFW-focused, age range, food-interested audience
4. Content examples / portfolio highlights — pulled from best spots/events/vlogs on the site
5. Past brand collaborations (if any)
6. "Contact for Rates" — links to Contact page
7. **Downloadable PDF** — media kit as a downloadable PDF file
8. **Live preview** — the full media kit is viewable on the page itself

**Stats source**: Chloe updates periodically through admin form (middle ground — not auto-pulled from APIs due to TikTok/Instagram API restrictions)

#### Test Cases — Media Kit
```
MEDIA-01: Page renders full media kit content as a live preview
MEDIA-02: Bio section is present and accurate
MEDIA-03: Social stats display real values from Supabase (not mock)
MEDIA-04: Stats include: follower count, engagement rate, avg views
MEDIA-05: Audience demographics section is present
MEDIA-06: Content examples section shows portfolio highlights from Supabase
MEDIA-07: "Contact for Rates" links to /contact
MEDIA-08: Download PDF button is visible and prominent
MEDIA-09: Clicking download triggers a PDF download of the media kit
MEDIA-10: Downloaded PDF matches the live preview content
MEDIA-11: PDF is professionally formatted and branded (Rosé & Cream theme)
MEDIA-12: Page is fully responsive on mobile
MEDIA-13: Page looks professional and polished — suitable for brand evaluation
```

---

### 4.9 Contact Page (`/contact`)

**Purpose**: Both partnership inquiries and general contact

**Form fields**:
- Name
- Email
- **Inquiry type dropdown** (Partnership, Event Invite, General Question, etc.)
- Message
- Floating labels with real-time validation
- Progress indicator

**On submit**:
1. Save to Supabase (contacts table)
2. Send email notification to chloe_yun@aol.com

**Additional content**: Partnership benefits / why work with Chloe section

#### Test Cases — Contact
```
CONTACT-01: Form renders with all fields: name, email, inquiry type dropdown, message
CONTACT-02: Floating labels animate correctly on focus
CONTACT-03: Real-time validation shows errors for invalid email
CONTACT-04: Real-time validation shows errors for empty required fields
CONTACT-05: Progress indicator updates as fields are completed
CONTACT-06: Inquiry type dropdown includes: Partnership, Event Invite, General Question (and possibly more)
CONTACT-07: Form submission saves data to Supabase contacts table
CONTACT-08: Form submission sends email notification to chloe_yun@aol.com
CONTACT-09: Success state shown after submission
CONTACT-10: Error state shown if submission fails
CONTACT-11: Form prevents duplicate rapid submissions
CONTACT-12: Partnership benefits section is displayed
CONTACT-13: Page is fully responsive on mobile
CONTACT-14: Form is keyboard-accessible
CONTACT-15: Form fields have appropriate ARIA labels
```

---

### 4.10 Footer

**Content**:
- Brand name / logo
- Social links: Instagram, TikTok, Email
- Quick links to main pages
- Copyright
- **Admin link** — subtle link to admin area (password-protected)

#### Test Cases — Footer
```
FOOTER-01: Footer renders on all pages
FOOTER-02: Social links (Instagram, TikTok, Email) are present and link correctly
FOOTER-03: Social links open in new tab
FOOTER-04: Quick links navigate to correct pages
FOOTER-05: Admin link is present but subtle (not prominently styled)
FOOTER-06: Admin link navigates to admin area
FOOTER-07: Copyright year is current
FOOTER-08: Footer is responsive on mobile
```

---

## 5. Admin Area

### 5.1 Access
- Accessed via subtle link in the footer
- Protected by a simple password (no user accounts)
- Password stored as environment variable, validated server-side

### 5.2 Admin Pages
Separate forms for each content type:

#### 5.2.1 Add Food Spot Form
**Chloe provides**:
- Restaurant name
- Her rating (1-5 stars)
- Her review text
- TikTok link
- Instagram link (optional)
- Cuisine type (dropdown)
- Price range (dropdown: $, $$, $$$, $$$$)

**AI enriches** (automatic on submit):
- Address
- Coordinates (lat/lng)
- Phone number
- Hours of operation
- Website
- Cover photo (uploaded to Vercel Blob, auto-optimized)

**Source**: Google Places API → Yelp Fusion API fallback

#### 5.2.2 Add Event Form
- Event name
- Description
- Date
- TikTok link
- Instagram link (optional)

#### 5.2.3 Add Vlog Form
- Title
- TikTok link
- Instagram link (optional)
- City/location tag (free text — drives dynamic tabs on Vlog page)

#### 5.2.4 Edit/Delete
- All three content types support edit and delete
- Edit pre-fills the form with existing data
- Delete requires confirmation

#### 5.2.5 Batch Import
- Paste a list of: restaurant names + TikTok URLs + any other needed fields
- System processes them all, running AI enrichment on each
- Progress indicator showing batch status

#### 5.2.6 Media Kit Stats Update
- Form to update: follower count, likes, views, engagement rate, audience demographics
- Updates Supabase, immediately reflected on Media Kit page and homepage stats

#### 5.2.7 About Photos Update
- Upload / swap out gallery photos for the About page
- Images auto-optimized on upload

#### Test Cases — Admin
```
ADMIN-01: Admin link in footer navigates to admin area
ADMIN-02: Password prompt appears before accessing admin
ADMIN-03: Incorrect password shows error, does not grant access
ADMIN-04: Correct password grants access to admin area
ADMIN-05: Password is validated server-side (not client-only)

--- Add Food Spot ---
ADMIN-06: Food spot form renders all fields: name, rating, review, TikTok link, Instagram link, cuisine dropdown, price dropdown
ADMIN-07: Cuisine dropdown options are present
ADMIN-08: Price range dropdown shows $, $$, $$$, $$$$
ADMIN-09: Rating input allows 1-5 stars (half stars if supported)
ADMIN-10: Form validates required fields before submission
ADMIN-11: On submit, AI enrichment runs automatically (Google Places → Yelp fallback)
ADMIN-12: Enrichment populates: address, coordinates, phone, hours, website, cover photo
ADMIN-13: Cover photo is uploaded to Vercel Blob and auto-optimized
ADMIN-14: New food spot appears on Food Spots page after submission
ADMIN-15: New food spot appears on map with correct coordinates
ADMIN-16: Loading state shown during enrichment process
ADMIN-17: Error state shown if enrichment fails (spot still saved with manual data)

--- Add Event ---
ADMIN-18: Event form renders all fields: name, description, date, TikTok link, Instagram link
ADMIN-19: Event form validates required fields
ADMIN-20: New event appears on Events page after submission

--- Add Vlog ---
ADMIN-21: Vlog form renders all fields: title, TikTok link, Instagram link, city/location tag
ADMIN-22: City/location tag is free text input
ADMIN-23: New vlog appears on Vlog page after submission
ADMIN-24: If a new city tag is entered, corresponding tab appears on Vlog page

--- Edit/Delete ---
ADMIN-25: Each content item has edit and delete actions
ADMIN-26: Edit pre-fills form with existing data
ADMIN-27: Edit submission updates the item in Supabase
ADMIN-28: Updated data is immediately reflected on public pages
ADMIN-29: Delete shows confirmation dialog
ADMIN-30: Delete removes item from Supabase and public pages
ADMIN-31: Deleting a food spot removes its map marker

--- Batch Import ---
ADMIN-32: Batch import interface accepts a list of entries (name + TikTok URL + other fields)
ADMIN-33: Batch processes each entry with AI enrichment
ADMIN-34: Progress indicator shows batch processing status (e.g., "3 of 15 complete")
ADMIN-35: Failed items are flagged but don't block remaining items
ADMIN-36: All successfully imported items appear on public pages

--- Media Kit Stats ---
ADMIN-37: Stats update form shows current values
ADMIN-38: Updated stats are immediately reflected on Media Kit page
ADMIN-39: Updated stats are immediately reflected on homepage counters

--- About Photos ---
ADMIN-40: Photo upload interface allows selecting/uploading images
ADMIN-41: Uploaded photos are auto-optimized
ADMIN-42: New photos appear on About page gallery
ADMIN-43: Existing photos can be removed/replaced
```

---

## 6. Data Schema (Supabase)

### 6.1 `places` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | Required |
| cuisine_type | text | e.g., "Korean", "Mexican" |
| filter_category | text | e.g., "Asian", "Mexican" — for filter grouping |
| price_range | text | $, $$, $$$, $$$$ |
| rating | decimal | 1-5, Chloe's rating |
| review | text | Chloe's review |
| tiktok_url | text | TikTok video URL |
| instagram_url | text | Optional Instagram URL |
| address | text | From enrichment |
| city | text | Default "Dallas" for DFW |
| latitude | decimal | From enrichment |
| longitude | decimal | From enrichment |
| phone | text | From enrichment |
| hours | jsonb | From enrichment |
| website | text | From enrichment |
| cover_image_url | text | Vercel Blob URL |
| date_reviewed | timestamp | When Chloe reviewed it |
| is_featured | boolean | For homepage featured section |
| created_at | timestamp | Auto |
| updated_at | timestamp | Auto |

### 6.2 `events` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | Required |
| description | text | Event description |
| event_date | date | When the event occurred |
| tiktok_url | text | TikTok video URL |
| instagram_url | text | Optional |
| cover_image_url | text | Optional |
| created_at | timestamp | Auto |
| updated_at | timestamp | Auto |

### 6.3 `vlogs` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| title | text | Required |
| tiktok_url | text | TikTok video URL |
| instagram_url | text | Optional |
| city | text | City/location tag (drives dynamic tabs) |
| cover_image_url | text | Optional |
| created_at | timestamp | Auto |
| updated_at | timestamp | Auto |

### 6.4 `contacts` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | Required |
| email | text | Required |
| inquiry_type | text | Partnership, Event Invite, General Question |
| message | text | Required |
| created_at | timestamp | Auto |

### 6.5 `site_settings` table
| Column | Type | Notes |
|--------|------|-------|
| key | text | Primary key (e.g., "tiktok_followers") |
| value | text | The value |
| updated_at | timestamp | Auto |

Used for: media kit stats, social stats, any site-wide settings

### 6.6 `about_photos` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| image_url | text | Vercel Blob URL |
| sort_order | integer | Display order |
| created_at | timestamp | Auto |

---

## 7. SEO & Structured Data

### 7.1 Requirements
- Every page has unique `<title>` and `<meta description>`
- Open Graph and Twitter Card meta tags on all pages
- Each Place Detail page has Restaurant schema markup (JSON-LD)
- Clean URL structure: `/food-spots`, `/place/[slug]`, `/events`, `/vlog`, `/media-kit`, `/contact`, `/about`
- Sitemap.xml generated
- robots.txt configured
- `theme-color` meta tag set to #F8A5B8

#### Test Cases — SEO
```
SEO-01: Every page has a unique <title> tag
SEO-02: Every page has a unique <meta description>
SEO-03: Open Graph meta tags (og:title, og:description, og:image) present on all pages
SEO-04: Twitter Card meta tags present on all pages
SEO-05: Place Detail pages have Restaurant schema (JSON-LD) with name, address, rating
SEO-06: URLs are clean and descriptive (no query params for primary navigation)
SEO-07: sitemap.xml is generated and accessible
SEO-08: robots.txt is configured correctly
SEO-09: theme-color meta tag is #F8A5B8
SEO-10: All images have alt text
SEO-11: Heading hierarchy is correct (single H1 per page)
```

---

## 8. Performance

### 8.1 Requirements
- Mobile-first responsive design
- TikTok/Instagram embeds are lazy-loaded (only load when scrolled into view)
- Embeds play on user tap only (no autoplay)
- Images auto-optimized on upload (via Vercel Blob)
- Images lazy-loaded throughout the site
- Branded loading screen while initial data loads

#### Test Cases — Performance
```
PERF-01: Lighthouse mobile score > 80
PERF-02: TikTok embeds only load when scrolled into viewport
PERF-03: Instagram embeds only load when scrolled into viewport
PERF-04: Embeds do not autoplay — user must tap play
PERF-05: Images are served in optimized format
PERF-06: Images use lazy loading (loading="lazy" or Intersection Observer)
PERF-07: Branded loading screen appears while Supabase data loads
PERF-08: Loading screen transitions smoothly to content
PERF-09: No layout shift when embeds load (placeholder maintains space)
PERF-10: Page doesn't freeze or jank during scroll animations
```

---

## 9. Accessibility

### 9.1 Requirements
- WCAG 2.1 AA compliance (priority)
- All animations respect `prefers-reduced-motion`
- Keyboard navigation throughout (Tab, Enter, Escape)
- ARIA labels on interactive elements
- Alt text on all images
- Color contrast meets AA standards
- Focus indicators visible

#### Test Cases — Accessibility
```
A11Y-01: All interactive elements are keyboard-accessible
A11Y-02: Tab order is logical on all pages
A11Y-03: Focus indicators are visible on keyboard navigation
A11Y-04: All images have descriptive alt text
A11Y-05: Color contrast ratio meets WCAG AA (4.5:1 for text)
A11Y-06: Animations are disabled when prefers-reduced-motion is set
A11Y-07: Stat counters show final value immediately with reduced motion
A11Y-08: ARIA labels on: nav, hamburger menu, filter sidebar, sort dropdown, form inputs
A11Y-09: Screen reader can navigate all pages meaningfully
A11Y-10: Mobile slide-over filter has correct ARIA dialog role
A11Y-11: Map markers have accessible labels
A11Y-12: Form error messages are announced to screen readers
```

---

## 10. Content Workflow

### 10.1 Adding New Content (Ongoing)
1. Chloe posts TikTok/Instagram
2. Chloe goes to admin form on her phone
3. Fills in: name, rating, review, TikTok link, Instagram link, cuisine, price
4. Hits submit → AI enriches address, coordinates, hours, phone, website, cover photo
5. Spot appears on site immediately

### 10.2 Initial Batch Import (One-time)
1. Colin prepares list of Chloe's existing TikTok URLs + restaurant names + ratings + reviews + cuisine + price
2. Pastes into batch import interface
3. System processes each entry with AI enrichment
4. All existing content is live on the site

### 10.3 Media Kit Updates (Periodic)
1. Chloe goes to admin → Media Kit Stats form
2. Updates follower counts, views, engagement rate
3. Stats update immediately on Media Kit page and homepage

---

## 11. Analytics Integration

### 11.1 Google Analytics
- Track page views across all pages
- Track which food spots get the most views
- Track traffic sources (social, organic, direct)
- Track device types (mobile vs desktop)
- Demographics data for media kit

#### Test Cases — Analytics
```
ANALYTICS-01: Google Analytics tracking code is loaded on all pages
ANALYTICS-02: Page views are tracked on navigation
ANALYTICS-03: Custom events tracked: "Download Media Kit PDF", "Contact Form Submit", "Social Link Click"
```

---

## 12. Environment Variables

```
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Places
GOOGLE_PLACES_API_KEY=

# Yelp
YELP_API_KEY=

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# Admin
ADMIN_PASSWORD=

# Email (for contact form notifications)
EMAIL_SERVICE_API_KEY=

# Google Analytics
VITE_GA_MEASUREMENT_ID=
```

---

## 13. Migration Checklist

### From Current State → Target State
```
MIGRATE-01: Set up Supabase project with all tables (places, events, vlogs, contacts, site_settings, about_photos)
MIGRATE-02: Remove all mock data from codebase (delete mockData.ts)
MIGRATE-03: Replace Notion API integration with Supabase client
MIGRATE-04: Update all data hooks (usePlaces, usePlace, etc.) to use Supabase
MIGRATE-05: Remove VITE_NOTION_API_KEY and related Notion code
MIGRATE-06: Build admin area with password protection
MIGRATE-07: Build Add Food Spot form with AI enrichment
MIGRATE-08: Build Add Event form
MIGRATE-09: Build Add Vlog form
MIGRATE-10: Build Edit/Delete functionality for all content types
MIGRATE-11: Build Batch Import interface
MIGRATE-12: Build Media Kit Stats update form
MIGRATE-13: Build About Photos update interface
MIGRATE-14: Update Food Spots page: rename from Map, dynamic filters, sort dropdown
MIGRATE-15: Update Vlog page: dynamic city tabs
MIGRATE-16: Update Media Kit page: live preview + PDF download
MIGRATE-17: Update Contact form: add inquiry type dropdown, Supabase + email dual submit
MIGRATE-18: Implement burger logo (SVG) across site: nav, loading screen, error pages, favicon
MIGRATE-19: Apply Rosé & Cream color theme
MIGRATE-20: Implement branded loading screen
MIGRATE-21: Implement branded error pages (404, 500)
MIGRATE-22: Make TikTok/Instagram embeds inline playable (not thumbnail + new tab)
MIGRATE-23: Add lazy loading to all embeds
MIGRATE-24: Add SEO: unique meta tags per page, structured data on Place Detail, sitemap, robots.txt
MIGRATE-25: Add Google Analytics
MIGRATE-26: Ensure all animations respect prefers-reduced-motion
MIGRATE-27: Test full accessibility (keyboard nav, ARIA, contrast)
MIGRATE-28: Add social links in prominent location beyond footer
MIGRATE-29: Deploy to Vercel with chloeeatsdfw.com domain
MIGRATE-30: Run initial batch import of Chloe's existing content
```

---

## Summary Stats

- **Total test cases**: 148
- **Pages**: 10 (Home, About, Food Spots, Place Detail, Events, Vlog, Media Kit, Contact, Admin, Error pages)
- **Content types**: 3 (Food Spots, Events, Vlogs)
- **Database tables**: 6
- **Migration steps**: 30
