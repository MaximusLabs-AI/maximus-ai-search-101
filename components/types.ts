import type { PortableTextBlock } from '@portabletext/react'

export type PillarRef = { title: string; shortLabel?: string; slug: string }
export type FaqItem = { question: string; answer: string }

export type HubData = {
  pillars: {
    title: string
    shortLabel?: string
    summary?: string
    category?: string
    slug: string
    clusterCount: number
  }[]
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
  related?: { title: string; slug: string; cluster: string; pillar: string }[]
}

/** Shared path helper so every component builds the same canonical URLs. */
export const base = '/ai-search-101'
export const pillarPath = (p: string) => `${base}/${p}`
export const clusterPath = (p: string, c: string) => `${base}/${p}/${c}`
export const articlePath = (p: string, c: string, a: string) => `${base}/${p}/${c}/${a}`
