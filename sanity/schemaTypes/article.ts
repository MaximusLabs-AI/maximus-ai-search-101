import {defineType, defineField} from 'sanity'

/**
 * LEVEL 4 — Article  (the leaf, e.g. "What is GEO?")
 * URL: /ai-search-101/<pillar.slug>/<cluster.slug>/<slug>/
 * Holds BOTH pillar and cluster references so the breadcrumb and the
 * 4-level path resolve in a single GROQ query without extra joins.
 */
export default defineType({
  name: 'article',
  title: 'Article (Level 4)',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'URL segment',
      type: 'slug',
      description: 'Leaf segment, e.g. "what-is-geo".',
      options: {source: 'title', maxLength: 60},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cluster',
      title: 'Cluster',
      type: 'reference',
      to: [{type: 'cluster'}],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'reference',
      to: [{type: 'pillar'}],
      description: 'Denormalized parent pillar for breadcrumb + path. Keep consistent with the cluster.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer-first nugget',
      type: 'text',
      rows: 4,
      description: '40 to 80 words. The direct answer shown in the highlighted box and used for AI citation.',
      validation: (r) => r.max(600),
    }),
    defineField({name: 'excerpt', title: 'Excerpt / dek', type: 'text', rows: 2}),
    defineField({name: 'body', title: 'Body', type: 'blockContent'}),
    defineField({
      name: 'bodyHtml',
      title: 'Body (HTML — synced from Maximus CMS)',
      type: 'text',
      rows: 12,
      description: 'Set by the Maxint blog sync. When present it renders instead of the Portable Text body. Do not hand-edit; overwritten on the next sync.',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'qa',
          fields: [
            {name: 'question', type: 'string'},
            {name: 'answer', type: 'text', rows: 3},
          ],
          preview: {select: {title: 'question'}},
        },
      ],
    }),
    defineField({name: 'readingTime', title: 'Reading time (min)', type: 'number'}),
    defineField({
      name: 'relatedArticles',
      title: 'Related articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}]}],
    }),
    defineField({name: 'datePublished', title: 'Date published', type: 'datetime'}),
    defineField({name: 'dateModified', title: 'Date modified', type: 'datetime'}),
    defineField({name: 'order', title: 'Order in cluster', type: 'number', initialValue: 0}),
    defineField({
      name: 'maxintId',
      title: 'Maximus CMS blog id',
      type: 'string',
      readOnly: true,
      description: 'Set when this article is synced from a Maximus CMS blog (stable upsert key).',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'metaTitle', type: 'string'},
        {name: 'metaDescription', type: 'text', rows: 2},
        {name: 'focusKeyword', type: 'string'},
        {
          name: 'schemaType',
          title: 'Schema.org type',
          type: 'string',
          options: {list: ['Article', 'FAQPage', 'HowTo']},
          initialValue: 'Article',
        },
      ],
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', pillar: 'pillar.slug.current', cluster: 'cluster.slug.current', slug: 'slug.current'},
    prepare: ({title, pillar, cluster, slug}) => ({
      title,
      subtitle: `/ai-search-101/${pillar}/${cluster}/${slug}/`,
    }),
  },
})
