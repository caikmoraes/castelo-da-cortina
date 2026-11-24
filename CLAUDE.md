# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing/portfolio site for Castelo da Cortina (curtains, blinds and awnings business in Osasco-SP). Plain HTML/CSS/vanilla JS — no build step, no package manager, no framework, no CDN dependencies, no tests, no linter. All user-facing text is in Brazilian Portuguese.

The visual spec is the Claude Design canvas "Castelo da Cortina Redesign" (artboards Main, Cortinas, Persianas, Toldos, Contato, Mobile).

## Contact details (business rules)

- **WhatsApp: only (11) 99912-5703** (`https://wa.me/5511999125703`). It is the main call to action everywhere. Do not add a second WhatsApp number.
- Phone (11) 3605-9089 · castelodacortina@hotmail.com · R. Paraguaçú, 51 – Jardim D'Abril, Osasco/SP, CEP 06033-160.
- Opening hours are intentionally not shown until the owner provides them.
- Copy must not ask visitors to send photos (of the window, room, façade…); calls to action just invite them to talk on WhatsApp.

## Running locally

Serve over HTTP from the repo root (`file://` breaks the manifest `fetch`):

```sh
python -m http.server 8000   # then open http://localhost:8000
```

## Architecture

- `index.html` — home. `pages/{cortinas,persianas,toldos,contato}.html` — subpages, assets via `../`.
- Every page's `<body>` declares `data-page` (home|cortinas|persianas|toldos|contato) and `data-root` (`""` or `"../"`), and contains empty `#site-header` / `#site-footer` slots.
- `javascript/script.js` — single shared script, loaded at the end of `<body>`. It injects the header (plus the dark top strip on home only), the footer and the fixed mobile WhatsApp bar; sets `aria-current` from `data-page`; runs the mobile menu, the model picker and the lightbox. **Nav links, footer and the WhatsApp number live here** — edit once, not per page.
- `css/style.css` — single stylesheet; design tokens on `:root` (colours, fonts, spacing). Breakpoints: 1060px (menu collapses), 900px, 720px (phone layout + fixed WhatsApp bar).
- Fonts are self-hosted woff2 in `fonts/` (DM Serif Display for headings, Manrope variable for body; both OFL). Icons are inline SVG.

### Catalog pages (Cortinas / Persianas)

Each model is a static `<article class="model" id="<category>">` with its photo, copy and key points. The chips (`.chips`, hidden until JS runs) show one model at a time and keep the choice in the URL hash (`cortinas.html#romana`). Without JS every model is shown stacked.

### Galleries

- Any element with `data-gallery="img_<page>/<category>"` (+ `data-title`) opens a native `<dialog>` lightbox with every photo from `jsons/img_<page>/<category>/images.json`. `[data-count-for="…"]` is filled with the photo count.
- Manifest entries: `{ "url": "/img/…/x.webp", "sm": "/img/…/x-sm.webp", "w": …, "h": … }` (`sm` only when the original was wider than 640px). Featured `*CAR` photos come first.
- Photos are WebP only: `<name>.webp` (≤1600px wide) and `<name>-sm.webp` (≤640px). Originals were removed (recoverable from git history).

To add photos: drop JPEG/PNG files into `img/img_<page>/<category>/`, then

```sh
scripts/optimize-images.sh          # converts to WebP and deletes the originals (needs libvips)
python3 scripts/build_manifests.py  # regenerates every jsons/**/images.json
```

To add a category: create the image folder, run both scripts, and add the model's `<article>` and chip to the page.

### Known quirks

- No deployment config is committed. Production is https://www.castelodacortina.com.br (behind Cloudflare); the GitHub Pages URL is only for testing.
- SEO: every page has a `<link rel="canonical">` to its production URL, `index.html` carries the `LocalBusiness` JSON-LD, and `sitemap.xml` / `robots.txt` list the pages. A new page needs its canonical and a sitemap entry; contact changes must also update the JSON-LD.
