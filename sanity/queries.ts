import { groq } from 'next-sanity'

/** L1 — Hub: list all pillars with their cluster counts. */
const ARTICLE_LINK = `title, excerpt, "slug": slug.current,
  "pillar": pillar->slug.current, "cluster": cluster->slug.current, "label": pillar->shortLabel`

export const HUB_Q = groq`{
  "pillars": *[_type=="pillar"] | order(order asc){
    title, shortLabel, summary, category, "slug": slug.current,
    "clusterCount": count(*[_type=="cluster" && references(^._id)]),
    "articleCount": count(*[_type=="article" && references(^._id) && (count(body) > 0 || defined(bodyHtml))]),
    "topClusters": *[_type=="cluster" && references(^._id)] | order(order asc)[0...4]{ title, "slug": slug.current },
    "topArticles": *[_type=="article" && references(^._id) && (count(body) > 0 || defined(bodyHtml))] | order(cluster->order asc, coalesce(order, 99) asc)[0...5]{ title, "slug": slug.current, "cluster": cluster->slug.current }
  },
  "latest": *[_type=="article" && defined(datePublished) && (count(body) > 0 || defined(bodyHtml))] | order(datePublished desc)[0...8]{ ${ARTICLE_LINK} },
  "popular": *[_type=="article" && (count(body) > 0 || defined(bodyHtml))] | order(readingTime desc)[0...8]{ ${ARTICLE_LINK} }
}`

/** L2 — Pillar by slug, with its clusters and each cluster's article links. */
export const PILLAR_Q = groq`*[_type=="pillar" && slug.current==$pillar][0]{
  title, shortLabel, summary, body, "slug": slug.current,
  "clusters": *[_type=="cluster" && references(^._id)] | order(order asc){
    title, summary, level, "slug": slug.current,
    "articles": *[_type=="article" && references(^._id) && (count(body) > 0 || defined(bodyHtml))] | order(order asc){
      title, "slug": slug.current
    }
  }
}`

/** L3 — Cluster by pillar+cluster slug, with its articles. */
export const CLUSTER_Q = groq`*[_type=="cluster"
  && slug.current==$cluster && pillar->slug.current==$pillar][0]{
  title, "slug": slug.current, summary, body, level,
  "pillar": pillar->{title, shortLabel, "slug": slug.current},
  "articles": *[_type=="article" && references(^._id) && (count(body) > 0 || defined(bodyHtml))] | order(order asc){
    title, excerpt, readingTime, "slug": slug.current
  }
}`

/** L4 — Article by pillar+cluster+article slug. */
export const ARTICLE_Q = groq`*[_type=="article"
  && slug.current==$article
  && cluster->slug.current==$cluster
  && pillar->slug.current==$pillar][0]{
  title, "slug": slug.current, answer, excerpt, body, bodyHtml, tldrHtml, author, faq, readingTime, datePublished, dateModified, seo,
  "pillar": pillar->{title, shortLabel, "slug": slug.current},
  "cluster": cluster->{title, "slug": slug.current},
  "related": relatedArticles[]->{
    title, excerpt, "slug": slug.current,
    "cluster": cluster->slug.current, "pillar": pillar->slug.current, "label": pillar->shortLabel
  },
  "siblings": *[_type=="article" && cluster->slug.current==$cluster && pillar->slug.current==$pillar && slug.current != $article && (count(body) > 0 || defined(bodyHtml))]
    | order(order asc)[0...3]{
      title, excerpt, "slug": slug.current,
      "cluster": cluster->slug.current, "pillar": pillar->slug.current, "label": pillar->shortLabel
    }
}`

/** For generateStaticParams + sitemap: every renderable path component. */
export const ALL_PILLARS_Q = groq`*[_type=="pillar" && defined(slug.current)]{
  "p": slug.current, "ts": coalesce(_updatedAt, _createdAt)
}`
export const ALL_CLUSTERS_Q = groq`*[_type=="cluster" && defined(slug.current) && defined(pillar->slug.current)]{
  "p": pillar->slug.current, "c": slug.current, "ts": coalesce(_updatedAt, _createdAt)
}`
export const ALL_ARTICLES_Q = groq`*[_type=="article" && defined(slug.current) && defined(cluster->slug.current) && defined(pillar->slug.current)]{
  "p": pillar->slug.current, "c": cluster->slug.current, "a": slug.current,
  "ts": coalesce(dateModified, datePublished, _updatedAt, _createdAt)
}`

/* Search across pillars, clusters, and articles by title/summary/excerpt. */
export const SEARCH_Q = groq`*[
  (_type=="pillar" || _type=="cluster" || _type=="article") && defined(slug.current) &&
  (title match $term || summary match $term || excerpt match $term)
]{
  _type, title, "slug": slug.current,
  "pillarSlug": select(_type=="pillar" => slug.current, pillar->slug.current),
  "clusterSlug": select(_type=="cluster" => slug.current, _type=="article" => cluster->slug.current, null),
  "summary": coalesce(summary, excerpt)
} | order(_type asc)[0...60]`

/* Lightweight metadata-only queries (no body) for generateMetadata. */
export const META_PILLAR_Q = groq`*[_type=="pillar" && slug.current==$pillar][0]{
  title, shortLabel, summary, seo
}`
export const META_CLUSTER_Q = groq`*[_type=="cluster" && slug.current==$cluster && pillar->slug.current==$pillar][0]{
  title, summary, seo
}`
export const META_ARTICLE_Q = groq`*[_type=="article"
  && slug.current==$article && cluster->slug.current==$cluster && pillar->slug.current==$pillar][0]{
  title, excerpt, answer, datePublished, seo
}`
