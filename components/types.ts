import type { PortableTextBlock } from '@portabletext/react'

export type PillarRef = { title: string; shortLabel?: string; slug: string }
export type FaqItem = { question: string; answer: string }

export type ArticleLink = {
  title: string
  excerpt?: string
  slug: string
  pillar: string
  cluster: string
  label?: string
}

export type HubData = {
  pillars: {
    title: string
    shortLabel?: string
    summary?: string
    category?: string
    slug: string
    clusterCount: number
    articleCount: number
    topClusters?: { title: string; slug: string }[]
    topArticles?: { title: string; slug: string; cluster: string }[]
  }[]
  latest?: ArticleLink[]
  popular?: ArticleLink[]
}

export type SearchResult = {
  _type: 'pillar' | 'cluster' | 'article'
  title: string
  slug: string
  pillarSlug?: string
  clusterSlug?: string | null
  summary?: string
}

export type PillarData = {
  title: string
  shortLabel?: string
  summary?: string
  body?: PortableTextBlock[]
  slug: string
  clusters: {
    title: string
    summary?: string
    level?: string
    slug: string
    articles: { title: string; slug: string }[]
  }[]
}

export type ClusterData = {
  title: string
  slug: string
  summary?: string
  body?: PortableTextBlock[]
  level?: string
  pillar: PillarRef
  articles: { title: string; excerpt?: string; readingTime?: number; slug: string }[]
}

export type ArticleData = {
  title: string
  slug: string
  answer?: string
  excerpt?: string
  body?: PortableTextBlock[]
  faq?: FaqItem[]
  readingTime?: number
  datePublished?: string
  dateModified?: string
  seo?: { metaTitle?: string; metaDescription?: string; schemaType?: string }
  pillar: PillarRef
  cluster: { title: string; slug: string }
  related?: ArticleLink[]
  siblings?: ArticleLink[]
}

/**
 * Path helpers. The app runs under Next's `basePath: '/ai-search-101'`, which
 * auto-prepends that prefix to every <Link>/router href. So in-app paths here are
 * basePath-RELATIVE (base = ''): pillarPath('geo') = '/geo' renders as
 * '/ai-search-101/geo'. Do NOT put '/ai-search-101' in these or it doubles.
 */
export const base = ''
/** The hub itself, as a <Link> href (basePath turns '/' into '/ai-search-101'). */
export const hubPath = '/'
/** For canonicals / sitemap-style refs that are NOT auto-prefixed by basePath. */
export const canonicalPath = '/ai-search-101'
export const pillarPath = (p: string) => `${base}/${p}`
export const clusterPath = (p: string, c: string) => `${base}/${p}/${c}`
export const articlePath = (p: string, c: string, a: string) => `${base}/${p}/${c}/${a}`
