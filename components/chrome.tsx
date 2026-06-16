import Link from 'next/link'

/** Wrap the last word of a title in the sky accent (the report-cover look). */
function accentLast(text: string) {
  const parts = text.trim().split(' ')
  if (parts.length < 2) return <>{text}</>
  const last = parts.pop()
  return <>{parts.join(' ')} <span className="accent">{last}</span></>
}

/** Inline logo sprite. Rendered once in the root layout body. */
export function LogoSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <symbol id="ml-mark" viewBox="0 0 48 48">
        <path d="M37 23.9998H30.064C26.715 23.9998 24 26.7148 24 30.0638V47.4268C24 47.6458 24.26 47.7598 24.421 47.6108L37 35.9998V23.9998Z" fill="#449AFB" /><path d="M36.9995 24H30.0635C28.6275 24 27.3085 24.499 26.2695 25.333L36.9995 36V24Z" fill="#003087" /><path d="M11 24H17.936C21.285 24 24 21.285 24 17.936V0.574006C24 0.355006 23.74 0.241003 23.579 0.390004L11 12V24Z" fill="#449AFB" /><path d="M11 24H17.936C19.372 24 20.691 23.501 21.73 22.667L11 12V24Z" fill="#003087" /><path d="M23.9997 37V30.064C23.9997 26.715 21.2847 24 17.9357 24H0.572748C0.353748 24 0.239748 24.26 0.388748 24.421L11.9997 37H23.9997Z" fill="#449AFB" /><path d="M24 37V30.064C24 28.628 23.501 27.309 22.667 26.27L12 37H24Z" fill="#003087" /><path d="M24 11V17.936C24 21.285 26.715 24 30.064 24H47.426C47.645 24 47.759 23.74 47.61 23.579L36 11H24Z" fill="#449AFB" /><path d="M24 11V17.936C24 19.372 24.499 20.691 25.333 21.73L36 11H24Z" fill="#003087" />
      </symbol>
      <symbol id="ml-mark-w" viewBox="0 0 48 48">
        <path d="M37 23.9998H30.064C26.715 23.9998 24 26.7148 24 30.0638V47.4268C24 47.6458 24.26 47.7598 24.421 47.6108L37 35.9998V23.9998Z" fill="#ffffff" /><path d="M36.9995 24H30.0635C28.6275 24 27.3085 24.499 26.2695 25.333L36.9995 36V24Z" fill="#9fc3f5" /><path d="M11 24H17.936C21.285 24 24 21.285 24 17.936V0.574006C24 0.355006 23.74 0.241003 23.579 0.390004L11 12V24Z" fill="#ffffff" /><path d="M11 24H17.936C19.372 24 20.691 23.501 21.73 22.667L11 12V24Z" fill="#9fc3f5" /><path d="M23.9997 37V30.064C23.9997 26.715 21.2847 24 17.9357 24H0.572748C0.353748 24 0.239748 24.26 0.388748 24.421L11.9997 37H23.9997Z" fill="#ffffff" /><path d="M24 37V30.064C24 28.628 23.501 27.309 22.667 26.27L12 37H24Z" fill="#9fc3f5" /><path d="M24 11V17.936C24 21.285 26.715 24 30.064 24H47.426C47.645 24 47.759 23.74 47.61 23.579L36 11H24Z" fill="#ffffff" /><path d="M24 11V17.936C24 19.372 24.499 20.691 25.333 21.73L36 11H24Z" fill="#9fc3f5" />
      </symbol>
    </svg>
  )
}

export function SiteNav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" href="/ai-search-101">
          <svg viewBox="0 0 48 48"><use href="#ml-mark" /></svg>
          <span className="wordmark">Maximus<span>Labs</span></span>
        </Link>
        <nav className="nav-links">
          <a href="https://www.maximuslabs.ai/">Services</a>
          <a href="https://www.maximuslabs.ai/resources">Resources</a>
          <a href="https://www.maximuslabs.ai/industries">Industries</a>
          <a href="https://www.maximuslabs.ai/about">Company</a>
          <a href="https://www.maximuslabs.ai/pricing">Pricing</a>
          <a className="nav-cta" href="https://www.maximuslabs.ai/contact">Contact Us</a>
        </nav>
      </div>
    </header>
  )
}

const FOOTER_COLS: { h: string; links: string[] }[] = [
  { h: 'Services', links: ['Generative Engine Optimization', 'Answer Engine Optimization', 'Agentic Commerce', 'B2B SEO'] },
  { h: 'Answer Engine Optimization', links: ['What is AEO?', 'AEO vs SEO', 'Best AEO Agencies', 'Enterprise AEO Agencies'] },
  { h: 'Generative Engine Optimization', links: ['What is GEO?', 'GEO vs Traditional SEO', 'Best GEO Agencies', 'GEO Strategy Framework'] },
  { h: 'Tools', links: ['AI Content Humanizer', 'AI Content Optimizer', 'AI Crawlability Checker', 'LLM Text Generator'] },
  { h: 'Resources', links: ['Blogs', 'AI Search 101', 'ChatGPT SEO Guide', 'Perplexity SEO Guide'] },
  { h: 'Company', links: ['Contact Us', 'FAQ'] },
]

