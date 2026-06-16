import {defineType, defineArrayMember} from 'sanity'

/**
 * Portable Text body used by pillars, clusters and articles.
 * Rich text + headings + lists + links + an inline "callout" block
 * (the navy "MaximusLabs view" box used in the article template).
 */
export default defineType({
  title: 'Body',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [{title: 'URL', name: 'href', type: 'url'}],
          },
        ],
      },
    }),
    // Inline "MaximusLabs view" callout block
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout (MaximusLabs view)',
      fields: [
        {name: 'label', type: 'string', initialValue: 'The MaximusLabs view'},
        {name: 'text', type: 'text', rows: 3},
      ],
      preview: {
        select: {title: 'label', subtitle: 'text'},
      },
    }),
    // Comparison / data table
    defineArrayMember({
      type: 'object',
      name: 'table',
      title: 'Table',
      fields: [
        {name: 'hasHeader', type: 'boolean', title: 'First row is a header', initialValue: true},
        {
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [
            {
              type: 'object',
              name: 'row',
              fields: [{name: 'cells', type: 'array', of: [{type: 'string'}]}],
              preview: {
                select: {cells: 'cells'},
                prepare: ({cells}) => ({title: (cells || []).join('  |  ') || 'Row'}),
              },
            },
          ],
        },
      ],
      preview: {prepare: () => ({title: 'Table'})},
    }),
  ],
})
