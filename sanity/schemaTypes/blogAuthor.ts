import {defineType, defineField} from 'sanity'

/**
 * Blog author — synced from the Maximus CMS author taxonomy
 * (GET /api/v1/authors: name, slug, bio, avatar_url). Keyed by slug.
 */
export default defineType({
  name: 'blogAuthor',
  title: 'Blog author',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Author name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      description: 'Matches the author slug in the Maximus CMS.',
      validation: (r) => r.required(),
    }),
    defineField({name: 'bio', title: 'Bio', type: 'text', rows: 3}),
    defineField({name: 'avatarUrl', title: 'Avatar URL', type: 'url'}),
  ],
  preview: {select: {title: 'name', subtitle: 'slug.current'}},
})
