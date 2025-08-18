
## DD v3 – Remote Brand Logos

This v3 adds remote brand logos (no local assets) via:
- Simple Icons CDN (by slug)
- Clearbit (by domain fallback, optional)

### Files added
- `src/lib/logos.ts` – brand list + URL builder
- `src/components/BrandLogo.tsx` – image component with fallback + lazy loading
- `src/components/BrandGridRemote.tsx` – demo grid that renders all brands detected from your v2 assets
- `src/pages/logos-remote.example.tsx` – usage example you can route to

### How to use
- Import and render `<BrandGridRemote />` or use `<BrandLogo name="Heineken" slug="heineken" />` wherever needed.
- To replace your existing local logos, swap `<img src="...local...">` with `<BrandLogo name="Brand" slug="brand" />`.
- Add/adjust brands in `src/lib/logos.ts` (set `domain` to enable Clearbit fallback).

### Notes
- Slugs are auto-guessed from your filename list; tweak them if a logo doesn't appear.
- Some brands may not exist on Simple Icons; provide a domain to use Clearbit fallback.
