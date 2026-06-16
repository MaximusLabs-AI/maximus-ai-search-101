# AI Search 101 — Next.js + Sanity

The MaximusLabs AI Search 101 educational hub: a 4-level content tree
(hub > pillar > cluster > article) rendered by Next.js, with content in Sanity.

## Stack
- **Next.js 16** (App Router) — one catch-all route `app/ai-search-101/[[...slug]]`
  resolves all four levels and renders the matching template.
- **Sanity** — content (pillars, clusters, articles) + embedded Studio at `/studio`.
- Reverse-proxied under `maximuslabs.ai/ai-search-101/*` in production (see DEPLOY.md).

## Local dev
```
npm install
# create .env.local from .env.example (add your write token for content scripts)
npm run dev   # http://localhost:3000  (hub at /ai-search-101, Studio at /studio)
```

## Content scripts (need SANITY_API_WRITE_TOKEN in .env.local)
```
node --env-file=.env.local scripts/generate-taxonomy.mjs   # all pillars + clusters
node --env-file=.env.local scripts/import-articles.mjs     # articles from sanity/seed/articles/*.json
```

## Key files
- `sanity/schemaTypes/` — pillar, cluster, article, blockContent schemas
- `sanity/queries.ts` — GROQ; `sanity/client.ts` — client + cached fetch
- `components/templates.tsx` — Hub / Pillar / Cluster / Article
- `components/chrome.tsx` — nav, footer, report cards, hero parts
- `app/hub.css` — the navy/Satoshi design system

See **DEPLOY.md** for deployment + how Vercel connects to Sanity.
