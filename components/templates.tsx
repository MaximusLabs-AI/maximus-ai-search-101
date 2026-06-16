import {
  SiteNav, SiteFooter, Breadcrumbs, HubHero, SectionHeader, HeroDark,
  CardGrid, CategoryCard, ArticleCard, CtaBanner, SearchBar,
} from '@/components/chrome'
import { PortableBody, headingsFromBody } from '@/components/PortableBody'
import {
  type HubData, type PillarData, type ClusterData, type ArticleData, type SearchResult,
  base, pillarPath, clusterPath, articlePath,
} from '@/components/types'

const PUBLIC = 'https://www.maximuslabs.ai'

const HUB_SECTIONS: { cat: string; sub: string }[] = [
  { cat: 'Core Disciplines', sub: 'Start with a core discipline. Each is a hub of clusters and guides.' },
  { cat: 'Explore by area', sub: 'Go deeper by platform, technical area, strategy, and what comes next.' },
]

/* ============================ L1 — HUB ============================ */
export function Hub({ data }: { data: HubData }) {
  return (
    <>
      <SiteNav />
      <HubHero
        title="AI Search 101"
        sub="Explore the essentials of AI search and learn how to get cited, get found, and turn ChatGPT, Perplexity, Gemini, and Google AI into a revenue engine."
      />

      {HUB_SECTIONS.map(({ cat, sub }) => {
        const ps = data.pillars.filter((p) => (p.category || 'Core Disciplines') === cat)
        if (!ps.length) return null
        return (
          <section className="section" key={cat}>
            <div className="wrap">
              <SectionHeader title={cat} sub={sub} />
              <CardGrid>
                {ps.map((p) => {
                  const arts = (p.topArticles || []).map((a) => ({ title: a.title, href: articlePath(p.slug, a.cluster, a.slug) }))
                  const clus = (p.topClusters || []).map((c) => ({ title: c.title, href: clusterPath(p.slug, c.slug) }))
                  return (
                    <CategoryCard
                      key={p.slug}
                      slug={p.slug}
                      title={p.shortLabel || p.title}
                      sublinks={[...arts, ...clus].slice(0, 4)}
                      exploreHref={pillarPath(p.slug)}
                      exploreLabel={`Explore ${p.shortLabel || p.title}`}
                    />
                  )
                })}
              </CardGrid>
            </div>
          </section>
        )
      })}

      {data.latest?.length ? (
        <section className="section">
          <div className="wrap">
            <SectionHeader title="Newest guides" sub="Fresh from the MaximusLabs research desk." />
            <CardGrid>
              {data.latest.map((a) => (
                <ArticleCard key={`n-${a.pillar}-${a.cluster}-${a.slug}`} href={articlePath(a.pillar, a.cluster, a.slug)} label={a.label} title={a.title} excerpt={a.excerpt} />
              ))}
            </CardGrid>
          </div>
        </section>
      ) : null}

      {data.popular?.length ? (
        <section className="section">
          <div className="wrap">
            <SectionHeader title="Most read" sub="The guides teams reference most." />
            <CardGrid>
              {data.popular.map((a) => (
                <ArticleCard key={`p-${a.pillar}-${a.cluster}-${a.slug}`} href={articlePath(a.pillar, a.cluster, a.slug)} label={a.label} title={a.title} excerpt={a.excerpt} />
              ))}
            </CardGrid>
          </div>
        </section>
      ) : null}

      <CtaBanner />
      <SiteFooter />
    </>
  )
}

/* ============================ L2 — PILLAR ============================ */
export function Pillar({ data }: { data: PillarData }) {
  const label = data.shortLabel || data.title
  const guideCount = data.clusters.reduce((n, c) => n + (c.articles?.length || 0), 0)
  return (
    <>
      <SiteNav />
      <HeroDark>
        <Breadcrumbs trail={[{ label: 'AI Search 101', href: base }, { label }]} />
        <h1>{data.title}</h1>
        {data.summary && <p className="sub">{data.summary}</p>}
        <div className="ameta"><b>{data.clusters.length} clusters</b><span className="sep">&middot;</span><span>{guideCount} guides</span></div>
      </HeroDark>
      <section className="section">
        <div className="wrap">
          <SectionHeader title={`Explore ${label}`} sub="Pick a cluster to dive into its guides." />
          <CardGrid>
            {data.clusters.map((c) => (
              <ArticleCard
                key={c.slug}
                href={clusterPath(data.slug, c.slug)}
                label={`${c.articles?.length || 0} guides`}
                title={c.title}
                excerpt={c.summary}
              />
            ))}
          </CardGrid>
        </div>
      </section>
      <CtaBanner />
      <SiteFooter />
    </>
  )
}

/* ============================ L3 — CLUSTER ============================ */
export function Cluster({ data }: { data: ClusterData }) {
  const pillarLabel = data.pillar.shortLabel || data.pillar.title
  return (
    <>
      <SiteNav />
      <HeroDark>
        <Breadcrumbs trail={[
          { label: 'AI Search 101', href: base },
          { label: pillarLabel, href: pillarPath(data.pillar.slug) },
          { label: data.title },
        ]} />
        <h1>{data.title}</h1>
        {data.summary && <p className="sub">{data.summary}</p>}
        <div className="ameta"><b>{data.articles.length} guides</b>{data.level ? <><span className="sep">&middot;</span><span>{data.level}</span></> : null}</div>
      </HeroDark>
      <section className="section">
        <div className="wrap">
          {data.articles.length > 0 ? (
            <>
              <SectionHeader title="Guides in this cluster" sub="Read in order, or jump to what you need." />
              <CardGrid>
                {data.articles.map((a) => (
                  <ArticleCard
                    key={a.slug}
                    href={articlePath(data.pillar.slug, data.slug, a.slug)}
                    label={data.title}
                    title={a.title}
                    excerpt={a.excerpt}
                  />
                ))}
              </CardGrid>
            </>
          ) : (
            <div className="prose"><PortableBody value={data.body} /></div>
          )}
        </div>
      </section>
      <CtaBanner />
      <SiteFooter />
    </>
  )
}

