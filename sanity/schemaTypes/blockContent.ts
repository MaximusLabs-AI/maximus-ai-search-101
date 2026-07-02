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
    // Inline content image with alt text + caption
    defineArrayMember({
      type: 'image',
      name: 'image',
      title: 'Image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt text'},
        {name: 'caption', type: 'string', title: 'Caption'},
      ],
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
    // Inline SVG diagram/infographic (authored graphic) with alt + caption
    defineArrayMember({
      type: 'object',
      name: 'svgFigure',
      title: 'Diagram (SVG)',
      fields: [
        {name: 'svg', type: 'text', title: 'SVG markup', rows: 6},
        {name: 'alt', type: 'string', title: 'Alt text'},
        {name: 'caption', type: 'string', title: 'Caption'},
      ],
      preview: {select: {title: 'alt', subtitle: 'caption'}, prepare: ({title, subtitle}) => ({title: title || 'Diagram', subtitle})},
    }),
    // Comparison / data table
    defineArrayMember({
      type: 'object',
      name: 'table',
      title: 'Table',
      fields: [
        {name: 'caption', type: 'string', title: 'Table heading / title', description: 'Shown as the navy banner across the top of the table.'},
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
