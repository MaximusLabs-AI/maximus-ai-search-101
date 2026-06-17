import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Serve the whole app under /ai-search-101 so a single Cloudflare route
  // (/ai-search-101*) proxies pages, /_next assets, /api, /studio, and the
  // sitemap together. Next prepends this to every <Link>/router href and to
  // public assets and metadata routes (sitemap.xml -> /ai-search-101/sitemap.xml).
  basePath: '/ai-search-101',
  // The Vercel origin must never be indexed directly. The Cloudflare Worker
  // strips this header for the public maximuslabs.ai/ai-search-101/* URLs, so
  // only the proxied URLs get indexed. Matches every route including the index.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
  // Sanity image CDN (Next 16 dropped images.domains in favor of remotePatterns).
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default nextConfig
