import Link from 'next/link'

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

function MagnifierIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
          <Link href="/ai-search-101" className="is-active">AI Search 101</Link>
          <a className="btn-outline" href="https://www.maximuslabs.ai/contact">Contact Us</a>
          <a className="nav-cta" href="https://www.maximuslabs.ai/contact">Get Started</a>
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

/** Search box. A GET form to /ai-search-101/search?q=... (no client JS needed). */
export function SearchBar({ defaultValue }: { defaultValue?: string }) {
  return (
    <form className="searchbar" action="/ai-search-101/search">
      <MagnifierIcon />
      <input type="search" name="q" defaultValue={defaultValue} placeholder="Search a topic..." aria-label="Search AI Search 101" />
    </form>
  )
}

export function HubHero({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="hubhero">
      <div className="wrap">
        <h1>{title}</h1>
        <p className="sub">{sub}</p>
        <SearchBar />
      </div>
    </section>
  )
}

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="sec-head">
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  )
}

export function HeroDark({ children }: { children: React.ReactNode }) {
  return (
    <section className="herodark">
      <span className="dotgrid" />
      <svg className="mark" viewBox="0 0 48 48"><use href="#ml-mark-w" /></svg>
      <div className="wrap">{children}</div>
    </section>
  )
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="cardgrid">{children}</div>
}

/** Per-pillar outline icon for the category-card cover. */
function IconFor({ slug }: { slug: string }) {
  const a = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const map: Record<string, React.ReactNode> = {
    geo: <><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9z" /><path d="M18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17z" /></>,
    aeo: <><path d="M4 5h16v10H9l-4 4z" /><circle cx="9" cy="10" r="1" /><circle cx="12.5" cy="10" r="1" /><circle cx="16" cy="10" r="1" /></>,
    seo: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-3.5-3.5" /></>,
    'agentic-seo': <><rect x="5" y="8" width="14" height="11" rx="2" /><path d="M12 8V4" /><circle cx="12" cy="3.2" r="1" /><path d="M9.5 13h.01M14.5 13h.01" /></>,
    'agentic-commerce': <><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.2 11h10l2-7H6" /></>,
    platforms: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>,
    technical: <><path d="M9 8l-4 4 4 4" /><path d="M15 8l4 4-4 4" /></>,
    strategies: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
    future: <><circle cx="12" cy="12" r="8" /><path d="M15 9l-2.2 5.2L8 16l2.2-5.2z" /></>,
    glossary: <><path d="M5 5a2 2 0 012-2h11v16H7a2 2 0 00-2 2z" /><path d="M5 5v14" /></>,
  }
  return <span className="ic"><svg viewBox="0 0 24 24" {...a}>{map[slug] || map.seo}</svg></span>
}

/** Image-top category card: icon cover + title + sub-links (deep to articles) + Explore. */
export function CategoryCard({
  slug, title, sublinks, exploreHref, exploreLabel,
}: {
  slug: string
  title: string
  sublinks: { title: string; href: string }[]
  exploreHref: string
  exploreLabel: string
}) {
  return (
    <article className="catcard">
      <div className="cover">
        <span className="dotgrid" />
        <svg className="mark" viewBox="0 0 48 48"><use href="#ml-mark-w" /></svg>
        <IconFor slug={slug} />
      </div>
      <div className="body">
        <h3>{title}</h3>
        <div className="ct-sub">
          {sublinks.map((s) => <Link key={s.href} href={s.href}>{s.title}</Link>)}
        </div>
        <Link className="explore" href={exploreHref}>{exploreLabel} <span className="arr">&rarr;</span></Link>
      </div>
    </article>
  )
}

/** Big representative card at the top of a pillar/cluster: title + summary +
 *  up to 5 article direct-links. */
export function FeatureCard({
  slug, title, summary, links,
}: {
  slug: string
  title: string
  summary?: string
  links: { title: string; href: string }[]
}) {
  return (
    <article className="featurecard">
      <div className="fc-head">
        <span className="dotgrid" />
        <svg className="mark" viewBox="0 0 48 48"><use href="#ml-mark-w" /></svg>
        <IconFor slug={slug} />
        <h2>{title}</h2>
        {summary && <p>{summary}</p>}
      </div>
      <div className="fc-links">
        <span className="fl-lab">Start with these</span>
        {links.map((l, i) => (
          <Link key={l.href} href={l.href}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            {l.title}
            <span className="arr">&rarr;</span>
          </Link>
        ))}
      </div>
    </article>
  )
}

/** Bordered, whole-card-clickable article card with a clamped excerpt. */
export function ArticleCard({
  href, label, title, excerpt,
}: {
  href: string; label?: string; title: string; excerpt?: string
}) {
  return (
    <div className="acard">
      <Link className="ov" href={href} aria-label={title} />
      {label && (
        <span className="label"><svg viewBox="0 0 48 48"><use href="#ml-mark" /></svg>{label}</span>
      )}
      <h3>{title}</h3>
      {excerpt && <p className="ex">{excerpt}</p>}
      <span className="more">Read More <span className="arr">&rarr;</span></span>
    </div>
  )
}

export function CtaBanner({
  title = 'Ready to turn AI search into a revenue engine?',
  text = 'See how MaximusLabs gets your brand cited and chosen across ChatGPT, Perplexity, Gemini, and Google AI. Book a call for a tailored plan.',
  ctaLabel = 'Book a call',
  href = 'https://www.maximuslabs.ai/contact',
}: {
  title?: string; text?: string; ctaLabel?: string; href?: string
}) {
  return (
    <section className="wrap">
      <div className="ctabanner">
        <h2>{title}</h2>
        <p>{text}</p>
        <a className="btn" href={href}>{ctaLabel} &rarr;</a>
      </div>
    </section>
  )
}
