import {defineType, defineField} from 'sanity'

/**
 * Blog category — mirrors the Maximus CMS category taxonomy
 * (GET /api/v1/categories: name, slug, parent_id). Categories nest;
 * a top-level category has no parent. The `slug` MUST match the
 * category slug in the Maximus CMS (unknown slugs are rejected on write).
 */
export default defineType({
  name: 'blogCategory',
  title: 'Blog category',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Category name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      description: 'Must match the category slug in the Maximus CMS settings.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent category',
      type: 'reference',
      to: [{type: 'blogCategory'}],
      description: 'Leave empty for a top-level category.',
    }),
  ],
  preview: {
    select: {title: 'name', parent: 'parent.name'},
    prepare: ({title, parent}) => ({title, subtitle: parent ? `↳ under ${parent}` : 'top-level'}),
  },
})
