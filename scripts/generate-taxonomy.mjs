/**
 * Generates the FULL AI Search 101 taxonomy in Sanity: every pillar and every
 * cluster from the complete URL structure. Idempotent (fixed _ids), re-runnable.
 *
 *   node --env-file=.env.local scripts/generate-taxonomy.mjs
 *
 * Articles (Level 4) are seeded separately (import-articles / Studio).
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_API_WRITE_TOKEN in .env.local'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bict0s25',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-10-01', token, useCdn: false,
})

const CORE = 'Core Disciplines'
const AREA = 'Explore by area'

const PILLARS = [
  { slug: 'geo', title: 'GEO — Generative Engine Optimization', short: 'GEO', cat: CORE,
    summary: 'Get your brand surfaced, cited, and recommended inside generative engines like ChatGPT, Gemini, and Google AI Overviews.',
    clusters: [
      { slug: 'fundamentals', title: 'GEO Fundamentals', level: 'Beginner', summary: 'What GEO is, how generative engines pick what to cite, and how it differs from SEO and AEO.' },
      { slug: 'strategy', title: 'GEO Strategy', level: 'Intermediate', summary: 'Frameworks, citation strategy, competitive analysis, and prioritization for a GEO program.' },
      { slug: 'content', title: 'GEO Content', level: 'Intermediate', summary: 'Write content engines lift and attribute: answer-first, citation-worthy, well structured.' },
      { slug: 'technical', title: 'GEO Technical', level: 'Advanced', summary: 'Schema, AI crawler access, site architecture, and performance for AI discoverability.' },
      { slug: 'measurement', title: 'GEO Measurement', level: 'Intermediate', summary: 'Track citations, share of voice, traffic attribution, and reporting.' },
      { slug: 'advanced', title: 'GEO Advanced', level: 'Advanced', summary: 'Enterprise, multi-market, programmatic GEO, and automation at scale.' },
      { slug: 'best-practices', title: 'GEO Best Practices', summary: "The proven do's of GEO, distilled into a practical checklist." },
      { slug: 'common-mistakes', title: 'GEO Common Mistakes', summary: 'The GEO mistakes that quietly cost you citations, and how to avoid them.' },
      { slug: 'case-studies', title: 'GEO Case Studies', summary: 'Real GEO programs and the visibility and revenue they produced.' },
      { slug: 'tools', title: 'GEO Tools', summary: 'The tools worth using across the GEO workflow, compared.' },
      { slug: 'glossary', title: 'GEO Glossary', summary: 'Every GEO term defined, from citations to grounding.' },
    ] },
  { slug: 'aeo', title: 'AEO — Answer Engine Optimization', short: 'AEO', cat: CORE,
    summary: 'Win the direct answer in Perplexity, voice assistants, and featured AI responses.',
    clusters: [
      { slug: 'fundamentals', title: 'AEO Fundamentals', level: 'Beginner', summary: 'How answer engines work, and how AEO differs from SEO and GEO.' },
      { slug: 'strategy', title: 'AEO Strategy', level: 'Intermediate', summary: 'Question research, query types, intent mapping, and content planning for AEO.' },
      { slug: 'optimization', title: 'AEO Optimization', level: 'Intermediate', summary: 'Win featured snippets, People Also Ask, AI Overviews, and position zero.' },
      { slug: 'content', title: 'AEO Content', level: 'Intermediate', summary: 'Formatting, FAQ optimization, and direct-answer writing for answer engines.' },
      { slug: 'voice-search', title: 'AEO Voice Search', level: 'Intermediate', summary: 'Optimize for conversational queries, voice assistants, and voice commerce.' },
      { slug: 'measurement', title: 'AEO Measurement', level: 'Intermediate', summary: 'Metrics, tracking, and tools for answer-engine visibility.' },
      { slug: 'best-practices', title: 'AEO Best Practices', summary: "The proven do's of AEO in one checklist." },
      { slug: 'common-mistakes', title: 'AEO Common Mistakes', summary: 'The AEO mistakes that keep you out of the answer box.' },
      { slug: 'case-studies', title: 'AEO Case Studies', summary: 'Real AEO wins and how they were earned.' },
      { slug: 'glossary', title: 'AEO Glossary', summary: 'Every AEO term, defined.' },
    ] },
  { slug: 'seo', title: 'SEO — Search Engine Optimization', short: 'SEO', cat: CORE,
    summary: 'The classic foundation, rebuilt for an AI-first SERP. The base everything else compounds on.',
    clusters: [
      { slug: 'fundamentals', title: 'SEO Fundamentals', level: 'Beginner', summary: 'How search engines work and the ranking factors that still matter.' },
      { slug: 'on-page', title: 'On-Page SEO', level: 'Beginner', summary: 'Titles, meta, headers, internal links, and on-page content optimization.' },
      { slug: 'technical', title: 'Technical SEO', level: 'Advanced', summary: 'Crawlability, indexability, Core Web Vitals, sitemaps, and structured data.' },
      { slug: 'off-page', title: 'Off-Page SEO', level: 'Intermediate', summary: 'Link building, digital PR, brand mentions, and outreach.' },
      { slug: 'content', title: 'Content SEO', level: 'Intermediate', summary: 'Keyword research, topic clusters, pillar pages, and content quality.' },
      { slug: 'local', title: 'Local SEO', level: 'Intermediate', summary: 'Google Business Profile, citations, reviews, and the map pack.' },
      { slug: 'ecommerce', title: 'E-commerce SEO', level: 'Intermediate', summary: 'Product and category optimization, product schema, and feeds.' },
      { slug: 'enterprise', title: 'Enterprise SEO', level: 'Advanced', summary: 'Large-site optimization, governance, scalability, and migrations.' },
      { slug: 'international', title: 'International SEO', level: 'Advanced', summary: 'Hreflang, geo-targeting, URL structure, and localization.' },
      { slug: 'measurement', title: 'SEO Measurement', level: 'Intermediate', summary: 'KPIs, Search Console, analytics, and rank tracking.' },
      { slug: 'tools', title: 'SEO Tools', level: 'Beginner', summary: 'Free and paid SEO tools, compared, and how to build a stack.' },
      { slug: 'best-practices', title: 'SEO Best Practices', summary: "The proven do's of modern SEO." },
      { slug: 'common-mistakes', title: 'SEO Common Mistakes', summary: 'The SEO mistakes that stall growth.' },
      { slug: 'glossary', title: 'SEO Glossary', summary: 'Every SEO term, defined.' },
    ] },
  { slug: 'agentic-seo', title: 'Agentic SEO', short: 'Agentic SEO', cat: CORE,
    summary: 'Optimize for autonomous agents that research, compare, and shortlist on a buyer’s behalf.',
    clusters: [
      { slug: 'fundamentals', title: 'Agentic SEO Fundamentals', level: 'Beginner', summary: 'What agentic SEO is, how AI agents work, and autonomous vs assisted workflows.' },
      { slug: 'capabilities', title: 'Agentic SEO Capabilities', level: 'Intermediate', summary: 'Automated research, content optimization, audits, and monitoring by agents.' },
      { slug: 'implementation', title: 'Agentic SEO Implementation', level: 'Intermediate', summary: 'Getting started, workflow setup, tools, and integration.' },
      { slug: 'human-ai-collaboration', title: 'Human-AI Collaboration', level: 'Intermediate', summary: 'Roles, oversight, and best practices for human-in-the-loop SEO.' },
      { slug: 'use-cases', title: 'Agentic SEO Use Cases', summary: 'Where agentic SEO delivers the most value today.' },
      { slug: 'tools', title: 'Agentic SEO Tools', summary: 'The agentic SEO tools and platforms worth knowing.' },
      { slug: 'future', title: 'Future of Agentic SEO', summary: 'Where autonomous search optimization is heading.' },
    ] },
  { slug: 'agentic-commerce', title: 'Agentic Commerce', short: 'Agentic Commerce', cat: CORE,
    summary: 'Be the product an AI agent buys: structured feeds, trust signals, and checkout-ready data.',
    clusters: [
      { slug: 'fundamentals', title: 'Agentic Commerce Fundamentals', level: 'Beginner', summary: 'AI shopping agents, how agentic commerce works, and the A2A protocols behind it.' },
      { slug: 'optimization', title: 'Agentic Commerce Optimization', level: 'Intermediate', summary: 'Product discovery, catalog, pricing signals, inventory, and shipping data.' },
      { slug: 'platforms', title: 'Agentic Commerce Platforms', level: 'Intermediate', summary: 'Optimizing for OpenAI Operator, Shopify, Amazon, and Google Shopping.' },
      { slug: 'preparation', title: 'Preparing for Agentic Commerce', level: 'Intermediate', summary: 'Readiness assessment, technical requirements, and an implementation roadmap.' },
      { slug: 'future', title: 'Future of Agentic Commerce', summary: 'Where agent-driven buying is heading.' },
    ] },
  { slug: 'platforms', title: 'AI Search Platforms', short: 'Platforms', cat: AREA,
    summary: 'Platform-by-platform playbooks for getting cited across every major AI engine.',
    clusters: [
      { slug: 'chatgpt', title: 'ChatGPT Search', summary: 'How ChatGPT Search works and how to get cited in it.' },
      { slug: 'perplexity', title: 'Perplexity AI', summary: 'How Perplexity selects sources and how to earn citations.' },
      { slug: 'google-ai', title: 'Google AI / Gemini', summary: 'AI Overviews, Gemini, and AI Mode optimization.' },
      { slug: 'copilot', title: 'Microsoft Copilot', summary: 'Microsoft Copilot and Bing AI optimization.' },
      { slug: 'claude', title: 'Claude AI', summary: 'How Claude uses sources and how to be cited.' },
      { slug: 'amazon-rufus', title: 'Amazon Rufus', summary: 'Optimizing product listings for Amazon’s Rufus.' },
      { slug: 'meta-ai', title: 'Meta AI', summary: 'Getting cited across Meta AI surfaces.' },
      { slug: 'grok', title: 'Grok (X AI)', summary: 'Optimizing for Grok and real-time X data.' },
      { slug: 'apple-intelligence', title: 'Apple Intelligence', summary: 'Siri, Apple Intelligence, and iOS search.' },
      { slug: 'comparisons', title: 'Platform Comparisons', summary: 'Head-to-head platform comparisons and multi-platform strategy.' },
      { slug: 'emerging', title: 'Emerging Platforms', summary: 'DeepSeek and other emerging AI search platforms.' },
    ] },
  { slug: 'technical', title: 'Technical Areas', short: 'Technical', cat: AREA,
    summary: 'The technical foundation that makes a site readable and citable by AI.',
    clusters: [
      { slug: 'schema', title: 'Schema & Structured Data', summary: 'Schema markup and structured data for AI discoverability.' },
      { slug: 'site-architecture', title: 'Site Architecture', summary: 'Flat vs deep structure, topic clustering, internal linking, and IA.' },
      { slug: 'content-formatting', title: 'Content Formatting', summary: 'AI-optimized formatting: answer-first, headers, lists, tables, and readability.' },
      { slug: 'ai-crawlers', title: 'AI Crawler Optimization', summary: 'Managing GPTBot, CCBot, Bingbot, and AI crawler access.' },
      { slug: 'entities', title: 'Entity Optimization', summary: 'Entity optimization, the knowledge graph, and disambiguation.' },
      { slug: 'performance', title: 'Technical Performance', summary: 'Core Web Vitals, page speed, rendering, and mobile.' },
      { slug: 'indexation', title: 'Indexation & Crawlability', summary: 'Canonicalization, duplicate content, pagination, and monitoring.' },
    ] },
  { slug: 'strategies', title: 'Strategies & Tactics', short: 'Strategies', cat: AREA,
    summary: 'The repeatable tactics that move AI search visibility.',
    clusters: [
      { slug: 'citations', title: 'Citation Optimization', summary: 'Earn the citations that compound: worthy content, sources, and tracking.' },
      { slug: 'share-of-voice', title: 'Share of Voice', summary: 'Measure and grow your share of AI answers.' },
      { slug: 'ugc', title: 'UGC Optimization', summary: 'Reddit, Quora, YouTube, reviews, and G2 for AI visibility.' },
      { slug: 'question-research', title: 'Question Research', summary: 'Find the questions buyers ask AI, and map content to them.' },
      { slug: 'eeat', title: 'E-E-A-T Optimization', summary: 'Experience, expertise, authority, and trust for AI search.' },
      { slug: 'zero-click', title: 'Zero-Click Optimization', summary: 'Build brand and capture value in a zero-click world.' },
      { slug: 'voice-search', title: 'Voice Search Optimization', summary: 'Optimize for conversational and voice queries.' },
      { slug: 'multimodal', title: 'Multimodal Search', summary: 'Image, video, audio, and visual search optimization.' },
      { slug: 'content', title: 'Content Strategy', summary: 'AI content strategy, topic authority, clusters, and refresh.' },
      { slug: 'competitor-analysis', title: 'Competitor Analysis', summary: "Analyze competitors’ AI visibility and find content gaps." },
    ] },
  { slug: 'future', title: 'Future of Search', short: 'Future', cat: AREA,
    summary: 'Where AI search is heading and how to prepare.',
    clusters: [
      { slug: 'ai-search-evolution', title: 'AI Search Evolution', summary: 'How AI search is evolving, and what it means for brands.' },
      { slug: 'agentic-ai', title: 'Agentic AI', summary: 'The rise of agentic AI in search and commerce.' },
      { slug: 'personalization', title: 'Personalization', summary: 'Hyper-personalized answers and what they change.' },
      { slug: 'conversational-ai', title: 'Conversational AI', summary: 'Conversational interfaces as the new front door.' },
      { slug: 'platform-expansion', title: 'Platform Expansion', summary: 'New platforms and surfaces to watch.' },
      { slug: 'privacy', title: 'Privacy', summary: 'Privacy shifts shaping AI search.' },
      { slug: 'regulation', title: 'Regulation', summary: 'Regulation on the horizon for AI answers.' },
      { slug: 'preparation', title: 'Preparation', summary: "How to prepare your brand for what’s next." },
      { slug: 'predictions', title: 'Predictions', summary: 'Our predictions for AI search.' },
    ] },
  { slug: 'glossary', title: 'Glossary', short: 'Glossary', cat: AREA,
    summary: 'Every AI search term, defined.',
    clusters: [
      { slug: 'a-z', title: 'A to Z Glossary', summary: 'The full A to Z glossary of AI search terms.' },
      { slug: 'geo-terms', title: 'GEO Terms', summary: 'GEO terminology, defined.' },
      { slug: 'aeo-terms', title: 'AEO Terms', summary: 'AEO terminology, defined.' },
      { slug: 'seo-terms', title: 'SEO Terms', summary: 'SEO terminology, defined.' },
      { slug: 'technical-terms', title: 'Technical Terms', summary: 'Technical AI search terminology, defined.' },
    ] },
]

const bodyFromText = (text, key) => [{
  _type: 'block', _key: `${key}-b`, style: 'normal',
  children: [{ _type: 'span', _key: `${key}-s`, text }],
}]

const docs = []
PILLARS.forEach((p, pi) => {
  docs.push({
    _id: `pillar-${p.slug}`, _type: 'pillar', title: p.title, shortLabel: p.short,
    slug: { _type: 'slug', current: p.slug }, category: p.cat, summary: p.summary, order: pi + 1,
  })
  p.clusters.forEach((c, ci) => {
    docs.push({
      _id: `cluster-${p.slug}-${c.slug}`, _type: 'cluster', title: c.title,
      slug: { _type: 'slug', current: c.slug },
      pillar: { _type: 'reference', _ref: `pillar-${p.slug}` },
      ...(c.level ? { level: c.level } : {}),
      summary: c.summary, order: ci + 1,
      body: bodyFromText(c.summary, `cluster-${p.slug}-${c.slug}`),
    })
  })
})

const tx = docs.reduce((t, d) => t.createOrReplace(d), client.transaction())
const res = await tx.commit()
const pillars = docs.filter((d) => d._type === 'pillar').length
const clusters = docs.filter((d) => d._type === 'cluster').length
console.log(`Upserted ${docs.length} docs: ${pillars} pillars, ${clusters} clusters. Tx ${res.transactionId}.`)
