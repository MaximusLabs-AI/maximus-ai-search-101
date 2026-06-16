import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bict0s25'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // published, cacheable reads (ISR/SSG)
  perspective: 'published',
})

const builder = createImageUrlBuilder({ projectId, dataset })
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

const isProd = process.env.NODE_ENV === 'production'

/**
 * Fetch helper. In production: legacy ISR (time-based revalidate + tags for
 * on-demand revalidation via a Sanity publish webhook). In development: always
 * fresh (no-store), so newly imported/edited content shows immediately instead
 * of being pinned by the 1-hour cache.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  if (isProd) {
    return client.fetch<T>(query, params, {
      next: { revalidate: 3600, tags: ['ai-search-101', ...tags] },
    })
  }
  return client.fetch<T>(query, params, { cache: 'no-store' })
}
