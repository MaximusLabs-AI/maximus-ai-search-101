import Link from 'next/link'
import { SearchBar } from './SearchBar'
import { CalBookButton } from './CalBooking'

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
const ASL = '/' // internal hub link; Next basePath turns '/' into '/ai-search-101'
const ASSET = '/ai-search-101' // public-asset prefix (plain <img src> bypasses basePath)

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
  { h: 'Expertise', links: [
    ['Generative Engine Optimisation', `${SITE}/services/geo`],
    ['Answer Engine Optimisation', `${SITE}/services/aeo`],
    ['Agentic Commerce', `${SITE}/services/agentic-commerce`],
    ['B2B SEO', `${SITE}/services/b2b-seo`],
  ] },
  { h: 'Platforms', links: [
    ['ChatGPT', `${SITE}/services/platforms/chatgpt`],
    ['Gemini', `${SITE}/services/platforms/google-ai-gemini`],
    ['Perplexity', `${SITE}/services/platforms/perplexity`],
    ['Google AI Mode', `${SITE}/services/platforms/best-google-ai-optimization-agency---built-for-revenue-not-vanity-metrics-2026`],
    ['Claude', `${SITE}/services/platforms/anthropic-claude`],
  ] },
]
const RESOURCES: { h: string; links: [string, string][] }[] = [
  { h: 'Learn', links: [
    ['AI Search 101', ASL],
    ['Blogs', `${SITE}/blog`],
    ['Industry Reports', `${SITE}/resources/reports`],
  ] },
  { h: 'Tools', links: [
    ['AI Content Humanizer', `${SITE}/tools/ai-content-humanizer`],
    ['AI Content Optimizer', `${SITE}/tools/ai-content-optimizer`],
    ['AI Crawlability Checker', `${SITE}/tools/ai-crawlability-checker`],
    ['LLM Text Generator', `${SITE}/tools/llms-txt-generator`],
  ] },
]
const INDUSTRIES: [string, string][] = [
  ['AI | SaaS', `${SITE}/services/industries/ai-saas`],
  ['Fintech', `${SITE}/services/industries/financial`],
  ['Ecommerce', `${SITE}/services/industries/ecommerce`],
]
const COMPANY: [string, string][] = [
  ['About Us', `${SITE}/company/about-us`],
  ['Case Studies', `${SITE}/company/case-studies/case-studies-collection`],
  ['Career', `${SITE}/company/careers`],
]

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
        <div className="nav-left">
          <a className="brand" href={`${SITE}/`} aria-label="Maximus Labs">
            <svg className="brand-icon" viewBox="0 0 48 48"><use href="#ml-mark" /></svg>
          </a>
          <nav className="nav-links">
            <MegaItem label="Services" cols={SERVICES} />
            <MegaItem label="Resources" cols={RESOURCES} />
            <SimpleItem label="Industries" links={INDUSTRIES} />
            <SimpleItem label="Company" links={COMPANY} />
          </nav>
        </div>
        <div className="nav-right">
          <a className="nav-plain" href={`${SITE}/pricing`}>Pricing</a>
          <a className="nav-cta" href={`${SITE}/contact-us`}>Contact Us</a>
        </div>
      </div>
    </header>
  )
}

const AEO = `${SITE}/answer-engine-optimizations`
const GEO = `${SITE}/generative-engine-optimization`
const PLAT = `${SITE}/services/platforms`
const TOOL = `${SITE}/tools`

const FOOTER_COLS: { h: string; links: [string, string][] }[] = [
  { h: 'Services', links: [
    ['Generative Engine Optimization', `${SITE}/services/geo`],
    ['Answer Engine Optimization', `${SITE}/services/aeo`],
    ['Agentic Commerce', `${SITE}/services/agentic-commerce`],
    ['B2B SEO', `${SITE}/services/b2b-seo`],
  ] },
  { h: 'Answer Engine Optimization', links: [
    ['What is AEO?', `${AEO}/aeo`],
    ['AEO vs SEO', `${AEO}/aeo-vs-seo`],
    ['Best AEO Agencies', `${AEO}/best-aeo-agencies`],
    ['Enterprise AEO Agencies', `${AEO}/enterprise-aeo-agencies`],
    ['Ecommerce AEO Agencies', `${AEO}/ecommerce-aeo-geo-agencies`],
    ['Best AEO Tools', `${AEO}/aeo-tools-comparison`],
    ['AEO Implementation Checklist', `${AEO}/aeo-implementation-checklist-50-best-practices-ai-search`],
    ['AI Search Tracking Tools', `${AEO}/ai-search-visibility-brand-mentions-tracking-tools`],
    ['Profound Alternatives', `${SITE}/#`],
    ['Peec AI Alternatives', `${AEO}/top-peec-ai-alternatives-competitors`],
  ] },
  { h: 'Generative Engine Optimization', links: [
    ['What is GEO?', `${SITE}/blog/what-is-generative-engine-optimization-geo`],
    ['GEO vs Traditional SEO', `${GEO}/geo-vs-traditional-seo-comparison`],
    ['Best GEO Agencies', `${GEO}/best-geo-agency-services`],
    ['GEO Strategy Framework', `${GEO}/geo-strategy-framework`],
    ['GEO Case Studies', `${GEO}/geo-case-studies-success-stories`],
    ['GEO Market Analysis 2026', `${GEO}/geo-market-analysis`],
    ['Top GEO Tools', `${GEO}/top-geo-tools-platforms`],
    ['Technical GEO Implementation', `${GEO}/technical-geo-implementation`],
  ] },
  { h: 'Tools', links: [
    ['AI Content Humanizer', `${TOOL}/ai-content-humanizer`],
    ['AI Content Optimizer', `${TOOL}/ai-content-optimizer`],
    ['AI Crawlability Checker', `${TOOL}/ai-crawlability-checker`],
    ['LLM Text Generator', `${TOOL}/llms-txt-generator`],
    ['Reddit Thread Transfer', `${TOOL}/reddit-threads-finder`],
  ] },
  { h: 'Resources', links: [
    ['Blogs', `${SITE}/blog`],
    ['AI Search 101', ASL],
    ['Google Algorithm Updates', `${PLAT}/best-google-ai-optimization-agency---built-for-revenue-not-vanity-metrics-2026`],
    ['ChatGPT SEO Guide', `${PLAT}/chatgpt`],
    ['Perplexity SEO Guide', `${PLAT}/perplexity`],
    ['Gemini Guide', `${PLAT}/google-ai-gemini`],
    ['Claude Guide', `${PLAT}/anthropic-claude`],
  ] },
  { h: 'Company', links: [
    ['Contact Us', `${SITE}/contact-us`],
    ['FAQ', `${SITE}/company/careers`],
  ] },
]
const FOOTER_INDUSTRIES: [string, string][] = [
  ['SaaS | AI', `${SITE}/services/industries/ai-saas`],
  ['Ecommerce', `${SITE}/services/industries/ecommerce`],
  ['Fintech', `${SITE}/services/industries/financial`],
]

