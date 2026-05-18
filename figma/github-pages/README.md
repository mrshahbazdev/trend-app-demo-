# TrendUp Today Hub — static mockup (GitHub Pages)

Interactive prototypes: **`today-hub.html`** (desktop) and **`today-hub-mobile.html`** (mobile), with assets under **`assets/`**. **No build step.** Push this folder to a repo root and enable Pages.

## Quick deploy (GitHub Pages)

1. Create a repository (e.g. `trendup-hub-mockup`).
2. Upload **everything in this folder** to the **repository root** (`main` branch): `index.html`, `today-hub.html`, `.nojekyll`, `assets/`, and the docs you want.
3. **Settings → Pages →** Source: **Deploy from a branch** → Branch **main**, folder **/** (root).
4. Site URL: `https://<username>.github.io/<repo>/`

`index.html` redirects to `today-hub.html`, so the site root opens the mockup.

### Why `.nojekyll`

GitHub Pages runs Jekyll by default on repos that look like Jekyll sites. **`.nojekyll`** disables that so paths and static files behave predictably.

## Assets

- **`assets/trendup-mark.png`** — Official logo (used in UI, favicon, `og:image` / Twitter card).
- **`assets/trendup-mark.svg`** / **`assets/brand-logo.svg`** — Thin SVG wrappers that reference the PNG (optional for tooling).

## Test locally

From this folder:

```bash
npx --yes serve -l 3000 .
```

Open `http://localhost:3000` (or open `today-hub.html` / `today-hub-mobile.html` directly — `https` features like absolute OG URLs work best when hosted).

## More docs

| File | Purpose |
|------|---------|
| `START_HERE.md` | Full handoff checklist |
| `FIGMA.md`, `FIGMA_FOR_DEVS.md` | Design ↔ prototype |
| `DESIGN_TOKENS_FOR_FIGMA.md` | Colors / spacing tokens |
| `DEV_HANDOFF_NEXTJS_SEO_AND_DRAWER.md` | Next.js production notes |
