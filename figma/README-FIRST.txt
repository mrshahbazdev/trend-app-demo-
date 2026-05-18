TrendUp Today Hub — combined handoff (GitHub + Figma)
=====================================================

This archive contains two folders. Use them in this order:

1) github-pages/
   Everything needed to publish the static mockup on GitHub Pages (or any static host).
   Upload the CONTENTS of this folder to your repository root (not the folder name itself).
   Includes: desktop + mobile HTML mockups, where-we-are page, assets, index.html, .nojekyll.
   Read github-pages/START_HERE.md and github-pages/README.md first.

2) figma/
   Design handoff: Figma workflow docs, design tokens, and logo raster/SVG wrappers.
   Does not include the full HTML site — deploy github-pages/ first, then use the live URL
   for screenshots or URL-to-Figma plugins. See figma/README.md.

Local preview (from github-pages/):
  node _preview-server.cjs
  Then open http://localhost:3000/today-hub.html

Bundle built from mockups/dev-upload (kept in sync with the main mockups/ folder).
