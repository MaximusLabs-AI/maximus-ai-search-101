import { NextResponse, type NextRequest } from 'next/server'
import { client } from '@/sanity/client'
import { SEARCH_Q } from '@/sanity/queries'
import type { SearchResult } from '@/components/types'

const base = '/ai-search-101'
const LABEL: Record<SearchResult['_type'], string> = { pillar: 'Pillar', cluster: 'Cluster', article: 'Guide' }

// Same-origin typeahead endpoint for the search box (avoids browser->Sanity CORS).
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') || '').trim()
  if (q.length < 2) return NextResponse.json({ results: [] })

  const term = q.split(/\s+/).map((w) => `${w}*`).join(' ')
  const raw = await client.fetch<SearchResult[]>(SEARCH_Q, { term })

  const results = raw.slice(0, 8).map((r) => {
    const href =
      r._type === 'pillar' ? `${base}/${r.pillarSlug || r.slug}`
        : r._type === 'cluster' ? `${base}/${r.pillarSlug}/${r.slug}`
          : `${base}/${r.pillarSlug}/${r.clusterSlug}/${r.slug}`
    return { title: r.title, href, typeLabel: LABEL[r._type] }
  })

  return NextResponse.json({ results })
}
