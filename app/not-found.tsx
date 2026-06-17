import Link from 'next/link'
import { SiteNav, SiteFooter } from '@/components/chrome'

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <section className="hero compact">
        <svg className="motif" viewBox="0 0 48 48"><use href="#ml-mark-w" /></svg>
        <div className="wrap">
          <span className="eyebrow">404</span>
          <h1>That guide is not here</h1>
          <p className="dek">The page you are looking for does not exist or has moved.</p>
          <div style={{ marginTop: 24 }}>
            <Link className="nav-cta" href="/" style={{ display: 'inline-block' }}>
              Back to AI Search 101
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}
