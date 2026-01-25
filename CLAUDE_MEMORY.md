# Chloe Eats DFW - Project Memory

## Last Updated: January 24, 2025

## Project Status: Content Added & Pushed to GitHub

### GitHub Repository
- **URL:** https://github.com/coliny61/chloeyun
- **Remote:** git@github.com:coliny61/chloeyun.git (SSH)
- **Branch:** main
- **Status:** Up to date with origin/main

---

## Current Content Inventory

### Food Spots (39 total)
Located in `/src/lib/mockData.ts` → `mockPlaces[]`

| ID | Name | Cuisine | Price | Rating |
|----|------|---------|-------|--------|
| 11 | Don Sarang KBBQ | Korean | $$$ | 4.8 |
| 12 | Mamani | French | $$$$ | 4.0 |
| 13 | Norman's Japanese Grill | Fusion | $$$$ | 4.2 |
| 14 | Neko Yubu | Korean | $ | 4.9 |
| 15 | NADC Burger | American | $$ | 4.5 |
| 16 | Lucia | Italian | $$$$ | 3.9 |
| 17 | Big Dash | Dessert | $ | 4.8 |
| 18 | Tatsu Dallas | Japanese | $$$$ | 3.5 |
| 19 | Pillar | American | $$$$ | 3.8 |
| 20 | Written by the Seasons | American | $$$ | 4.5 |
| 21 | Hampyong Cold Noodles | Korean | $$ | 4.0 |
| 22 | Trades Delicatessen | American | $$ | 4.5 |
| 23 | Spice Shawarma | Mediterranean | $ | 4.8 |
| 24 | Childish Bakery | Korean | $ | 4.8 |
| 25 | Samad Cafe | Mediterranean | $$ | 4.6 |
| 26 | Haidilao Hot Pot | Chinese | $$ | 3.0 |
| 27 | Evelyn | American | $$$$ | 3.8 |
| 28 | Domodomo Omakase | Japanese | $$$$ | 4.0 |
| 29 | Sandoitchi | Japanese | $$ | 4.2 |
| 30 | Dior Cafe | Cafe | $$$$ | 2.8 |
| 31 | Zodiac Restaurant | American | $$$ | 4.5 |
| 32 | Casa Brasa | Fusion | $$$$ | 4.8 |
| 33 | Prince St Pizza | Italian | $$ | 3.0 |
| 34 | Burger Schmurger | American | $$ | 4.8 |
| 35 | Standard Pour | Bar | $$ | 3.0 |
| 36 | Skellig | Bar | $$ | 4.2 |
| 37 | Vida Bowls | Cafe | $ | 4.9 |
| 38 | Mikes Gemini | Bar | $ | 3.9 |
| 39 | Honeybird | Korean | $$ | 4.5 |

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

### Coffee Shops (6 total)
Located in `/src/lib/mockData.ts` → `mockCoffeeShops[]`

1. Pax & Beneficia - Dallas (Deep Ellum) - $, 4.0
2. Flying Horse Cafe - Dallas (Downtown) - $, 3.5
3. Khroma Coffee - Dallas (Deep Ellum) - $, 4.0
4. La Souq - Richardson - $, 4.3
5. Chicha San Chen - Carrollton - $, 4.9
6. Hola Cafe - Dallas (Bishop Arts) - $$, 4.2

---

## Technical Architecture

### UX/UI Features (Premium Overhaul)
- **Animation Hooks:** useReducedMotion, useScrollAnimation, useCounter, useStaggeredAnimation
- **Components:** BentoGrid, FloatingInput, SectionDivider, Card (with variants)
- **CSS:** 15+ keyframe animations in `/src/index.css`

### Filter System
8 intuitive categories mapping to cuisine types:
- Asian (with sub-filters: Korean, Japanese, Chinese, Thai, Vietnamese, Indian)
- Latin, European, American, Sweet Treats, Coffee & Cafe, Bars & Drinks, Other

### Key Files
- `/src/lib/mockData.ts` - All content data
- `/src/types/index.ts` - TypeScript types and category mappings
- `/src/hooks/usePlaces.ts` - Filter logic
- `/src/components/map/FilterSidebar.tsx` - Filter UI
- `/src/pages/CoffeeMap.tsx` - Coffee-specific map page

---

## Git Workflow

### To Push Changes
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

### Recent Commits
- `52132a6` - Merge remote changes with local premium UX/UI overhaul
- `8e125d6` - Add new content: events, vlogs, food spots, and coffee shops
- `0c2715b` - Premium UX/UI overhaul with animations and improved filters

---

## TODO / Next Steps
- [ ] Verify all coordinates for new food spots
- [ ] Add cover images for new places (currently using Unsplash placeholders)
- [ ] Test animation performance on mobile
- [ ] Verify reduced-motion accessibility
- [ ] Consider code-splitting for bundle optimization
- [ ] Add more detailed review content for new spots