/* ============================ L4 — ARTICLE ============================ */
const TAG_STYLE: React.CSSProperties = {
  display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: '.12em',
  textTransform: 'uppercase', color: '#9fc3f5', border: '1px solid rgba(159,195,245,.4)',
  padding: '5px 11px', borderRadius: 7, marginBottom: 14,
}

export function Article({ data }: { data: ArticleData }) {
  const pillarLabel = data.pillar.shortLabel || data.pillar.title
  const canonical = `${PUBLIC}${articlePath(data.pillar.slug, data.cluster.slug, data.slug)}`
  const headings = headingsFromBody(data.body)
  const dateLabel = data.datePublished
    ? new Date(data.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null
  const more = (data.siblings?.length ? data.siblings : data.related) || []

  const articleLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: data.title, description: data.excerpt || data.answer,
    datePublished: data.datePublished, dateModified: data.dateModified || data.datePublished,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    author: { '@type': 'Organization', name: 'MaximusLabs' },
    publisher: { '@type': 'Organization', name: 'MaximusLabs' },
  }
  const faqLd = data.faq?.length
    ? {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({
          '@type': 'Question', name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null

  return (
    <>
      <SiteNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <HeroDark>
        <Breadcrumbs trail={[
          { label: 'AI Search 101', href: base },
          { label: pillarLabel, href: pillarPath(data.pillar.slug) },
          { label: data.cluster.title, href: clusterPath(data.pillar.slug, data.cluster.slug) },
          { label: data.title },
        ]} />
        <div><span style={TAG_STYLE}>{data.cluster.title}</span></div>
        <h1>{data.title}</h1>
        {data.excerpt && <p className="sub">{data.excerpt}</p>}
        <div className="ameta">
          <span className="avatar">KK</span>
          <b>Krishna Kaanth</b>
          {dateLabel && <><span className="sep">&middot;</span><span>{dateLabel}</span></>}
          {data.readingTime ? <><span className="sep">&middot;</span><span>{data.readingTime} min read</span></> : null}
        </div>
      </HeroDark>

      <div className="wrap">
        <div className="article-wrap">
          <aside className="toc">
            <span className="lab">On this page</span>
            {headings.map((h) => (<a key={h.id} href={`#${h.id}`}>{h.text}</a>))}
            {data.faq?.length ? <a href="#faq">FAQ</a> : null}
          </aside>
          <article className="prose">
            {data.answer && (
              <div className="answer">
                <span className="lab">Answer</span>
                <p>{data.answer}</p>
              </div>
            )}

            <PortableBody value={data.body} />

            {data.faq?.length ? (
              <>
                <h2 id="faq">Frequently asked questions</h2>
                <div className="faq">
                  {data.faq.map((f, i) => (
                    <details key={i} open={i === 0}>
                      <summary>{f.question}</summary>
                      <p>{f.answer}</p>
                    </details>
                  ))}
                </div>
              </>
            ) : null}
          </article>
        </div>
      </div>

      {more.length ? (
        <section className="section">
          <div className="wrap">
            <SectionHeader title={`Discover more in ${data.cluster.title}`} />
            <CardGrid>
              {more.map((r) => (
                <ArticleCard key={r.slug} href={articlePath(r.pillar, r.cluster, r.slug)} label={r.label} title={r.title} excerpt={r.excerpt} />
              ))}
            </CardGrid>
          </div>
        </section>
      ) : null}

      <CtaBanner />
      <SiteFooter />
    </>
  )
}

/* ============================ SEARCH RESULTS ============================ */
const TYPE_LABEL: Record<SearchResult['_type'], string> = { pillar: 'Pillar', cluster: 'Cluster', article: 'Guide' }

function searchHref(r: SearchResult): string {
  if (r._type === 'pillar') return pillarPath(r.pillarSlug || r.slug)
  if (r._type === 'cluster') return clusterPath(r.pillarSlug || '', r.slug)
  return articlePath(r.pillarSlug || '', r.clusterSlug || '', r.slug)
}

export function SearchResults({ q, results }: { q: string; results: SearchResult[] }) {
  return (
    <>
      <SiteNav />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <SectionHeader
            title={q ? `Results for "${q}"` : 'Search AI Search 101'}
            sub={q ? `${results.length} result${results.length === 1 ? '' : 's'} across pillars, clusters, and guides.` : 'Search pillars, clusters, and guides.'}
          />
          <div style={{ maxWidth: 640, margin: '0 0 30px' }}><SearchBar defaultValue={q} /></div>
          {results.length ? (
            <CardGrid>
              {results.map((r) => (
                <ArticleCard key={`${r._type}-${r.slug}`} href={searchHref(r)} label={TYPE_LABEL[r._type]} title={r.title} excerpt={r.summary} />
              ))}
            </CardGrid>
          ) : q ? (
            <p style={{ color: 'var(--slate-strong)' }}>
              No matches for &ldquo;{q}&rdquo;. Try a pillar (GEO, AEO, SEO), a cluster (fundamentals, strategy), or a topic.
            </p>
          ) : null}
        </div>
      </section>
      <SiteFooter />
    </>
  )
}