export function SiteFooter() {
  return (
    <footer className="mfooter">
      <div className="wrap">
        <div className="mf-top">
          <div className="mf-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a className="brand" href={`${SITE}/`}><img className="brand-logo" src={`${ASSET}/brand/maximus-wordmark.svg`} alt="Maximus Labs" width={210} height={38} /></a>
            <p className="mf-intro">
              Maximus Labs helps you rank on Google, ChatGPT, and beyond. Reach out today to build
              your AI-first, SEO-strong growth engine.
            </p>
          </div>
          <div className="mf-actions">
            <a className="nav-cta" href={`${SITE}/contact-us`}>Contact Us &rarr;</a>
            <a className="mf-li" href="https://www.linkedin.com/company/maximus-labs-ai/" aria-label="LinkedIn"><LinkedInIcon /></a>
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
          <span><a href={`${SITE}/others/privacy-policy`}>Privacy Policy</a> &nbsp;&nbsp; <a href={`${SITE}/others/terms-of-service`}>Terms of Service</a></span>
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

export function CardGrid({ children, row = false }: { children: React.ReactNode; row?: boolean }) {
  return <div className={row ? 'cardrow' : 'cardgrid'}>{children}</div>
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

/** Image-top category card: icon cover + title + description + Explore (uniform). */
export function CategoryCard({
  slug, title, description, exploreHref, exploreLabel,
}: {
  slug: string
  title: string
  description?: string
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
        {description && <p className="ct-desc">{description}</p>}
        <Link className="explore" href={exploreHref}>{exploreLabel} <span className="arr">&rarr;</span></Link>
      </div>
    </article>
  )
}

/** Sticky author-perspective rail shown on the right of article pages. */
const AUTHOR_BIO = "I'm KK. Over the years, I've experimented and built systems that drive growth through AEO and GEO. Today, I help brands turn AI search into revenue engines, not vanity metrics, delivering AI visibility and getting brands cited and chosen across ChatGPT, Perplexity, and Google, where real buying decisions happen. Let's talk."
export function AuthorRail({ author }: { author?: { name?: string; designation?: string; avatarUrl?: string; bio?: string } }) {
  const name = author?.name || 'Krishna Kaanth'
  const role = author?.designation || 'Founder, MaximusLabs'
  const bio = author?.bio || AUTHOR_BIO
  const photo = author?.avatarUrl || `${ASSET}/team/krishna-kaanth.png`
  const isDefault = !author?.name
  return (
    <aside className="author-rail">
      <div className="author-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="au-photo" src={photo} alt={name} width={96} height={96} />
        <div className="au-name">
          <span>{name}</span>
          {isDefault && (
            <a className="au-li" href="https://www.linkedin.com/in/krishna-kaanth-kk/" aria-label="Krishna Kaanth on LinkedIn" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
          )}
        </div>
        <span className="au-role">{role}</span>
        <p className="au-bio">{bio}</p>
        <CalBookButton className="au-cta">Book a 15 min Chat &rarr;</CalBookButton>
      </div>
    </aside>
  )
}

/** Mobile/tablet counterpart of the author rail (the rail hides below 1180px).
 *  Same 15-min booking popup so the author-perspective CTA is on EVERY article. */
export function AuthorPerspectiveInline({ author }: { author?: { name?: string; designation?: string; avatarUrl?: string; bio?: string } }) {
  const name = author?.name || 'Krishna Kaanth'
  const role = author?.designation || 'Founder, MaximusLabs'
  const photo = author?.avatarUrl || `${ASSET}/team/krishna-kaanth.png`
  return (
    <section className="author-inline-sec">
      <div className="wrap">
        <div className="author-inline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ai-photo" src={photo} alt={name} width={56} height={56} />
          <div className="ai-meta">
            <span className="ai-lab">Author perspective</span>
            <strong>{name}</strong>
            <span className="ai-role">{role}</span>
          </div>
          <CalBookButton className="au-cta">Book a 15 min Chat &rarr;</CalBookButton>
        </div>
      </div>
    </section>
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
  href = `${SITE}/contact-us`,
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
