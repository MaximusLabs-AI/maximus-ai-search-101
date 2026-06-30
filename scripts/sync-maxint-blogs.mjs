/**
 * Maxint (Maximus CMS) -> Sanity blog sync.
 *
 * Pulls published blogs (+ authors + categories) from the Maximus CMS READ API
 * and upserts them as Sanity `blog` / `blogAuthor` / `blogCategory` documents.
 * The Maximus CMS stays the source of truth; this just mirrors it into Sanity.
 * Idempotent: docs are keyed by source id/slug, so re-running updates in place.
 *
 *   # one-time: see the exact API response shapes before a full sync
 *   node --env-file=.env.local scripts/sync-maxint-blogs.mjs --inspect
 *
 *   # full sync
 *   node --env-file=.env.local scripts/sync-maxint-blogs.mjs
 *
 * Requires in .env.local:
 *   MXL_API_KEY=mxl_pk_...                 (Maximus CMS -> Settings -> API keys)
 *   SANITY_API_WRITE_TOKEN=...             (already present, for writing to Sanity)
 *   MXL_API_BASE=https://content.maximuslabs.ai/api/v1   (optional override)
 */
import { createClient } from '@sanity/client'

const MXL_KEY = process.env.MXL_API_KEY
const MXL_BASE = (process.env.MXL_API_BASE || 'https://content.maximuslabs.ai/api/v1').replace(/\/$/, '')
const token = process.env.SANITY_API_WRITE_TOKEN
if (!MXL_KEY) { console.error('Missing MXL_API_KEY in .env.local (Maximus CMS API key, mxl_pk_...)'); process.exit(1) }
if (!token) { console.error('Missing SANITY_API_WRITE_TOKEN in .env.local'); process.exit(1) }

const INSPECT = process.argv.includes('--inspect')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bict0s25',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-10-01', token, useCdn: false,
})

// --- Maximus CMS read API (Bearer auth, cursor pagination, 600 req/min) ---
async function mxl(path) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(MXL_BASE + path, { headers: { Authorization: `Bearer ${MXL_KEY}` } })
    if (res.status === 429 && attempt < 5) { await sleep(2000 * (attempt + 1)); continue }
    if (!res.ok) throw new Error(`GET ${path} -> ${res.status} ${(await res.text()).slice(0, 300)}`)
    return res.json()
  }
}
async function listAll(path) {
  const out = []
  let cursor = null
  do {
    const sep = path.includes('?') ? '&' : '?'
    const q = `${path}${sep}limit=100${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`
    const { data, pagination } = await mxl(q)
    out.push(...(data || []))
    cursor = pagination?.has_more ? pagination.next_cursor : null
  } while (cursor)
  return out
}

const slugOf = (s) => (s && typeof s === 'object' ? (s.current || s.slug || '') : (s || ''))
// Resolve an image from whatever shape the API uses (embedded object or id+images[]).
function pickImage(blog, key, idKey) {
  const imgs = blog.images || []
  const byId = Object.fromEntries(imgs.map((i) => [i.id, i]))
  const obj = blog[key] || byId[blog[idKey]] || null
  if (!obj || !obj.url) return undefined
  return { url: obj.url, alt: obj.alt || obj.alt_text || '' }
}

// --- Pull ---
const authors = await listAll('/authors')
const categories = await listAll('/categories')
const blogList = await listAll('/blogs?status=ready')

if (INSPECT) {
  const firstSlug = slugOf(blogList[0]?.slug)
  const full = firstSlug ? (await mxl(`/blogs/${firstSlug}?include=author,category,subcategories,faqs,images`)).data : null
  console.log('--- AUTHOR[0] ---\n', JSON.stringify(authors[0], null, 2))
  console.log('--- CATEGORY[0] ---\n', JSON.stringify(categories[0], null, 2))
  console.log('--- BLOG[0] (full) ---\n', JSON.stringify(full, null, 2))
  console.log(`\nCounts: ${authors.length} authors, ${categories.length} categories, ${blogList.length} blogs.`)
  process.exit(0)
}

const now = new Date().toISOString()

// --- Upsert taxonomies first (blogs reference them) ---
const tax = sanity.transaction()
for (const a of authors) {
  const slug = slugOf(a.slug)
  if (!slug) continue
  tax.createOrReplace({
    _id: `blogAuthor-${slug}`, _type: 'blogAuthor', name: a.name || slug,
    slug: { _type: 'slug', current: slug }, bio: a.bio || undefined, avatarUrl: a.avatar_url || a.avatarUrl || undefined,
  })
}
for (const c of categories) {
  const slug = slugOf(c.slug)
  if (!slug) continue
  const parentSlug = slugOf(c.parent?.slug) || c.parent_slug || ''
  tax.createOrReplace({
    _id: `blogCategory-${slug}`, _type: 'blogCategory', name: c.name || slug,
    slug: { _type: 'slug', current: slug },
    ...(parentSlug ? { parent: { _type: 'reference', _ref: `blogCategory-${parentSlug}` } } : {}),
  })
}
await tax.commit()
console.log(`Upserted ${authors.length} authors, ${categories.length} categories.`)

// --- Upsert blogs (fetch each single for full body/tldr/faqs) ---
let n = 0
for (const b0 of blogList) {
  const slug = slugOf(b0.slug)
  if (!slug) continue
  const { data: b } = await mxl(`/blogs/${slug}?include=author,category,subcategories,faqs,images`)
  const authorSlug = slugOf(b.author?.slug)
  const catSlug = slugOf(b.category?.slug)
  await sanity.createOrReplace({
    _id: `blog-${b.id ?? slug}`,
    _type: 'blog',
    title: b.title,
    slug: { _type: 'slug', current: slug },
    focusKeyword: b.focus_keyword || undefined,
    minuteRead: typeof b.minute_read === 'number' ? b.minute_read : undefined,
    metaTitle: b.meta_title || undefined,
    metaDescription: b.meta_description || undefined,
    status: b.status || 'ready',
    publishedAt: b.published_at || undefined,
    heroImage: pickImage(b, 'main_image', 'main_image_id'),
    thumbnailImage: pickImage(b, 'thumbnail_image', 'thumbnail_image_id'),
    postSummary: b.post_summary || undefined,
    tldrHtml: b.tldr_html || undefined,
    bodyHtml: b.body_html || undefined,
    ...(authorSlug ? { author: { _type: 'reference', _ref: `blogAuthor-${authorSlug}` } } : {}),
    ...(catSlug ? { primaryCategory: { _type: 'reference', _ref: `blogCategory-${catSlug}` } } : {}),
    subcategories: (b.subcategories || []).map((s) => {
      const ss = slugOf(s.slug)
      return { _type: 'reference', _key: ss, _ref: `blogCategory-${ss}` }
    }).filter((r) => r._ref !== 'blogCategory-'),
    faqs: (b.faqs || []).map((f, i) => ({ _type: 'qa', _key: `f${i}`, question: f.question, answer: f.answer })),
    maxintId: String(b.id ?? ''),
    syncedAt: now,
  })
  n++
  console.log(`  · ${slug}`)
}
console.log(`\nSynced ${n} blogs from the Maximus CMS into Sanity.`)
