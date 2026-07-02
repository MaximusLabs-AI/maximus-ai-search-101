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
      description: 'Maxint body_html. When present it renders instead of the Portable Text body. Tables/images/headings inside render as-is.',
    }),
    defineField({
      name: 'tldrHtml',
      title: 'TL;DR (HTML — synced from Maximus CMS)',
      type: 'text',
      rows: 5,
      description: 'Maxint tldr_html. Rendered in a TL;DR box at the top of the article.',
    }),
    defineField({
      name: 'author',
      title: 'Author (synced from Maximus CMS)',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'name', type: 'string'},
        {name: 'designation', type: 'string'},
        {name: 'avatarUrl', title: 'Avatar URL', type: 'url'},
        {name: 'bio', type: 'text', rows: 2},
      ],
      description: 'Maxint blog author. Falls back to the default MaximusLabs author when empty.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / featured image (synced from Maximus CMS)',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'url', title: 'Image URL', type: 'url'},
        {name: 'alt', title: 'Alt text', type: 'string'},
      ],
      description: 'Maxint main_image. Shown at the top of the article when present.',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail / card image (synced from Maximus CMS)',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'url', title: 'Image URL', type: 'url'},
        {name: 'alt', title: 'Alt text', type: 'string'},
      ],
      description: 'Maxint thumbnail_image. Used for cards/listings.',
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
      name: 'toc',
      title: 'TOC keyword labels',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Short keyword shown in the "On this page" sidebar for each H2, in order (overrides the H2 text in the sidebar only; the heading and its anchor are unchanged). Synced HTML articles use [toc=...] markers instead.',
    }),
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
      name: 'maxintUpdatedAt',
      title: 'Maximus CMS updated_at',
      type: 'string',
      readOnly: true,
      description: 'Source updated_at; the sync skips a blog when this is unchanged.',
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
