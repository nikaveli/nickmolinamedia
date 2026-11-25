# Nick Molina Media — builder site

Video-first marketing site for Colorado builders and remodelers. Static HTML generated from JS templates, animated with GSAP (ScrollTrigger + ScrollSmoother), built with Vite.

## Run

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # outputs dist/
npm run preview
```

## Where things live

- `MESSAGING.md` — positioning, site copy, packages, objections, Instagram/Facebook reels and DM scripts. Source of truth for words.
- `src/data/projects.json` — the eleven Summit projects (title, room, blurb, details, photo count, clip ids).
- `src/pages/home.mjs`, `src/pages/others.mjs` — page content. `src/templates/layout.mjs` — nav, footer, modal, head.
- `scripts/build-projects.mjs` — generates `index.html`, `work.html`, `builders.html`, `about.html`, `contact.html`, and `work/<slug>.html`. Runs before dev and build.
- `src/styles.css` — design tokens (Builder Navy, Site Blue, Craft Camel, Walnut, Workshop White), layout, components.
- `src/main.js` — all animation: pinned shrinking hero, pinned three-room sequence, horizontal work strip, stacked deliverable cards, marquee, reveals, nav, menu, FAQ, film modal, lazy video.
- `public/media/` — encoded web video (hero 16:9 and 9:16, room loops, card loops, two Summit films), `photos/` galleries, and `clips/` — every unique 5–6 s Summit clip (184, ids `u001`–`u184`, 960 px, ~70 MB) with a poster each. Rebuild with `bash scripts/encode-clips.sh <unique.tsv> public/media/clips` (the tsv is id, md5, duration, source path).
- `src/pages/portfolio.mjs` — the parallax portfolio: a chapter per room type with a full-bleed clip and a sliding word, then a four-column wall whose columns drift at different speeds; every tile is a loop and opens in the lightbox.

## Source footage

- Raw clips: `/Volumes/T7/SUMMIt/facebook videos/<project>-clips*/clip-N.mp4` (24 fps, 1080p, ~5 s each)
- Finished Facebook reels: `/Volumes/T7/SUMMIt/Summit_Media/FACEBOOK/summit*.mp4`
- Finished photos: `/Volumes/T7/SUMMIt/Summit_Media/_Exports/03_After/`

Re-encode a loop: `ffmpeg -i in.mp4 -an -vf "scale=960:-2,fps=24" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart public/media/out.mp4`

## Before launch

- Replace the bracketed terms in the copy (turnaround, time on site, file ownership). Phone and email live in `src/templates/layout.mjs` (SITE).
- Confirm final package prices in `home.mjs` and `others.mjs`.
- Point the contact form at a real endpoint: `action="https://formspree.io/f/REPLACE_ME"` in `others.mjs`.
- Get Summit's written okay and a real quote; add the Proof section when you have it.
- Add a `favicon` and an OG image in `layout.mjs`.

## Deploy (Cloudflare Pages)

```bash
npm run build
npx wrangler pages deploy dist --project-name nick-molina-media
```

## Logo

Nick's logo lives in `public/brand/`, recolored from black to Walnut (#402824). `logo-walnut.png` / `lockup-walnut.png` go on light surfaces, `logo-light.png` / `lockup-light.png` (Craft Camel body) on navy; the play-button shadow is black in both. Favicons, apple-touch-icon and `og.png` come from the same art. Set `SITE.url` in `src/templates/layout.mjs` at launch so the `og:image` tag resolves.

## Deploy

- Source: https://github.com/nikaveli/nickmolinamedia (branch `main`).
- Hosting: Cloudflare Workers static assets, worker `nickmolinamedia`, config in `wrangler.jsonc`. Custom domains `nickmolinamedia.com` and `www.nickmolinamedia.com` are declared there and Cloudflare manages their DNS.
- Ship a change: `npm run build && npx wrangler deploy`, then `git push`.
