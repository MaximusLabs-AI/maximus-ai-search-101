import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/client'
import {
  HUB_Q, PILLAR_Q, CLUSTER_Q, ARTICLE_Q,
  ALL_PILLARS_Q, ALL_CLUSTERS_Q, ALL_ARTICLES_Q,
  META_PILLAR_Q, META_CLUSTER_Q, META_ARTICLE_Q,
} from '@/sanity/queries'
import { Hub, Pillar, Cluster, Article } from '@/components/templates'
import type { HubData, PillarData, ClusterData, ArticleData } from '@/components/types'
import { canonicalPath } from '@/components/types'

// New pillars/clusters/articles added in Sanity render on-demand and cache,
// without needing a rebuild (legacy caching model, ISR via per-fetch revalidate).
export const dynamicParams = true

type Params = { slug?: string[] }

// A page is "empty" (no published content) when it has no renderable body and,
// for pillars/clusters, no content articles. Empty pages 404 so they stay out of
// Google (the proxy setup rules out a noindex meta, see generateMetadata) and out
// of the sitemap. They auto-return 200 the moment real content is published.
const hasBlocks = (b?: unknown[]) => Array.isArray(b) && b.length > 0

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const [pillars, clusters, articles] = await Promise.all([
    sanityFetch<{ p: string }[]>(ALL_PILLARS_Q, {}, ['pillar']),
    sanityFetch<{ p: string; c: string }[]>(ALL_CLUSTERS_Q, {}, ['cluster']),
    sanityFetch<{ p: string; c: string; a: string }[]>(ALL_ARTICLES_Q, {}, ['article']),
  ])
  const params: { slug: string[] }[] = [{ slug: [] }] // the hub itself
  for (const p of pillars) params.push({ slug: [p.p] })
  for (const c of clusters) params.push({ slug: [c.p, c.c] })
  for (const a of articles) params.push({ slug: [a.p, a.c, a.a] })
  return params
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const seg = slug ?? []
  // Relative canonical including the public hub prefix. basePath is NOT applied to
  // metadata, so we add /ai-search-101 here; being relative, it resolves to the
  // proxy domain (maximuslabs.ai/ai-search-101/...) where the indexable page lives.
  const canonical = `${canonicalPath}${seg.length ? '/' + seg.join('/') : ''}`

  let title = 'AI Search 101'
  let description =
    'Learn GEO, AEO, SEO, Agentic SEO, and Agentic Commerce. A structured hub of guides to turn AI search into a revenue engine.'
  let ogType: 'website' | 'article' = 'website'
  let publishedTime: string | undefined

  if (seg.length === 1) {
    const d = await sanityFetch<{ title: string; shortLabel?: string; summary?: string; seo?: Seo } | null>(META_PILLAR_Q, { pillar: seg[0] }, ['pillar'])
    if (d) { title = d.seo?.metaTitle || d.title; description = d.seo?.metaDescription || d.summary || description }
  } else if (seg.length === 2) {
    const d = await sanityFetch<{ title: string; summary?: string; seo?: Seo } | null>(META_CLUSTER_Q, { pillar: seg[0], cluster: seg[1] }, ['cluster'])
    if (d) { title = d.seo?.metaTitle || d.title; description = d.seo?.metaDescription || d.summary || description }
  } else if (seg.length === 3) {
    const d = await sanityFetch<{ title: string; excerpt?: string; answer?: string; datePublished?: string; seo?: Seo } | null>(META_ARTICLE_Q, { pillar: seg[0], cluster: seg[1], article: seg[2] }, ['article'])
    if (d) {
      title = d.seo?.metaTitle || d.title
      description = d.seo?.metaDescription || d.excerpt || d.answer || description
      ogType = 'article'
      publishedTime = d.datePublished
    }
  }

  // NOTE: we deliberately do NOT set robots:noindex here. The origin-wide
  // X-Robots-Tag header (next.config) handles origin noindex, and the Cloudflare
  // Worker strips that header for the public URLs. Emitting a noindex <meta> tag
  // would wrongly de-index the public pages too (the Worker cannot strip HTML).
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title, description, url: canonical, siteName: 'MaximusLabs', type: ogType,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

type Seo = { metaTitle?: string; metaDescription?: string; schemaType?: string }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const seg = slug ?? []

  if (seg.length === 0) {
    const data = await sanityFetch<HubData>(HUB_Q, {}, ['pillar', 'cluster'])
    return <Hub data={data} />
  }
  if (seg.length === 1) {
    const data = await sanityFetch<PillarData | null>(PILLAR_Q, { pillar: seg[0] }, ['pillar', 'cluster', 'article'])
    // Empty pillar (no cluster has a content article) -> 404, keep it out of the index.
    if (!data || !data.clusters.some((c) => (c.articles?.length ?? 0) > 0)) notFound()
    return <Pillar data={data} />
  }
  if (seg.length === 2) {
    const data = await sanityFetch<ClusterData | null>(CLUSTER_Q, { pillar: seg[0], cluster: seg[1] }, ['cluster', 'article'])
    // Empty cluster (no content articles; the generic 1-line summary body doesn't count) -> 404.
    if (!data || data.articles.length === 0) notFound()
    return <Cluster data={data} />
  }
  if (seg.length === 3) {
    const data = await sanityFetch<ArticleData | null>(ARTICLE_Q, { pillar: seg[0], cluster: seg[1], article: seg[2] }, ['article'])
    // Body-less stub article -> 404 until it actually has content.
    if (!data || (!hasBlocks(data.body) && !data.bodyHtml)) notFound()
    return <Article data={data} />
  }
  notFound()
}
