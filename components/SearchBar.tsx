'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

function MagnifierIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

type Suggestion = { title: string; href: string; typeLabel: string }

export function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
  const [q, setQ] = useState(defaultValue)
  const [items, setItems] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Debounced typeahead against our same-origin /api/search endpoint.
  useEffect(() => {
    const term = q.trim()
    if (term.length < 2) { setItems([]); setOpen(false); return }
    const ctl = new AbortController()
    const t = setTimeout(async () => {
      try {
        // fetch() does NOT get basePath auto-applied, so include it explicitly.
        const res = await fetch(`/ai-search-101/api/search?q=${encodeURIComponent(term)}`, { signal: ctl.signal })
        const data = await res.json()
        setItems(data.results || [])
        setOpen(true)
      } catch { /* aborted or network error: ignore */ }
    }, 160)
    return () => { clearTimeout(t); ctl.abort() }
  }, [q])

  // Close the dropdown on outside click.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className="search-wrap" ref={wrapRef}>
      {/* GET form: pressing Enter goes to the full results page. */}
      <form className="searchbar" action="/ai-search-101/search" autoComplete="off">
        <MagnifierIcon />
        <input
          type="search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => items.length > 0 && setOpen(true)}
          placeholder="Search a topic..."
          aria-label="Search AI Search 101"
          autoComplete="off"
        />
      </form>
      {open && items.length > 0 && (
        <ul className="search-sugg">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} onClick={() => setOpen(false)}>
                <span className="st">{it.typeLabel}</span>
                <span className="stx">{it.title}</span>
              </Link>
            </li>
          ))}
          <li className="sugg-all">
            <Link href={`/search?q=${encodeURIComponent(q.trim())}`} onClick={() => setOpen(false)}>
              See all results for &ldquo;{q.trim()}&rdquo; &rarr;
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}
