# Hotel Kanaar Corbett — A4 Brochure

Print-ready, 12-page A4 portrait brochure for **Hotel Kanaar Corbett — A Unit of The Corbett Ramdutt**.

- **Deliverable:** `Hotel-Kanaar-Corbett-Brochure.pdf` (12 pages, A4, 210 × 297 mm, 8.3 MB, live links)
- **Editable source:** `index.html` (copy and structure) + `brochure.css` (layout and typography)
- **Photography:** only the hotel's own files from `/public/images`, converted to JPEG derivatives in `assets/img/`

## Pages

| # | Page | Key image |
|---|------|-----------|
| 1 | Cover — *A quieter side of the wild* | `facade-twilight.jpg` (Twilight Glow) |
| 2 | Welcome — *The art of hospitality* | `welcome-reception.jpg` |
| 3 | The Hotel — *A rare address* | `entrance-day.jpg` (lower entrance crop) |
| 4 | Stays — *Rooms to return to* | `luxury-room.jpg`, `standard-room.jpg`, `elegant-room.jpg` |
| 5 | Dining — *A taste of authentic Pahadi cuisine* | `cuisine-tray.jpg`, `pahadi-thali.jpg` |
| 6 | Celebrations — *Held beautifully* | `banquet-hall.jpg`, `celebration-stage.jpg` |
| 7 | Conferences — *Work, well hosted* | `conference-hall.jpg` |
| 8 | Property Convenience — *Arrive, park, settle in* | `forecourt-dusk.jpg` |
| 9 | The Experience — *The wild is your neighbour* | `festive-entrance.jpg`, `elegant-room.jpg`, `banquet-table.jpg` |
| 10 | Location — *Finding Kanaar* | QR map |
| 11 | Guest Voices — *In their words* | — |
| 12 | Back cover | `forecourt-dusk.jpg` (entrance crop) |

## Rebuild the PDF

Requires Google Chrome and `puppeteer-core` (already a dev dependency):

```bash
node brochure/build.mjs
```

This renders `brochure/index.html` to `brochure/Hotel-Kanaar-Corbett-Brochure.pdf` and writes page previews to `.shots/` (git-ignored). Open `index.html` in a browser to review on screen; `@media print` drops the page shadows.

To regenerate the QR codes after changing a URL, install `qrcode`, run `make-qr.mjs`, then uninstall it:

```bash
npm i -D qrcode && node brochure/make-qr.mjs && npm uninstall -D qrcode
```

## Design system

| Token | Value |
|-------|-------|
| Paper | `#fbf9f4` |
| Cream panel | `#f2ebdd` |
| Charcoal | `#23211d` |
| Gold | `#b39a6b` |
| Gold deep | `#8d7444` |
| Gold light | `#d8c39c` |

- **Display / serif:** Cormorant Garamond (variable, `fonts/`, OFL)
- **Text / sans:** Jost (variable, `fonts/`, OFL)
- 18 mm side margins, 16 mm top, 14 mm bottom; 12-page grid; folios at the outer margin.
- **Contact hierarchy:** `+91 89543 89999` and `thekanaarcorbett@gmail.com` are the single primary phone and email on every contact block (guest-voices CTA, back cover). The second line `+91 74177 47918` appears only once, labelled *Alternate line*, on the Location page.
- **Live links:** website, email, phone, coordinates and Google Maps directions are embedded as clickable annotations in the PDF (verified with 4 × website, 3 × email, 3 × primary phone, 1 × alternate phone, 2 × maps links).

## Editing notes

- Copy lives directly in `index.html`; lengths are tuned to the fixed page compositions. If a paragraph grows, check for overflow with `node brochure/build.mjs` — it prints any page whose scroll size exceeds the A4 box.
- Images are referenced from `assets/img/` (JPEG derivatives). Swap in a new file and update the `src`; keep the same aspect ratio, as most frames use `object-fit: cover`.
- `assets/img` files were downsized from the originals so the PDF stays emailable. For a commercial press run with a higher-resolution photo set, re-export at 300 ppi for the placed size before building.

## Content and photography caveats

- `HOTEL_BROCHURE_CONTENT.md` was not present in the project or home folders, so copy was written from `lib/content.ts` and `lib/images.ts`. No prices, capacities or facilities were invented beyond those sources.
- The supplied façade and reception photographs show older phone numbers on the building sign (`9759557787 / 7906767521`) and on the reception welcome board. The photos are authentic and unretouched; crops avoid the signage where possible. **Recommend updating the signage or commissioning a new façade photograph before a large print run.**
- `grand-banquet-hall.webp` is a computer render rather than a photograph; it is the only banquet-hall visual available.
- The two food photographs are low resolution (588 × 441 and 758 × 431), so they are placed at modest sizes.
- Bedroom/lobby photographs are 1086–1536 px wide, roughly 130–190 ppi at their placed sizes — fine for email and office printing, marginal for offset.
