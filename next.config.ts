import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
