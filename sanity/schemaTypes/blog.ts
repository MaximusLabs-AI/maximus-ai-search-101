import {defineType, defineField} from 'sanity'

/**
 * Blog — a MaximusLabs blog SYNCED FROM the Maximus CMS read API
 * (GET content.maximuslabs.ai/api/v1/blogs). The Maximus CMS is the source of
 * truth: you author + publish there, and a sync job pulls each published blog
 * into this document so it also lives in Sanity.
 *
 * Fields mirror the API response 1:1 (body/tldr stay as HTML, images stay as
 * URLs) so the sync is lossless. Don't hand-edit these in Studio — they're
 * overwritten on the next sync; edit in the Maximus CMS instead.
 */
export default defineType({
  name: 'blog',
  title: 'Blog (from Maximus CMS)',
  type: 'document',
  groups: [
    {name: 'meta', title: 'Title & metadata', default: true},
    {name: 'media', title: 'Images'},
    {name: 'content', title: 'Summary, TL;DR & body'},
    {name: 'tax', title: 'Taxonomies'},
    {name: 'faq', title: 'FAQs'},
    {name: 'sync', title: 'Sync'},
  ],
  fields: [
    // ---- Title & metadata ----
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required(), group: 'meta'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 120},
      description: 'The Maximus CMS blog slug (the URL key).',
      validation: (r) => r.required(),
      group: 'meta',
    }),
    defineField({name: 'focusKeyword', title: 'Focus keyword', type: 'string', group: 'meta'}),
    defineField({name: 'minuteRead', title: 'Read time (min)', type: 'number', group: 'meta'}),
    defineField({name: 'metaTitle', title: 'Meta title (SEO)', type: 'string', group: 'meta'}),
    defineField({name: 'metaDescription', title: 'Meta description (SEO)', type: 'text', rows: 2, group: 'meta'}),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: ['ready', 'processing', 'failed']},
      initialValue: 'ready',
      group: 'meta',
    }),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime', group: 'meta'}),

    // ---- Images (Maximus CMS serves these as hosted URLs + alt) ----
    defineField({
      name: 'heroImage',
      title: 'Main / hero image',
      type: 'object',
      group: 'media',
      fields: [
        {name: 'url', title: 'Image URL', type: 'url'},
        {name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.max(500)},
      ],
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail / card image',
      type: 'object',
      group: 'media',
      fields: [
        {name: 'url', title: 'Image URL', type: 'url'},
        {name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.max(500)},
      ],
    }),

    // ---- Summary, TL;DR & body (kept as HTML, lossless from the source) ----
    defineField({name: 'postSummary', title: 'Post summary (card excerpt)', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'tldrHtml', title: 'TL;DR (HTML)', type: 'text', rows: 6, group: 'content'}),
    defineField({name: 'bodyHtml', title: 'Body (HTML)', type: 'text', rows: 20, group: 'content'}),

    // ---- Taxonomies (resolved to author/category docs by slug on sync) ----
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'blogAuthor'}], group: 'tax'}),
    defineField({
      name: 'primaryCategory',
      title: 'Primary category',
      type: 'reference',
      to: [{type: 'blogCategory'}],
      group: 'tax',
    }),
    defineField({
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'blogCategory'}]}],
      group: 'tax',
    }),

    // ---- FAQs ----
    defineField({
      name: 'faqs',
      title: 'FAQs',
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
      validation: (r) => r.max(50),
      group: 'faq',
    }),

    // ---- Sync bookkeeping ----
    defineField({
      name: 'maxintId',
      title: 'Maximus CMS blog id',
      type: 'string',
      readOnly: true,
      description: 'Source id from the Maximus CMS; used as the stable key on each sync.',
      group: 'sync',
    }),
    defineField({name: 'syncedAt', title: 'Last synced', type: 'datetime', readOnly: true, group: 'sync'}),
  ],
  orderings: [{title: 'Published (newest)', name: 'pubDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', slug: 'slug.current', media: 'heroImage'},
    prepare: ({title, slug}) => ({title, subtitle: slug ? `/blog/${slug}` : 'no slug'}),
  },
})
