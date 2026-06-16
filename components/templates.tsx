import Link from 'next/link'
import {
  SiteNav, SiteFooter, Breadcrumbs, UrlBar, ReportCard, Featured, NewsletterBand,
} from '@/components/chrome'
import { PortableBody, headingsFromBody } from '@/components/PortableBody'
import {
  type HubData, type PillarData, type ClusterData, type ArticleData,
  base, pillarPath, clusterPath, articlePath,
} from '@/components/types'

const PUBLIC = 'https://www.maximuslabs.ai'

/* ============================ L1 — HUB ============================ */
export function Hub({ data }: { data: HubData }) {
  const totalClusters = data.pillars.reduce((n, p) => n + (p.clusterCount || 0), 0)
  const featured = data.pillars[0]
  return (
    <>
      <SiteNav />
      <section className="lhero">
        <div className="wrap">
          <div>
            <span className="tag">AI Search 101</span>
            <h1>The complete playbook for winning AI {''}<span className="accent">search</span></h1>
            <p className="lead">
              Generative engines, answer engines, and AI shopping agents now sit between your brand
              and your buyers. Original frameworks and field guides to turn AI search into a revenue
              engine. Every guide is free.
            </p>
          </div>
          <div className="hcount"><b>{data.pillars.length}</b> pillars &middot; <b>300+</b> guides</div>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 18 }}>
        <UrlBar parts={[{ seg: 'ai-search-101', n: 1, label: 'Level 1 · Hub', current: true }]} />
      </div>

      {featured && (
        <div className="wrap">
          <Featured
            coverTag="Start Here"
            coverTitle={featured.shortLabel || featured.title}
            coverMeta={`${featured.clusterCount} clusters · beginner to advanced`}
            tag="Pillar"
            title={featured.title}
            description={featured.summary || ''}
            href={pillarPath(featured.slug)}
            cta={`Explore ${featured.shortLabel || featured.title}`}
          />
        </div>
      )}

      {['Core Disciplines', 'Explore by area'].map((cat, ci) => {
        const ps = data.pillars.filter((p) => (p.category || 'Core Disciplines') === cat)
        if (!ps.length) return null
        return (
          <section className="section" key={cat}>
            <div className="wrap">
              <div className="sec-head">
                <span className="sec-eyebrow">{ci === 0 ? 'Start with a discipline' : 'Go deeper'}</span>
                <h2 className="h-sec">{cat}</h2>
                {ci === 0 && (
                  <p className="dek">Each pillar is a hub of clusters, and each cluster holds a set of guides. Start anywhere and drill down.</p>
                )}
              </div>
              <div className="cards">
                {ps.map((p) => (
                  <ReportCard
                    key={p.slug}
                    href={pillarPath(p.slug)}
                    title={p.shortLabel || p.title}
                    count={`${p.clusterCount} clusters`}
                    tag={cat === 'Core Disciplines' ? 'Discipline' : 'Pillar'}
                    description={p.summary}
                    meta="Explore"
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <NewsletterBand />
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
      <div className="wrap">
        <Breadcrumbs trail={[{ label: 'AI Search 101', href: base }, { label }]} />
        <UrlBar
          style={{ marginTop: 14 }}
          parts={[
            { seg: 'ai-search-101', n: 1, label: 'L1' },
            { seg: data.slug, n: 2, label: 'Level 2 · Pillar', current: true },
          ]}
        />
      </div>
      <section className="lhero" style={{ paddingTop: 26 }}>
        <div className="wrap">
          <div>
            <span className="tag">Pillar &middot; {label}</span>
            <h1>{data.title}</h1>
            {data.summary && <p className="lead">{data.summary}</p>}
          </div>
          <div className="hcount"><b>{data.clusters.length}</b> clusters &middot; <b>{guideCount}</b> guides</div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-eyebrow">Clusters in this pillar</span>
            <h2 className="h-sec">Work through {label}, cluster by cluster</h2>
          </div>
          <div className="cards">
            {data.clusters.map((c) => (
              <ReportCard
                key={c.slug}
                href={clusterPath(data.slug, c.slug)}
                title={c.title}
                count={`${c.articles?.length || 0} guides`}
                tag={c.level || 'Cluster'}
                description={c.summary}
                meta={`${c.articles?.length || 0} guides`}
              />
            ))}
          </div>
        </div>
      </section>
      <NewsletterBand />
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
      <div className="wrap">
        <Breadcrumbs trail={[
          { label: 'AI Search 101', href: base },
          { label: pillarLabel, href: pillarPath(data.pillar.slug) },
          { label: data.title },
        ]} />
        <UrlBar
          style={{ marginTop: 14 }}
          parts={[
            { seg: 'ai-search-101', n: 1, label: 'L1' },
            { seg: data.pillar.slug, n: 2, label: 'L2' },
            { seg: data.slug, n: 3, label: 'Level 3 · Cluster', current: true },
          ]}
        />
      </div>
      <section className="lhero" style={{ paddingTop: 26 }}>
        <div className="wrap">
          <div>
            <span className="tag">{pillarLabel} &middot; Cluster</span>
            <h1>{data.title}</h1>
            {data.summary && <p className="lead">{data.summary}</p>}
          </div>
          <div className="hcount"><b>{data.articles.length}</b> guides{data.level ? ` · ${data.level}` : ''}</div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          {data.articles.length > 0 ? (
            <>
              <div className="sec-head">
                <span className="sec-eyebrow">Guides in this cluster</span>
                <h2 className="h-sec">Read in order, or jump in</h2>
              </div>
              <div className="cards">
                {data.articles.map((a) => (
                  <ReportCard
                    key={a.slug}
                    href={articlePath(data.pillar.slug, data.slug, a.slug)}
                    title={a.title}
                    count={a.readingTime ? `${a.readingTime} min read` : 'Guide'}
                    tag={data.title}
                    description={a.excerpt}
                    meta={a.readingTime ? `${a.readingTime} min read` : 'Read guide'}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="prose"><PortableBody value={data.body} /></div>
          )}
        </div>
      </section>
      <NewsletterBand />
      <SiteFooter />
    </>
  )
}

/* ============================ L4 — ARTICLE ============================ */
export function Article({ data }: { data: ArticleData }) {
  const pillarLabel = data.pillar.shortLabel || data.pillar.title
  const canonical = `${PUBLIC}${articlePath(data.pillar.slug, data.cluster.slug, data.slug)}`
  const headings = headingsFromBody(data.body)
  const dateLabel = data.datePublished
    ? new Date(data.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

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
      <section className="ahero">
        <span className="dotgrid" />
        <div className="wrap">
          <Breadcrumbs trail={[
            { label: 'AI Search 101', href: base },
            { label: pillarLabel, href: pillarPath(data.pillar.slug) },
            { label: data.cluster.title, href: clusterPath(data.pillar.slug, data.cluster.slug) },
            { label: data.title },
          ]} />
          <span className="atag">{data.cluster.title}</span>
          <h1>{data.title}</h1>
          <div className="ameta">
            <span className="avatar">KK</span>
            <b>Krishna Kaanth</b>
            {dateLabel && <><span className="sep">&middot;</span><span>{dateLabel}</span></>}
            {data.readingTime ? <><span className="sep">&middot;</span><span>{data.readingTime} min read</span></> : null}
          </div>
        </div>
      </section>

      <div className="wrap" style={{ marginTop: 18 }}>
        <UrlBar parts={[
          { seg: 'ai-search-101', n: 1, label: 'L1' },
          { seg: data.pillar.slug, n: 2, label: 'L2' },
          { seg: data.cluster.slug, n: 3, label: 'L3' },
          { seg: data.slug, n: 4, label: 'Level 4 · Article', current: true },
        ]} />
      </div>

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

            {data.related?.length ? (
              <div className="related">
                <span className="sec-eyebrow">Continue in this cluster</span>
                <div className="rows" style={{ marginTop: 14 }}>
                  {data.related.map((r) => (
                    <Link className="row" href={articlePath(r.pillar, r.cluster, r.slug)} key={r.slug}>
                      <div className="r-main" style={{ flex: 1 }}><h4>{r.title}</h4></div>
                      <span className="r-go">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}
