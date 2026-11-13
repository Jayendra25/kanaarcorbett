# Hotel Kanaar Corbett

An editorial, single-page website for Hotel Kanaar Corbett — stays, dining, celebrations, and gatherings at Peerumadara, Ramnagar, near Jim Corbett National Park.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run start
```

## Structure

- `app/page.tsx` — page composition; sections are anchor targets (`#hotel`, `#stays`, `#dining`, `#celebrations`, `#corbett`, `#gallery`, `#voices`, `#contact`).
- `app/globals.css` — design tokens, typography, header, menu, intro, footer.
- `app/sections.css` — section layouts and responsive rules.
- `app/extras.css` — composed refinements and motion-related fallbacks.
- `components/sections/` — each page section.
- `components/experience/` — intro, smooth scroll, scroll choreography, motion provider.
- `components/media/Plate.tsx` — original SVG scene artwork with an `image` prop for swapping in photography.
- `lib/content.ts` — all hotel copy, rooms, event spaces, testimonials, and contact details.

## Imagery

All visuals are original inline SVG illustrations and should be treated as placeholders. To use commissioned photography, pass an image source to the relevant `Plate` scene (for example, a room card or gallery item). Keep the warm ivory, charcoal, and champagne palette when selecting or grading images.

## Motion and accessibility

- The intro runs once per browser session and is skipped at `prefers-reduced-motion: reduce`.
- `?intro=1` replays the intro; `?nointro=1` or `?intro=0` skips it for screenshots and QA.
- The intro can be skipped with the on-screen control or `Esc`.
- Without JavaScript or motion, the final hero and all content remain visible.
- Anchor navigation and scroll reveals respect reduced-motion settings.

## Enquiries

The contact form is client-only: it validates locally and prepares a prefilled WhatsApp message or email. There is no server or database. Connect a form endpoint if submissions need to be stored.
