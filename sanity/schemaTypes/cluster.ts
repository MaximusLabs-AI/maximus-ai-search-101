import {defineType, defineField} from 'sanity'

/**
 * LEVEL 3 — Cluster  (e.g. GEO Fundamentals, GEO Strategy)
 * URL: /ai-search-101/<pillar.slug>/<slug>/
 * The reference to `pillar` is what builds the breadcrumb and the parent path.
 */
export default defineType({
  name: 'cluster',
  title: 'Cluster (Level 3)',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'URL segment',
      type: 'slug',
      description: 'Single segment within the pillar, e.g. "fundamentals".',
      options: {source: 'title', maxLength: 40},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'reference',
      to: [{type: 'pillar'}],
      description: 'Parent pillar (Level 2). Drives the URL and breadcrumb.',
      validation: (r) => r.required(),
    }),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3}),
    defineField({name: 'body', title: 'Body', type: 'blockContent'}),
    defineField({
      name: 'level',
      title: 'Difficulty',
      type: 'string',
      options: {list: ['Beginner', 'Intermediate', 'Advanced']},
    }),
    defineField({name: 'order', title: 'Order', type: 'number', initialValue: 0}),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'metaTitle', type: 'string'},
        {name: 'metaDescription', type: 'text', rows: 2},
      ],
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', pillar: 'pillar.slug.current', slug: 'slug.current'},
    prepare: ({title, pillar, slug}) => ({title, subtitle: `/ai-search-101/${pillar}/${slug}/`}),
  },
})
