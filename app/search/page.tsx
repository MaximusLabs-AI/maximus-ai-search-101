import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { SEARCH_Q } from '@/sanity/queries'
import { SearchResults } from '@/components/templates'
import type { SearchResult } from '@/components/types'
import { canonicalPath } from '@/components/types'

/**
 * Search lives in its OWN route, not the SSG catch-all. It reads searchParams
 * (per-query, dynamic); keeping it inside the statically-generated
 * `[[...slug]]` route makes Next try to static-optimize the on-demand render
 * and throw DYNAMIC_SERVER_USAGE in production. force-dynamic + no-store keeps
 * it always server-rendered and fresh.
 */
export const dynamic = 'force-dynamic'

export function generateMetadata(): Metadata {
  return {
    title: 'Search',
    description: 'Search pillars, clusters, and guides across AI Search 101.',
    alternates: { canonical: `${canonicalPath}/search` },
  }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const term = (q || '').trim()
  const results = term
    ? await client.fetch<SearchResult[]>(
        SEARCH_Q,
        { term: term.split(/\s+/).map((w) => `${w}*`).join(' ') },
        { cache: 'no-store' },
      )
    : []
  return <SearchResults q={term} results={results} />
}
