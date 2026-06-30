/**
 * Maxint (Maximus CMS) blog -> Sanity ARTICLE sync.
 *
 * Pulls published blogs from the Maximus CMS read API and upserts each as a
 * Sanity `article`, placed under pillar -> cluster from the blog's categories:
 *   primary category slug   -> pillar   (Sanity id  pillar-<slug>)
 *   first subcategory slug   -> cluster  (Sanity id  cluster-<slug>)
 * The blog HTML body is stored on article.bodyHtml and rendered as-is.
 * Idempotent: keyed by article-maxint-<blogId>, so re-runs update in place.
 *
 *   node --env-file=.env.local scripts/sync-maxint-blogs.mjs            # full sync
 *   node --env-file=.env.local scripts/sync-maxint-blogs.mjs --inspect  # dump first blog
 *
 * Requires in .env.local: MXL_API_KEY (mxl_pk_...) and SANITY_API_WRITE_TOKEN.
 */
import { createClient } from '@sanity/client'

const MXL_KEY = process.env.MXL_API_KEY
const MXL_BASE = (process.env.MXL_API_BASE || 'https://content.maximuslabs.ai/api/v1').replace(/\/$/, '')
const token = process.env.SANITY_API_WRITE_TOKEN
if (!MXL_KEY) { console.error('Missing MXL_API_KEY in .env.local (Maximus CMS API key, mxl_pk_...)'); process.exit(1) }
if (!token) { console.error('Missing SANITY_API_WRITE_TOKEN in .env.local'); process.exit(1) }

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bict0s25',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-10-01', token, useCdn: false,
})
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const slugOf = (s) => (s && typeof s === 'object' ? (s.current || s.slug || '') : (s || ''))
const stripHtml = (s) => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

async function mxl(path) {
  for (let a = 0; ; a++) {
    const r = await fetch(MXL_BASE + path, { headers: { Authorization: `Bearer ${MXL_KEY}` } })
    if (r.status === 429 && a < 5) { await sleep(2000 * (a + 1)); continue }
    if (!r.ok) throw new Error(`GET ${path} -> ${r.status} ${(await r.text()).slice(0, 200)}`)
    return r.json()
  }
}
async function listAll(path) {
  const out = []
  let cursor = null
  do {
    const sep = path.includes('?') ? '&' : '?'
    const { data, pagination } = await mxl(`${path}${sep}limit=100${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`)
    out.push(...(data || []))
    cursor = pagination?.has_more ? pagination.next_cursor : null
  } while (cursor)
  return out
}

// Valid Sanity pillar/cluster ids — used to validate the category mapping.
const pillarIds = new Set(await sanity.fetch('*[_type=="pillar"]._id'))
const clusterIds = new Set(await sanity.fetch('*[_type=="cluster"]._id'))

const list = await listAll('/blogs?status=ready')

if (process.argv.includes('--inspect')) {
  const slug = slugOf(list[0]?.slug)
  const full = slug ? (await mxl(`/blogs/${slug}?include=author,category,subcategories,faqs,images`)).data : null
  console.log(JSON.stringify(full, null, 2))
  process.exit(0)
}

const now = new Date().toISOString()

// Already-synced docs (draft OR published) -> skip blogs that have not changed.
const syncedDocs = await sanity.fetch('*[defined(maxintId)]{maxintId, maxintUpdatedAt}')
const seen = {}
for (const d of syncedDocs) { (seen[d.maxintId] ||= new Set()).add(d.maxintUpdatedAt || '') }

let drafted = 0, unchanged = 0, skipped = 0
for (const b0 of list) {
  const slug = slugOf(b0.slug)
  const { data: b } = await mxl(`/blogs/${slug}?include=author,category,subcategories,faqs,images`)
  const pillarSlug = slugOf(b.category?.slug)
  const clusterSlug = slugOf(b.subcategories?.[0]?.slug)
  const pillarRef = `pillar-${pillarSlug}`
  const clusterRef = `cluster-${clusterSlug}`
  if (!pillarSlug || !pillarIds.has(pillarRef)) {
    console.warn(`  ! skip "${slug}": primary category "${pillarSlug}" is not a known pillar`); skipped++; continue
  }
  if (!clusterSlug || !clusterIds.has(clusterRef)) {
    console.warn(`  ! skip "${slug}": subcategory "${clusterSlug}" is not a known cluster (pick a cluster sub-category in Maxint)`); skipped++; continue
  }

  const updatedAt = b.updated_at || b.published_at || ''
  if (seen[b.id]?.has(updatedAt)) { unchanged++; continue } // already synced at this version

  // Write a DRAFT (drafts.<id>) so it lands in Sanity for review/scheduling, NOT live.
  await sanity.createOrReplace({
    _id: `drafts.article-maxint-${b.id}`,
    _type: 'article',
    title: b.name || b.meta_title || slug,
    slug: { _type: 'slug', current: slug },
    pillar: { _type: 'reference', _ref: pillarRef },
    cluster: { _type: 'reference', _ref: clusterRef },
    excerpt: b.post_summary || undefined,
    bodyHtml: b.body_html || '',
    tldrHtml: b.tldr_html || undefined,
    author: b.author ? {
      name: b.author.name || undefined,
      designation: b.author.designation || undefined,
      avatarUrl: b.author.avatar_url || undefined,
      bio: b.author.bio || undefined,
    } : undefined,
    faq: (b.faqs || []).map((f, i) => ({ _type: 'qa', _key: f.id || `f${i}`, question: f.question, answer: stripHtml(f.answer_html) })),
    readingTime: typeof b.minute_read === 'number' ? b.minute_read : undefined,
    datePublished: b.published_at || now,
    dateModified: updatedAt || now,
    seo: {
      metaTitle: b.meta_title || b.name || undefined,
      metaDescription: b.meta_description || undefined,
      focusKeyword: b.focus_keyword || undefined,
      schemaType: 'Article',
    },
    maxintId: String(b.id),
    maxintUpdatedAt: updatedAt,
    order: 1,
  })
  drafted++
  console.log(`  · draft: ${pillarSlug}/${clusterSlug}/${slug}`)
}
console.log(`\nDrafted ${drafted} new/changed blog(s) as Sanity drafts. ${unchanged} unchanged, ${skipped} skipped.`)
console.log('Review + Publish them in the Studio to go live.')
