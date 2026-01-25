# Chloe Eats DFW - Project Memory

## Last Updated: January 24, 2025

## Project Status: Coffee Merged into Food Spots

### GitHub Repository
- **URL:** https://github.com/coliny61/chloeyun
- **Remote:** git@github.com:coliny61/chloeyun.git (SSH)
- **Branch:** main
- **Status:** Up to date with origin/main

---

## Recent Changes (This Session)

### Coffee Tab Removal & Merge
- **Removed:** Coffee tab from navigation
- **Removed:** `/coffee` route and `CoffeeMap.tsx` page
- **Merged:** 6 coffee shops into `mockPlaces` with `cuisineType: 'Coffee'`
- **Added:** `dateReviewed` field to Place interface for sorting
- **Default Sort:** Food spots now sorted by most recently reviewed (oldest first, newest last)

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

## TODO / Next Steps
- [ ] Verify all coordinates for new food spots
- [ ] Add cover images for new places (currently using Unsplash placeholders)
- [ ] Test animation performance on mobile
- [ ] Verify reduced-motion accessibility
- [ ] Consider code-splitting for bundle optimization
- [ ] Add more detailed review content for new spots
- [ ] Update dateReviewed values to match actual TikTok upload dates
