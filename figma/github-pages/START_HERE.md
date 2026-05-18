# TrendUp Today Hub — developer handoff bundle

Use everything in this folder as-is. **No build step.** Upload to GitHub Pages or any static host.

## What is in this folder

| File / folder | Purpose |
|---------------|---------|
| `today-hub.html` | Full interactive **desktop** mockup (single file; CSS + JS inline). |
| `today-hub-mobile.html` | **Mobile** mockup (phone-width shell, same tabs + governance patterns where practical; links back to desktop). |
| `where-we-are.html` | Orientation page: what’s in the handoff, local preview, links to mockups. |
| `index.html` | Redirects to `today-hub.html` so the site root works on hosting. |
| `_preview-server.cjs` | Optional local server (`node _preview-server.cjs`) if you don’t have `npx serve`. |
| `assets/trendup-mark.png` | **Official mark** (design export, 1024×1024) — used everywhere in the UI + favicon + social preview. |
| `assets/trendup-mark.svg` | Thin wrapper that references `trendup-mark.png` (for tools that expect SVG). |
| `.nojekyll` | Required for GitHub Pages (disables Jekyll). |
| `.gitignore` | Optional; ignores OS junk files. |
| `README.md` | GitHub Pages deployment steps. |
| `FIGMA.md` | How designers/devs relate this prototype to Figma. |
| `FIGMA_FOR_DEVS.md` | Short checklist: deploy → screenshot → Figma variables. |
| `DESIGN_TOKENS_FOR_FIGMA.md` | Midnight theme colors/radius/spacing to copy into Figma variables. |
| `DEV_HANDOFF_NEXTJS_SEO_AND_DRAWER.md` | Production Next.js notes (SEO, drawer) — not required to run this static mockup. |

## Upload to GitHub (recommended)

1. Create a new empty repository on GitHub.
2. Upload **all contents of this folder** to the **repository root** (not inside an extra nested folder).
3. **Settings → Pages →** Branch **main**, folder **/** (root).
4. Live URL: `https://<user>.github.io/<repo>/`

Then share that URL with the team and with Figma (file description or comment).

## Figma (for design)

Figma does not edit this HTML directly. After the site is live:

1. Open the URL in a browser at the target width (e.g. 1440px).
2. Capture screenshots for reference frames, **or** use a Community plugin such as **html.to.design** with the live URL (verify layers; complex CSS may need cleanup).
3. Enter **colors / radius / spacing** from `DESIGN_TOKENS_FOR_FIGMA.md` as Figma variables so dev implementation matches the prototype.

## Local preview

Double-click `today-hub.html` or run:

```bash
npx --yes serve -l 3000 .
```

---

**Zip bundles** (parent `mockups` folder):

- **`trendup-github-and-figma-handoff.zip`** — **recommended:** one archive with **`github-pages/`** (full static site for GitHub Pages) and **`figma/`** (tokens + logos + Figma docs). Read **`README-FIRST.txt`** at the zip root.
- **`trendup-today-hub-github-handoff.zip`** — GitHub-only slice (if you still use the older single-zip workflow).
- **`trendup-figma-handoff.zip`** — Figma-only companion (tokens + logos; no HTML).

**Version:** Static mockup bundle — synced from the main `today-hub.html` in `mockups/`.
