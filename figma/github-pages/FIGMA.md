# Using this mockup with Figma

Figma does **not** import this HTML file as an editable layout. Use one of the workflows below.

## 1. Hosted URL + screenshots (simplest)

1. Deploy the mockup with GitHub Pages (see README).
2. Open the live page in the browser at the frame size you want (for example 1440×900).
3. Capture full-page or section screenshots.
4. In Figma: **Place image** (or drag files) onto a frame and trace components as needed.

This is the most predictable way to align a **pixel reference** with Figma frames.

## 2. Browser → Figma plugins

Plugins change often; search the Figma Community for current options, for example:

- **html.to.design** (paste a URL or import HTML in supported flows)
- Similar “HTML import” / “URL to Figma” plugins

Always verify the result: complex CSS (grid, backdrop blur, fixed layers) often needs cleanup in Figma.

## 3. Recreate as components (design system)

Use the mockup as **reference** and rebuild:

- Spacing, radii, and colors in `today-hub.html` are mostly CSS variables under `:root` (search for `--bg`, `--cyan`, `--r18`, etc.).
- Copy those values into Figma **local variables** (color, number) so design and code stay aligned.

## 4. Dev Mode handoff

If developers implement from Figma: keep **one source of truth** — either update Figma to match this mockup, or treat this HTML as the prototype and Figma as a simplified spec.

## Limitation

**Editing this HTML does not update Figma automatically.** Link the deployed URL in your Figma file description or a sticky note so reviewers can open the live prototype.
