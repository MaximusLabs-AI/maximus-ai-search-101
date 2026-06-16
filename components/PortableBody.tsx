import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/client'

/** Slugify heading text so the article TOC anchors line up with the H2 ids. */
export function slugifyHeading(value: { children?: { text?: string }[] }): string {
  const text = (value?.children ?? []).map((c) => c?.text ?? '').join('')
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/** Extract H2 headings (text + anchor id) from a Portable Text body for the TOC. */
export function headingsFromBody(
  body?: PortableTextBlock[],
): { id: string; text: string }[] {
  if (!body) return []
  return body
    .filter((b) => (b as { _type?: string; style?: string })._type === 'block' && (b as { style?: string }).style === 'h2')
    .map((b) => {
      const value = b as unknown as { children?: { text?: string }[] }
      const text = (value.children ?? []).map((c) => c?.text ?? '').join('')
      return { id: slugifyHeading(value), text }
    })
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={slugifyHeading(value as unknown as { children?: { text?: string }[] })}>{children}</h2>
    ),
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?._ref) return null
      const url = urlFor(value as Parameters<typeof urlFor>[0]).width(1600).fit('max').auto('format').url()
      return (
        <figure className="post-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value.alt || ''} loading="lazy" />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      )
    },
    callout: ({ value }: { value: { label?: string; text?: string } }) => (
      <div className="callout">
        <svg className="ml-mark" viewBox="0 0 48 48"><use href="#ml-mark" /></svg>
        <div className="co-body">
          <span className="lab">{value.label || 'The MaximusLabs view'}</span>
          <p>{value.text}</p>
        </div>
      </div>
    ),
    table: ({ value }: { value: { rows?: { cells?: string[] }[]; hasHeader?: boolean } }) => {
      const rows = value.rows || []
      if (!rows.length) return null
      const useHeader = value.hasHeader !== false
      const header = useHeader ? rows[0] : null
      const bodyRows = useHeader ? rows.slice(1) : rows
      return (
        <table>
          {header && (
            <thead><tr>{(header.cells || []).map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
          )}
          <tbody>
            {bodyRows.map((r, ri) => (
              <tr key={ri}>{(r.cells || []).map((c, ci) => <td key={ci}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => (
      <a href={value?.href} rel="noopener noreferrer">{children}</a>
    ),
  },
}

export function PortableBody({ value }: { value?: PortableTextBlock[] }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
