import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/client'

/** Slugify a plain string for heading anchor ids. */
export function slugifyText(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/** Slugify heading text so the article TOC anchors line up with the H2 ids. */
export function slugifyHeading(value: { children?: { text?: string }[] }): string {
  return slugifyText((value?.children ?? []).map((c) => c?.text ?? '').join(''))
}

/**
 * Maxint headings can carry a "[toc=Short Label]" marker, e.g.
 *   <h2>Q1. What is AI search? [toc=1. AI Search Defined]</h2>
 * The label after `toc=` is what the sidebar TOC should show; the whole marker
 * must be stripped from the heading shown in the body.
 */
const TOC_MARKER = /\[toc=([^\]]*)\]/i
/** Plain text of a heading's inner HTML, with the [toc=...] marker removed. */
function cleanHeadingText(innerHtml: string): string {
  return innerHtml.replace(/<[^>]+>/g, '').replace(/\s*\[toc=[^\]]*\]\s*/i, ' ').replace(/\s+/g, ' ').trim()
}

/** Extract H2s (TOC label + anchor id) from an HTML body for the TOC (synced blogs).
 *  Prefers the [toc=Label] marker; falls back to the cleaned heading text. */
export function headingsFromHtml(html?: string): { id: string; text: string }[] {
  if (!html) return []
  const out: { id: string; text: string }[] = []
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    const display = cleanHeadingText(m[1])
    const marker = m[1].replace(/<[^>]+>/g, '').match(TOC_MARKER)
    const label = marker && marker[1].trim() ? marker[1].trim() : display
    if (label) out.push({ id: slugifyText(display), text: label })
  }
  return out
}

/** Give each H2 a stable id (from the cleaned heading) for TOC anchors, and strip
 *  every [toc=...] marker so it never shows in the rendered body. */
export function ensureH2Ids(html: string): string {
  return (html || '')
    .replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (full, attrs, inner) =>
      /\bid=/.test(attrs) ? full : `<h2${attrs} id="${slugifyText(cleanHeadingText(inner))}">${inner}</h2>`)
    .replace(/\s*\[toc=[^\]]*\]\s*/gi, ' ')
}

/** Maxint sometimes double-encodes a list (the TL;DR arrives as
 *  "<li>&lt;li&gt;text&lt;/li&gt;</li>"). Strip the escaped list tags that would
 *  otherwise render as literal "<li>" text, leaving the real bullets clean. */
export function cleanSyncedHtml(html?: string): string {
  return (html || '').replace(/&lt;\/?(?:li|ul|ol)\s*&gt;/gi, '')
}

/** Strip inline style="" attributes from synced HTML so the global hub.css is the
 *  single source of truth for styling (Sanity stores structure/content only, and
 *  any table/color/heading change made in hub.css applies to every article). */
export function stripInlineStyles(html?: string): string {
  return (html || '').replace(/\sstyle="[^"]*"/gi, '')
}

/**
 * Turn a "[maxview]...[/maxview]" marker in synced HTML into the MaximusLabs-view
 * callout (the same styled insight block the Portable Text articles use). Authors
 * drop the marker into their Maxint content wherever an opinionated MaximusLabs
 * take belongs; because it lives in Maxint it survives every re-sync. Any wrapping
 * <p> around the marker is absorbed so we never nest a <div> inside a <p>.
 */
export function renderMaximusViews(html?: string): string {
  return (html || '').replace(
    /(?:<p>)?\s*\[maxview\]([\s\S]*?)\[\/maxview\]\s*(?:<\/p>)?/gi,
    (_m, text) =>
      `<div class="callout"><svg class="ml-mark" viewBox="0 0 48 48"><use href="#ml-mark"></use></svg>` +
      `<div class="co-body"><span class="lab">The MaximusLabs view</span><p>${String(text).trim()}</p></div></div>`,
  )
}

/** Extract H2 headings (text + anchor id) from a Portable Text body for the TOC. */
export function headingsFromBody(
  body?: PortableTextBlock[],
  toc?: string[],
): { id: string; text: string }[] {
  if (!body) return []
  return body
    .filter((b) => (b as { _type?: string; style?: string })._type === 'block' && (b as { style?: string }).style === 'h2')
    .map((b, i) => {
      const value = b as unknown as { children?: { text?: string }[] }
      const text = (value.children ?? []).map((c) => c?.text ?? '').join('')
      // Sidebar shows the short keyword (toc[i]) when provided; the anchor id stays from the heading text.
      return { id: slugifyHeading(value), text: (toc && toc[i]) || text }
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
    svgFigure: ({ value }: { value: { svg?: string; alt?: string; caption?: string } }) => {
      if (!value?.svg) return null
      return (
        <figure className="post-figure">
          <div className="svg-embed" role="img" aria-label={value.alt || ''} dangerouslySetInnerHTML={{ __html: value.svg }} />
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
    table: ({ value }: { value: { caption?: string; rows?: { cells?: string[] }[]; hasHeader?: boolean } }) => {
      const rows = value.rows || []
      if (!rows.length) return null
      const useHeader = value.hasHeader !== false
      const header = useHeader ? rows[0] : null
      const bodyRows = useHeader ? rows.slice(1) : rows
      return (
        <div className="article-table-wrapper">
          <table>
            {value.caption ? <caption>{value.caption}</caption> : null}
            {header && (
              <thead><tr>{(header.cells || []).map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
            )}
            <tbody>
              {bodyRows.map((r, ri) => (
                <tr key={ri}>{(r.cells || []).map((c, ci) => <td key={ci}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
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