export function SiteFooter() {
  return (
    <footer className="mfooter">
      <div className="wrap">
        <div className="mf-top">
          <div>
            <Link className="brand" href="/ai-search-101">
              <svg viewBox="0 0 48 48" style={{ height: 26, width: 26 }}><use href="#ml-mark-w" /></svg>
              <span className="wordmark">Maximus<span>Labs</span></span>
            </Link>
            <p className="mf-intro">
              Maximus Labs helps you rank on Google, ChatGPT, and beyond. Reach out today to build
              your AI-first, SEO-strong growth engine.
            </p>
          </div>
          <div className="mf-actions">
            <a className="btn" href="https://www.maximuslabs.ai/contact">Contact Us &rarr;</a>
          </div>
        </div>
        <div className="mf-cols">
          {FOOTER_COLS.map((c) => (
            <div className="mf-col" key={c.h}>
              <h4>{c.h}</h4>
              {c.links.map((l) =>
                l === 'AI Search 101'
                  ? <Link key={l} href="/ai-search-101">{l}</Link>
                  : <a key={l} href="https://www.maximuslabs.ai/">{l}</a>,
              )}
            </div>
          ))}
        </div>
        <div className="mf-bar">
          <span>Copyright &copy; 2026 Maximus Labs. All rights reserved.</span>
          <span><a href="https://www.maximuslabs.ai/privacy">Privacy Policy</a> &nbsp; <a href="https://www.maximuslabs.ai/terms">Terms of Service</a></span>
        </div>
      </div>
    </footer>
  )
}

export type Crumb = { label: string; href?: string }
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className="crumbs">
      {trail.map((c, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 && <span className="sep">/</span>}
          {c.href ? <Link href={c.href}>{c.label}</Link> : <span className="here">{c.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export type UrlPart = { seg: string; n: 1 | 2 | 3 | 4; label: string; current?: boolean }
export function UrlBar({ parts, style }: { parts: UrlPart[]; style?: React.CSSProperties }) {
  return (
    <div className="urlbar" style={style}>
      <span className="u-host">maximuslabs.ai</span>
      {parts.map((p, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className="u-sep">/</span>
          <span className={`u-seg${p.current ? ' u-cur' : ''}`}>
            <span className="u-path" style={p.current ? undefined : { color: 'var(--muted)' }}>{p.seg}</span>
            <span className={`u-lvl lvl${p.n}`}>{p.label}</span>
          </span>
        </span>
      ))}
    </div>
  )
}

/** A report-style collection card (navy cover + white body). */
export function ReportCard({
  href, title, count, tag, description, meta,
}: {
  href: string; title: string; count: string; tag?: string; description?: string; meta?: string
}) {
  return (
    <Link className="rcard" href={href}>
      <div className="cover">
        <span className="dotgrid" /><span className="orb" /><span className="dot" />
        <h3>{accentLast(title)}</h3>
        <span className="count">{count}</span>
      </div>
      <div className="body">
        {tag && <span className="ctag">{tag}</span>}
        {description && <p>{description}</p>}
        <div className="foot">
          <span className="fmeta">{meta}</span>
          <span className="go">&rarr;</span>
        </div>
      </div>
    </Link>
  )
}

export function FilterPills({ items }: { items: { label: string; href: string; active?: boolean }[] }) {
  return (
    <div className="pills">
      {items.map((it, i) => (
        <Link key={i} className={`pill-link${it.active ? ' active' : ''}`} href={it.href}>{it.label}</Link>
      ))}
    </div>
  )
}

export function Featured({
  coverTag, coverTitle, coverMeta, tag, title, description, href, cta,
}: {
  coverTag: string; coverTitle: string; coverMeta: string
  tag: string; title: string; description: string; href: string; cta: string
}) {
  return (
    <div className="featured">
      <div className="f-cover">
        <span className="dotgrid" /><span className="orb" /><span className="dot" />
        <span className="tag-d">{coverTag}</span>
        <h2>{accentLast(coverTitle)}</h2>
        <span className="meta">{coverMeta}</span>
      </div>
      <div className="f-body">
        <span className="tag2">{tag}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link className="btn" href={href}>{cta} &rarr;</Link>
      </div>
    </div>
  )
}

export function NewsletterBand() {
  return (
    <section className="newsletter">
      <span className="dotgrid" />
      <div className="wrap">
        <h2>New guides, straight to your inbox</h2>
        <p>We publish new AI Search 101 guides regularly. Subscribe and get the next one before anyone else.</p>
        <a className="btn" href="https://www.maximuslabs.ai/contact">Subscribe to Updates</a>
      </div>
    </section>
  )
}
