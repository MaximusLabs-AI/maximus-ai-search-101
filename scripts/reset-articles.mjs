/**
 * One-time cleanup: deletes ALL article documents from Sanity so the hub can be
 * rebuilt from only the real, migrated content. Pillars and clusters are left
 * intact. Run this BEFORE import-articles.mjs when doing a clean slate.
 *
 *   node --env-file=.env.local scripts/reset-articles.mjs
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_API_WRITE_TOKEN in .env.local'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bict0s25',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-10-01', token, useCdn: false,
})

const ids = await client.fetch('*[_type=="article"]._id')
if (!ids.length) { console.log('No article docs to delete.'); process.exit(0) }
const res = await client.delete({ query: '*[_type=="article"]' })
console.log(`Deleted ${ids.length} article docs. Tx ${res.transactionId || res.results?.length || 'ok'}.`)
