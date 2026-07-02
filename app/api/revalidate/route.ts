import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Sanity publish webhook target. Configure a webhook in sanity.io/manage to POST
 * here on publish:  https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *
 * All site reads are tagged 'ai-search-101', so revalidating that tag refreshes
 * the whole hub on the next request. Without the webhook, content still updates
 * automatically within ~60s via ISR (revalidate: 60 in sanity/client.ts).
 * Configure the webhook to fire on create + update + DELETE so unpublishes and
 * deletions clear instantly, not just publishes.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: 'Invalid or missing secret' }, { status: 401 })
  }
  revalidateTag('ai-search-101', 'max')
  return NextResponse.json({ ok: true, revalidated: true, now: Date.now() })
}
