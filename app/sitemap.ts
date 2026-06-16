import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/client'
import { ALL_PILLARS_Q, ALL_CLUSTERS_Q, ALL_ARTICLES_Q } from '@/sanity/queries'

const PUBLIC = 'https://www.maximuslabs.ai'
const hub = `${PUBLIC}/ai-search-101`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pillars, clusters, articles] = await Promise.all([
    sanityFetch<{ p: string; ts: string }[]>(ALL_PILLARS_Q, {}, ['pillar']),
    sanityFetch<{ p: string; c: string; ts: string }[]>(ALL_CLUSTERS_Q, {}, ['cluster']),
    sanityFetch<{ p: string; c: string; a: string; ts: string }[]>(ALL_ARTICLES_Q, {}, ['article']),
  ])

  return [
    { url: hub, changeFrequency: 'weekly', priority: 1 },
    ...pillars.map((p) => ({
      url: `${hub}/${p.p}`, lastModified: p.ts, changeFrequency: 'weekly' as const, priority: 0.9,
    })),
    ...clusters.map((c) => ({
      url: `${hub}/${c.p}/${c.c}`, lastModified: c.ts, changeFrequency: 'weekly' as const, priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${hub}/${a.p}/${a.c}/${a.a}`, lastModified: a.ts, changeFrequency: 'monthly' as const, priority: 0.7,
    })),
  ]
}
