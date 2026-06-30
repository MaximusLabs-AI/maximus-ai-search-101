import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from 'next-sanity'

/**
 * Auto-sync endpoint: pulls published Maxint blogs and upserts them as Sanity
 * DRAFT articles under pillar -> cluster (primary category -> pillar, first
 * subcategory -> cluster). Idempotent: skips blogs whose updated_at is unchanged.
 *
 * Trigger it automatically by either:
 *   - a Maxint "on publish" webhook -> POST /ai-search-101/api/sync-blogs?secret=<SYNC_SECRET>   (instant), or
 *   - a Vercel Cron hitting GET /ai-search-101/api/sync-blogs  (set CRON_SECRET; Vercel signs the request).
 *
 * Server env (Vercel project settings): MXL_API_KEY, SANITY_API_WRITE_TOKEN, SYNC_SECRET, (optional) CRON_SECRET.
 */
export const dynamic = 'force-dynamic'

const MXL_BASE = (process.env.MXL_API_BASE || 'https://content.maximuslabs.ai/api/v1').replace(/\/$/, '')
const slugOf = (s: unknown): string =>
  s && typeof s === 'object' ? ((s as { current?: string; slug?: string }).current || (s as { slug?: string }).slug || '') : ((s as string) || '')
const stripHtml = (s?: string) => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
function pickImg(b: Record<string, unknown>, idKey: string, objKey: string): { url: string; alt: string } | undefined {
  const o = b[objKey] as { url?: string; alt?: string; alt_text?: string } | undefined
  if (o && o.url) return { url: o.url, alt: o.alt || o.alt_text || '' }
  const id = b[idKey]
  const imgs = b.images as { id?: unknown; url?: string; alt?: string; alt_text?: string }[] | undefined
  const m = id && Array.isArray(imgs) ? imgs.find((i) => i.id === id) : undefined
  return m && m.url ? { url: m.url, alt: m.alt || m.alt_text || '' } : undefined
}

async function mxl(path: string, key: string): Promise<{ data: unknown; pagination?: { next_cursor?: string; has_more?: boolean } }> {
  for (let a = 0; ; a++) {
    const r = await fetch(MXL_BASE + path, { headers: { Authorization: `Bearer ${key}` }, cache: 'no-store' })
    if (r.status === 429 && a < 4) { await new Promise((x) => setTimeout(x, 1500 * (a + 1))); continue }
    if (!r.ok) throw new Error(`GET ${path} -> ${r.status}`)
    return r.json()
  }
}

function authorized(req: NextRequest): boolean {
  const secret = req.nextUrl.searchParams.get('secret')
  if (process.env.SYNC_SECRET && secret === process.env.SYNC_SECRET) return true
  const auth = req.headers.get('authorization')
  if (process.env.CRON_SECRET && auth === `Bearer ${process.env.CRON_SECRET}`) return true // Vercel Cron
  return false
}

async function handle(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ ok: false, message: 'Invalid or missing secret' }, { status: 401 })
  const MXL_KEY = process.env.MXL_API_KEY
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!MXL_KEY || !token) return NextResponse.json({ ok: false, message: 'Server missing MXL_API_KEY or SANITY_API_WRITE_TOKEN' }, { status: 500 })

  const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bict0s25',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-10-01', token, useCdn: false,
  })

  const pillarIds = new Set<string>(await sanity.fetch('*[_type=="pillar"]._id'))
  const clusterIds = new Set<string>(await sanity.fetch('*[_type=="cluster"]._id'))
  const syncedDocs: { maxintId: string; maxintUpdatedAt?: string }[] = await sanity.fetch('*[defined(maxintId)]{maxintId, maxintUpdatedAt}')
  const seen: Record<string, Set<string>> = {}
  for (const d of syncedDocs) { (seen[d.maxintId] ||= new Set()).add(d.maxintUpdatedAt || '') }

  const blogs: { slug: unknown }[] = []
  let cursor: string | null = null
  do {
    const res = await mxl(`/blogs?status=ready&limit=100${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`, MXL_KEY)
    blogs.push(...((res.data as { slug: unknown }[]) || []))
    cursor = res.pagination?.has_more ? res.pagination.next_cursor || null : null
  } while (cursor)

  const now = new Date().toISOString()
  let drafted = 0, unchanged = 0, skipped = 0
  for (const b0 of blogs) {
    const slug = slugOf(b0.slug)
    const b = (await mxl(`/blogs/${slug}?include=author,category,subcategories,faqs,images`, MXL_KEY)).data as Record<string, unknown> & {
      id: string; category?: { slug?: string }; subcategories?: { slug?: string }[]; author?: Record<string, string>; faqs?: { id?: string; question?: string; answer_html?: string }[]
    }
    const pillarSlug = slugOf(b.category?.slug)
    const clusterSlug = slugOf(b.subcategories?.[0]?.slug)
    const pillarRef = `pillar-${pillarSlug}`
    const clusterRef = `cluster-${clusterSlug}`
    if (!pillarIds.has(pillarRef) || !clusterIds.has(clusterRef)) { skipped++; continue }
    const updatedAt = (b.updated_at as string) || (b.published_at as string) || ''
    if (seen[b.id]?.has(updatedAt)) { unchanged++; continue }
    await sanity.createOrReplace({
      _id: `drafts.article-maxint-${b.id}`,
      _type: 'article',
      title: (b.name as string) || (b.meta_title as string) || slug,
      slug: { _type: 'slug', current: slug },
      pillar: { _type: 'reference', _ref: pillarRef },
      cluster: { _type: 'reference', _ref: clusterRef },
      excerpt: (b.post_summary as string) || undefined,
      bodyHtml: (b.body_html as string) || '',
      tldrHtml: (b.tldr_html as string) || undefined,
      author: b.author ? { name: b.author.name, designation: b.author.designation, avatarUrl: b.author.avatar_url, bio: b.author.bio } : undefined,
      heroImage: pickImg(b, 'main_image_id', 'main_image'),
      thumbnailImage: pickImg(b, 'thumbnail_image_id', 'thumbnail_image'),
      faq: (b.faqs || []).map((f, i) => ({ _type: 'qa', _key: f.id || `f${i}`, question: f.question, answer: stripHtml(f.answer_html) })),
      readingTime: typeof b.minute_read === 'number' ? b.minute_read : undefined,
      datePublished: (b.published_at as string) || now,
      dateModified: updatedAt || now,
      seo: { metaTitle: (b.meta_title as string) || (b.name as string) || undefined, metaDescription: (b.meta_description as string) || undefined, focusKeyword: (b.focus_keyword as string) || undefined, schemaType: 'Article' },
      maxintId: String(b.id),
      maxintUpdatedAt: updatedAt,
      order: 1,
    })
    drafted++
  }
  return NextResponse.json({ ok: true, drafted, unchanged, skipped, at: now })
}

export const POST = handle
export const GET = handle
