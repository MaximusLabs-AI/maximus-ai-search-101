# Deploying AI Search 101 (Next.js + Sanity on Vercel)

## How the app connects to Sanity (no server wiring)

Sanity is a hosted API. The app reads content over HTTPS using only the
**projectId + dataset** (public reads, no token). You set those as environment
variables; that IS the connection.

```
Editor publishes in Studio (/studio)
        |
        v
Sanity Content Lake  (hosted by Sanity)
        |  HTTPS reads via projectId + dataset
        v
Next.js app on Vercel  ->  renders pages (ISR), serves /studio
```

---

## Step 1 — Push the repo

This folder (`web/`) is already a git repo. Add your GitHub remote and push:

```
git remote add origin https://github.com/<you>/maximus-ai-search-101.git
git add -A
git commit -m "AI Search 101: Next.js + Sanity hub"
git branch -M main
git push -u origin main
```

`.env.local` is gitignored, so your token never leaves your machine.

## Step 2 — Import into Vercel

1. vercel.com -> Add New -> Project -> import the repo.
2. Framework preset: **Next.js** (auto-detected). Root directory: the repo root.
3. Before the first deploy, add **Environment Variables** (Settings -> Environment Variables):

| Name | Value | Notes |
|------|-------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `bict0s25` | public |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | public |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-10-01` | public |
| `SANITY_REVALIDATE_SECRET` | (any random string) | for the publish webhook |

You do NOT need the write token on Vercel (reads are public; the token is only
for local content scripts).

4. Deploy. Test the Vercel URL:
   - `https://<app>.vercel.app/ai-search-101` (hub)
   - `https://<app>.vercel.app/ai-search-101/geo/content/optimization-guide` (article)
   - `https://<app>.vercel.app/studio` (Studio)

## Step 3 — Let the Studio work on the live domain (CORS)

The embedded Studio runs in the browser, so Sanity must allow your domain:
sanity.io/manage -> your project -> **API -> CORS origins -> Add origin**:
- add `https://<app>.vercel.app` (and later your custom domain), **Allow credentials: yes**.

## Step 4 — Instant updates on publish (optional; ISR covers it hourly otherwise)

sanity.io/manage -> API -> **Webhooks -> Create**:
- URL: `https://<app>.vercel.app/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`
- Trigger: on create/update/delete, dataset `production`.
Now publishing in Studio refreshes the live hub within seconds.

## Step 5 — Go live under maximuslabs.ai/ai-search-101 (LATER, your call)

Until this step the hub lives on the Vercel URL. To serve it under the main
domain via your existing Cloudflare setup:
1. Point a subdomain at Vercel: `ai-search-101.maximuslabs.ai` (CNAME -> Vercel),
   and add it as a domain on the Vercel project + to Sanity CORS.
2. Deploy `../cloudflare-worker-v9.js` and add the route
   `www.maximuslabs.ai/ai-search-101*`. It proxies the app and strips the
   origin noindex so only the public URLs get indexed.
3. Asset note: the worker also proxies `/_next/*` so chunks load. For the
   cleanest setup we can switch the app to `basePath:'/ai-search-101'` at this
   stage (a small, well-defined refactor) instead of proxying `/_next`.

---

## Publishing articles (your ongoing workflow)

You send a title + topic (or finished content) for 2 to 3 articles. Then either:
- **Studio:** create the article in `/studio`, pick its cluster + pillar, publish.
  It appears at its 4-level URL automatically.
- **Scripted:** drop the structured JSON in `sanity/seed/articles/` and run
  `node --env-file=.env.local scripts/import-articles.mjs`.

Empty clusters already exist, so new articles just attach to them. Design/UI
changes are independent of content and can be made any time.
