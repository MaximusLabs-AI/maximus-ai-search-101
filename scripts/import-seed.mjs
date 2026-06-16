/**
 * Seed importer. Reads the write token from the environment (never hardcoded).
 * Run from the web/ directory with Node's built-in env-file loader:
 *
 *   node --env-file=.env.local scripts/import-seed.mjs
 *
 * It createOrReplaces every document in sanity/seed/geo-slice.ndjson, so it is
 * safe to re-run (idempotent on the fixed _id values).
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Paste your Sanity Editor token into web/.env.local first.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bict0s25',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01',
  token,
  useCdn: false,
})

const ndjson = readFileSync(new URL('../sanity/seed/seed.ndjson', import.meta.url), 'utf8')
const docs = ndjson.trim().split('\n').filter(Boolean).map((line) => JSON.parse(line))

const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction())
const res = await tx.commit()
console.log(`Imported ${docs.length} documents into ${client.config().dataset}. Transaction ${res.transactionId}.`)
