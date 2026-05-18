# TrendUp — Figma handoff (bundle)

This folder is the **design** slice of the combined archive.

## What to use here

| Item | Purpose |
|------|---------|
| `FIGMA.md` | How this prototype relates to Figma workflows |
| `FIGMA_FOR_DEVS.md` | Short checklist: deploy → screenshot → variables |
| `DESIGN_TOKENS_FOR_FIGMA.md` | Midnight theme colors, radius, spacing for Figma variables |
| `assets/` | Official mark (`trendup-mark.png`, `@2x`) and SVG wrappers |

Figma does not edit the HTML directly. After **`../github-pages/`** is deployed:

1. Open the live site at desktop width (e.g. 1440px) for frames that match the desktop mockup.
2. Use screenshots or a Community plugin such as **html.to.design** with the deployed URL (verify layers).
3. Enter tokens from `DESIGN_TOKENS_FOR_FIGMA.md` as Figma variables so implementation matches the prototype.

For the **mobile** layout, open `today-hub-mobile.html` on your static URL (same deploy as above).
