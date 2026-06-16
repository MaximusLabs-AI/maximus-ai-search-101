import type { Metadata } from 'next'
import './hub.css'
import { LogoSprite } from '@/components/chrome'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maximuslabs.ai'),
  title: {
    default: 'AI Search 101 | MaximusLabs',
    template: '%s | MaximusLabs',
  },
  description:
    'Learn GEO, AEO, SEO, Agentic SEO, and Agentic Commerce. A structured hub of guides to turn AI search into a revenue engine.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Inline logo sprite once; templates reference it via <use href="#..."> */}
        <LogoSprite />
        {children}
      </body>
    </html>
  )
}
