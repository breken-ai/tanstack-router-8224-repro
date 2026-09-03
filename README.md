# Reproduction for TanStack/router#8224

Shared-chunk route CSS is silently dropped on the first client-side navigation and never restored.

## Setup

```
npm install
npm run dev
```

Open http://localhost:3000 (React 18.3.1 - React 19's stylesheet hoisting masks the bug).

## Reproduce

1. Load `/` - the dashboard card is styled (padding, flex layout from `Dashboard.module.css`).
2. Click the "Pool 123" link (client-side navigation to `/pool/123`).
3. The dashboard card on the new page loses all styles: the `<link rel="stylesheet">` for the shared chunk is removed from `<head>` and never re-added.

## Cause

`dehydrate()` in `@tanstack/router-core` (`src/ssr/ssr-server.ts`) serializes only the SSR-matched routes into the dehydrated manifest, while the render-time `router.ssr.manifest` getter merges all routes. On the client, `HeadContent` looks up the incoming route's `css` in the dehydrated manifest; the entry is missing, so nothing re-declares the stylesheet link, and Vite does not re-inject it (its module is already cached).

## Verify programmatically

```
node verify-8224.mjs
```

Asserts the stylesheet link disappears after client-side navigation on the unpatched build.
