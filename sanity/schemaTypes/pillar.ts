import {defineType, defineField} from 'sanity'

/**
 * LEVEL 2 — Pillar  (e.g. GEO, AEO, SEO, Agentic SEO, Agentic Commerce)
 * URL: /ai-search-101/<slug>/
 */
export default defineType({
  name: 'pillar',
  title: 'Pillar (Level 2)',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'URL segment',
      type: 'slug',
      description: 'The single path segment, e.g. "geo". Must be unique across pillars.',
      options: {source: 'shortLabel', maxLength: 40},
      validation: (r) => r.required(),
    }),
    defineField({name: 'shortLabel', title: 'Short label', type: 'string', description: 'Used in nav and breadcrumbs, e.g. "GEO".'}),
    defineField({
      name: 'category',
      title: 'Hub category',
      type: 'string',
      description: 'Groups this pillar into a section on the hub.',
      options: {list: ['Core Disciplines', 'Explore by area']},
      initialValue: 'Core Disciplines',
    }),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, description: 'Hub intro + meta description.'}),
    defineField({name: 'body', title: 'Body', type: 'blockContent'}),
    defineField({name: 'icon', title: 'Icon', type: 'image'}),
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
    select: {title: 'title', subtitle: 'slug.current'},
    prepare: ({title, subtitle}) => ({title, subtitle: `/ai-search-101/${subtitle}/`}),
  },
})
