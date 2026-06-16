'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

// Sanity Studio is a browser SPA (it calls React.createContext at import time),
// so this route must be a Client Component. The optional catch-all lets the
// Studio's own router own everything under /studio.
export default function StudioPage() {
  return <NextStudio config={config} />
}
