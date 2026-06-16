/**
 * Converts the drafted article JSON files in sanity/seed/articles/*.json into
 * Sanity article documents (Portable Text body) and upserts them. Idempotent.
 *
 *   node --env-file=.env.local scripts/import-articles.mjs
 */
import { createClient } from '@sanity/client'
import { readFileSync, readdirSync, existsSync } from 'node:fs'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_API_WRITE_TOKEN in .env.local'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bict0s25',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-10-01', token, useCdn: false,
})

const dir = new URL('../sanity/seed/articles/', import.meta.url)
if (!existsSync(dir)) { console.error('No articles dir at', dir.pathname); process.exit(1) }

let k = 0
const key = () => `k${k++}`
const span = (text) => ({ _type: 'span', _key: key(), text: String(text ?? '') })
const para = (style, text) => ({ _type: 'block', _key: key(), style, markDefs: [], children: [span(text)] })

function toPortableText(sections = []) {
  const blocks = []
  for (const s of sections) {
    if (s.h2) blocks.push(para('h2', s.h2))
    for (const b of s.blocks || []) {
      if (b.t === 'p') blocks.push(para('normal', b.text))
      else if (b.t === 'h3') blocks.push(para('h3', b.text))
      else if (b.t === 'quote') blocks.push(para('blockquote', b.text))
      else if (b.t === 'ul') for (const it of b.items || []) {
        blocks.push({ _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [span(it)] })
      }
      else if (b.t === 'callout') blocks.push({ _type: 'callout', _key: key(), label: 'The MaximusLabs view', text: b.text })
      else if (b.t === 'table') blocks.push({
        _type: 'table', _key: key(), hasHeader: true,
        rows: [
          { _type: 'row', _key: key(), cells: b.header || [] },
          ...(b.rows || []).map((r) => ({ _type: 'row', _key: key(), cells: r })),
        ],
      })
    }
  }
  return blocks
}

const isoDate = (d) => (d && /T/.test(d) ? d : `${d || '2026-06-16'}T09:00:00.000Z`)

const files = readdirSync(dir).filter((f) => f.endsWith('.json'))
if (!files.length) { console.error('No .json article files found in', dir.pathname); process.exit(1) }

const docs = files.map((f) => {
  let raw = readFileSync(new URL(f, dir), 'utf8').trim()
  if (raw.startsWith('```')) raw = raw.replace(/^```[a-z]*\n?/i, '').replace(/```$/, '').trim()
  const a = JSON.parse(raw)
  return {
    _id: a.id,
    _type: 'article',
    title: a.title,
    slug: { _type: 'slug', current: a.slug },
    pillar: { _type: 'reference', _ref: `pillar-${a.pillar}` },
    cluster: { _type: 'reference', _ref: `cluster-${a.pillar}-${a.cluster}` },
    answer: a.answer,
    excerpt: a.excerpt,
    readingTime: a.readingTime,
    datePublished: isoDate(a.datePublished),
    dateModified: isoDate(a.datePublished),
    body: toPortableText(a.sections),
    faq: (a.faq || []).map((q) => ({ _type: 'qa', _key: key(), question: q.q, answer: q.a })),
    seo: { metaTitle: a.title, metaDescription: a.excerpt, schemaType: 'Article' },
    order: 1,
  }
})

const tx = docs.reduce((t, d) => t.createOrReplace(d), client.transaction())
const res = await tx.commit()
console.log(`Imported ${docs.length} articles: ${docs.map((d) => d._id.replace('article-', '')).join(', ')}. Tx ${res.transactionId}.`)
