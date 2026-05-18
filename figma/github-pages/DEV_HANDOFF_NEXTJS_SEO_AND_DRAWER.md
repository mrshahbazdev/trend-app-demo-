# Dev handoff: Next.js SEO + Me drawer navigation

Use this when the product is **Next.js (App Router)** and when merging the **Today Hub HTML mock** into real UI.

---

## 1. Next.js — SEO checklist (don’t ship without these)

These are **not** optional for “posts that Google can index.” The static mock cannot replace them.

### Per-route metadata

- **`app/layout.tsx`**: `metadataBase` (your real origin), default `title.template`, `openGraph`, `twitter`, `robots` defaults.
- **Dynamic posts** `app/(feed)/post/[id]/page.tsx` (or similar): export **`generateMetadata`** from DB/CMS so each URL gets a unique `<title>`, `description`, canonical, and OG image URL.

```ts
// Example shape — wire to your CMS
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/post/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/post/${post.slug}`,
      images: [{ url: post.ogImageUrl }],
      type: "article",
    },
  };
}
```

### Discovery files

- **`app/sitemap.ts`** — list public URLs (posts, profiles, tags). Regenerate when content changes (ISR/on-demand).
- **`app/robots.ts`** — allow/disallow; point to sitemap URL.

### Structured data

- For each **public post page**, emit **JSON-LD** (`Article` or `BlogPosting`) with `headline`, `datePublished`, `author`, `url`, `image`. Use `next/script` or a small component that injects `<script type="application/ld+json">`.

### Rendering

- **Bots and previews** need HTML with real text in the first response. Prefer **SSR or SSG** for post URLs, or **static generation + revalidate**. Client-only SPAs without prerender are weak for SEO.

### Performance (Core Web Vitals)

- Optimize images (`next/image`), fonts, and avoid blocking scripts. Good UX signals help SEO indirectly.

### Security (SEO-adjacent)

- Serve over **HTTPS**, set **CSP** and other headers at the edge (middleware or hosting config). Not a substitute for auth/XSS work on the app.

---

## 2. Me drawer — “stuck on Activity” / missing Back

### What went wrong

- The **Activity** sub-screen scrolls inside `.drawerInner`. If **`meLayerHead` (Back)** is not **sticky**, it can scroll off-screen and feel like there is no way back.
- Some builds only had **← Back** and no **✕** to close the whole drawer.

### Required pattern (every sub-layer: Profile, Activity, Wallet, Settings)

1. **First child** of each `.meLayer` (except main) should be a header row with:
   - **← Back** → `data-me-back` (returns to main Me content).
   - **✕** → `<label for="meToggle">` or button that closes the drawer (same as main Me header).

2. **Sticky header** so Back/close stay visible while scrolling long lists.

### CSS (add to global styles or mock `<style>`)

```css
.drawerInner {
  scroll-padding-top: 56px;
}
.meLayerHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: sticky;
  top: 0;
  z-index: 6;
  padding: 4px 0 10px;
  margin: 0 0 8px;
  background: var(--drawer-bg, rgba(7, 8, 12, 0.98));
  border-bottom: 1px solid var(--line, rgba(234, 240, 255, 0.1));
  backdrop-filter: blur(8px);
}
```

### HTML template (repeat on each sub-screen)

```html
<div class="meLayerHead">
  <button type="button" class="btn" data-me-back aria-label="Back to Me menu">← Back</button>
  <label class="iconBtn menu" for="meToggle" title="Close menu">✕</label>
</div>
```

### Click handler order (recommended)

In delegated `click` handling, process **navigation first**, then **toasts**:

1. `data-me-back` / `data-me-open`
2. `data-toast` (and similar)

So Back/Open never lose to a parent that might also carry `data-toast`.

---

## 3. This mock file vs production

- **`mockups/today-hub.html`** is a **UI prototype**. SEO for Google applies to **deployed URLs** with real metadata and sitemaps, not to a local file.
- When you move to Next.js, **delete or replace** placeholder `meta` in the mock; drive **all** public SEO from `generateMetadata` + `sitemap.ts` + JSON-LD on real routes.
