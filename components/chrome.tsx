import Link from 'next/link'
import { SearchBar } from './SearchBar'

export { SearchBar }

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

// ---- Maximus Labs site shell (matches the live nav + footer) ----
const SITE = 'https://www.maximuslabs.ai'
const PH = SITE // placeholder for real links the user will provide later
const ASL = '/ai-search-101'

/** Maximus pinwheel logo (approximation; swap exact asset when provided). */
function Pinwheel({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 24 L24 4 L41 12 Z" fill="#0070e0" />
      <path d="M24 24 L44 24 L36 41 Z" fill="#001c64" />
      <path d="M24 24 L24 44 L7 36 Z" fill="#449afb" />
      <path d="M24 24 L4 24 L12 7 Z" fill="#003087" />
    </svg>
  )
}
function Caret() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 002.5 6 2.5 2.5 0 004.98 8.5 2.5 2.5 0 007.5 6 2.5 2.5 0 004.98 3.5zM3 9h4v12H3zM10 9h3.8v1.7h.06c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.38 2.35 4.38 5.4V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z" />
    </svg>
  )
}
function NavLink({ label, href }: { label: string; href: string }) {
  return href.startsWith('/') ? <Link href={href}>{label}</Link> : <a href={href}>{label}</a>
}

const SERVICES: { h: string; links: [string, string][] }[] = [
  { h: 'Expertise', links: [['Generative Engine Optimisation', PH], ['Answer Engine Optimisation', PH], ['Agentic Commerce', PH], ['B2B SEO', PH]] },
  { h: 'Platforms', links: [['ChatGPT', PH], ['Gemini', PH], ['Perplexity', PH], ['Google AI Mode', PH], ['Claude', PH]] },
]
const RESOURCES: { h: string; links: [string, string][] }[] = [
  { h: 'Learn', links: [['AI Search 101', ASL], ['Blogs', PH], ['Industry Reports', PH]] },
  { h: 'Tools', links: [['AI Content Humanizer', PH], ['AI Content Optimizer', PH], ['AI Crawlability Checker', PH], ['LLM Text Generator', PH]] },
]
const INDUSTRIES: [string, string][] = [['AI | SaaS', PH], ['Fintech', PH], ['Ecommerce', PH]]
const COMPANY: [string, string][] = [['About Us', PH], ['Case Studies', PH], ['Career', PH]]

function MegaItem({ label, cols }: { label: string; cols: { h: string; links: [string, string][] }[] }) {
  return (
    <div className="nav-item">
      <span className="nav-trig">{label} <Caret /></span>
      <div className="nav-pop">
        <div className="np-inner">
          {cols.map((c) => (
            <div className="np-col" key={c.h}>
              <h4>{c.h}</h4>
              {c.links.map(([l, h]) => <NavLink key={l} label={l} href={h} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function SimpleItem({ label, links }: { label: string; links: [string, string][] }) {
  return (
    <div className="nav-item">
      <span className="nav-trig">{label} <Caret /></span>
      <div className="nav-pop">
        <div className="np-inner">
          <div className="np-col">{links.map(([l, h]) => <NavLink key={l} label={l} href={h} />)}</div>
        </div>
      </div>
    </div>
  )
}

export function SiteNav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href={`${SITE}/`}>
          <Pinwheel />
          <span className="wordmark">Maximus Labs</span>
        </a>
        <nav className="nav-links">
          <MegaItem label="Services" cols={SERVICES} />
          <MegaItem label="Resources" cols={RESOURCES} />
          <SimpleItem label="Industries" links={INDUSTRIES} />
          <SimpleItem label="Company" links={COMPANY} />
          <a className="nav-plain" href={`${SITE}/pricing`}>Pricing</a>
          <a className="nav-cta" href={`${SITE}/contact`}>Contact Us</a>
        </nav>
      </div>
    </header>
  )
}

const FOOTER_COLS: { h: string; links: [string, string][] }[] = [
  { h: 'Services', links: [['Generative Engine Optimization', PH], ['Answer Engine Optimization', PH], ['Agentic Commerce', PH], ['B2B SEO', PH]] },
  { h: 'Answer Engine Optimization', links: [['What is AEO?', PH], ['AEO vs SEO', PH], ['Best AEO Agencies', PH], ['Enterprise AEO Agencies', PH], ['Ecommerce AEO Agencies', PH], ['Best AEO Tools', PH], ['AEO Implementation Checklist', PH], ['AI Search Tracking Tools', PH], ['Profound Alternatives', PH]] },
  { h: 'Generative Engine Optimization', links: [['What is GEO?', PH], ['GEO vs Traditional SEO', PH], ['Best GEO Agencies', PH], ['GEO Strategy Framework', PH], ['GEO Case Studies', PH], ['GEO Market Analysis 2026', PH], ['Top GEO Tools', PH], ['Technical GEO Implementation', PH], ['Peec AI Alternatives', PH]] },
  { h: 'Tools', links: [['AI Content Humanizer', PH], ['AI Content Optimizer', PH], ['AI Crawlability Checker', PH], ['LLM Text Generator', PH], ['Reddit Thread Transfer', PH]] },
  { h: 'Resources', links: [['Blogs', PH], ['AI Search 101', ASL], ['Google Algorithm Updates', PH], ['ChatGPT SEO Guide', PH], ['Perplexity SEO Guide', PH], ['Gemini Guide', PH], ['Claude Guide', PH]] },
  { h: 'Company', links: [['Contact Us', `${SITE}/contact`], ['FAQ', PH]] },
]
const FOOTER_INDUSTRIES: [string, string][] = [['SaaS | AI', PH], ['Ecommerce', PH], ['Fintech', PH]]

export function SiteFooter() {
  return (
    <footer className="mfooter">
      <div className="wrap">
        <div className="mf-top">
          <div className="mf-brand">
            <a className="brand" href={`${SITE}/`}><Pinwheel size={34} /><span className="wordmark">Maximus Labs</span></a>
            <p className="mf-intro">
              Maximus Labs helps you rank on Google, ChatGPT, and beyond. Reach out today to build
              your AI-first, SEO-strong growth engine.
            </p>
          </div>
          <div className="mf-actions">
            <a className="nav-cta" href={`${SITE}/contact`}>Contact Us &rarr;</a>
            <a className="mf-li" href="https://www.linkedin.com/company/maximuslabs" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
        </div>
        <div className="mf-cols">
          {FOOTER_COLS.map((c) => (
            <div className="mf-col" key={c.h}>
              <h4>{c.h}</h4>
              {c.links.map(([l, h]) => <NavLink key={l} label={l} href={h} />)}
              {c.h === 'Services' && (
                <>
                  <h4 className="sub-h">Industries</h4>
                  {FOOTER_INDUSTRIES.map(([l, h]) => <NavLink key={l} label={l} href={h} />)}
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mf-bar">
          <span>Copyright &copy; 2025 Maximus Labs. All rights reserved.</span>
          <span><a href={`${SITE}/privacy`}>Privacy Policy</a> &nbsp;&nbsp; <a href={`${SITE}/terms`}>Terms of Service</a></span>
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
