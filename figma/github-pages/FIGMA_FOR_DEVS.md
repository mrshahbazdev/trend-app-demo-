# Figma handoff — checklist for devs & designers

## 1. Host the mockup first

Upload this bundle (see `START_HERE.md`) so you have an **`https://…`** URL. Figma plugins and stakeholders need a real link, not `file://`.

## 2. Bring visuals into Figma (pick one)

**A. Screenshots (most reliable)**  
Open the live URL → set browser width → full-page or section screenshots → **Place image** in Figma → trace components as needed.

**B. URL / HTML plugins**  
In Figma Community, search for **html.to.design** or **HTML import** plugins. Paste the **deployed** page URL when the plugin asks. Expect to **clean up** grids, blur, and stacking contexts.

## 3. Align tokens with code

Open **`DESIGN_TOKENS_FOR_FIGMA.md`** and create Figma **variables** (color + number) for the midnight theme. That keeps React/Next implementations consistent with the mockup.

## 4. Single source of truth

- **Prototype behavior** = this HTML (interactions, routes, Market trend + votes rail).  
- **Figma** = visual spec + components; update Figma when the mockup changes, or note “see live prototype” in the Figma file.

## 5. What not to expect

- Editing Figma does **not** change `today-hub.html`.  
- Editing the HTML does **not** update Figma.  
- Link the **GitHub Pages URL** in the Figma project description so everyone opens the same build.
