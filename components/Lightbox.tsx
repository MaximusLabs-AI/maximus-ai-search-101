'use client'

import { useEffect, useState } from 'react'

/**
 * Click-to-zoom lightbox for article images (like the ahrefs blog). Delegates on
 * any <img> inside `.prose`, so it covers both Portable Text and synced-HTML
 * articles without wrapping each image. Click anywhere or press Esc to close.
 */
export function ArticleLightbox() {
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('.prose img') as HTMLImageElement | null
      if (el) {
        e.preventDefault()
        setImg({ src: el.currentSrc || el.src, alt: el.alt || '' })
      }
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setImg(null) }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (!img) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [img])

  if (!img) return null
  return (
    <div className="lightbox" onClick={() => setImg(null)} role="dialog" aria-modal="true">
      <span className="lightbox-close" aria-hidden="true">&times;</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt={img.alt} />
    </div>
  )
}
